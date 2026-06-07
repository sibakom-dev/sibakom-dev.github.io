const fs = require('fs');
const path = require('path');

const missingPages = [
    { path: 'src/services/maritime-meteorology/data-gathering/index.njk', title: 'Data Gathering' },
    { path: 'src/services/maritime-meteorology/precision-analytics/index.njk', title: 'Precision Analytics' },
    { path: 'src/services/maritime-meteorology/remote-sensing/index.njk', title: 'Remote Sensing Systems' },
    { path: 'src/services/agrometeorology/crop-modeling/index.njk', title: 'Crop Modeling' },
];

missingPages.forEach(p => {
    let content = `---\nlayout: layouts/page.njk\ntitle: ${p.title}\ndescription: ${p.title} page for SIBAKOM.\n`;
    content += `heroImage: /assets/images/pages/corporate-building.jpg\n`;
    content += `---\n\n<p>Content for ${p.title} goes here. This is a placeholder that will be updated later.</p>\n`;
    
    const dir = path.dirname(path.join(__dirname, p.path));
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path.join(__dirname, p.path), content);
});

// Update all old unsplash links
function walkDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.njk')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('heroImage: https://images.unsplash.com')) {
                content = content.replace(/heroImage: https:\/\/images\.unsplash\.com[^\n]+/g, 'heroImage: /assets/images/pages/corporate-building.jpg');
                fs.writeFileSync(fullPath, content);
            }
            if (content.includes('heroImage: https://picsum.photos')) {
                content = content.replace(/heroImage: https:\/\/picsum\.photos[^\n]+/g, 'heroImage: /assets/images/pages/corporate-building.jpg');
                fs.writeFileSync(fullPath, content);
            }
        }
    });
}

walkDir(path.join(__dirname, 'src'));
console.log('Fixed missing pages and updated all unsplash links to local placeholders.');
