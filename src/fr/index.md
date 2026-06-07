---
layout: layouts/base.njk
title: SIBAKOM | Environmental Solutions & Weather Technology
description: SIBAKOM - System Integrator for Environmental Solutions. Experts in weather technology, maritime meteorology, and environmental monitoring.
---
<!-- Hero Section -->
<section class="section radar-sweep-bg"
    style="background: url('/assets/images/Sibakom_Hero_Banner.png') center center/cover no-repeat; position: relative; overflow: hidden; min-height: 90vh; display: flex; align-items: center; padding-top: 80px; padding-bottom: 120px;">

    <div
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to right, rgba(244, 248, 252, 0.95) 0%, rgba(244, 248, 252, 0.7) 50%, rgba(244, 248, 252, 0) 100%); z-index: 1;">
    </div>

    <div class="radar-sweep-effect" style="z-index: 2;"></div>

    <div class="container" style="position: relative; z-index: 10;">
        <div class="hero-content d-flex flex-column gap-md"
            style="max-width: 700px; padding-top: var(--spacing-lg); padding-bottom: var(--spacing-lg);">
            <span class="section-subtitle">Weather Observations System</span>
            <h1 style="font-size: var(--fs-4xl); color: var(--color-primary-dark); line-height: var(--lh-tight);">
                Providing High Quality Services & Products, ALWAYS</h1>
            <p class="text-lead" style="font-size: 1.15rem;">
                Integrating multisectoral meteorological systems. Delivering
                complete & reliable solutions for mission-critical decision-making across the Indonesian archipelago.
            </p>
            <div class="d-flex flex-wrap gap-sm" style="margin-top: 1rem;">
                <a href="/services/" class="btn btn-primary">Explore Services & Products</a>
                <a href="/contact/" class="btn btn-secondary"
                    style="background-color: var(--color-surface);">Contact Us</a>
            </div>
        </div>
    </div>
</section>

<!-- Company Statistics (Overlapping Hero) -->
<section style="position: relative; z-index: 20; margin-top: -80px; padding-bottom: var(--spacing-xl);">
    <div class="container">
        <div class="grid grid-4 gap-md">
            <a href="/about/" style="text-decoration: none;">
                <div class="stats-card" style="height: 100%; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px);">
                    <div class="stats-number" data-count="40" data-plus="true">0</div>
                    <div class="stats-label">Years Experience</div>
                </div>
            </a>
            <a href="/projects/" style="text-decoration: none;">
                <div class="stats-card" style="height: 100%; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px);">
                    <div class="stats-number" data-count="100" data-plus="true">0</div>
                    <div class="stats-label">Completed Projects</div>
                </div>
            </a>
            <a href="/about/strategic-partnerships/" style="text-decoration: none;">
                <div class="stats-card" style="height: 100%; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px);">
                    <div class="stats-number" style="font-size: 2.5rem;">Top</div>
                    <div class="stats-label">Gov & Private Partners</div>
                </div>
            </a>
            <a href="/about/specializations/" style="text-decoration: none;">
                <div class="stats-card" style="height: 100%; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px);">
                    <div class="stats-number" data-count="34">0</div>
                    <div class="stats-label">Provinces Covered</div>
                </div>
            </a>
        </div>
    </div>
</section>

