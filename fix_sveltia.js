const fs = require('fs');
const path = require('path');

const SRC_DIR = './src';
const LOCALES = ['id', 'en', 'fr'];

function fixNewsroom() {
    LOCALES.forEach(lang => {
        const newsDir = path.join(SRC_DIR, lang, 'newsroom');
        if (!fs.existsSync(newsDir)) return;

        // 1. Delete the bogus index.md (Eleventy uses index.njk here)
        const bogusIndex = path.join(newsDir, 'index.md');
        if (fs.existsSync(bogusIndex)) {
            fs.unlinkSync(bogusIndex);
            console.log(`🗑️ Deleted bogus index file: ${bogusIndex}`);
        }

        // 2. Inject layout field into all newsroom posts
        const files = fs.readdirSync(newsDir);
        files.forEach(file => {
            if (file.endsWith('.md')) {
                const filePath = path.join(newsDir, file);
                let content = fs.readFileSync(filePath, 'utf8');

                // Check if layout is missing
                if (!/^layout:/m.test(content)) {
                    // Inject layout immediately after the opening ---
                    content = content.replace(/^---\r?\n/, '---\nlayout: layouts/post.njk\n');
                    fs.writeFileSync(filePath, content);
                    console.log(`✅ Injected layout filter into: ${filePath}`);
                }
            }
        });
    });
}

// 3. Fix the JSON errors in the console
function fixJsonConfig() {
    const configPath = path.join(SRC_DIR, 'admin', 'config.yml');
    if (!fs.existsSync(configPath)) return;
    
    let config = fs.readFileSync(configPath, 'utf8');
    let modified = false;

    // Sveltia assumes everything is Markdown unless told it's JSON
    const jsonFiles = ['theme.json', 'footer_en.json', 'footer_id.json', 'footer_fr.json'];
    jsonFiles.forEach(fileName => {
        const regex = new RegExp(`(file:\\s*"src/_data/${fileName}"[\\s\\S]*?label:\\s*"[^"]+")\\n(?!\\s*extension:\\s*"json")`, 'g');
        if (regex.test(config)) {
            config = config.replace(regex, '\$1\n        extension: "json"\n        format: "json"\n');
            modified = true;
        }
    });

    if (modified) {
        fs.writeFileSync(configPath, config);
        console.log('✅ Added JSON format mappings to config.yml');
    }
}

console.log('Starting Newsroom Fix...');
fixNewsroom();
fixJsonConfig();
console.log('\n🎉 Done! Commit these changes, push to GitHub, and the Newsroom will fully populate.');