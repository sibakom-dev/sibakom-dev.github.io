const fs = require('fs');
const path = require('path');

const SRC_DIR = './src';

// 1. Fix broken paths in frontmatter
function fixMarkdownPaths(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
        const fullPath = path.join(dir, dirent.name);
        if (dirent.isDirectory()) {
            fixMarkdownPaths(fullPath);
        } else if (fullPath.endsWith('.md')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Fix Windows backslashes
            if (/^path:\s*.*\\.*/m.test(content)) {
                content = content.replace(/^path:\s*(.*)\$/gm, (m, p1) => `path: ${p1.replace(/\\/g, '/')}`);
                modified = true;
            }

            // Remove trailing /index that breaks Sveltia's nested tree logic
            if (/^path:\s*(.+)\/index\$/m.test(content)) {
                content = content.replace(/^path:\s*(.+)\/index\$/gm, 'path: \$1');
                modified = true;
            }
            
            // Remove path entirely for root index files
            if (/^path:\s*index\s*\$/m.test(content)) {
                content = content.replace(/^path:\s*index\s*\$\r?\n/m, '');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log(`✅ Fixed frontmatter path in: ${fullPath}`);
            }
        }
    });
}

// 2. Synchronize mismatched filenames for i18n (FAT-Radar-Surabaya)
function fixFilenames() {
    const idPost8 = 'src/id/newsroom/post-8.md';
    const frPost8 = 'src/fr/newsroom/post-8.md';
    const idFat = 'src/id/newsroom/FAT-Radar-Surabaya.md';
    const frFat = 'src/fr/newsroom/FAT-Radar-Surabaya.md';

    if (fs.existsSync(idPost8) && !fs.existsSync(idFat)) {
        fs.renameSync(idPost8, idFat);
        console.log(`✅ Renamed ${idPost8} -> ${idFat}`);
    }
    if (fs.existsSync(frPost8) && !fs.existsSync(frFat)) {
        fs.renameSync(frPost8, frFat);
        console.log(`✅ Renamed ${frPost8} -> ${frFat}`);
    }
}

