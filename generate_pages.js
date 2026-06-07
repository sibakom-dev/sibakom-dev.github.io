const fs = require('fs');
const path = require('path');

const pages = [
    // About
    { path: 'src/about/index.njk', title: 'About Us', layout: 'layouts/page.njk', subtitle: 'Corporate Profile' },
    { path: 'src/about/system-integrator/index.njk', title: 'System Integrator', layout: 'layouts/page.njk' },
    { path: 'src/about/core-capabilities/index.njk', title: 'Core Capabilities', layout: 'layouts/page.njk' },
    { path: 'src/about/core-capabilities/design-selection/index.njk', title: 'Design & Selection', layout: 'layouts/page.njk' },
    { path: 'src/about/core-capabilities/equipment-integration/index.njk', title: 'Equipment Integration', layout: 'layouts/page.njk' },
    { path: 'src/about/core-capabilities/maintenance-services/index.njk', title: 'Maintenance Services', layout: 'layouts/page.njk' },
    { path: 'src/about/core-capabilities/system-upgrades/index.njk', title: 'System Upgrades', layout: 'layouts/page.njk' },
    { path: 'src/about/specializations/index.njk', title: 'Specializations', layout: 'layouts/page.njk' },
    { path: 'src/about/specializations/marine-meteorology/index.njk', title: 'Marine Meteorology', layout: 'layouts/page.njk' },
    { path: 'src/about/specializations/climatology-observation/index.njk', title: 'Climatology Observation', layout: 'layouts/page.njk' },
    { path: 'src/about/strategic-partnerships/index.njk', title: 'Strategic Partnerships', layout: 'layouts/page.njk' },
    // Services
    { path: 'src/services/index.njk', title: 'Services & Products', layout: 'layouts/page.njk' },
    { path: 'src/services/weather-radar/index.njk', title: 'Weather Radar', layout: 'layouts/page.njk' },
    { path: 'src/services/weather-radar/s-band/index.njk', title: 'S-Band Radar', layout: 'layouts/page.njk' },
    { path: 'src/services/weather-radar/c-band/index.njk', title: 'C-Band Radar', layout: 'layouts/page.njk' },
    { path: 'src/services/weather-radar/x-band/index.njk', title: 'X-Band Radar', layout: 'layouts/page.njk' },
    { path: 'src/services/custom-nwp-models/index.njk', title: 'Custom NWP Models & Analysis', layout: 'layouts/page.njk' },
    { path: 'src/services/maritime-agrometeorology/index.njk', title: 'Maritime & Agrometeorology', layout: 'layouts/page.njk' },
    { path: 'src/services/maritime-agrometeorology/data-gathering/index.njk', title: 'Data Gathering', layout: 'layouts/page.njk' },
    { path: 'src/services/maritime-agrometeorology/precision-analytics/index.njk', title: 'Precision Analytics', layout: 'layouts/page.njk' },
    { path: 'src/services/maritime-agrometeorology/remote-sensing/index.njk', title: 'Remote Sensing Systems', layout: 'layouts/page.njk' },
    { path: 'src/services/lidar-monitoring/index.njk', title: '3D LiDAR Monitoring', layout: 'layouts/page.njk' },
    { path: 'src/services/lidar-monitoring/air-pollution/index.njk', title: 'Air Pollution', layout: 'layouts/page.njk' },
    { path: 'src/services/lidar-monitoring/volcanic-ash/index.njk', title: 'Volcanic Ash Dispersion', layout: 'layouts/page.njk' },
    { path: 'src/services/lidar-monitoring/aerosol-tracking/index.njk', title: 'Aerosol Tracking', layout: 'layouts/page.njk' },
    { path: 'src/services/weather-broadcast-studio/index.njk', title: 'Weather Broadcast Studio', layout: 'layouts/page.njk' },
    { path: 'src/services/networks-infrastructure/index.njk', title: 'Networks & Infrastructure', layout: 'layouts/page.njk' },
    { path: 'src/services/networks-infrastructure/data-center/index.njk', title: 'Data Center Solutions', layout: 'layouts/page.njk' },
    { path: 'src/services/networks-infrastructure/fire-protection/index.njk', title: 'Fire Protection', layout: 'layouts/page.njk' },
    { path: 'src/services/networks-infrastructure/cooling-systems/index.njk', title: 'Cooling Systems', layout: 'layouts/page.njk' },
    // Projects
    { path: 'src/projects/index.njk', title: 'Project Profile', layout: 'layouts/page.njk' },
    { path: 'src/projects/surabaya-radar-installation/index.njk', title: 'Surabaya Radar Installation', layout: 'layouts/project.njk', client: 'BMKG', location: 'Surabaya, East Java', technology: 'C-Band Weather Radar' },
    { path: 'src/projects/meteorology-broadcasting-studio/index.njk', title: 'Meteorology Broadcasting Studio', layout: 'layouts/project.njk', client: 'BMKG', location: 'Jakarta', technology: 'Virtual Studio, Lynx' },
    { path: 'src/projects/hpc-server-mms/index.njk', title: 'HPC Server MMS Project', layout: 'layouts/project.njk', client: 'BMKG', location: 'Jakarta', technology: 'HPC Cluster' },
    { path: 'src/projects/maws-installation/index.njk', title: 'MAWS Installation', layout: 'layouts/project.njk', client: 'Various', location: 'Multiple Sites', technology: 'Automated Weather Stations' },
    { path: 'src/projects/weather-radar-baron/index.njk', title: 'Weather Radar Baron', layout: 'layouts/project.njk', client: 'BMKG', location: 'Indonesia', technology: 'Baron Radar Systems' },
    { path: 'src/projects/data-center-infrastructure/index.njk', title: 'Data Center Infrastructure', layout: 'layouts/project.njk', client: 'BMKG', location: 'Jakarta', technology: 'Cooling, Fire Protection, Servers' },
    { path: 'src/projects/drifter-deployment/index.njk', title: 'Drifter Deployment', layout: 'layouts/project.njk', client: 'Marine Research Institute', location: 'Indian Ocean', technology: 'Ocean Drifter Buoys' },
];

pages.forEach(p => {
    let content = `---\nlayout: ${p.layout}\ntitle: ${p.title}\ndescription: ${p.title} page for SIBAKOM.\n`;
    if (p.subtitle) content += `subtitle: ${p.subtitle}\n`;
    if (p.client) content += `client: ${p.client}\n`;
    if (p.location) content += `location: ${p.location}\n`;
    if (p.technology) content += `technology: ${p.technology}\n`;
    
    // Add public image url as heroImage
    content += `heroImage: https://images.unsplash.com/photo-1584282361008-011239c054e9?auto=format&fit=crop&w=1200&q=80\n`;
    
    content += `---\n\n<p>Content for ${p.title} goes here. This is a placeholder that will be updated later.</p>\n`;
    
    // Ensure dir exists
    const dir = path.dirname(p.path);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(p.path, content);
});

console.log('Pages generated successfully!');
