function toggleDropdown(button, dropdown, arrowIcon, otherButtons) {
    if (dropdown.classList.contains('show')) {
        closeDropdown(button, dropdown, arrowIcon);
    } else {
        // Close any other open dropdowns first
        otherButtons.forEach(({ btn, dd, icon }) => closeDropdown(btn, dd, icon));
        openDropdown(button, dropdown, arrowIcon);

        // Add logic to display Google Maps if the dropdown is for Showroom
        if (dropdown.id === 'showroomDropdown') {
            showGoogleMap(dropdown);
        }
    }
}

// Function to close a dropdown
function closeDropdown(button, dropdown, arrowIcon) {
    if (dropdown.classList.contains('show')) {
        dropdown.classList.add('closing'); // Add 'closing' class for animation

        dropdown.addEventListener(
            'transitionend',
            () => {
                dropdown.classList.remove('show', 'closing'); // Remove classes
                if (dropdown.id === 'showroomDropdown') {
                    removeGoogleMap(dropdown); // Remove Google Maps widget
                }
            },
            { once: true }
        );

        // Reset the arrow icon
        if (arrowIcon) {
            arrowIcon.classList.add('fa-chevron-down');
            arrowIcon.classList.remove('fa-chevron-up');
        }
        button.classList.remove('active');
    }
}

// Function to open a dropdown
function openDropdown(button, dropdown, arrowIcon) {
    dropdown.classList.add('show'); // Show dropdown

    // Update arrow direction
    if (arrowIcon) {
        arrowIcon.classList.add('fa-chevron-up');
        arrowIcon.classList.remove('fa-chevron-down');
    }
    button.classList.add('active');
}

// Function to dynamically add Google Maps widget
function showGoogleMap(container) {
    if (container.querySelector('.google-map')) return; // Avoid duplication

    const mapDiv = document.createElement('div');
    mapDiv.className = 'google-map';
    mapDiv.style.width = '100%';
    mapDiv.style.height = '300px';
    mapDiv.style.marginTop = '10px';

    // Add Google Maps iframe
    mapDiv.innerHTML = `
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5270811160763!2d144.9631583155899!3d-37.81410777975169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577e2e0df6f0b6a!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1694945253106!5m2!1sen!2sau"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
    `;

    container.appendChild(mapDiv);
}

// Function to remove Google Maps widget
function removeGoogleMap(container) {
    const mapDiv = container.querySelector('.google-map');
    if (mapDiv) {
        container.removeChild(mapDiv);
    }
}

// Dropdown toggling logic for Showroom and Services
document.addEventListener('DOMContentLoaded', () => {
    const showroomButton = document.querySelector('.menu ul li a[onclick*="showroomDropdown"]');
    const showroomDropdown = document.getElementById('showroomDropdown');
    const showroomArrow = showroomButton.querySelector('i');

    const servicesButton = document.querySelector('.menu ul li a[onclick*="servicesDropdown"]');
    const servicesDropdown = document.getElementById('servicesDropdown');
    const servicesArrow = servicesButton.querySelector('i');

    // Check if elements exist
    if (!showroomButton || !showroomDropdown || !showroomArrow || !servicesButton || !servicesDropdown || !servicesArrow) {
        console.error('One or more dropdown elements not found!');
        return;
    }

    // Other dropdown buttons and their elements
    const otherButtons = [
        { btn: showroomButton, dd: showroomDropdown, icon: showroomArrow },
        { btn: servicesButton, dd: servicesDropdown, icon: servicesArrow },
    ];

    // Showroom button click handler
    showroomButton.addEventListener('click', (event) => {
        event.preventDefault();
        toggleDropdown(showroomButton, showroomDropdown, showroomArrow, otherButtons.filter(b => b.btn !== showroomButton));
    });

    // Services button click handler
    servicesButton.addEventListener('click', (event) => {
        event.preventDefault();
        toggleDropdown(servicesButton, servicesDropdown, servicesArrow, otherButtons.filter(b => b.btn !== servicesButton));
    });

    // Close all dropdowns when clicking outside
    document.addEventListener('click', (event) => {
        const isInsideShowroom = showroomButton.contains(event.target) || showroomDropdown.contains(event.target);
        const isInsideServices = servicesButton.contains(event.target) || servicesDropdown.contains(event.target);

        if (!isInsideShowroom && !isInsideServices) {
            otherButtons.forEach(({ btn, dd, icon }) => closeDropdown(btn, dd, icon));
        }
    });

    // Close dropdowns with Esc key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            otherButtons.forEach(({ btn, dd, icon }) => closeDropdown(btn, dd, icon));
        }
    });

  