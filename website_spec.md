# SIBAKOM Website Specification

## Project Overview

Create a modern, responsive corporate website for SIBAKOM (System Integrator for Environmental Solutions).

The visual style must emphasize:

* Environmental monitoring
* Weather technology
* Engineering excellence
* Professional credibility

Avoid generic Indonesian corporate website aesthetics.

---

# Technology Stack

* HTML5
* CSS3
* Vanilla JavaScript

No frameworks.

No WordPress.

No Bootstrap.

No backend.

Website will be hosted on GitHub Pages.

---

# Repository Structure

sibakom-dev.github.io/

index.html
about.html
solutions.html
projects.html
contact.html

assets/
├── css/
├── js/
├── images/

projects/
├── surabaya-radar.html
├── maws-installation.html
├── hpc-server.html
├── weather-studio.html
└── drifter-deployment.html

solutions/
├── weather-radar.html
├── nwp.html
├── maritime.html
├── lidar.html
├── broadcast.html
└── infrastructure.html

README.md

---

# Design System

Primary Color:
#2B5FA7

Secondary Color:
#5B9BFF

Accent Color:
#6DB6FF

Background:
#F4F8FC

Surface:
#FFFFFF

Text:
#17304F

Border Radius:
16px

Container Width:
1280px

Spacing Scale:
8px
16px
24px
48px
96px

---

# Typography

Headings:
Montserrat

Body:
Inter

Font Weight:

400
500
600
700

---

# Global Components

Navbar

Section Header

Primary Button

Secondary Button

Solution Card

Project Card

Statistics Card

Footer

All pages must reuse the same components.

---

# Navigation

Home

About Us

Solutions

Projects

Contact Us

---

# Hero Section

Use provided radar tower image.

Use provided SIBAKOM logo.

Hero image position:

Right side.

Text position:

Left side.

Background:

Light blue gradient.

Radar sweep circles.

Subtle contour lines.

Technology-inspired patterns.

Do NOT use ocean backgrounds.

Do NOT use cloud stock photos.

---

# Home Page

Sections:

1. Hero

2. Company Statistics

40+ Years Experience

100+ Projects

Government & Private Sector

Across Indonesia

3. Solutions Overview

4. Why Choose SIBAKOM

5. Project Highlights

6. Call To Action

7. Footer

---

# About Page

Sections:

Company Overview

Mission

Vision

Core Values

Expertise Areas

Engineering Excellence

Strategic Partnerships

Long-Term Support

---

# Solutions Page

Display all solutions as cards.

Weather Radar

Custom NWP Models

Maritime Meteorology

Agrometeorology

3D LiDAR

Broadcast Studio

Networks & Infrastructure

Each card links to a dedicated solution page.

---

# Projects Page

Display project grid.

Each project links to a detailed project page.

Project card includes:

Image

Project Title

Short Description

Category

---

# Project Detail Page Template

Hero Image

Project Overview

Technical Scope

Equipment Used

Gallery

Related Projects

Call To Action

---

# Contact Page

Contact Form

Office Information

Email

Phone

Google Maps placeholder

Social Media

---

# Responsive Requirements

Desktop:
1440px+

Laptop:
1024px+

Tablet:
768px+

Mobile:
375px+

Mobile menu must become hamburger menu.

---

# Performance Requirements

Use WebP images.

Lazy load images.

Minify CSS and JS.

Target Lighthouse score above 90.

---

# Accessibility

Semantic HTML.

Alt text on images.

Keyboard navigation.

Proper heading hierarchy.

Contrast ratio compliant.

---

# Deliverables

Generate all HTML pages.

Generate CSS architecture.

Generate JavaScript files.

Generate README.

Generate placeholder assets structure.

Website must be deployable directly to GitHub Pages.
