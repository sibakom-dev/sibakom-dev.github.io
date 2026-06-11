const fs = require('fs');

const dataToAdd = `statistics:
  - number: '40'
    plus: true
    label: Years Experience
    link: /about/
  - number: '100'
    plus: true
    label: Completed Projects
    link: /projects/
  - number: World-Class
    plus: false
    label: Strategic Partners
    link: /about/strategic-partnerships/
  - number: Extensive
    plus: false
    label: Domestic & ASEAN Project Delivered
    link: /about/specializations/
why_subtitle: Why SIBAKOM
why_title: Pioneering Reliable Environmental Monitoring
why_description: >-
  We bridge the gap between complex meteorological instrumentation and actionable
  data, ensuring every sensor, server, and transmission node operates flawlessly
  in demanding environments.
why_image: /assets/images/pages/engineering-team.jpg
why_points:
  - text: End-to-end System Integration
  - text: World-class Equipment Partnerships
  - text: Dedicated Local Technical Support
  - text: Rigorous Quality Assurance Standards
why_btn_text: Learn About Our History
why_btn_link: /about/
zigzag_subtitle: Integration Excellence
zigzag_title: Mastering The Infrastructure
sections:
  - title: Robust Data Center Architecture
    image: /assets/images/pages/data-center-racks.jpg
    text: >-
      Mission-critical weather operations require zero downtime. SIBAKOM
      architects robust, highly available data centers precisely tuned for the
      intense I/O demands of High-Performance Computing (HPC) meteorological
      models.

      - Precision cooling systems for server arrays.

      - Automated inert-gas fire protection.

      - N+1 redundant power topologies.

      <a href="/services/networks-infrastructure/" class="btn btn-secondary" style="margin-top: 1rem;">View Infrastructure</a>
projects_subtitle: Proven Track Record
projects_title: Project Highlights
projects_btn_text: Explore Project Profile
projects_btn_link: /projects/
highlighted_projects:
  - tag: Meteorology
    image: https://picsum.photos/seed/radarproj/400/250
    title: Surabaya Radar Installation
    description: >-
      A state-of-the-art C-Band radar deployment ensuring precise weather
      tracking for the region.
    link: /projects/surabaya-radar-installation/
  - tag: Data Center
    image: https://picsum.photos/seed/datacenterproj/400/250
    title: HPC Server MMS
    description: >-
      High Performance Computing infrastructure to process complex meteorological
      models.
    link: /projects/hpc-server-mms/
  - tag: Broadcasting
    image: https://picsum.photos/seed/studioproj/400/250
    title: Meteorology Broadcasting Studio
    description: >-
      A modern, fully-equipped studio for broadcasting real-time weather reports.
    link: /projects/meteorology-broadcasting-studio/`;

const files = ['src/en/index.md', 'src/fr/index.md', 'src/id/index.md'];
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if(!content.includes('statistics:')) {
    content = content.replace(/\n---\n(?!\s*$)/, '\n' + dataToAdd + '\n---\n');
    fs.writeFileSync(f, content, 'utf8');
    console.log('Updated ' + f);
  }
});
