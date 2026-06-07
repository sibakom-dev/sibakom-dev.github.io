const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'src');

function findImagesAndReplace(content, dirPath) {
    let newContent = content;
    // Regex to match src="..." or heroImage: ... pointing to /assets/images/pages/
    // We'll look for /assets/images/pages/([^"'\s]+)
    const regex = /\/assets\/images\/pages\/([^"'\s]+)/g;
    
    let match;
    const imagesToCopy = [];
    
    while ((match = regex.exec(content)) !== null) {
        imagesToCopy.push(match[1]);
    }

    if (imagesToCopy.length > 0) {
        const imagesDir = path.join(dirPath, 'images');
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
        }
        
        imagesToCopy.forEach(imgName => {
            const sourcePath = path.join(__dirname, 'src/assets/images/pages', imgName);
            const destPath = path.join(imagesDir, imgName);
            
            if (fs.existsSync(sourcePath)) {
                fs.copyFileSync(sourcePath, destPath);
            }
        });
        
        // Replace all references with relative ./images/
        newContent = newContent.replace(/\/assets\/images\/pages\//g, './images/');
    }
    
    return newContent;
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            if (file !== '_includes' && file !== 'assets') {
                processDirectory(fullPath);
            }
        } else if (file.endsWith('.njk')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const updatedContent = findImagesAndReplace(content, dir);
            
            const newPath = path.join(dir, file.replace('.njk', '.md'));
            fs.writeFileSync(newPath, updatedContent);
            
            // Delete the old .njk file
            fs.unlinkSync(fullPath);
        }
    });
}

console.log("Starting migration to Markdown and co-located images...");
processDirectory(rootDir);
console.log("Migration complete!");
