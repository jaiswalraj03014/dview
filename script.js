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
    // Mobile Navigation
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (hamburgerBtn && mobileNav) {
        hamburgerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }

    // Services Dropdown
    const servicesLink = document.querySelector('.services-link');
    const servicesDropdown = document.getElementById('servicesDropdown');

    if (servicesLink && servicesDropdown) {
        servicesLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            servicesDropdown.classList.toggle('show');
            this.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!servicesLink.contains(e.target) && !servicesDropdown.contains(e.target)) {
                servicesDropdown.classList.remove('show');
                servicesLink.classList.remove('active');
            }
        });

        // Prevent dropdown from closing when clicking inside it
        servicesDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileNav && hamburgerBtn && !hamburgerBtn.contains(e.target) && !mobileNav.contains(e.target)) {
            mobileNav.classList.remove('active');
            hamburgerBtn.classList.remove('active');
        }
    });
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
