const fs = require('fs');
const path = require('path');

const SRC_DIR = './src';

// 1. Fix broken backslash paths in frontmatter
function fixMarkdownPaths(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
        const fullPath = path.join(dir, dirent.name);
        if (dirent.isDirectory()) {
            fixMarkdownPaths(fullPath);
        } else if (fullPath.endsWith('.md')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Fix Windows backslashes (e.g., path: specializations\index -> specializations/index)
            if (/^path:\s*.*\\.*/m.test(content)) {
                content = content.replace(/^path:\s*(.*)\$/gm, (m, p1) => `path: ${p1.replace(/\\/g, '/')}`);
                modified = true;
            }

            // Remove trailing /index that breaks Sveltia's nested tree logic
            if (/^path:\s*(.+)\/index\$/m.test(content)) {
                content = content.replace(/^path:\s*(.+)\/index\$/gm, 'path: \$1');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log(`Fixed frontmatter path in: ${fullPath}`);
            }
        }
    });
}

// 2. Ensure parent index files exist for nested collections (Fixes Legal & About)
function ensureParentNodes() {
    ['id', 'en', 'fr'].forEach(lang => {
        ['about', 'legal'].forEach(coll => {
            const indexPath = path.join(SRC_DIR, lang, coll, 'index.md');
            if (!fs.existsSync(indexPath) && fs.existsSync(path.join(SRC_DIR, lang, coll))) {
                fs.writeFileSync(indexPath, `---\ntitle: ${coll.toUpperCase()}\n---\n`);
                console.log(`Created missing parent node: ${indexPath}`);
            }
        });
    });
}

// 3. Fix config.yml for theme.json
function fixConfig() {
    const configPath = 'src/admin/config.yml';
    if (!fs.existsSync(configPath)) return;
    let config = fs.readFileSync(configPath, 'utf8');
    
    // Add format parsing to JSON so Sveltia stops trying to read it as Markdown
    if (!config.includes('format: "json"')) {
        config = config.replace(
            /(name:\s*"theme"\s*\n\s*label:\s*"Theme Settings")/,
            '\$1\n        extension: "json"\n        format: "json"'
        );
        fs.writeFileSync(configPath, config);
        console.log('Fixed theme.json configuration in config.yml');
    }
}

fixMarkdownPaths(SRC_DIR);
ensureParentNodes();
fixConfig();
console.log('Done! Commit these changes and push to cms-multilanguage.');