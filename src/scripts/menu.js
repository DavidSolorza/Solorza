function closeMenu() {
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");
  const backdrop = document.getElementById("nav-backdrop");

  navLinks?.classList.remove("expanded");
  hamburger?.classList.remove("active");
  backdrop?.classList.add("hidden");
  hamburger?.setAttribute("aria-expanded", "false");
  hamburger?.setAttribute("aria-label", "Abrir menú");
  document.body.classList.remove("menu-open");
}

function openMenu() {
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");
  const backdrop = document.getElementById("nav-backdrop");

  navLinks?.classList.add("expanded");
  hamburger?.classList.add("active");
  backdrop?.classList.remove("hidden");
  hamburger?.setAttribute("aria-expanded", "true");
  hamburger?.setAttribute("aria-label", "Cerrar menú");
  document.body.classList.add("menu-open");
}

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const backdrop = document.getElementById("nav-backdrop");
  const navLinks = document.querySelector(".nav-links");

  hamburger?.addEventListener("click", () => {
    if (navLinks?.classList.contains("expanded")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop?.addEventListener("click", closeMenu);

  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) closeMenu();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) closeMenu();
  });
});
