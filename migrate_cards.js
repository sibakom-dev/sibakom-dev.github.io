const fs = require('fs');

const files = [
    'src/en/services/index.md',
    'src/id/services/index.md',
    'src/fr/services/index.md'
];

const frontmatterToInject = `grid_cards:
  - tag: Aviation & Severe Weather
    image: /assets/images/pages/weather-radar-dome.jpg
    title: Weather Radar
    description: Turnkey implementation of dual-polarization Doppler Weather Radars with high-resolution precipitation tracking.
    link: /services/weather-radar/
    link_text: Explore Radars
  - tag: Forecasting
    image: /assets/images/pages/weather-supercomputer.jpg
    title: Custom NWP Models
    description: High-Performance Computing setups running localized Numerical Weather Prediction (WRF) modeling.
    link: /services/custom-nwp-models/
    link_text: Explore NWP
  - tag: Oceanography
    image: /assets/images/pages/ocean-buoy.jpg
    title: Maritime Meteorology
    description: Deployment of buoy networks, Argos drifters, and ruggedized coastal observational systems.
    link: /services/maritime-meteorology/
    link_text: Explore Maritime
  - tag: Precision Agriculture
    image: /assets/images/pages/precision-agriculture.jpg
    title: Agrometeorology
    description: Precision farming sensors and crop modeling integrations for enhanced food security.
    link: /services/agrometeorology/
    link_text: Explore Agro
  - tag: Aerosol Tracking
    image: /assets/images/pages/lidar-laser-beam.jpg
    title: 3D LiDAR Monitoring
    description: Advanced atmospheric remote sensing for volcanic ash and severe air pollution tracking.
    link: /services/lidar-monitoring/
    link_text: Explore LiDAR
  - tag: Media & Broadcast
    image: /assets/images/pages/broadcast-studio-green-screen.jpg
    title: Broadcast Studio
    description: Professional weather broadcast virtual studios and real-time graphics rendering equipment.
    link: /services/weather-broadcast-studio/
    link_text: Explore Studio
---`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Split by "---"
    const parts = content.split('---');
    if (parts.length >= 3) {
        // parts[0] is empty, parts[1] is frontmatter, parts[2] is body
        let newFrontmatter = parts[1].trim() + '\\n' + frontmatterToInject;
        
        let body = parts[2];
        // Remove the <div class="grid grid-3 gap-md"... and everything after it, but keep the <div class="section-header">
        const gridIndex = body.indexOf('<div class="grid');
        if (gridIndex !== -1) {
            body = body.substring(0, gridIndex).trim() + '\\n</div>\\n';
        }
        
        const newContent = '---\\n' + newFrontmatter + '\\n\\n' + body;
        fs.writeFileSync(file, newContent);
        console.log('Migrated', file);
    }
}
