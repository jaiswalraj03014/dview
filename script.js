// Existing image slider code
const images = [
    '/Users/aakashjaiswal/Desktop/dview/UI:UX/1.png',
    '/Users/aakashjaiswal/Desktop/dview/UI:UX/2.png',
    '/Users/aakashjaiswal/Desktop/dview/UI:UX/3.png',
    '/Users/aakashjaiswal/Desktop/dview/UI:UX/4.png',
    '/Users/aakashjaiswal/Desktop/dview/UI:UX/5.png'
];

let currentImageIndex = 0;
const imageContainer = document.querySelector('.image-widget');
const imagesElements = document.querySelectorAll('.image-widget img');

// Update the image slide
function updateImage() {
    imagesElements.forEach(img => img.classList.remove('active'));
    imagesElements[currentImageIndex].classList.add('active');
    imageContainer.style.transform = `translateX(-${currentImageIndex * 60}%)`;
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

// Mobile Navigation Functions - New
function toggleSidenav() {
    const sidenav = document.querySelector('.sidenav');
    sidenav.classList.toggle('active');
}

function closeSidenav() {
    const sidenav = document.querySelector('.sidenav');
    sidenav.classList.remove('active');
}

function toggleMobileDropdown(element) {
    const dropdown = element.nextElementSibling;
    dropdown.classList.toggle('active');
}

// Existing dropdown functions
function toggleDropdown(button, dropdown, arrowIcon, otherButtons) {
    if (dropdown.classList.contains('show')) {
        closeDropdown(button, dropdown, arrowIcon);
    } else {
        otherButtons.forEach(({ btn, dd, icon }) => closeDropdown(btn, dd, icon));
        openDropdown(button, dropdown, arrowIcon);
    }
}

function closeDropdown(button, dropdown, arrowIcon) {
    if (dropdown.classList.contains('show')) {
        dropdown.classList.add('closing');
        
        dropdown.addEventListener(
            'transitionend',
            () => dropdown.classList.remove('show', 'closing'),
            { once: true }
        );

        if (arrowIcon) {
            arrowIcon.classList.add('fa-chevron-down');
            arrowIcon.classList.remove('fa-chevron-up');
        }
        button.classList.remove('active');
    }
}

function openDropdown(button, dropdown, arrowIcon) {
    dropdown.classList.add('show');
    if (arrowIcon) {
        arrowIcon.classList.add('fa-chevron-up');
        arrowIcon.classList.remove('fa-chevron-down');
    }
    button.classList.add('active');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize image slider
    setInterval(updateImage, 5000);

    // Mobile Navigation Setup - New
    const hamburger = document.querySelector('.hamburger-menu');
    const closeBtn = document.querySelector('.sidenav .close-btn');
    const dropdownTriggers = document.querySelectorAll('.sidenav .dropdown-trigger');
    
    if (hamburger) {
        hamburger.addEventListener('click', toggleSidenav);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidenav);
    }
    
    // Handle mobile dropdown toggles
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMobileDropdown(trigger);
        });
    });

    // Close sidenav when clicking outside
    document.addEventListener('click', (e) => {
        const sidenav = document.querySelector('.sidenav');
        const hamburger = document.querySelector('.hamburger-menu');
        if (sidenav && hamburger && !sidenav.contains(e.target) && !hamburger.contains(e.target)) {
            closeSidenav();
        }
    });

    // Existing desktop dropdown setup
    const servicesButton = document.querySelector('.menu ul li a[onclick*="servicesDropdown"]');
    const servicesDropdown = document.getElementById('servicesDropdown');
    const servicesArrow = servicesButton?.querySelector('i');
    const otherButtons = [];

    if (servicesButton && servicesDropdown) {
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
    }
});
