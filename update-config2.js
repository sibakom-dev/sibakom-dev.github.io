const fs = require('fs');

const configPath = 'src/admin/config.yml';
let content = fs.readFileSync(configPath, 'utf8');

const fieldsToInsert = `      - {label: "Permalink", name: "permalink", widget: "hidden", required: false}
      - {label: "Subtitle", name: "subtitle", widget: "string", required: false}
      - {label: "Description", name: "description", widget: "string", required: false}
      - {label: "Hero Image", name: "heroImage", widget: "image", required: false}`;

const searchRegex = /( {6}- \{label: "Layout", name: "layout", widget: "string", default: "layouts\/page\.njk"\}\r?\n {6}- \{label: "Title", name: "title", widget: "string"\})/g;

const replacement = `$1\n${fieldsToInsert}`;

content = content.replace(searchRegex, replacement);

fs.writeFileSync(configPath, content);
console.log('Updated config.yml');
