const fs = require('fs');
const path = require('path');

// Ensure _data directory exists
const dataDir = path.join(__dirname, 'src', '_data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// English Data
const footerEn = {
    subtitle: "System Integrator for Environmental Solutions.",
    description: "Providing precision meteorological, maritime, and infrastructural technology across Indonesia.",
    quick_links_title: "Quick Links",
    nav_home: "Home",
    nav_about: "About Us",
    nav_projects: "Project Profile",
    nav_contact: "Contact Us",
    services_title: "Services & Products",
    service_radar: "Weather Radar",
    service_nwp: "Custom NWP<br>Models",
    service_maritime: "Maritime Meteorology",
    service_agro: "Agrometeorology",
    service_lidar: "3D LiDAR Systems",
    reach_us_title: "Reach Us",
    main_office: "Main Office",
    branch_office: "Branch Office",
    open_hours_title: "Open Hours",
    open_hours_value: "Mon-Fri 10:00 - 17:00",
    contact_title: "Contact",
    corporate_hq: "Corporate<br>Headquarters",
    rights_reserved: "All rights reserved.",
    privacy_policy: "Privacy Policy",
    terms_of_service: "Terms of Service"
};

// Indonesian Data (with initial translations)
const footerId = {
    subtitle: "Sistem Integrator untuk Solusi Lingkungan.",
    description: "Menyediakan teknologi presisi di bidang meteorologi, maritim, dan infrastruktur di seluruh Indonesia.",
    quick_links_title: "Tautan Cepat",
    nav_home: "Beranda",
    nav_about: "Tentang Kami",
    nav_projects: "Profil Proyek",
    nav_contact: "Hubungi Kami",
    services_title: "Layanan & Produk",
    service_radar: "Radar Cuaca",
    service_nwp: "Model NWP<br>Kustom",
    service_maritime: "Meteorologi Maritim",
    service_agro: "Agrometeorologi",
    service_lidar: "Sistem LiDAR 3D",
    reach_us_title: "Lokasi Kami",
    main_office: "Kantor Utama",
    branch_office: "Kantor Cabang",
    open_hours_title: "Jam Operasional",
    open_hours_value: "Sen-Jum 10:00 - 17:00",
    contact_title: "Kontak",
    corporate_hq: "Kantor<br>Pusat",
    rights_reserved: "Hak Cipta Dilindungi.",
    privacy_policy: "Kebijakan Privasi",
    terms_of_service: "Syarat & Ketentuan"
};

// French Data (with initial translations)
const footerFr = {
    subtitle: "Intégrateur de Systèmes pour les Solutions Environnementales.",
    description: "Fourniture de technologies météorologiques, maritimes et d'infrastructure de précision à travers l'Indonésie.",
    quick_links_title: "Liens Rapides",
    nav_home: "Accueil",
    nav_about: "À Propos",
    nav_projects: "Profil du Projet",
    nav_contact: "Nous Contacter",
    services_title: "Services & Produits",
    service_radar: "Radar Météorologique",
    service_nwp: "Modèles NWP<br>Personnalisés",
    service_maritime: "Météorologie Maritime",
    service_agro: "Agrométéorologie",
    service_lidar: "Systèmes LiDAR 3D",
    reach_us_title: "Où Nous Trouver",
    main_office: "Bureau Principal",
    branch_office: "Bureau Régional",
    open_hours_title: "Heures d'Ouverture",
    open_hours_value: "Lun-Ven 10:00 - 17:00",
    contact_title: "Contact",
    corporate_hq: "Siège<br>Social",
    rights_reserved: "Tous droits réservés.",
    privacy_policy: "Politique de Confidentialité",
    terms_of_service: "Conditions de Service"
};

fs.writeFileSync(path.join(dataDir, 'footer_en.json'), JSON.stringify(footerEn, null, 2));
fs.writeFileSync(path.join(dataDir, 'footer_id.json'), JSON.stringify(footerId, null, 2));
fs.writeFileSync(path.join(dataDir, 'footer_fr.json'), JSON.stringify(footerFr, null, 2));
console.log('Created _data/footer_*.json');
