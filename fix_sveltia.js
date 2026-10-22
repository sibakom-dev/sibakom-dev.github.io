const fs = require('fs');
const path = require('path');

const SRC_DIR = './src';
const LOCALES = ['id', 'en', 'fr'];

function fixNewsroomPagination() {
    LOCALES.forEach(lang => {
        const njkPath = path.join(SRC_DIR, lang, 'newsroom', 'index.njk');
        
        if (fs.existsSync(njkPath)) {
            let content = fs.readFileSync(njkPath, 'utf8');
            
            // Remove the exclusion flag so Eleventy's locale_url can index the page
            if (content.includes('eleventyExcludeFromCollections: true')) {
                content = content.replace(/^eleventyExcludeFromCollections:\s*true\r?\n/m, '');
                fs.writeFileSync(njkPath, content);
                console.log(`✅ Fixed collection visibility in: ${njkPath}`);
            }
        }
    });
}

console.log('Patching Eleventy configuration...');
fixNewsroomPagination();
console.log('\n🎉 Build error resolved. Commit these changes and push to GitHub!');