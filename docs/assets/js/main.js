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
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
}

// Share Modal Logic
function openShareModal() {
    const modal = document.getElementById('shareModal');
    if(modal) {
        modal.classList.add('active');
    }
}

function closeShareModal() {
    const modal = document.getElementById('shareModal');
    if(modal) {
        modal.classList.remove('active');
    }
}

function copyShareLink() {
    const input = document.getElementById('shareInputLink');
    if(input) {
        input.select();
        input.setSelectionRange(0, 99999); // For mobile devices
        navigator.clipboard.writeText(input.value).then(() => {
            const btnSpan = document.querySelector('.copylink span');
            const originalText = btnSpan.innerText;
            btnSpan.innerText = "Copied!";
            setTimeout(() => {
                btnSpan.innerText = originalText;
            }, 2000);
        });
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('shareModal');
    if (event.target == modal) {
        closeShareModal();
    }
});
