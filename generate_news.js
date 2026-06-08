const fs = require('fs');
const path = require('path');

const languages = ['en', 'id', 'fr'];
const postsPerLang = 8;
const dummyImage = '/assets/images/pages/weather-broadcast.jpg'; // just an existing image

languages.forEach(lang => {
    const dir = path.join(__dirname, 'src', lang, 'newsroom');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    for (let i = 1; i <= postsPerLang; i++) {
        const title = `Sample Newsroom Post ${i} (${lang.toUpperCase()})`;
        const filename = `post-${i}.md`;
        const date = new Date(Date.now() - i * 86400000).toISOString();
        
        const content = `---
title: "${title}"
writer: "Sibakom Team"
date: ${date}
read_time: "5 min read"
image: "${dummyImage}"
tags:
  - "weather"
  - "technology"
topic: "Company News"
---

This is the content for ${title}. You can edit this directly in the Sveltia CMS.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;
        fs.writeFileSync(path.join(dir, filename), content);
    }
});

console.log('Successfully generated template posts.');
