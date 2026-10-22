const fs = require('fs');
const path = require('path');

const SRC_DIR = './src';
const LOCALES = ['id', 'en', 'fr'];
const COLLECTIONS = ['about', 'services', 'projects', 'legal', 'newsroom', 'contact'];

// 1. Fix backslashes and trailing /index in frontmatter
function fixMarkdownPaths(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
        const fullPath = path.join(dir, dirent.name);
        if (dirent.isDirectory()) {
            fixMarkdownPaths(fullPath);
        } else if (fullPath.endsWith('.md')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Fix Windows backslashes
            if (/^path:\s*.*\\.*/m.test(content)) {
                content = content.replace(/^path:\s*(.*)\$/gm, (m, p1) => `path: ${p1.replace(/\\/g, '/')}`);
                modified = true;
            }

            // Remove trailing /index 
            if (/^path:\s*(.+)\/index\$/m.test(content)) {
                content = content.replace(/^path:\s*(.+)\/index\$/gm, 'path: \$1');
                modified = true;
            }

            // Remove path: index
            if (/^path:\s*index\s*\$/m.test(content)) {
                content = content.replace(/^path:\s*index\s*\$\r?\n/m, '');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log(`🔧 Fixed frontmatter path in: ${fullPath}`);
            }
        }
    });
}

// 2. Ensure parent index files exist for nested collections
function ensureParentNodes() {
    LOCALES.forEach(lang => {
        COLLECTIONS.forEach(coll => {
            const collPath = path.join(SRC_DIR, lang, coll);
            const indexPath = path.join(collPath, 'index.md');
            if (fs.existsSync(collPath) && !fs.existsSync(indexPath)) {
                fs.writeFileSync(indexPath, `---\ntitle: ${coll.toUpperCase()}\n---\n`);
                console.log(`📁 Created missing parent node: ${indexPath}`);
            }
        });
    });
}

// 3. Sync missing files across all locales
function getAllMarkdownFiles(dir, baseDir = dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir, { withFileTypes: true });
    list.forEach(file => {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
            results = results.concat(getAllMarkdownFiles(fullPath, baseDir));
        } else if (fullPath.endsWith('.md')) {
            results.push(path.relative(baseDir, fullPath).replace(/\\/g, '/'));
        }
    });
    return results;
}

function syncLocales() {
    const allRelativePaths = new Set();
    const fileRegistry = {}; 

    // Gather all unique file paths across id, en, and fr
    LOCALES.forEach(locale => {
        const localeDir = path.join(SRC_DIR, locale);
        const files = getAllMarkdownFiles(localeDir);
        files.forEach(file => {
            allRelativePaths.add(file);
            if (!fileRegistry[file]) fileRegistry[file] = [];
            fileRegistry[file].push(locale);
        });
    });

    // Check which files are missing in which locales and duplicate them
    allRelativePaths.forEach(file => {
        const existingLocales = fileRegistry[file];
        if (existingLocales.length === LOCALES.length) return; // Exists in all 3, skip!

        // Prefer English as the source content, fallback to whatever exists
        let sourceLocale = existingLocales.includes('en') ? 'en' : existingLocales[0];
        const sourceFilePath = path.join(SRC_DIR, sourceLocale, file);
        const sourceContent = fs.readFileSync(sourceFilePath, 'utf8');

        LOCALES.forEach(targetLocale => {
            if (!existingLocales.includes(targetLocale)) {
                const targetFilePath = path.join(SRC_DIR, targetLocale, file);
                const targetDir = path.dirname(targetFilePath);
                
                if (!fs.existsSync(targetDir)) {
                    fs.mkdirSync(targetDir, { recursive: true });
                }

                fs.writeFileSync(targetFilePath, sourceContent);
                console.log(`🌍 Synced missing file to [${targetLocale}]: ${file} (Copied from ${sourceLocale})`);
            }
        });
    });
}

console.log('Starting Sveltia CMS Repository Sync...');
fixMarkdownPaths(SRC_DIR);
ensureParentNodes();
syncLocales();
console.log('\n🎉 All files synchronized! Commit these changes, push to GitHub, and clear your IndexedDB.');