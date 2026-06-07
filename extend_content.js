const fs = require('fs');
const path = require('path');

const contentData = [
    {
        path: 'src/services/weather-radar/index.njk',
        title: 'Advanced Weather Radar Systems',
        subtitle: 'Precision Volumetric Tracking',
        heroImage: '/assets/images/pages/weather-radar-dome.jpg',
        layout: 'layouts/page.njk',
        content: `
            <div class="rich-content">
                <p style="font-size: 1.1rem; margin-bottom: 3rem; text-align: center;">Our weather radar solutions provide meteorologists with the ultimate toolkit for early warning detection, quantitative precipitation estimation (QPE), and storm cell tracking. Inspired by the industry-leading standards of Baron Weather, we deliver uncompromised data quality.</p>
                
                <div class="zigzag-section">
                    <div class="zigzag-text">
                        <h3>Dual-Polarization Precision</h3>
                        <p>SIBAKOM deploys state-of-the-art dual-polarization technology. By transmitting both horizontal and vertical radio waves, our radars determine the exact shape, size, and classification of hydrometeors in the atmosphere.</p>
                        <ul>
                            <li>Accurate distinction between rain, snow, and hail.</li>
                            <li>Tornado debris signature detection for immediate warnings.</li>
                            <li>Advanced attenuation correction for heavy monsoons.</li>
                        </ul>
                    </div>
                    <div class="zigzag-image">
                        <img src="/assets/images/pages/s-band-radar.jpg" alt="Dual-Polarization Radar">
                    </div>
                </div>

                <div class="zigzag-section reverse">
                    <div class="zigzag-text">
                        <h3>Clutter Suppression Engine</h3>
                        <p>Mountainous terrain and urban landscapes in Indonesia often create false echoes. Our signal processing unit employs CLEAN-AP (Clutter Environment Analysis) algorithms to dynamically filter out ground clutter, sea clutter, and anomalous propagation.</p>
                        <ul>
                            <li>Real-time dynamic filtering without data loss.</li>
                            <li>Clear air mode for tracking boundary layers and insects.</li>
                            <li>Enhanced volumetric update times.</li>
                        </ul>
                    </div>
                    <div class="zigzag-image">
                        <img src="/assets/images/pages/c-band-radar.jpg" alt="Clutter Suppression">
                    </div>
                </div>

                <div class="gallery-section">
                    <h3 class="text-center" style="margin-bottom: 2rem;">Radar Capabilities Gallery</h3>
                    <div class="gallery-grid">
                        <div class="gallery-item">
                            <img src="/assets/images/pages/x-band-radar.jpg" alt="Urban X-Band Radar">
                            <div class="gallery-caption">Compact X-Band deployment for urban hydrology.</div>
                        </div>
                        <div class="gallery-item">
                            <img src="/assets/images/pages/surabaya-radar-dome.jpg" alt="Radar Tower">
                            <div class="gallery-caption">Self-supporting structural tower installation.</div>
                        </div>
                        <div class="gallery-item">
                            <img src="/assets/images/pages/weather-supercomputer.jpg" alt="Radar Console">
                            <div class="gallery-caption">Data ingest and signal processing rack.</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    {
        path: 'src/services/custom-nwp-models/index.njk',
        title: 'Custom NWP Models & Analysis',
        subtitle: 'High-Resolution Predictive Analytics',
        heroImage: '/assets/images/pages/weather-supercomputer.jpg',
        layout: 'layouts/page.njk',
        content: `
            <div class="rich-content">
                <p style="font-size: 1.1rem; margin-bottom: 3rem; text-align: center;">Global weather models often miss localized phenomena in complex archipelagic terrains. SIBAKOM engineers custom Numerical Weather Prediction (NWP) clusters that downscale global data into hyper-localized, highly accurate forecasts.</p>
                
                <div class="zigzag-section">
                    <div class="zigzag-text">
                        <h3>WRF Downscaling</h3>
                        <p>We deploy optimized versions of the Weather Research and Forecasting (WRF) model on localized High-Performance Computing (HPC) nodes. This allows us to resolve atmospheric dynamics at a 1km to 3km grid spacing.</p>
                        <ul>
                            <li>Captures sea-breeze convergence zones.</li>
                            <li>Accurately models orographic lift over volcanic terrain.</li>
                            <li>Generates highly specific aviation terminal forecasts.</li>
                        </ul>
                    </div>
                    <div class="zigzag-image">
                        <img src="/assets/images/pages/data-center-racks.jpg" alt="HPC Cluster">
                    </div>
                </div>

                <div class="zigzag-section reverse">
                    <div class="zigzag-text">
                        <h3>Advanced Data Assimilation</h3>
                        <p>A model is only as good as its initial state. We utilize 3DVAR and 4DVAR assimilation techniques to inject real-time observation data—from our radars, buoys, and AWS networks—directly into the model.</p>
                        <ul>
                            <li>Radar radial velocity assimilation for wind fields.</li>
                            <li>Satellite radiance ingest for cloud initialization.</li>
                            <li>Significant reduction in "spin-up" errors.</li>
                        </ul>
                    </div>
                    <div class="zigzag-image">
                        <img src="/assets/images/pages/engineering-team.jpg" alt="Data Assimilation Workflow">
                    </div>
                </div>

                <div class="gallery-section">
                    <h3 class="text-center" style="margin-bottom: 2rem;">NWP Output Gallery</h3>
                    <div class="gallery-grid">
                        <div class="gallery-item">
                            <img src="/assets/images/pages/broadcast-studio-green-screen.jpg" alt="Model Visualization">
                            <div class="gallery-caption">3D rendering of modeled storm cells.</div>
                        </div>
                        <div class="gallery-item">
                            <img src="/assets/images/pages/project-management.jpg" alt="Forecast Matrix">
                            <div class="gallery-caption">Tabular meteogram outputs for decision makers.</div>
                        </div>
                        <div class="gallery-item">
                            <img src="/assets/images/pages/ocean-buoy.jpg" alt="Wave Model">
                            <div class="gallery-caption">Coupled WRF and WaveWatch III model output.</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    {
        path: 'src/services/maritime-meteorology/index.njk',
        title: 'Maritime Meteorology',
        subtitle: 'Ocean Observing Systems',
        heroImage: '/assets/images/pages/ocean-buoy.jpg',
        layout: 'layouts/page.njk',
        content: `
            <div class="rich-content">
                <p style="font-size: 1.1rem; margin-bottom: 3rem; text-align: center;">Indonesia's vast maritime territory requires robust, uninterrupted oceanographic intelligence. Inspired by industry leaders like CLS, our maritime solutions safeguard shipping lanes, offshore oil rigs, and coastal communities.</p>
                
                <div class="zigzag-section">
                    <div class="zigzag-text">
                        <h3>Moored Buoy Networks</h3>
                        <p>We supply and deploy ruggedized moored buoys equipped with comprehensive sensor payloads. These autonomous floating stations transmit critical data back to shore via Iridium satellite telemetry.</p>
                        <ul>
                            <li>Real-time Sea Surface Temperature (SST) and Salinity.</li>
                            <li>Directional wave spectrum analysis.</li>
                            <li>Surface wind speed, gust, and barometric pressure.</li>
                        </ul>
                    </div>
                    <div class="zigzag-image">
                        <img src="/assets/images/pages/surabaya-radar-dome.jpg" alt="Buoy Deployment">
                    </div>
                </div>

                <div class="zigzag-section reverse">
                    <div class="zigzag-text">
                        <h3>Marine Safety & Vessel Routing</h3>
                        <p>Our integrated software platforms transform raw ocean data into actionable intelligence. We provide high-definition marine forecasts and routing algorithms that help fleet managers optimize fuel consumption while avoiding hazardous sea states.</p>
                        <ul>
                            <li>Automated severe weather alerts for specific coordinates.</li>
                            <li>Tsunami early warning integration via bottom-pressure sensors.</li>
                            <li>Oil spill trajectory modeling using real-time current data.</li>
                        </ul>
                    </div>
                    <div class="zigzag-image">
                        <img src="/assets/images/pages/weather-radar-dome.jpg" alt="Marine Routing Dashboard">
                    </div>
                </div>

                <div class="gallery-section">
                    <h3 class="text-center" style="margin-bottom: 2rem;">Maritime Deployments</h3>
                    <div class="gallery-grid">
                        <div class="gallery-item">
                            <img src="/assets/images/pages/ocean-buoy.jpg" alt="Moored Buoy">
                            <div class="gallery-caption">Deep-ocean moored buoy deployment.</div>
                        </div>
                        <div class="gallery-item">
                            <img src="/assets/images/pages/project-management.jpg" alt="Coastal Tide Gauge">
                            <div class="gallery-caption">Acoustic tide gauge installation on pier.</div>
                        </div>
                        <div class="gallery-item">
                            <img src="/assets/images/pages/engineering-team.jpg" alt="Vessel Integration">
                            <div class="gallery-caption">Integrating shipborne weather stations.</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    {
        path: 'src/services/lidar-monitoring/index.njk',
        title: '3D LiDAR Monitoring',
        subtitle: 'Atmospheric Aerosol Tracking',
        heroImage: '/assets/images/pages/lidar-laser-beam.jpg',
        layout: 'layouts/page.njk',
        content: `
            <div class="rich-content">
                <p style="font-size: 1.1rem; margin-bottom: 3rem; text-align: center;">Light Detection and Ranging (LiDAR) represents the frontier of atmospheric profiling. Partnering with technologies from Raymetrics, SIBAKOM provides 3D scanning solutions to track invisible atmospheric hazards in real-time.</p>
                
                <div class="zigzag-section">
                    <div class="zigzag-text">
                        <h3>Volcanic Ash Detection</h3>
                        <p>Indonesia sits on the Ring of Fire. Aviation safety depends on precise volcanic ash tracking. Our depolarization LiDAR networks can differentiate between harmless water clouds and abrasive silicate ash particles.</p>
                        <ul>
                            <li>Measures plume altitude and optical depth.</li>
                            <li>Calculates mass concentration to define no-fly zones.</li>
                            <li>Fully automated 24/7 scanning protocols.</li>
                        </ul>
                    </div>
                    <div class="zigzag-image">
                        <img src="/assets/images/pages/x-band-radar.jpg" alt="LiDAR Beam">
                    </div>
                </div>

                <div class="zigzag-section reverse">
                    <div class="zigzag-text">
                        <h3>Urban Air Quality Profiling</h3>
                        <p>Unlike point sensors that only measure surface pollution, our 3D scanning LiDARs map the entire vertical and horizontal distribution of aerosols over a city, identifying inversion layers and specific emission sources.</p>
                        <ul>
                            <li>Tracks PM2.5 and PM10 particulate matter in 3D.</li>
                            <li>Monitors planetary boundary layer (PBL) height.</li>
                            <li>Early warning for transboundary haze events.</li>
                        </ul>
                    </div>
                    <div class="zigzag-image">
                        <img src="/assets/images/pages/corporate-building.jpg" alt="Urban Profiling">
                    </div>
                </div>

                <div class="gallery-section">
                    <h3 class="text-center" style="margin-bottom: 2rem;">LiDAR Scanning Visualizations</h3>
                    <div class="gallery-grid">
                        <div class="gallery-item">
                            <img src="/assets/images/pages/lidar-laser-beam.jpg" alt="Vertical Profile">
                            <div class="gallery-caption">Time-series backscatter profiling.</div>
                        </div>
                        <div class="gallery-item">
                            <img src="/assets/images/pages/c-band-radar.jpg" alt="Depolarization Map">
                            <div class="gallery-caption">Volcanic ash depolarization ratio.</div>
                        </div>
                        <div class="gallery-item">
                            <img src="/assets/images/pages/broadcast-studio-green-screen.jpg" alt="3D Scan">
                            <div class="gallery-caption">Volumetric representation of urban smog.</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    {
        path: 'src/legal/privacy-policy/index.njk',
        title: 'Privacy Policy',
        subtitle: 'Legal & Compliance',
        heroImage: '/assets/images/pages/corporate-building.jpg',
        layout: 'layouts/page.njk',
        content: `
            <div class="rich-content" style="max-width: 800px; margin: 0 auto;">
                <h3>1. Introduction</h3>
                <p>At SIBAKOM, we are committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you interact with our website or utilize our integration services.</p>
                
                <h3>2. Information We Collect</h3>
                <p>We may collect personal information such as your name, email address, phone number, and corporate details when you voluntarily submit inquiries through our contact forms or engage in business correspondence with our engineering teams.</p>
                
                <h3>3. Use of Your Information</h3>
                <p>The information we collect is strictly used to:</p>
                <ul>
                    <li>Provide technical support and respond to business inquiries.</li>
                    <li>Process orders, configure system requirements, and deliver projects.</li>
                    <li>Communicate updates regarding your deployed meteorological networks.</li>
                </ul>

                <h3>4. Data Security</h3>
                <p>We implement robust technical and organizational measures to protect your data against unauthorized access, loss, or alteration. All telemetry data processed through our meteorological platforms is encrypted using industry-standard protocols.</p>

                <h3>5. Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, please contact our compliance team at <strong>legal@sibakom.com</strong>.</p>
            </div>
        `
    },
    {
        path: 'src/legal/terms-of-service/index.njk',
        title: 'Terms of Service',
        subtitle: 'Legal & Compliance',
        heroImage: '/assets/images/pages/contact-center.jpg',
        layout: 'layouts/page.njk',
        content: `
            <div class="rich-content" style="max-width: 800px; margin: 0 auto;">
                <h3>1. Acceptance of Terms</h3>
                <p>By accessing the SIBAKOM website and utilizing our system integration services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access the service.</p>
                
                <h3>2. Intellectual Property</h3>
                <p>All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of SIBAKOM or its strategic partners (e.g., Baron Weather, CLS, Raymetrics) and is protected by international copyright laws.</p>
                
                <h3>3. Service Availability</h3>
                <p>While we strive to ensure our telemetry and data platforms run with 99.9% uptime, SIBAKOM does not guarantee uninterrupted access to web-based weather portals due to factors outside our control (e.g., ISP failures, extreme weather events damaging hardware).</p>

                <h3>4. Limitation of Liability</h3>
                <p>In no event shall SIBAKOM, its directors, employees, or partners be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our meteorological data or predictive models. Weather forecasting carries inherent uncertainties; decisions made based on our data are at the user's own risk.</p>

                <h3>5. Governing Law</h3>
                <p>These terms shall be governed and construed in accordance with the laws of the Republic of Indonesia, without regard to its conflict of law provisions.</p>
            </div>
        `
    }
];

contentData.forEach(page => {
    let fileContent = '---\n' +
        'layout: ' + page.layout + '\n' +
        'title: ' + page.title + '\n' +
        'description: ' + page.title + ' details for SIBAKOM.\n' +
        'heroImage: ' + page.heroImage + '\n';

    if (page.subtitle) fileContent += 'subtitle: ' + page.subtitle + '\n';
    if (page.client) fileContent += 'client: ' + page.client + '\n';
    if (page.location) fileContent += 'location: ' + page.location + '\n';
    if (page.technology) fileContent += 'technology: ' + page.technology + '\n';
    
    fileContent += '---\n\n' + page.content + '\n';

    const dir = path.dirname(path.join(__dirname, page.path));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    fs.writeFileSync(path.join(__dirname, page.path), fileContent);
});

console.log("Rich content, zigzag layouts, and legal pages generated successfully!");
