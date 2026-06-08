const fs = require('fs');
const files = [
    'src/en/services/index.md',
    'src/id/services/index.md',
    'src/fr/services/index.md'
];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replaceAll('\\n', '\n');
    fs.writeFileSync(file, content);
}