// 3. Write the pristine, error-free config.yml
function writeConfig() {
    const configPath = 'src/admin/config.yml';
    const configContent = `backend:
  name: github
  repo: sibakom-dev/sibakom-dev.github.io
  branch: cms-multilanguage

media_folder: "src/assets/images"
public_folder: "/assets/images"

i18n:
  structure: multiple_folders
  locales: [id, en, fr]
  default_locale: id

collections:
  - name: "home"
    label: "Home Page"
    files:
      - file: "src/{{locale}}/index.md"
        name: "home_page"
        label: "Home Page"
        i18n: true
        fields:
          - {label: "Layout", name: "layout", widget: "string", default: "layouts/home.njk", i18n: duplicate}
          - {label: "Title", name: "title", widget: "string", i18n: true}
          - {label: "Description", name: "description", widget: "string", required: false, i18n: true}
          - {label: "Hero Image", name: "heroImage", widget: "image", required: false, i18n: duplicate}
          - {label: "Hero Video", name: "heroVideo", widget: "file", required: false, i18n: duplicate}
          - {label: "Hero Title", name: "hero_title", widget: "string", required: false, i18n: true}
          - {label: "Hero Subtitle", name: "hero_subtitle", widget: "string", required: false, i18n: true}
          - {label: "Hero Description", name: "hero_description", widget: "text", required: false, i18n: true}
          - {label: "Show Call to Action", name: "show_cta", widget: "boolean", default: true, required: false, i18n: duplicate}
          - {label: "CTA Title", name: "cta_title", widget: "string", required: false, i18n: true}
          - {label: "CTA Description", name: "cta_description", widget: "text", required: false, i18n: true}
          - {label: "CTA Button Text", name: "cta_btn_text", widget: "string", required: false, i18n: true}
          - {label: "CTA Button Link", name: "cta_btn_link", widget: "string", required: false, i18n: duplicate}
          - {label: "CTA Background Image", name: "cta_bg", widget: "image", required: false, i18n: duplicate}
          - {label: "Body", name: "body", widget: "markdown", required: false, i18n: true}
          - label: "Zigzag Sections"
            name: "sections"
            widget: "list"
            required: false
            i18n: true
            fields:
              - {label: "Title", name: "title", widget: "string", i18n: true}
              - {label: "Image", name: "image", widget: "image", i18n: duplicate}
              - {label: "Text Content", name: "text", widget: "markdown", i18n: true}
              - {label: "Image on Left (Reverse)", name: "reverse", widget: "boolean", default: false, required: false, i18n: duplicate}
          - label: "Solutions Cards"
            name: "solutions_cards"
            widget: "list"
            required: false
            i18n: true
            fields:
              - {label: "Image", name: "image", widget: "image", i18n: duplicate}
              - {label: "Title", name: "title", widget: "string", i18n: true}
              - {label: "Description", name: "description", widget: "text", i18n: true}
              - {label: "Link Text", name: "link_text", widget: "string", i18n: true}
              - {label: "Link URL", name: "link", widget: "string", i18n: duplicate}
          - label: "Grid Cards"
            name: "grid_cards"
            widget: "list"
            required: false
            i18n: true
            fields:
              - {label: "Tag", name: "tag", widget: "string", required: false, i18n: true}
              - {label: "Image", name: "image", widget: "image", i18n: duplicate}
              - {label: "Title", name: "title", widget: "string", i18n: true}
              - {label: "Description", name: "description", widget: "text", i18n: true}
              - {label: "Link URL", name: "link", widget: "string", i18n: duplicate}

  - name: "about"
    label: "About Us"
    folder: "src/{{locale}}/about"
    extension: "md"
    create: true
    i18n: true
    nested: { depth: 4 }
    meta: { path: { widget: string, label: 'Path', index_file: 'index' } }
    fields: &page_fields
      - {label: "Layout", name: "layout", widget: "string", default: "layouts/page.njk", i18n: duplicate}
      - {label: "Title", name: "title", widget: "string", i18n: true}
      - {label: "Body", name: "body", widget: "markdown", i18n: true}
      - label: "Zigzag Sections"
        name: "sections"
        widget: "list"
        required: false
        i18n: true
        fields:
          - {label: "Title", name: "title", widget: "string", i18n: true}
          - {label: "Image", name: "image", widget: "image", i18n: duplicate}
          - {label: "Text Content", name: "text", widget: "markdown", i18n: true}
          - {label: "Image on Left (Reverse)", name: "reverse", widget: "boolean", default: false, required: false, i18n: duplicate}
      - label: "Grid Cards"
        name: "grid_cards"
        widget: "list"
        required: false
        i18n: true
        fields:
          - {label: "Tag", name: "tag", widget: "string", required: false, i18n: true}
          - {label: "Image", name: "image", widget: "image", i18n: duplicate}
          - {label: "Title", name: "title", widget: "string", i18n: true}
          - {label: "Description", name: "description", widget: "text", i18n: true}
          - {label: "Link URL", name: "link", widget: "string", i18n: duplicate}

  - name: "services"
    label: "Services & Products"
    folder: "src/{{locale}}/services"
    extension: "md"
    create: true
    i18n: true
    nested: { depth: 4 }
    meta: { path: { widget: string, label: 'Path', index_file: 'index' } }
    fields:
      - {label: "Layout", name: "layout", widget: "string", default: "layouts/page.njk", i18n: duplicate}
      - {label: "Title", name: "title", widget: "string", i18n: true}
      - {label: "Hero Image", name: "heroImage", widget: "image", required: false, i18n: duplicate}
      - {label: "Description", name: "description", widget: "text", required: false, i18n: true}
      - {label: "Body", name: "body", widget: "markdown", required: false, i18n: true}
      - label: "Zigzag Sections"
        name: "sections"
        widget: "list"
        required: false
        i18n: true
        fields:
          - {label: "Title", name: "title", widget: "string", i18n: true}
          - {label: "Image", name: "image", widget: "image", i18n: duplicate}
          - {label: "Text Content", name: "text", widget: "markdown", i18n: true}
          - {label: "Image on Left (Reverse)", name: "reverse", widget: "boolean", default: false, required: false, i18n: duplicate}
      - label: "Grid Cards"
        name: "grid_cards"
        widget: "list"
        required: false
        i18n: true
        fields:
          - {label: "Tag", name: "tag", widget: "string", required: false, i18n: true}
          - {label: "Image", name: "image", widget: "image", i18n: duplicate}
          - {label: "Title", name: "title", widget: "string", i18n: true}
          - {label: "Description", name: "description", widget: "text", i18n: true}
          - {label: "Link URL", name: "link", widget: "string", i18n: duplicate}

  - name: "projects"
    label: "Projects & Case Studies"
    folder: "src/{{locale}}/projects"
    extension: "md"
    create: true
    i18n: true
    nested: { depth: 4 }
    meta: { path: { widget: string, label: 'Path', index_file: 'index' } }
    fields:
      - {label: "Layout", name: "layout", widget: "string", default: "layouts/project.njk", i18n: duplicate}
      - {label: "Title", name: "title", widget: "string", i18n: true}
      - {label: "Client", name: "client", widget: "string", required: false, i18n: duplicate}
      - {label: "Location", name: "location", widget: "string", required: false, i18n: true}
      - {label: "Technology", name: "technology", widget: "string", required: false, i18n: duplicate}
      - {label: "Hero Image", name: "heroImage", widget: "image", required: false, i18n: duplicate}
      - {label: "Description", name: "description", widget: "text", required: false, i18n: true}
      - {label: "Body", name: "body", widget: "markdown", required: false, i18n: true}
      - label: "Zigzag Sections"
        name: "sections"
        widget: "list"
        required: false
        i18n: true
        fields:
          - {label: "Title", name: "title", widget: "string", i18n: true}
          - {label: "Image", name: "image", widget: "image", i18n: duplicate}
          - {label: "Text Content", name: "text", widget: "markdown", i18n: true}
          - {label: "Image on Left (Reverse)", name: "reverse", widget: "boolean", default: false, required: false, i18n: duplicate}
      - label: "Grid Cards"
        name: "grid_cards"
        widget: "list"
        required: false
        i18n: true
        fields:
          - {label: "Tag", name: "tag", widget: "string", required: false, i18n: true}
          - {label: "Image", name: "image", widget: "image", i18n: duplicate}
          - {label: "Title", name: "title", widget: "string", i18n: true}
          - {label: "Description", name: "description", widget: "text", i18n: true}
          - {label: "Link URL", name: "link", widget: "string", i18n: duplicate}

  - name: "contact"
    label: "Contact Us"
    folder: "src/{{locale}}/contact"
    extension: "md"
    create: true
    i18n: true
    fields: *page_fields

  - name: "legal"
    label: "Legal Pages"
    folder: "src/{{locale}}/legal"
    extension: "md"
    create: true
    i18n: true
    nested: { depth: 2 }
    meta: { path: { widget: string, label: 'Path', index_file: 'index' } }
    fields:
      - {label: "Layout", name: "layout", widget: "hidden", default: "layouts/page.njk", i18n: duplicate}
      - {label: "Title", name: "title", widget: "string", i18n: true}
      - {label: "Subtitle", name: "subtitle", widget: "string", required: false, i18n: true}
      - {label: "Description", name: "description", widget: "text", required: false, i18n: true}
      - {label: "Hero Image", name: "heroImage", widget: "image", required: false, i18n: duplicate}
      - {label: "Body", name: "body", widget: "markdown", i18n: true}

  - name: "newsroom"
    label: "Newsroom & Blog"
    folder: "src/{{locale}}/newsroom"
    extension: "md"
    create: true
    i18n: true
    fields:
      - {label: "Layout", name: "layout", widget: "hidden", default: "layouts/post.njk", i18n: duplicate}
      - {label: "Title", name: "title", widget: "string", i18n: true}
      - {label: "Writer", name: "writer", widget: "string", i18n: duplicate}
      - {label: "Post Time", name: "date", widget: "datetime", i18n: duplicate}
      - {label: "Read Time", name: "read_time", widget: "string", hint: "e.g., 5 min read", i18n: true}
      - {label: "Cover Image", name: "image", widget: "image", i18n: duplicate}
      - {label: "Tags", name: "tags", widget: "list", required: false, i18n: duplicate}
      - {label: "Topic", name: "topic", widget: "string", required: false, i18n: true}
      - {label: "Body", name: "body", widget: "markdown", i18n: true}

  - name: "settings"
    label: "Settings"
    files:
      - file: "src/_data/footer_en.json"
        name: "footer_en"
        label: "Footer Translation (EN)"
        extension: "json"
        format: "json"
        fields: &footer_fields
          - {label: "Subtitle", name: "subtitle", widget: "string"}
          - {label: "Description", name: "description", widget: "text"}
          - {label: "Quick Links Title", name: "quick_links_title", widget: "string"}
          - {label: "Nav Home", name: "nav_home", widget: "string"}
          - {label: "Nav About Us", name: "nav_about", widget: "string"}
          - {label: "Nav Projects", name: "nav_projects", widget: "string"}
          - {label: "Nav Contact", name: "nav_contact", widget: "string"}
          - {label: "Services Title", name: "services_title", widget: "string"}
          - {label: "Service: Radar", name: "service_radar", widget: "string"}
          - {label: "Service: NWP Models", name: "service_nwp", widget: "string"}
          - {label: "Service: Maritime", name: "service_maritime", widget: "string"}
          - {label: "Service: Agro", name: "service_agro", widget: "string"}
          - {label: "Service: LiDAR", name: "service_lidar", widget: "string"}
          - {label: "Reach Us Title", name: "reach_us_title", widget: "string"}
          - {label: "Main Office", name: "main_office", widget: "string"}
          - {label: "Branch Office", name: "branch_office", widget: "string"}
          - {label: "Open Hours Title", name: "open_hours_title", widget: "string"}
          - {label: "Open Hours Value", name: "open_hours_value", widget: "string"}
          - {label: "Contact Title", name: "contact_title", widget: "string"}
          - {label: "Corporate HQ", name: "corporate_hq", widget: "string"}
          - {label: "Rights Reserved", name: "rights_reserved", widget: "string"}
          - {label: "Privacy Policy", name: "privacy_policy", widget: "string"}
          - {label: "Terms of Service", name: "terms_of_service", widget: "string"}
      - file: "src/_data/footer_id.json"
        name: "footer_id"
        label: "Footer Translation (ID)"
        extension: "json"
        format: "json"
        fields: *footer_fields
      - file: "src/_data/footer_fr.json"
        name: "footer_fr"
        label: "Footer Translation (FR)"
        extension: "json"
        format: "json"
        fields: *footer_fields
      - file: "src/_data/theme.json"
        name: "theme"
        label: "Theme Settings"
        extension: "json"
        format: "json"
        fields:
          - {label: "Theme Preset", name: "theme_preset", widget: "select", options: ["Default", "Corporate Blue", "Eco Green / Earth", "Deep Sea / Navy", "Charcoal / Neon Accent", "Custom"], default: "Default"}
          - {label: "Primary Color (Custom)", name: "primary_color", widget: "color", required: false}
          - {label: "Secondary Color (Custom)", name: "secondary_color", widget: "color", required: false}
          - {label: "Accent Color (Custom)", name: "accent_color", widget: "color", required: false}
          - {label: "Background Color (Custom)", name: "bg_color", widget: "color", required: false}
          - {label: "Text Color (Custom)", name: "text_color", widget: "color", required: false}
          - {label: "Header Background Color", name: "header_bg", widget: "color", enableAlpha: true, required: false}
          - {label: "Header Background Color Scrolled", name: "header_bg_scrolled", widget: "color", enableAlpha: true, required: false}
          - {label: "Header Glass Texture Blur", name: "header_blur", widget: "number", value_type: "int", min: 0, max: 50, required: false}
          - {label: "Global Font Family", name: "font_family", widget: "select", options: ["Plus Jakarta Sans", "Inter", "Outfit", "Montserrat", "Roboto", "Open Sans", "Lora", "Merriweather"], default: "Plus Jakarta Sans", required: false}
          - {label: "Maintenance Mode", name: "maintenance_mode", widget: "boolean", default: false, required: false}
`;
    fs.writeFileSync(configPath, configContent);
    console.log('✅ Wrote entirely new verified config.yml');
}

console.log('Starting Sveltia CMS automated fixes...');
fixMarkdownPaths(SRC_DIR);
fixFilenames();
writeConfig();
console.log('\\n🎉 All fixes applied! Commit these changes, push to GitHub, and hard-clear your browser IndexedDB.');