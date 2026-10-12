import { spawn } from 'child_process';
import { existsSync, mkdirSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;
const USER_DATA = join(tmpdir(), 'chrome_bench_' + Date.now());

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runBenchmark() {
  console.log("==========================================================");
  console.log("   PRUEBAS EMPÍRICAS DE RENDIMIENTO CON LATENCIA Y ANCHO DE BANDA REDUCIDO");
  console.log("==========================================================");
  
  if (!existsSync(USER_DATA)) mkdirSync(USER_DATA, { recursive: true });

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--remote-allow-origins=*',
    `--user-data-dir=${USER_DATA}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-background-networking',
    '--disable-extensions',
    'about:blank'
  ], { stdio: 'ignore' });

  let ready = false;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) {
        ready = true;
        break;
      }
    } catch (e) {}
    await sleep(200);
  }

  if (!ready) {
    console.error("No se pudo conectar a Chrome CDP en el puerto " + PORT);
    chromeProc.kill();
    return;
  }

  console.log("Motor de navegación (Headless Chromium) iniciado y vinculado a CDP.\n");

  const profiles = [
    { name: "Fibra / Local (0ms RTT, sin límite)", latency: 0, download: -1, upload: -1 },
    { name: "Fast 3G / 4G Móvil (150ms RTT, 1.6 Mbps)", latency: 150, download: (1600 * 1024) / 8, upload: (750 * 1024) / 8 },
    { name: "Slow 3G / Red Lenta (400ms RTT, 400 kbps)", latency: 400, download: (400 * 1024) / 8, upload: (400 * 1024) / 8 },
    { name: "Alta Latencia Extrema / Rural (800ms RTT, 250 kbps)", latency: 800, download: (250 * 1024) / 8, upload: (150 * 1024) / 8 },
  ];

  const pagesToTest = [
    { name: "Página Principal (Home /)", url: "http://localhost:4321/" },
    { name: "Subpágina Proyecto (/proyecto/servidor)", url: "http://localhost:4321/proyecto/servidor" }
  ];

  const results = [];

  for (const pageTest of pagesToTest) {
    console.log(`>>> Ejecutando batería en: ${pageTest.name}`);
    for (const profile of profiles) {
      process.stdout.write(`  • [${profile.name}]... `);
      const metrics = await testPageWithCDP(pageTest.url, profile);
      console.log(`FCP: ${metrics.fcp}ms | DCL: ${metrics.dcl}ms | Carga Completa: ${metrics.load}ms | Transferido: ${metrics.transferredKb} KB`);
      results.push({
        pagina: pageTest.name,
        perfil: profile.name,
        latencia: `${profile.latency} ms`,
        fcp: `${metrics.fcp} ms`,
        dcl: `${metrics.dcl} ms`,
        cargaTotal: `${metrics.load} ms`,
        pesoTransferido: `${metrics.transferredKb} KB`
      });
    }
    console.log("");
  }

  console.log("==========================================================");
  console.log("             RESUMEN CONSOLIDADO DE MÉTRICAS              ");
  console.log("==========================================================");
  console.table(results);

  chromeProc.kill();
  try { rmSync(USER_DATA, { recursive: true, force: true }); } catch (e) {}
}

async function testPageWithCDP(targetUrl, networkProfile) {
  // Create a clean new tab
  const newTabRes = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" });
  const newTab = await newTabRes.json();
  const pageWsUrl = newTab.webSocketDebuggerUrl;

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(pageWsUrl);
    let msgId = 1;
    const callbacks = new Map();
    let totalBytes = 0;

    function send(method, params = {}) {
      const id = msgId++;
      return new Promise((res) => {
        callbacks.set(id, res);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    ws.onopen = async () => {
      await send("Network.enable");
      await send("Page.enable");
      await send("Network.clearBrowserCache");

      if (networkProfile.latency > 0) {
        await send("Network.emulateNetworkConditions", {
          offline: false,
          latency: networkProfile.latency,
          downloadThroughput: networkProfile.download,
          uploadThroughput: networkProfile.upload,
          connectionType: "cellular3g"
        });
      } else {
        await send("Network.emulateNetworkConditions", {
          offline: false,
          latency: 0,
          downloadThroughput: -1,
          uploadThroughput: -1
        });
      }

      await send("Page.navigate", { url: targetUrl });
    };

    let loadFired = false;

    ws.onmessage = async (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        const cb = callbacks.get(msg.id);
        callbacks.delete(msg.id);
        cb(msg);
      }

      if (msg.method === "Network.dataReceived") {
        totalBytes += msg.params.dataLength || 0;
      }
      if (msg.method === "Network.responseReceived") {
        totalBytes += msg.params.response?.encodedDataLength || 0;
      }

      if (msg.method === "Page.loadEventFired" && !loadFired) {
        loadFired = true;
        await sleep(350);

        const evalResult = await send("Runtime.evaluate", {
          expression: `(() => {
            const nav = window.performance.getEntriesByType('navigation')[0] || {};
            const paints = window.performance.getEntriesByType('paint');
            const fcp = paints.find(p => p.name === 'first-contentful-paint')?.startTime || 0;
            return {
              dcl: Math.round(nav.domContentLoadedEventEnd || 0),
              load: Math.round(nav.loadEventEnd || 0),
              fcp: Math.round(fcp)
            };
          })()`,
          returnByValue: true
        });

        const val = evalResult.result?.result?.value || { dcl: 0, load: 0, fcp: 0 };
        ws.close();
        // Close target
        try {
          await fetch(`http://127.0.0.1:${PORT}/json/close/${newTab.id}`);
        } catch (e) {}

        resolve({
          fcp: val.fcp,
          dcl: val.dcl,
          load: val.load,
          transferredKb: (totalBytes / 1024).toFixed(1)
        });
      }
    };

    ws.onerror = (err) => reject(err);
  });
}

runBenchmark().catch(console.error);
