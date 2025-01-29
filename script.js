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
    const hamburger = document.querySelector('.hamburger-menu');
    const sidenav = document.querySelector('.sidenav');
    
    if (!hamburger || !sidenav) {
        console.error('Required elements not found');
        return;
    }

    // Toggle sidenav
    function toggleSidenav(e) {
        e.stopPropagation();
        sidenav.classList.toggle('active');
        hamburger.classList.toggle('active');
    }

    // Add click event to hamburger
    hamburger.addEventListener('click', toggleSidenav);

    // Close sidenav when clicking outside
    document.addEventListener('click', function(e) {
        if (sidenav.classList.contains('active') && 
            !sidenav.contains(e.target) && 
            !hamburger.contains(e.target)) {
            sidenav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Prevent sidenav clicks from closing
    sidenav.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            mainContent.style.marginTop = '60px';
            mainContent.style.display = 'block';
            mainContent.style.position = 'relative';
            mainContent.style.zIndex = '1';
        } else {
            // Reset styles for desktop view
            mainContent.style = '';
        }
    });

    // Initial setup for mobile
    if (window.innerWidth <= 768) {
        mainContent.style.marginTop = '60px';
        mainContent.style.display = 'block';
        mainContent.style.position = 'relative';
        mainContent.style.zIndex = '1';
    }

    // Ensure content is visible
    document.body.style.display = 'block';
    
    // Handle dropdown toggle
    function toggleDropdown(event, dropdownId, arrowId) {
        event.preventDefault();
        const dropdown = document.getElementById(dropdownId);
        const arrow = document.getElementById(arrowId);
        
        if (dropdown) {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            if (arrow) {
                arrow.style.transform = dropdown.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0)';
            }
        }
    }

    // Make function available globally
    window.toggleDropdown = toggleDropdown;
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
