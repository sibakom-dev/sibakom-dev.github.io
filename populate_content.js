const fs = require('fs');
const path = require('path');
const https = require('https');

// Create images dir
const imagesDir = path.join(__dirname, 'src/assets/images/pages');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Ensure the old directory is removed or renamed
const oldDir = path.join(__dirname, 'src/services/maritime-agrometeorology');
if (fs.existsSync(oldDir)) {
    fs.rmSync(oldDir, { recursive: true, force: true });
}

// Helper to download image
async function downloadImage(filename, keyword) {
    const filePath = path.join(imagesDir, filename);
    if (fs.existsSync(filePath)) return `/assets/images/pages/${filename}`;
    
    // We use a predictable unsplash proxy or picsum seed based on keyword
    // Since unsplash direct random keyword is deprecated, we use picsum with keyword as seed
    const url = `https://picsum.photos/seed/${encodeURIComponent(keyword)}/1200/800`;
    
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                // follow redirect
                https.get(response.headers.location, (res) => {
                    const file = fs.createWriteStream(filePath);
                    res.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        resolve(`/assets/images/pages/${filename}`);
                    });
                }).on('error', reject);
            } else {
                const file = fs.createWriteStream(filePath);
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve(`/assets/images/pages/${filename}`);
                });
            }
        }).on('error', reject);
    });
}

