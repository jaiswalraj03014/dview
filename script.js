const images = [
    '/Users/aakashjaiswal/Desktop/dview/UI:UX/1.png',
    '/Users/aakashjaiswal/Desktop/dview/UI:UX/2.png',
    '/Users/aakashjaiswal/Desktop/dview/UI:UX/3.png',
    '/Users/aakashjaiswal/Desktop/dview/UI:UX/4.png',
    '/Users/aakashjaiswal/Desktop/dview/UI:UX/5.png'
];

let currentImageIndex = 0;
const imageContainer = document.querySelector('.image-widget'); // Image container
const imagesElements = document.querySelectorAll('.image-widget img'); // All images

// Update the image slide
function updateImage() {
    imagesElements.forEach(img => img.classList.remove('active')); // Hide all images
    imagesElements[currentImageIndex].classList.add('active'); // Show current image

    imageContainer.style.transform = `translateX(-${currentImageIndex * 60}%)`; // Slide animation
    currentImageIndex = (currentImageIndex + 1) % images.length; // Update index
}

// Initialize slider
document.addEventListener('DOMContentLoaded', () => {
    setInterval(updateImage, 5000); // Change image every 5 seconds
});

function toggleDropdown(button, dropdown, arrowIcon, otherButtons) {
    if (dropdown.classList.contains('show')) {
        closeDropdown(button, dropdown, arrowIcon);
    } else {
        otherButtons.forEach(({ btn, dd, icon }) => closeDropdown(btn, dd, icon)); // Close other dropdowns
        openDropdown(button, dropdown, arrowIcon);
    }
}

// Close dropdown
function closeDropdown(button, dropdown, arrowIcon) {
    if (dropdown.classList.contains('show')) {
        dropdown.classList.add('closing'); // Animation class

        dropdown.addEventListener(
            'transitionend',
            () => dropdown.classList.remove('show', 'closing'), // Remove classes
            { once: true }
        );

        if (arrowIcon) {
            arrowIcon.classList.add('fa-chevron-down');
            arrowIcon.classList.remove('fa-chevron-up');
        }
        button.classList.remove('active');
    }
}

// Open dropdown
function openDropdown(button, dropdown, arrowIcon) {
    dropdown.classList.add('show'); // Show dropdown
    if (arrowIcon) {
        arrowIcon.classList.add('fa-chevron-up');
        arrowIcon.classList.remove('fa-chevron-down');
    }
    button.classList.add('active');
}

// Dropdown toggle logic
document.addEventListener('DOMContentLoaded', () => {
    const servicesButton = document.querySelector('.menu ul li a[onclick*="servicesDropdown"]');
    const servicesDropdown = document.getElementById('servicesDropdown');
    const servicesArrow = servicesButton.querySelector('i');

    const otherButtons = []; // No additional dropdowns to track here

    // Services button click handler
    servicesButton.addEventListener('click', (event) => {
        event.preventDefault();
        toggleDropdown(servicesButton, servicesDropdown, servicesArrow, otherButtons);
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
        const isInsideServices = servicesButton.contains(event.target) || servicesDropdown.contains(event.target);
        if (!isInsideServices) closeDropdown(servicesButton, servicesDropdown, servicesArrow);
    });

    // Close dropdowns with Esc key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeDropdown(servicesButton, servicesDropdown, servicesArrow);
    });
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    const body = document.body;

    if (hamburgerBtn && mobileNav) {
        hamburgerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            body.classList.toggle('nav-open');
        });

        // Close nav when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburgerBtn.contains(e.target) && !mobileNav.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                body.classList.remove('nav-open');
            }
        });

        // Prevent nav closing when clicking inside
        mobileNav.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Services Dropdown
    const servicesLink = document.querySelector('.services-link');
    const servicesDropdown = document.getElementById('servicesDropdown');
    const servicesArrow = servicesLink ? servicesLink.querySelector('i') : null;

    // Only add services dropdown listeners if elements exist
    if (servicesLink && servicesDropdown) {
        servicesLink.addEventListener('click', function(e) {
            if (e && e.preventDefault) e.preventDefault();
            if (e && e.stopPropagation) e.stopPropagation();
            
            servicesDropdown.classList.toggle('show');
            this.classList.toggle('active');
            
            // Toggle arrow if it exists
            if (servicesArrow) {
                servicesArrow.classList.toggle('fa-chevron-up');
                servicesArrow.classList.toggle('fa-chevron-down');
            }
        });
    }

    // Global click handler
    document.addEventListener('click', function(e) {
        // Close mobile nav when clicking outside
        if (mobileNav && hamburgerBtn && 
            !hamburgerBtn.contains(e.target) && 
            !mobileNav.contains(e.target)) {
            mobileNav.classList.remove('active');
            hamburgerBtn.classList.remove('active');
        }

        // Close services dropdown when clicking outside
        if (servicesDropdown && servicesLink && 
            !servicesLink.contains(e.target) && 
            !servicesDropdown.contains(e.target)) {
            servicesDropdown.classList.remove('show');
            servicesLink.classList.remove('active');
            
            // Reset arrow if it exists
            if (servicesArrow) {
                servicesArrow.classList.remove('fa-chevron-up');
                servicesArrow.classList.add('fa-chevron-down');
            }
        }
    });

    // Prevent dropdown from closing when clicking inside
    if (servicesDropdown) {
        servicesDropdown.addEventListener('click', function(e) {
            if (e && e.stopPropagation) e.stopPropagation();
        });
    }
});

function toggleSidenav() {
    const sidenav = document.querySelector('.sidenav');
    const hamburger = document.querySelector('.hamburger-menu');
    
    sidenav.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close sidenav when clicking outside
document.addEventListener('click', function(event) {
    const sidenav = document.querySelector('.sidenav');
    const hamburger = document.querySelector('.hamburger-menu');
    
    if (!sidenav.contains(event.target) && !hamburger.contains(event.target) && sidenav.classList.contains('active')) {
        sidenav.classList.remove('active');
        hamburger.classList.remove('active');
    }
});
