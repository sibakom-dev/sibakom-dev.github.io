const fs = require('fs');
const path = 'src/admin/config.yml';
let content = fs.readFileSync(path, 'utf8');

const settingsCollection = `
  - name: "settings"
    label: "Settings"
    files:
      - file: "src/_data/footer_en.json"
        name: "footer_en"
        label: "Footer Translation (EN)"
        fields:
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
        fields:
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
      - file: "src/_data/footer_fr.json"
        name: "footer_fr"
        label: "Footer Translation (FR)"
        fields:
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
`;

if (!content.includes('name: "settings"')) {
    fs.writeFileSync(path, content + settingsCollection);
    console.log('Appended Settings collection to config.yml');
} else {
    console.log('Settings collection already exists.');
}
