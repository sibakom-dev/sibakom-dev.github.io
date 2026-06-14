import os

locales = ['en', 'id', 'fr']
pages = [
    {'slug': 'specialization', 'title': 'Specialization'},
    {'slug': 'strategic-partners', 'title': 'Strategic Partner'}
]

for lang in locales:
    for page in pages:
        dir_path = os.path.join('src', lang, 'about')
        os.makedirs(dir_path, exist_ok=True)
        file_path = os.path.join(dir_path, page['slug'] + '.md')
        
        content = f"""---
layout: layouts/about.njk
title: {page['title']}
description: Learn more about our {page['title'].lower()}.
---

## {page['title']}
Write your {page['title'].lower()} content here using the new editorial layout.
"""
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

print('Created markdown files.')
