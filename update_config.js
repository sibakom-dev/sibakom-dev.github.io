const fs = require('fs');

const path = 'src/admin/config.yml';
let content = fs.readFileSync(path, 'utf8');

// The field we want to add
const homeReplacement = `              - {label: "Image on Left (Reverse)", name: "reverse", widget: "boolean", default: false, required: false}
          - label: "Grid Cards (e.g. Services/Projects)"
            name: "grid_cards"
            widget: "list"
            required: false
            fields:
              - {label: "Tag", name: "tag", widget: "string", required: false}
              - {label: "Image", name: "image", widget: "image"}
              - {label: "Title", name: "title", widget: "string"}
              - {label: "Description", name: "description", widget: "text"}
              - {label: "Link URL", name: "link", widget: "string"}`;

const pageReplacement = `          - {label: "Image on Left (Reverse)", name: "reverse", widget: "boolean", default: false, required: false}
      - label: "Grid Cards (e.g. Services/Projects)"
        name: "grid_cards"
        widget: "list"
        required: false
        fields:
          - {label: "Tag", name: "tag", widget: "string", required: false}
          - {label: "Image", name: "image", widget: "image"}
          - {label: "Title", name: "title", widget: "string"}
          - {label: "Description", name: "description", widget: "text"}
          - {label: "Link URL", name: "link", widget: "string"}`;

// We will do a simple string replace for both indentation levels.
// First, replace the home page indendation level:
content = content.replaceAll(
    '              - {label: "Image on Left (Reverse)", name: "reverse", widget: "boolean", default: false, required: false}',
    homeReplacement
);

// Then, the replaceAll above replaced it with itself + the new content.
// Now, we need to find the 10-space indentation level, but be careful not to match the ones we just replaced.
// Actually, it's easier to just match the specific lines.
content = fs.readFileSync(path, 'utf8'); // reset

const lines = content.split('\n');
const newLines = [];
for (let i = 0; i < lines.length; i++) {
    newLines.push(lines[i]);
    if (lines[i].includes('- {label: "Image on Left (Reverse)", name: "reverse", widget: "boolean", default: false, required: false}')) {
        // determine indentation of this line
        const match = lines[i].match(/^(\s+)- {/);
        if (match) {
            const indent = match[1]; // either 14 spaces or 10 spaces
            const outerIndent = indent.substring(0, indent.length - 4); // minus 4 spaces
            
            newLines.push(`${outerIndent}- label: "Grid Cards (e.g. Services/Projects)"`);
            newLines.push(`${outerIndent}  name: "grid_cards"`);
            newLines.push(`${outerIndent}  widget: "list"`);
            newLines.push(`${outerIndent}  required: false`);
            newLines.push(`${outerIndent}  fields:`);
            newLines.push(`${indent}- {label: "Tag", name: "tag", widget: "string", required: false}`);
            newLines.push(`${indent}- {label: "Image", name: "image", widget: "image"}`);
            newLines.push(`${indent}- {label: "Title", name: "title", widget: "string"}`);
            newLines.push(`${indent}- {label: "Description", name: "description", widget: "text"}`);
            newLines.push(`${indent}- {label: "Link URL", name: "link", widget: "string"}`);
        }
    }
}

fs.writeFileSync(path, newLines.join('\n'));
console.log('Updated config.yml');
