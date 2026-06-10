/**
 * SIBAKOM - Client-side Main Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
});

/**
 * Handle Sticky Header Background Transition on Scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    const toggleScrolledClass = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Initial check
    toggleScrolledClass();
    
    // Listen to scroll events
    window.addEventListener('scroll', toggleScrolledClass, { passive: true });
}

/**
 * Handle Mobile Menu Toggle & Hamburger Animations
 */
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Prevent body scrolling when mobile menu is open
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const parent = link.parentElement;
            
            // If this is a dropdown toggle, don't close the mobile menu
            if (parent && parent.classList.contains('dropdown')) {
                // If it's just a toggle (href="#"), prevent jumping to top
                if (link.getAttribute('href') === '#') {
                    e.preventDefault();
                    
                    // Toggle dropdown visibility on mobile
                    const dropdownMenu = parent.querySelector('.dropdown-menu');
                    if (dropdownMenu) {
                        const isOpen = dropdownMenu.style.visibility === 'visible';
                        // Reset all other dropdowns
                        navMenu.querySelectorAll('.dropdown-menu').forEach(menu => {
                            menu.style.visibility = '';
                            menu.style.opacity = '';
                            menu.style.position = '';
                        });
                        
                        if (!isOpen) {
                            dropdownMenu.style.visibility = 'visible';
                            dropdownMenu.style.opacity = '1';
                            dropdownMenu.style.position = 'relative'; // Flow with document on mobile
                        }
                    }
                }
                return; // Do not close the main nav menu
            }

            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
}
