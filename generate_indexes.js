const fs = require('fs');
const path = require('path');

const templates = [
    {
        lang: 'en',
        title: 'Newsroom',
        subtitle: 'Latest Updates & Insights',
        readMore: 'Read More',
        collection: 'newsroom_en',
        urlPrefix: 'en/newsroom/'
    },
    {
        lang: 'id',
        title: 'Ruang Berita',
        subtitle: 'Pembaruan & Wawasan Terbaru',
        readMore: 'Baca Selengkapnya',
        collection: 'newsroom_id',
        urlPrefix: 'id/newsroom/'
    },
    {
        lang: 'fr',
        title: 'Salle de Presse',
        subtitle: 'Dernières Mises à Jour & Aperçus',
        readMore: 'Lire la Suite',
        collection: 'newsroom_fr',
        urlPrefix: 'fr/newsroom/'
    }
];

templates.forEach(t => {
    const dir = path.join(__dirname, 'src', t.lang, 'newsroom');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const content = `---
layout: layouts/page.njk
title: "${t.title}"
subtitle: "${t.subtitle}"
pagination:
  data: collections.${t.collection}
  size: 9
  alias: posts
  reverse: true
permalink: "${t.urlPrefix}{% if pagination.pageNumber > 0 %}{{ pagination.pageNumber + 1 }}/{% endif %}index.html"
---

<div class="grid grid-3 gap-md" style="margin-top: var(--spacing-xl);">
  {% for post in posts %}
  <div class="project-card">
    <div class="project-img-wrapper" style="height: 200px;">
      {% if post.data.topic %}<span class="project-tag">{{ post.data.topic }}</span>{% endif %}
      <img src="{{ post.data.image }}" alt="{{ post.data.title }}" class="project-img" style="object-fit: cover; height: 100%; width: 100%;">
    </div>
    <div class="project-content">
      <h3 class="project-title" style="font-size: var(--fs-lg); margin-bottom: var(--spacing-xs);">{{ post.data.title }}</h3>
      <div style="font-size: var(--fs-sm); color: var(--color-border-hover); margin-bottom: var(--spacing-sm);">
        {% if post.data.date %}{{ post.data.date | date_format }}{% endif %}
        {% if post.data.read_time %} &bull; {{ post.data.read_time }}{% endif %}
      </div>
      <p class="project-desc">{{ post.data.description | default("Read our latest news and updates.") }}</p>
      <a href="{{ post.url }}" class="project-link">
        ${t.readMore}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </a>
    </div>
  </div>
  {% endfor %}
</div>

{% if pagination.hrefs.length > 1 %}
<nav class="pagination" style="display: flex; justify-content: center; gap: var(--spacing-sm); margin-top: var(--spacing-xl);">
  {% if pagination.href.previous %}
    <a href="{{ pagination.href.previous }}" class="btn btn-outline" style="padding: 8px 16px;">&laquo;</a>
  {% endif %}
  
  {% for pageEntry in pagination.pages %}
    <a href="{{ pagination.hrefs[ loop.index0 ] }}" class="btn {% if page.url == pagination.hrefs[ loop.index0 ] %}btn-primary{% else %}btn-outline{% endif %}" style="padding: 8px 16px;">
      {{ loop.index }}
    </a>
  {% endfor %}
  
  {% if pagination.href.next %}
    <a href="{{ pagination.href.next }}" class="btn btn-outline" style="padding: 8px 16px;">&raquo;</a>
  {% endif %}
</nav>
{% endif %}
`;
    fs.writeFileSync(path.join(dir, 'index.njk'), content);
});

console.log('Successfully generated index pages.');
