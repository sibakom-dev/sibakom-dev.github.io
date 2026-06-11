const fs = require('fs');

const configPath = 'src/admin/config.yml';
let content = fs.readFileSync(configPath, 'utf8');

const fieldsToInsert = `      - {label: "Permalink", name: "permalink", widget: "hidden", required: false}
      - {label: "Subtitle", name: "subtitle", widget: "string", required: false}
      - {label: "Description", name: "description", widget: "string", required: false}
      - {label: "Hero Image", name: "heroImage", widget: "image", required: false}`;

// Replace all occurrences of:
//       - {label: "Title", name: "title", widget: "string"}
// With that plus the new fields, EXCEPT in the 'home' collection which has a different structure.
// Wait, the home collection also has:
//           - {label: "Title", name: "title", widget: "string"}
// Let's replace ONLY when the preceding line is:
//       - {label: "Layout", name: "layout", widget: "string", default: "layouts/page.njk"}

const searchRegex = /( {6}- \{label: "Layout", name: "layout", widget: "string", default: "layouts\/page\.njk"\}\n {6}- \{label: "Title", name: "title", widget: "string"\})/g;

const replacement = `$1\n${fieldsToInsert}`;

content = content.replace(searchRegex, replacement);

// What about newsroom? Newsroom uses layouts/post.njk or layouts/page.njk?
// Let's check newsroom.
fs.writeFileSync(configPath, content);
console.log('Updated config.yml');
