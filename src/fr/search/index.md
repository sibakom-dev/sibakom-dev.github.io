---
layout: layouts/page.njk
title: Search
description: Search the SIBAKOM website
heroImage: /assets/images/pages/project-management.jpg
---

<div style="max-width: 800px; margin: 0 auto; padding-top: var(--spacing-md);">
<div style="position: relative; margin-bottom: var(--spacing-lg);">
<input type="text" id="search-input" placeholder="What are you looking for?" 
style="width: 100%; padding: 20px 24px; padding-left: 60px; font-size: var(--fs-lg); font-family: var(--font-body); border: 2px solid var(--color-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); outline: none; transition: border-color 0.3s;">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%);"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
</div>

<div id="search-results" style="display: flex; flex-direction: column; gap: var(--spacing-md);">
<p style="color: var(--color-text-muted); text-align: center; padding: 40px;">Type a keyword above to search across our services, projects, and capabilities.</p>
</div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
const input = document.getElementById('search-input');
const resultsContainer = document.getElementById('search-results');
let searchIndex = [];

// Fetch the index
fetch('/search.json')
.then(res => res.json())
.then(data => {
searchIndex = data;
input.focus();
})
.catch(err => {
console.error("Could not load search index", err);
resultsContainer.innerHTML = '<p style="color: red; text-align: center;">Error loading search functionality.</p>';
});

input.addEventListener('input', (e) => {
const query = e.target.value.toLowerCase().trim();

if (query.length < 2) {
resultsContainer.innerHTML = '<p style="color: var(--color-text-muted); text-align: center; padding: 40px;">Type a keyword above to search across our services, projects, and capabilities.</p>';
return;
}

const results = searchIndex.filter(page => {
if (!page.url || page.url === '/search/') return false;
return page.title.toLowerCase().includes(query) || page.content.toLowerCase().includes(query);
});

if (results.length === 0) {
resultsContainer.innerHTML = '<p style="text-align: center; padding: 40px;">No results found for "**' + query + '**".</p>';
return;
}

let html = '';
results.forEach(result => {
// Find a snippet of the content
const contentLower = result.content.toLowerCase();
const matchIndex = contentLower.indexOf(query);
let snippet = '';
if (matchIndex !== -1) {
const start = Math.max(0, matchIndex - 60);
const end = Math.min(result.content.length, matchIndex + 60);
snippet = (start > 0 ? '...' : '') + result.content.substring(start, end) + (end < result.content.length ? '...' : '');
// Highlight the query
const regex = new RegExp(query, 'gi');
snippet = snippet.replace(regex, match => '<span style="background-color: rgba(255, 255, 0, 0.4); font-weight: bold;">' + match + '</span>');
} else {
snippet = result.content.substring(0, 120) + '...';
}

html += '<a href="' + result.url + '" style="display: block; padding: 24px; border: 1px solid var(--color-border); border-radius: var(--radius-md); text-decoration: none; background: var(--color-surface); box-shadow: var(--shadow-sm); transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform=\'translateY(-2px)\'; this.style.boxShadow=\'var(--shadow-md)\';" onmouseout="this.style.transform=\'none\'; this.style.boxShadow=\'var(--shadow-sm)\';">' +
'<h3 style="color: var(--color-primary); margin-bottom: 8px; font-size: 1.25rem;">' + result.title + '</h3>' +
'<p style="color: var(--color-text); font-size: 0.9rem; line-height: 1.5; margin-bottom: 8px;">' + snippet + '</p>' +
'<span style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">' + result.url + '</span>' +
'</a>';
});

resultsContainer.innerHTML = html;
});

// Add focus style manually since inline styles are tricky with pseudoclasses
input.addEventListener('focus', () => {
input.style.borderColor = 'var(--color-primary)';
input.style.boxShadow = '0 0 0 3px rgba(43, 95, 167, 0.15)';
});
input.addEventListener('blur', () => {
input.style.borderColor = 'var(--color-border)';
input.style.boxShadow = 'var(--shadow-sm)';
});
});
</script>
