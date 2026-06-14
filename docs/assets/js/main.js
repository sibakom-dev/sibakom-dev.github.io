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
            
            // If this is a dropdown toggle, handle mobile expansion
            if (parent && parent.classList.contains('dropdown')) {
                const dropdownMenu = parent.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    // Check if we are on mobile view
                    const isMobile = window.innerWidth <= 768;
                    
                    if (isMobile) {
                        const isExpanded = parent.classList.contains('mobile-expanded');
                        
                        if (!isExpanded) {
                            // First click on mobile: prevent navigation and open dropdown
                            e.preventDefault();
                            
                            // Reset all other dropdowns
                            navMenu.querySelectorAll('.nav-item.dropdown').forEach(item => {
                                item.classList.remove('mobile-expanded');
                            });
                            
                            parent.classList.add('mobile-expanded');
                            return; // Stop here, don't close mobile menu
                        }
                        // Second click: let it navigate natively!
                    }
                }
                
                // If desktop, or mobile second click: let navigation happen.
                // We just need to ensure we don't close the mobile menu immediately if it was just a desktop click
                if (isMobile) {
                    return; // Don't close mobile menu if they are navigating
                }
            }

            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Handle Share Modal
 */
window.openShareModal = function() {
    const modal = document.getElementById('shareModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeShareModal = function() {
    const modal = document.getElementById('shareModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

window.copyShareLink = function() {
    const input = document.getElementById('shareInputLink');
    if (input) {
        input.select();
        input.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(input.value).then(() => {
            const btnText = document.querySelector('.share-icon-btn.copylink span');
            if (btnText) {
                const originalText = btnText.innerText;
                btnText.innerText = 'Copied!';
                setTimeout(() => {
                    btnText.innerText = originalText;
                }, 2000);
            }
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
};

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('shareModal');
    if (modal && e.target === modal) {
        window.closeShareModal();
    }
});