const pagesData = [
    {
        path: 'src/about/index.njk',
        title: 'About Us',
        layout: 'layouts/page.njk',
        keyword: 'corporate-building',
        content: `
            <h2>System Integrator for Environmental Solutions</h2>
            <p>We are a System Integrator company, fully capable of designing, selecting, and integrating equipment and sensors to form highly capable system solutions. We take on additional tasks, exhibit improved performance, and enhance existing systems to meet modern meteorological challenges.</p>
            <p>Our specialization lies in delivering a total equipment solution—covering system deployment, installation, integration, and commissioning of comprehensive marine meteorology and climatology observation networks.</p>
            <p>We understand our customers must adapt to rapid technological shifts and evolving priorities. We are a team of result-minded, highly motivated individuals who stay at the forefront of technical skills and product know-how.</p>
        `
    },
    {
        path: 'src/about/system-integrator/index.njk',
        title: 'System Integrator',
        layout: 'layouts/page.njk',
        keyword: 'engineering-team',
        content: `
            <p>As a leading System Integrator in Indonesia, SIBAKOM bridges the gap between sophisticated environmental sensors and actionable decision-making platforms. We don't just sell hardware; we architect solutions.</p>
            <h3>End-to-End Workflows</h3>
            <ul>
                <li><strong>Consultation:</strong> Assessing site requirements and data needs.</li>
                <li><strong>Design:</strong> Engineering network topologies and data flow.</li>
                <li><strong>Deployment:</strong> Civil works, tower erection, and sensor calibration.</li>
                <li><strong>Integration:</strong> Unifying disparate data streams into single-pane-of-glass applications.</li>
            </ul>
        `
    },
    {
        path: 'src/services/weather-radar/index.njk',
        title: 'Weather Radar Systems',
        layout: 'layouts/page.njk',
        keyword: 'weather-radar-dome',
        content: `
            <p>Representing the pinnacle of volumetric precipitation tracking, our Weather Radar systems (inspired by industry leaders like Baron Weather) deliver unprecedented clarity into severe weather events.</p>
            <h3>Dual-Polarization Precision</h3>
            <p>Our solutions utilize advanced dual-polarization technology to differentiate between rain, snow, hail, and non-meteorological echoes. This ensures highly accurate hydrometeor classification and quantitative precipitation estimation (QPE).</p>
            <h3>Clutter Suppression & Calibration</h3>
            <p>Equipped with state-of-the-art signal processing, our radars eliminate ground clutter and anomalous propagation, providing meteorologists with pristine, artifact-free data ready for immediate analysis.</p>
        `
    },
    {
        path: 'src/services/weather-radar/s-band/index.njk',
        title: 'S-Band Radar',
        layout: 'layouts/page.njk',
        keyword: 's-band-radar',
        content: `
            <p>S-Band radars operate at 2-4 GHz and are the gold standard for long-range, heavy precipitation tracking. Unaffected by signal attenuation, they are ideal for tropical environments like Indonesia.</p>
            <ul>
                <li>Range: Up to 400km</li>
                <li>Best for: Deep tropical convection, typhoons, and heavy monsoonal rain.</li>
            </ul>
        `
    },
    {
        path: 'src/services/weather-radar/c-band/index.njk',
        title: 'C-Band Radar',
        layout: 'layouts/page.njk',
        keyword: 'c-band-radar',
        content: `
            <p>C-Band radars offer an optimal balance between range, resolution, and antenna size. They are perfectly suited for regional monitoring and complex topographical terrains.</p>
            <ul>
                <li>Range: Up to 250km</li>
                <li>Best for: Regional coverage, dual-pol classification, and aviation safety.</li>
            </ul>
        `
    },
    {
        path: 'src/services/weather-radar/x-band/index.njk',
        title: 'X-Band Radar',
        layout: 'layouts/page.njk',
        keyword: 'x-band-radar',
        content: `
            <p>X-Band radars provide the highest resolution for localized, short-range tracking. Due to their compact size, they are ideal for urban deployment, gap-filling in existing networks, and mobile applications.</p>
            <ul>
                <li>Range: Up to 100km</li>
                <li>Best for: Urban hydrology, airport terminal areas, and mountainous gap-filling.</li>
            </ul>
        `
    },
    {
        path: 'src/services/custom-nwp-models/index.njk',
        title: 'Custom NWP Models & Analysis',
        layout: 'layouts/page.njk',
        keyword: 'weather-supercomputer',
        content: `
            <p>Empowering meteorologists with advanced forecasting tools and customizable Numerical Weather Prediction (NWP) models for precise, reliable, and localized weather predictions.</p>
            <h3>High-Resolution Local Modeling</h3>
            <p>We deploy downscaled WRF (Weather Research and Forecasting) models running on dedicated HPC clusters. By assimilating local radar and surface observation data, we generate forecasts with resolutions as fine as 1km, outperforming global models in complex archipelagic terrains.</p>
            <h3>Advanced Data Assimilation</h3>
            <p>Our systems incorporate 3DVAR and 4DVAR assimilation techniques, merging satellite imagery, radar volumes, and synoptic data into the model initialization phase to drastically reduce forecast error.</p>
        `
    },
    {
        path: 'src/services/maritime-meteorology/index.njk',
        title: 'Maritime Meteorology',
        layout: 'layouts/page.njk',
        keyword: 'ocean-buoy',
        content: `
            <p>Delivering critical meteorological and oceanographic intelligence for Indonesia’s maritime sectors, inspired by global leaders like CLS.</p>
            <h3>Ocean Observing Systems</h3>
            <p>We deploy robust networks of moored buoys, drifting buoys, and tide gauges. These instruments continuously stream real-time data on wave height, sea surface temperature (SST), salinity, and ocean currents.</p>
            <h3>Marine Safety & Routing</h3>
            <p>Our integrated platforms provide shipping companies and port authorities with high-definition marine forecasts, ensuring safe vessel routing, optimizing fuel consumption, and safeguarding offshore operations.</p>
        `
    },
    {
        path: 'src/services/agrometeorology/index.njk',
        title: 'Agrometeorology',
        layout: 'layouts/page.njk',
        keyword: 'precision-agriculture',
        content: `
            <p>Transforming agricultural productivity through precision weather data and micro-climate analytics.</p>
            <h3>Crop Modeling & Soil Analytics</h3>
            <p>We provide localized automated weather stations (AWS) equipped with soil moisture probes, solar radiation sensors, and leaf wetness indicators. This data feeds into advanced crop models to predict yield, optimize irrigation schedules, and prevent disease outbreaks.</p>
            <h3>Drought & Flood Early Warning</h3>
            <p>By analyzing historical climatological data alongside real-time precipitation metrics, our systems deliver actionable alerts to farmers and regional governments regarding impending water stress or inundation risks.</p>
        `
    },
    {
        path: 'src/services/lidar-monitoring/index.njk',
        title: '3D LiDAR Monitoring',
        layout: 'layouts/page.njk',
        keyword: 'lidar-laser-beam',
        content: `
            <p>Advanced LiDAR solutions (inspired by Raymetrics) featuring vertical profiling and 3D scanning to deliver real-time, volumetric insights into atmospheric composition.</p>
            <h3>Volcanic Ash Dispersion Tracking</h3>
            <p>Aviation safety is paramount. Our depolarization LiDAR networks accurately distinguish volcanic ash from water clouds, mapping the plume's altitude, concentration, and trajectory in 3D to ensure safe airspace management.</p>
            <h3>Urban Air Pollution & Aerosols</h3>
            <p>Track the movement of PM2.5, PM10, industrial emissions, and transboundary haze. Our 3D scanning LiDARs can map pollution layers across entire cityscapes, identifying localized emission sources and temperature inversions.</p>
        `
    },
    {
        path: 'src/services/weather-broadcast-studio/index.njk',
        title: 'Weather Broadcast Studio',
        layout: 'layouts/page.njk',
        keyword: 'broadcast-studio-green-screen',
        content: `
            <p>We empower weather broadcasters and digital media outlets with comprehensive weather dissemination systems, similar to the industry-leading Baron Lynx platform.</p>
            <h3>Data-Driven 3D Graphics</h3>
            <p>Transform raw meteorological data into stunning, broadcast-ready visualizations. Our systems feature high-resolution terrain mapping, dynamic storm tracks, and volumetric radar rendering that captivates audiences.</p>
            <h3>Seamless Studio Integration</h3>
            <p>Featuring robust chroma-key integration, multi-display management, and automated rundown creation, our broadcast solutions ensure presenters can deliver breaking weather stories rapidly and reliably during severe events.</p>
        `
    },
    {
        path: 'src/services/networks-infrastructure/index.njk',
        title: 'Networks & Infrastructure',
        layout: 'layouts/page.njk',
        keyword: 'data-center-racks',
        content: `
            <p>Meteorological computing requires absolute uptime. We design and deploy the critical physical infrastructure that keeps your High-Performance Computing (HPC) and Data Centers running flawlessly.</p>
            <h3>Electrical & Power Resilience</h3>
            <p>We implement redundant N+1 UPS systems, industrial generators, and precision power distribution units (PDUs) to guarantee clean, uninterrupted electricity to your mission-critical forecasting clusters.</p>
            <h3>Precision Cooling & Fire Suppression</h3>
            <p>Our Data Center solutions include efficient in-row cooling, hot/cold aisle containment, and clean-agent (FM-200/NOVEC) fire suppression systems that protect sensitive servers without leaving damaging residue.</p>
            
            <h3>Infrastructure Gallery</h3>
            <div class="grid grid-3 gap-sm" style="margin-top: 24px;">
                <img src="https://picsum.photos/seed/serverrack/400/300" alt="Server Rack" style="border-radius: 8px; width: 100%;">
                <img src="https://picsum.photos/seed/cooling/400/300" alt="Cooling System" style="border-radius: 8px; width: 100%;">
                <img src="https://picsum.photos/seed/upspower/400/300" alt="UPS Power" style="border-radius: 8px; width: 100%;">
            </div>
        `
    },
    {
        path: 'src/contact/index.njk',
        title: 'Contact Us',
        layout: 'layouts/page.njk',
        keyword: 'contact-center',
        content: `
            <div class="grid grid-2 gap-lg">
                <div>
                    <h3>Get In Touch</h3>
                    <p>Consult with our engineering team to design a robust, custom-tailored system for your observational network.</p>
                    
                    <div style="margin-top: var(--spacing-md);">
                        <strong style="color: var(--color-primary); display: block;">Jakarta Main Office</strong>
                        <p>Grand Puri Niaga Blok K6/3D<br>Jl. Puri Kencana, Kembangan<br>Jakarta 11610</p>
                        <p><strong>Phone:</strong> +6221 58351660</p>
                    </div>
                    
                    <div style="margin-top: var(--spacing-md);">
                        <strong style="color: var(--color-primary); display: block;">Medan Branch Office</strong>
                        <p>Jl. Brigjen Katamso Belakang<br>No. 46 - 48, Medan 20151</p>
                        <p><strong>Phone:</strong> +6261 4515386</p>
                    </div>

                    <div style="margin-top: var(--spacing-md);">
                        <strong style="color: var(--color-primary); display: block;">Email Inquiries</strong>
                        <p>info@sibakom.com</p>
                    </div>
                </div>
                
                <div style="background: var(--color-surface); padding: var(--spacing-md); border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
                    <h3>Send a Message</h3>
                    <form style="display: flex; flex-direction: column; gap: var(--spacing-sm); margin-top: var(--spacing-sm);">
                        <input type="text" placeholder="Your Name" style="padding: 12px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-family: var(--font-body);">
                        <input type="email" placeholder="Your Email" style="padding: 12px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-family: var(--font-body);">
                        <select style="padding: 12px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-family: var(--font-body);">
                            <option>Inquiry Type</option>
                            <option>Weather Radar</option>
                            <option>NWP Models</option>
                            <option>Infrastructure</option>
                            <option>Support/Maintenance</option>
                        </select>
                        <textarea placeholder="Your Message" rows="5" style="padding: 12px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-family: var(--font-body); resize: vertical;"></textarea>
                        <button type="button" class="btn btn-primary" style="margin-top: 8px;">Submit Inquiry</button>
                    </form>
                </div>
            </div>
            
            <div style="margin-top: var(--spacing-lg); width: 100%; height: 400px; background: #e1ebf5; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
                <p style="color: var(--color-text-muted);">[ Interactive Google Maps Placeholder ]</p>
            </div>
        `
    },
    {
        path: 'src/projects/index.njk',
        title: 'Project Profile',
        layout: 'layouts/page.njk',
        keyword: 'project-management',
        content: `
            <p>SIBAKOM has a proven track record spanning over 40 years, with more than 100 successfully completed projects across all 34 provinces in Indonesia. Explore our case studies below.</p>
            
            <div class="grid grid-3 gap-md" style="margin-top: var(--spacing-md);">
                <div class="project-card">
                    <img src="https://picsum.photos/seed/radarproj/400/250" style="width: 100%; border-radius: 8px 8px 0 0;">
                    <div style="padding: 16px; border: 1px solid var(--color-border); border-top: none; border-radius: 0 0 8px 8px;">
                        <h4 style="margin-bottom: 8px;">Surabaya Radar Installation</h4>
                        <a href="/projects/surabaya-radar-installation/" style="color: var(--color-primary); font-weight: 600;">Read Case Study &rarr;</a>
                    </div>
                </div>
                <div class="project-card">
                    <img src="https://picsum.photos/seed/studioproj/400/250" style="width: 100%; border-radius: 8px 8px 0 0;">
                    <div style="padding: 16px; border: 1px solid var(--color-border); border-top: none; border-radius: 0 0 8px 8px;">
                        <h4 style="margin-bottom: 8px;">Meteorology Studio</h4>
                        <a href="/projects/meteorology-broadcasting-studio/" style="color: var(--color-primary); font-weight: 600;">Read Case Study &rarr;</a>
                    </div>
                </div>
                <div class="project-card">
                    <img src="https://picsum.photos/seed/datacenterproj/400/250" style="width: 100%; border-radius: 8px 8px 0 0;">
                    <div style="padding: 16px; border: 1px solid var(--color-border); border-top: none; border-radius: 0 0 8px 8px;">
                        <h4 style="margin-bottom: 8px;">HPC Server MMS Project</h4>
                        <a href="/projects/hpc-server-mms/" style="color: var(--color-primary); font-weight: 600;">Read Case Study &rarr;</a>
                    </div>
                </div>
            </div>
        `
    },
    {
        path: 'src/projects/surabaya-radar-installation/index.njk',
        title: 'Surabaya C-Band Radar Setup',
        layout: 'layouts/project.njk',
        client: 'BMKG',
        location: 'Surabaya, East Java',
        technology: 'C-Band Weather Radar, Dual-Polarization',
        keyword: 'surabaya-radar-dome',
        content: `
            <h3>Project Overview</h3>
            <p>SIBAKOM was contracted to deploy a state-of-the-art C-Band dual-polarization weather radar in Surabaya. This critical node expands BMKG's coverage over the densely populated East Java region, significantly improving early warning capabilities for severe monsoonal flooding.</p>
            <h3>Scope of Work</h3>
            <ul>
                <li>Site survey and structural engineering for the radar tower.</li>
                <li>Complete physical installation of the radome, antenna, and pedestal.</li>
                <li>Configuration of signal processors and calibration of dual-pol parameters.</li>
                <li>Integration into the national radar composite network.</li>
            </ul>
            <h3>Gallery</h3>
            <div class="grid grid-3 gap-sm" style="margin-top: 24px;">
                <img src="https://picsum.photos/seed/radar1/400/300" style="border-radius: 8px; width: 100%;">
                <img src="https://picsum.photos/seed/radar2/400/300" style="border-radius: 8px; width: 100%;">
                <img src="https://picsum.photos/seed/radar3/400/300" style="border-radius: 8px; width: 100%;">
            </div>
        `
    }
];

async function run() {
    for (const page of pagesData) {
        console.log("Processing " + page.title + "...");
        const filename = page.keyword + ".jpg";
        
        let localImagePath = "";
        try {
            localImagePath = await downloadImage(filename, page.keyword);
        } catch (e) {
            console.error("Failed to download image:", e);
            localImagePath = "https://picsum.photos/seed/" + page.keyword + "/1200/800"; // fallback
        }
        
        let fileContent = "---\n" +
"layout: " + page.layout + "\n" +
"title: " + page.title + "\n" +
"description: " + page.title + " details for SIBAKOM.\n" +
"heroImage: " + localImagePath + "\n";

        if (page.client) fileContent += "client: " + page.client + "\n";
        if (page.location) fileContent += "location: " + page.location + "\n";
        if (page.technology) fileContent += "technology: " + page.technology + "\n";
        
        fileContent += "---\n\n" + page.content + "\n";

        const dir = path.dirname(path.join(__dirname, page.path));
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        
        fs.writeFileSync(path.join(__dirname, page.path), fileContent);
    }
    console.log("All comprehensive pages generated successfully!");
}

run();
