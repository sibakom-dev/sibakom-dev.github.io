const fs = require('fs');
const path = require('path');

const rootDir = 'src';
const languages = ['en', 'fr', 'id'];
const collections = ['about', 'services', 'projects'];

function flattenDirectory(dirPath, collectionPath) {
    if (!fs.existsSync(dirPath)) return;

    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    items.forEach(item => {
        const fullPath = path.join(dirPath, item.name);

        if (item.isDirectory() && item.name !== 'images') {
            // It's a subfolder like 'weather-broadcast-studio' or 'c-band'
            // We need to recursively process it
            flattenDirectory(fullPath, collectionPath);
            
            // Check if there is an index.md inside
            const indexPath = path.join(fullPath, 'index.md');
            if (fs.existsSync(indexPath)) {
                // Calculate the relative slug from the collection root
                const relativeToCollection = path.relative(collectionPath, fullPath).replace(/\\/g, '/');
                
                // e.g. "weather-radar/c-band"
                const slug = relativeToCollection.replace(/\//g, '-');
                // e.g. "weather-radar-c-band"
                
                const newFilePath = path.join(collectionPath, `${slug}.md`);
                
                // Read content
                let content = fs.readFileSync(indexPath, 'utf-8');
                
                // Inject permalink if it's deeply nested (more than 1 level)
                // Actually, let's inject permalink for everything just to be safe
                const lang = collectionPath.split(path.sep)[1]; // src/en/... -> en
                const collName = collectionPath.split(path.sep)[2]; // src/en/services -> services
                
                const permalink = `/${lang}/${collName}/${relativeToCollection}/`;
                
                if (!content.includes('permalink:')) {
                    content = content.replace(/^---\n/, `---\npermalink: ${permalink}\n`);
                }
                
                // Write new file
                fs.writeFileSync(newFilePath, content);
                console.log(`Moved ${indexPath} -> ${newFilePath} with permalink ${permalink}`);
                
                // Delete old index.md
                fs.unlinkSync(indexPath);
            }
        }
    });
}

// First, flatten all directories
languages.forEach(lang => {
    collections.forEach(coll => {
        const collPath = path.join(rootDir, lang, coll);
        flattenDirectory(collPath, collPath);
    });
});

// Second, clean up empty subdirectories
function deleteEmptySubdirs(dirPath) {
    if (!fs.existsSync(dirPath)) return;
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
    items.forEach(item => {
        const fullPath = path.join(dirPath, item.name);
        if (item.isDirectory() && item.name !== 'images') {
            deleteEmptySubdirs(fullPath);
            try {
                fs.rmdirSync(fullPath);
                console.log(`Deleted empty directory ${fullPath}`);
            } catch (e) {
                // Not empty, skip
            }
        }
    });
}

languages.forEach(lang => {
    collections.forEach(coll => {
        const collPath = path.join(rootDir, lang, coll);
        deleteEmptySubdirs(collPath);
    });
});
