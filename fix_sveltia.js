const fs = require('fs');
const path = require('path');

const SRC_DIR = './src';

function removeEleventyConflicts(dir) {
    if (!fs.existsSync(dir)) return;

    fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
        const fullPath = path.join(dir, dirent.name);

        if (dirent.isDirectory()) {
            const collidingFile = path.join(dir, `${dirent.name}.md`);
            const indexFile = path.join(fullPath, `index.md`);

            // If both folder.md and folder/index.md exist, Eleventy crashes.
            // Delete the folder.md stub.
            if (fs.existsSync(collidingFile) && fs.existsSync(indexFile)) {
                fs.unlinkSync(collidingFile);
                console.log(`🗑️ Deleted colliding stub file: ${collidingFile}`);
            }

            // Recurse into subdirectories
            removeEleventyConflicts(fullPath);
        }
    });
}

console.log('Scanning for Eleventy permalink conflicts...');
removeEleventyConflicts(SRC_DIR);
console.log('\n🎉 Cleanup complete. Commit and push these deletions.');