const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const configPath = path.join(__dirname, 'src/admin/config.yml');

// 1. Update config.yml
let configContent = fs.readFileSync(configPath, 'utf8');

const fieldAddition = `
      - label: "Zigzag Sections"
        name: "sections"
        widget: "list"
        required: false
        fields:
          - {label: "Title", name: "title", widget: "string"}
          - {label: "Image", name: "image", widget: "image"}
          - {label: "Text Content", name: "text", widget: "markdown"}
          - {label: "Image on Left (Reverse)", name: "reverse", widget: "boolean", default: false, required: false}`;

// Replace exactly to align properly
configContent = configContent.replace(/      - \{label: "Body", name: "body", widget: "markdown"\}/g, 
    '      - {label: "Body", name: "body", widget: "markdown"}' + fieldAddition);

// Update for home pages (with required: false)
// We might not need sections on the home page, but let's add it anyway to be safe.
configContent = configContent.replace(/          - \{label: "Body", name: "body", widget: "markdown", required: false\}/g, 
    '          - {label: "Body", name: "body", widget: "markdown", required: false}' + fieldAddition.replace(/\n      /g, '\n        '));

fs.writeFileSync(configPath, configContent);
console.log("Updated config.yml");

// 2. Migrate Markdown Files
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
let migratedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Only process files with zigzag sections
    if (!content.includes('class="zigzag-section')) return;

    // Split frontmatter and body
    const parts = content.split('---');
    if (parts.length < 3) return;

    let frontmatter = parts[1];
    let body = parts.slice(2).join('---');

    let sections = [];
    
    // Extract sections using regex
    // We match the whole zigzag-section block
    const zigzagRegex = /<div class="zigzag-section[^>]*?(reverse)?[^>]*?>\s*<div class="zigzag-text">\s*<h3>(.*?)<\/h3>(.*?)<\/div>\s*<div class="zigzag-image">\s*<img src="(.*?)"[^>]*?>\s*<\/div>\s*<\/div>/gsi;
    
    let match;
    while ((match = zigzagRegex.exec(body)) !== null) {
        const isReverse = !!match[1];
        const title = match[2].trim();
        const text = match[3].trim();
        const image = match[4].trim();
        
        sections.push({
            title,
            image,
            reverse: isReverse,
            text
        });
    }

    // Remove the extracted zigzag sections and HTML comments from body
    body = body.replace(zigzagRegex, '');
    body = body.replace(/<!-- Feature \d+ -->/g, '');
    body = body.replace(/^\s*[\r\n]/gm, ''); // Clean up empty lines

    // Build YAML for sections
    if (sections.length > 0) {
        let yamlSections = '\nsections:';
        sections.forEach(sec => {
            yamlSections += `\n  - title: "${sec.title.replace(/"/g, '\\"')}"`;
            yamlSections += `\n    image: "${sec.image}"`;
            if (sec.reverse) {
                yamlSections += `\n    reverse: true`;
            }
            // Add block scalar for text (handling newlines)
            const indentedText = sec.text.split('\n').map(line => '      ' + line).join('\n');
            yamlSections += `\n    text: |\n${indentedText}`;
        });
        
        // Append sections to frontmatter
        frontmatter = frontmatter.trim() + yamlSections + '\n';
        
        const newContent = `---\n${frontmatter}---\n\n${body.trim()}\n`;
        fs.writeFileSync(file, newContent);
        migratedCount++;
        console.log(`Migrated: ${file}`);
    }
});

console.log(`Migration complete! Migrated ${migratedCount} files.`);
