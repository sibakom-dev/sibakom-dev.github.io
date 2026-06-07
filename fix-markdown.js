const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.md')) results.push(file);
        }
    });
    return results;
}

const files = walk(srcDir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Split into frontmatter and body
    const parts = content.split('---');
    if (parts.length >= 3) {
        let frontmatter = parts[1];
        let body = parts.slice(2).join('---');
        
        // 1. Remove indentation (code blocks)
        // Split by line and trim start, but preserve empty lines
        let lines = body.split('\n').map(line => line.trimStart());
        body = lines.join('\n');
        
        // 2. Convert basic HTML to Markdown
        body = body.replace(/<p>(.*?)<\/p>/gsi, '$1\n\n');
        body = body.replace(/<ul>/gi, '\n');
        body = body.replace(/<\/ul>/gi, '\n');
        body = body.replace(/<li>(.*?)<\/li>/gsi, '- $1\n');
        body = body.replace(/<strong>(.*?)<\/strong>/gsi, '**$1**');
        
        // Clean up excessive newlines
        body = body.replace(/\n{3,}/g, '\n\n');
        body = body.trim();
        
        const newContent = `---\n${frontmatter.trim()}\n---\n\n${body}\n`;
        fs.writeFileSync(file, newContent);
    }
});

console.log("Markdown cleanup complete.");
