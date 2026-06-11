const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.md')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = content.replace(/^path:\s*([^\r\n]+)/gm, (match, p1) => {
                return 'path: ' + p1.replace(/\\/g, '/');
            });
            if (content !== updated) {
                fs.writeFileSync(fullPath, updated, 'utf8');
                console.log('Fixed:', fullPath);
            }
        }
    }
}
processDir('src');
