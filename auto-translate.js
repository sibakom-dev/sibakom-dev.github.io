const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
let translate = require('translate');
if (typeof translate !== 'function') translate = translate.default;

translate.engine = 'google'; // use google translation engine (free tier via web api)

const srcEn = path.join(__dirname, 'src', 'en');
const srcId = path.join(__dirname, 'src', 'id');
const srcFr = path.join(__dirname, 'src', 'fr');

// Sleep function for rate limits
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function translateText(text, lang) {
    if (!text || typeof text !== 'string') return text;
    // Don't translate paths or exact filenames
    if (text.startsWith('/') || text.includes('.jpg') || text.includes('.png')) return text;

    let retries = 3;
    while (retries > 0) {
        try {
            await sleep(500); // 500ms delay between requests to avoid rate limit
            const result = await translate(text, { to: lang, from: 'en' });
            return result;
        } catch (e) {
            retries--;
            console.error(`Translation error for "${text.substring(0, 20)}...", retrying... (${retries} left)`);
            await sleep(2000);
            if (retries === 0) {
                console.error("Translation failed, returning original text:", e.message);
                return text;
            }
        }
    }
}

async function processFile(filePath, destDir, targetLang) {
    const relativePath = path.relative(srcEn, filePath);
    const destPath = path.join(destDir, relativePath);

    // Ensure destination directory exists
    const destDirPath = path.dirname(destPath);
    if (!fs.existsSync(destDirPath)) {
        fs.mkdirSync(destDirPath, { recursive: true });
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(fileContent);

    console.log(`Translating [${targetLang}]: ${relativePath}`);

    // Translate frontmatter fields
    const fieldsToTranslate = ['title', 'description', 'hero_title', 'hero_subtitle', 'hero_description'];
    for (const field of fieldsToTranslate) {
        if (parsed.data[field]) {
            parsed.data[field] = await translateText(parsed.data[field], targetLang);
        }
    }

    // Translate sections
    if (parsed.data.sections && Array.isArray(parsed.data.sections)) {
        for (let i = 0; i < parsed.data.sections.length; i++) {
            if (parsed.data.sections[i].title) {
                parsed.data.sections[i].title = await translateText(parsed.data.sections[i].title, targetLang);
            }
            if (parsed.data.sections[i].text) {
                parsed.data.sections[i].text = await translateText(parsed.data.sections[i].text, targetLang);
            }
        }
    }

    // Translate body
    let newContent = parsed.content;
    if (newContent.trim().length > 0) {
        // Simple heuristic: just split by paragraphs and translate to keep some structure,
        // or just translate the whole body if it's small. Let's do the whole body.
        // The API might strip some HTML but we will try.
        newContent = await translateText(newContent, targetLang);
    }

    // Reconstruct the file
    const newFileContent = matter.stringify(newContent, parsed.data);
    fs.writeFileSync(destPath, newFileContent, 'utf-8');
}

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else if (fullPath.endsWith('.md')) {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

async function run() {
    console.log("Starting translation process...");
    const files = getAllFiles(srcEn);
    console.log(`Found ${files.length} markdown files to translate.`);

    for (const file of files) {
        // Translate to ID
        await processFile(file, srcId, 'id');
        // Translate to FR
        await processFile(file, srcFr, 'fr');
    }
    console.log("Translation complete!");
}

run().catch(console.error);
