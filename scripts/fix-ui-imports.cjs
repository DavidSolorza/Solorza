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

const files = walk('src/features').filter(f => f.endsWith('.astro'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // from ../ui/ to ../../core/ui/
    content = content.replace(/from ['"]\.\.\/ui\//g, 'from "../../core/ui/');
    // from ../core/ui to ../../core/ui
    content = content.replace(/from ['"]\.\.\/core\/ui\//g, 'from "../../core/ui/');
    
    // from ../../utils/ to ../../utils/ (already handled if we just rely on standard path)
    
    // Let's also check for components/ui inside src/pages
    
    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Fixed UI imports in ' + file);
    }
});