<script>
document.addEventListener("DOMContentLoaded", () => {
    const stats = document.querySelectorAll('.stats-number[data-count]');
    
    const animateCountUp = (el) => {
        const target = +el.getAttribute('data-count');
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const update = () => {
            current += step;
            if (current < target) {
                el.innerText = Math.ceil(current) + (el.innerHTML.includes('+') ? '+' : '');
                requestAnimationFrame(update);
            } else {
                el.innerText = target + (el.hasAttribute('data-plus') ? '+' : '');
            }
        };
        
        update();
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCountUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
});
</script>

<!-- Solutions Overview -->
<section class="section section-bg-alt">
    <div class="container">
        <div class="section-header">
            <span class="section-subtitle">Our Expertise</span>
            <h2 class="section-title">Core Technological Solutions</h2>
            <p class="section-desc">We deliver turnkey deployments across the meteorological and environmental observation spectrum.</p>
        </div>
        <div class="grid grid-3 gap-md">
            <div class="solution-card">
                <div class="solution-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><circle cx="12" cy="11" r="3" /></svg>
                </div>
                <h3 class="solution-title">Weather Radar</h3>
                <p class="solution-desc">Turnkey implementation of Doppler Weather Radars with high-resolution precipitation tracking.</p>
                <a href="/services/weather-radar/" class="solution-link">Explore Radars <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
            </div>
            <div class="solution-card">
                <div class="solution-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></svg>
                </div>
                <h3 class="solution-title">Custom NWP Models</h3>
                <p class="solution-desc">High-Performance Computing setups running localized Numerical Weather Prediction modeling.</p>
                <a href="/services/custom-nwp-models/" class="solution-link">Explore NWP <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
            </div>
            <div class="solution-card">
                <div class="solution-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20" /><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" /><path d="M4 12v-4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" /><circle cx="12" cy="12" r="2" /></svg>
                </div>
                <h3 class="solution-title">Maritime Meteorology</h3>
                <p class="solution-desc">Buoy networks, drifters, and coastal observational systems for marine safety and research.</p>
                <a href="/services/maritime-meteorology/" class="solution-link">Explore Maritime <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
            </div>
            <div class="solution-card">
                <div class="solution-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <h3 class="solution-title">Agrometeorology</h3>
                <p class="solution-desc">Precision farming sensors and crop modeling integrations for food security.</p>
                <a href="/services/agrometeorology/" class="solution-link">Explore Agro <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
            </div>
            <div class="solution-card">
                <div class="solution-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
                </div>
                <h3 class="solution-title">3D LiDAR Monitoring</h3>
                <p class="solution-desc">Advanced aerosol tracking and volcanic ash detection across the archipelago.</p>
                <a href="/services/lidar-monitoring/" class="solution-link">Explore LiDAR <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
            </div>
            <div class="solution-card">
                <div class="solution-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                </div>
                <h3 class="solution-title">Broadcast Studio</h3>
                <p class="solution-desc">Professional weather broadcast virtual studios and rendering equipment.</p>
                <a href="/services/weather-broadcast-studio/" class="solution-link">Explore Studio <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
            </div>
        </div>

        <div class="text-center" style="margin-top: var(--spacing-xl);">
            <a href="/services/" class="btn btn-secondary">View All Services & Products</a>
        </div>
    </div>
</section>

<!-- Deep Dive: Why Choose SIBAKOM -->
<section class="section">
    <div class="container grid grid-2 gap-lg align-center">
        <div>
            <img src="/assets/images/pages/engineering-team.jpg" alt="Engineering Excellence"
                style="border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); width: 100%; object-fit: cover;">
        </div>
        <div class="d-flex flex-column gap-md">
            <div class="section-header text-left" style="margin-left: 0;">
                <span class="section-subtitle">Why SIBAKOM</span>
                <h2 class="section-title">Pioneering Reliable Environmental Monitoring</h2>
                <p class="section-desc">We bridge the gap between complex meteorological instrumentation and
                    actionable data, ensuring every sensor, server, and transmission node operates flawlessly in
                    demanding environments.</p>
            </div>

            <div class="d-flex flex-column gap-sm">
                <div class="d-flex align-center gap-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span class="font-semibold" style="font-size: 1.1rem;">End-to-end System Integration</span>
                </div>
                <div class="d-flex align-center gap-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span class="font-semibold" style="font-size: 1.1rem;">World-class Equipment Partnerships</span>
                </div>
                <div class="d-flex align-center gap-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span class="font-semibold" style="font-size: 1.1rem;">Dedicated Local Technical Support</span>
                </div>
                <div class="d-flex align-center gap-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span class="font-semibold" style="font-size: 1.1rem;">Rigorous Quality Assurance Standards</span>
                </div>
            </div>

            <div style="margin-top: var(--spacing-sm);">
                <a href="/about/" class="btn btn-primary">Learn About Our History</a>
            </div>
        </div>
    </div>
</section>

<!-- Advanced Capabilities (Zigzag) -->
<section class="section section-bg-alt">
    <div class="container">
        <div class="section-header">
            <span class="section-subtitle">Integration Excellence</span>
            <h2 class="section-title">Mastering The Infrastructure</h2>
        </div>
        
        <div class="zigzag-section">
            <div class="zigzag-text">
                <h3>Robust Data Center Architecture</h3>
                <p>Mission-critical weather operations require zero downtime. SIBAKOM architects robust, highly available data centers precisely tuned for the intense I/O demands of High-Performance Computing (HPC) meteorological models.</p>
                <ul>
                    <li>Precision cooling systems for server arrays.</li>
                    <li>Automated inert-gas fire protection.</li>
                    <li>N+1 redundant power topologies.</li>
                </ul>
                <a href="/services/networks-infrastructure/" class="btn btn-secondary" style="margin-top: 1rem;">View Infrastructure</a>
            </div>
            <div class="zigzag-image">
                <img src="/assets/images/pages/data-center-racks.jpg" alt="Data Center Architecture">
            </div>
        </div>
    </div>
</section>

<!-- Project Highlights -->
<section class="section">
    <div class="container">
        <div class="section-header d-flex justify-between align-center" style="max-width: 100%;">
            <div class="text-left" style="max-width: 500px;">
                <span class="section-subtitle">Proven Track Record</span>
                <h2 class="section-title">Project Highlights</h2>
            </div>
            <a href="/projects/" class="btn btn-secondary">Explore Project Profile</a>
        </div>
        <div class="grid grid-3 gap-md">
            <div class="project-card">
                <div class="project-img-wrapper">
                    <span class="project-tag">Weather Radar</span>
                    <img src="/assets/images/pages/surabaya-radar-dome.jpg" alt="Surabaya Radar Installation"
                        class="project-img">
                </div>
                <div class="project-content">
                    <h3 class="project-title">Surabaya C-Band Radar Setup</h3>
                    <p class="project-desc">Deployment of dual-polarization weather radar system for BMKG covering
                        the East Java region.</p>
                    <a href="/projects/surabaya-radar-installation/" class="project-link">
                        Case Study
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>
            </div>
            <div class="project-card">
                <div class="project-img-wrapper">
                    <span class="project-tag">Infrastructure</span>
                    <img src="/assets/images/pages/weather-supercomputer.jpg" alt="HPC Server Installation"
                        class="project-img">
                </div>
                <div class="project-content">
                    <h3 class="project-title">BMKG Central HPC Cluster</h3>
                    <p class="project-desc">Installation and configuration of high-performance computing
                        infrastructure for localized numerical weather modeling.</p>
                    <a href="/projects/hpc-server-mms/" class="project-link">
                        Case Study
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>
            </div>
            <div class="project-card">
                <div class="project-img-wrapper">
                    <span class="project-tag">Maritime</span>
                    <img src="/assets/images/pages/ocean-buoy.jpg" alt="Drifter Deployment"
                        class="project-img">
                </div>
                <div class="project-content">
                    <h3 class="project-title">Ocean Data Drifter Deployment</h3>
                    <p class="project-desc">Widespread deployment of marine drifter buoys capturing surface
                        temperature, wave spectrum, and current data.</p>
                    <a href="/projects/drifter-deployment/" class="project-link">
                        Case Study
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Call To Action -->
<section class="section" style="position: relative; background-image: url('/assets/images/pages/project-management.jpg'); background-size: cover; background-position: center; color: var(--color-text-light); padding: 120px 0;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(27, 64, 115, 0.9), rgba(43, 95, 167, 0.8));"></div>
    <div class="container text-center" style="position: relative; z-index: 1;">
        <h2 class="font-bold" style="font-size: var(--fs-3xl); margin-bottom: var(--spacing-md); color: var(--color-text-light); text-shadow: 0 2px 10px rgba(0,0,0,0.3);">
            Ready to Upgrade Your Environmental Intelligence?
        </h2>
        <p class="text-lead" style="color: rgba(255, 255, 255, 0.9); margin-bottom: var(--spacing-lg); max-width: 700px; margin-left: auto; margin-right: auto; text-shadow: 0 1px 5px rgba(0,0,0,0.3);">
            Consult with our engineering team to design a robust, custom-tailored system for your observation network. We bring decades of expertise to every deployment.
        </p>
        <div class="d-flex justify-center gap-sm">
            <a href="/contact/" class="btn btn-accent" style="padding: 16px 36px; font-size: var(--fs-md);">Request Consultation</a>
        </div>
    </div>
</section>
