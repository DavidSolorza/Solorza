const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            results.push(file);
        }
    });
    return results;
}

const files = walk('src').filter(f => f.endsWith('.astro') || f.endsWith('.ts'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Layout
    content = content.replace(/['"](?:\.\.\/)+layouts\/Layout\.astro['"]/g, match => {
        return match.replace('layouts/Layout.astro', 'core/layout/Layout.astro');
    });
    
    // Header/Footer
    content = content.replace(/['"](?:\.\.\/)+components\/layout\/(Header|Footer)\.astro['"]/g, match => {
        return match.replace('components/layout', 'core/layout');
    });

    // Heading
    content = content.replace(/['"](?:\.\.\/)+components\/ui\/Heading\.astro['"]/g, match => {
        return match.replace('components/ui', 'core/ui');
    });

    // Contact
    content = content.replace(/['"](?:\.\.\/)+components\/portfolio\/(Contact|ContactForm)\.astro['"]/g, match => {
        return match.replace('components/portfolio', 'features/contact');
    });

    // Profile
    content = content.replace(/['"](?:\.\.\/)+components\/portfolio\/(HeroProfile|HeroIndex|ExperienceSection|TechSection|Tools|Hobbie|Hobbies|HobbySection)\.astro['"]/g, match => {
        return match.replace('components/portfolio', 'features/profile');
    });

    // Portfolio
    content = content.replace(/['"](?:\.\.\/)+components\/portfolio\/(ProjectCard|ProjectsGrid|GitHubCard)\.astro['"]/g, match => {
        return match.replace('components/portfolio', 'features/portfolio');
    });
    
    // mobile
    content = content.replace(/['"](?:\.\.\/)+components\/portfolio\/mobile\/(.+)\.astro['"]/g, match => {
        return match.replace('components/portfolio/mobile', 'features/portfolio/mobile');
    });

    // Data
    content = content.replace(/['"](?:\.\.\/)+data\/projects['"]/g, match => {
        return match.replace('data/projects', 'features/portfolio/projects');
    });
    
    // Fix imports that are in the same folder now (e.g. from components/portfolio to features/portfolio)
    // which were relative like `../portfolio/...` or `./...` but we can rely on VSCode TS server? No, we need regex.
    // Actually, I'll just run this and then check the build.

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Updated ' + file);
    }
});
