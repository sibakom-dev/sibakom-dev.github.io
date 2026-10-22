const fs = require('fs');
const path = require('path');

const SRC_DIR = './src';
const LOCALES = ['id', 'en', 'fr'];
const COLLECTIONS = ['newsroom', 'about', 'services', 'projects', 'legal', 'contact'];

function rescueFiles() {
    LOCALES.forEach(lang => {
        const langDir = path.join(SRC_DIR, lang);
        if (!fs.existsSync(langDir)) return;

        // Find all directories directly under src/en/, src/id/, etc.
        const subdirs = fs.readdirSync(langDir, { withFileTypes: true })
            .filter(d => d.isDirectory())
            .map(d => d.name);

        subdirs.forEach(subdir => {
            // If the folder is a random hash/name and NOT a standard collection folder
            if (!COLLECTIONS.includes(subdir) && subdir !== 'images') {
                console.log(`\n🔍 Found rogue folder: src/${lang}/${subdir}`);
                
                COLLECTIONS.forEach(coll => {
                    const rogueCollDir = path.join(langDir, subdir, coll);
                    const correctCollDir = path.join(langDir, coll);

                    // If the rogue folder contains a collection folder (like 'newsroom')
                    if (fs.existsSync(rogueCollDir)) {
                        if (!fs.existsSync(correctCollDir)) {
                            fs.mkdirSync(correctCollDir, { recursive: true });
                        }

                        // Rescue the markdown files
                        const files = fs.readdirSync(rogueCollDir);
                        files.forEach(file => {
                            if (file.endsWith('.md')) {
                                const oldPath = path.join(rogueCollDir, file);
                                const newPath = path.join(correctCollDir, file);
                                fs.renameSync(oldPath, newPath);
                                console.log(`✅ Rescued: ${file} -> ${correctCollDir}`);
                            }
                        });
                    }
                });

                // Clean up the rogue folder now that it's empty
                try {
                    fs.rmSync(path.join(langDir, subdir), { recursive: true, force: true });
                    console.log(`🗑️ Deleted empty rogue folder: ${subdir}`);
                } catch (err) {
                    console.log(`⚠️ Could not automatically delete ${subdir}. You may need to delete it manually.`);
                }
            }
        });
    });
}

rescueFiles();
console.log('\n🎉 File rescue complete! Your articles are back in their correct folders.');