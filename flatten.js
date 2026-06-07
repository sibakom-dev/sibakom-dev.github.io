const fs = require('fs');
const path = require('path');

const collections = ['projects', 'services', 'about'];
const locales = ['id', 'en', 'fr'];
const srcDir = path.join(__dirname, 'src');
const assetsImgDir = path.join(srcDir, 'assets', 'images');

function processDirectory(baseDir, currentRelPath, collectionName, locale) {
    const fullPath = path.join(baseDir, currentRelPath);
    if (!fs.existsSync(fullPath)) return;
    
    const items = fs.readdirSync(fullPath, { withFileTypes: true });
    
    for (const item of items) {
        if (item.isDirectory()) {
            if (item.name === 'images') {
                continue;
            }
            processDirectory(baseDir, path.join(currentRelPath, item.name), collectionName, locale);
        } else if (item.isFile() && item.name === 'index.md') {
            if (currentRelPath === '') {
                continue;
            }
            
            const slug = currentRelPath.replace(/\\/g, '-').replace(/\//g, '-');
            const newMdPath = path.join(baseDir, `${slug}.md`);
            const oldMdPath = path.join(fullPath, 'index.md');
            
            console.log(`Flattening: ${oldMdPath} -> ${newMdPath}`);
            
            const oldImgDir = path.join(fullPath, 'images');
            const newImgDir = path.join(assetsImgDir, collectionName, slug);
            
            if (fs.existsSync(oldImgDir)) {
                if (!fs.existsSync(newImgDir)) {
                    fs.mkdirSync(newImgDir, { recursive: true });
                }
                const images = fs.readdirSync(oldImgDir);
                for (const img of images) {
                    fs.renameSync(path.join(oldImgDir, img), path.join(newImgDir, img));
                }
            }
            
            let content = fs.readFileSync(oldMdPath, 'utf8');
            const imgRegex = /(?:\.\/)?images\/([^"'\s\)]+)/g;
            content = content.replace(imgRegex, `/assets/images/${collectionName}/${slug}/$1`);
            
            fs.writeFileSync(newMdPath, content);
            fs.unlinkSync(oldMdPath);
        }
    }
}

if (!fs.existsSync(assetsImgDir)) {
    fs.mkdirSync(assetsImgDir, { recursive: true });
}

for (const locale of locales) {
    for (const collection of collections) {
        const baseDir = path.join(srcDir, locale, collection);
        if (fs.existsSync(baseDir)) {
            processDirectory(baseDir, '', collection, locale);
        }
    }
}
console.log("Flattening complete.");
