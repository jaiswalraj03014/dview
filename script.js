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
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidenav = document.querySelector('.sidenav');
    const closeBtn = document.querySelector('.close-btn');
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');

    // Toggle sidenav and hamburger visibility
    hamburgerMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        sidenav.classList.add('active');
        hamburgerMenu.style.display = 'none'; // Hide hamburger when sidenav is open
    });

    // Close sidenav and show hamburger
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        sidenav.classList.remove('active');
        hamburgerMenu.style.display = 'block'; // Show hamburger when sidenav is closed
    });

    // Handle dropdown toggles in sidenav
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const dropdown = this.nextElementSibling;
            dropdown.classList.toggle('active');
            
            // Toggle chevron icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });

    // Close sidenav when clicking outside
    document.addEventListener('click', function(e) {
        if (!sidenav.contains(e.target) && !hamburgerMenu.contains(e.target)) {
            sidenav.classList.remove('active');
            hamburgerMenu.style.display = 'block'; // Show hamburger when clicking outside
        }
    });

    // Prevent clicks inside sidenav from closing it
    sidenav.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});
