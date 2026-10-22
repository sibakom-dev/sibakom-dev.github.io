const fs = require('fs');

['id', 'en', 'fr'].forEach(lang => {
    const file = `./src/${lang}/newsroom/index.njk`;
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        // Remove the exclusion line
        content = content.replace(/eleventyExcludeFromCollections:\s*true\r?\n/, '');
        fs.writeFileSync(file, content);
        console.log(`✅ Fixed ${file}`);
    }
});