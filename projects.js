
document.querySelectorAll('.image-slider-container').forEach((container) => {
    const slider = container.querySelector('.slider');
    const beforeImage = container.querySelector('.before-image');
    const containerRect = container.getBoundingClientRect();

    slider.addEventListener('mousedown', (e) => {
        const onMouseMove = (event) => {
            const offsetX = Math.min(
                Math.max(event.clientX - containerRect.left, 0),
                containerRect.width
            );
            const percentage = (offsetX / containerRect.width) * 100;
            beforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
            slider.style.left = `${percentage}%`;
        };

        document.addEventListener('mousemove', onMouseMove);

        document.addEventListener(
            'mouseup',
            () => {
                document.removeEventListener('mousemove', onMouseMove);
            },
            { once: true }
        );
    });
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

document.addEventListener("DOMContentLoaded", function () {
    const mobileServicesToggle = document.getElementById("mobileServicesToggle");
    const mobileServicesDropdown = document.getElementById("mobileServicesDropdown");
    const mobileDropdown = mobileServicesToggle.parentElement; // Get parent .mobile-dropdown
    const chevronIcon = mobileServicesToggle.querySelector("i");

    mobileServicesToggle.addEventListener("click", function (event) {
        event.preventDefault();

        // Toggle dropdown visibility
        mobileServicesDropdown.classList.toggle("show");

        // Toggle active class for background change
        mobileDropdown.classList.toggle("active");

        chevronIcon.classList.toggle("rotated");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!mobileDropdown.contains(event.target)) {
            mobileServicesDropdown.classList.remove("show");
            mobileDropdown.classList.remove("active");
            chevronIcon.classList.remove("rotated");
        }
    });
});