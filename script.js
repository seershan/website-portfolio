// EmailJS initialization
(function () {
    // Replace with your actual EmailJS public key
    emailjs.init("YOUR_PUBLIC_KEY");
})();

// Utility Functions
const showNotification = (message, type) => {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
};

// Scroll Animation
const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");

                    // Animate skill bars if applicable
                    if (entry.target.classList.contains("skills-grid")) {
                        animateSkillBars();
                    }
                }
            });
        },
        { threshold: 0.1 }
    );

    elements.forEach((element) => {
        observer.observe(element);
    });
};

// Smooth Scrolling for Navigation
const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });
};

// Skill Bar Animation
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll(".skill-item");
    skillBars.forEach((skill) => {
        const level = skill.getAttribute("data-level");
        const bar = skill.querySelector(".skill-bar");
        bar.style.width = `${level}%`;
    });
};

// Theme Toggle
const initThemeToggle = () => {
    const themeToggle = document.getElementById("theme-toggle");
    const root = document.documentElement;

    themeToggle.addEventListener("click", () => {
        const currentTheme = root.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";

        root.setAttribute("data-theme", newTheme);

        // Update icon visibility
        themeToggle.querySelector(".fa-moon").classList.toggle("hidden");
        themeToggle.querySelector(".fa-sun").classList.toggle("hidden");
    });
};

// Initialize All Features
document.addEventListener("DOMContentLoaded", () => {
    animateOnScroll();
    smoothScroll();
    handleForm();
    highlightNavigation();
    initMobileNav();
    initThemeToggle();

    // Lazy-load images in project cards
    document.querySelectorAll(".project-card img").forEach((img) => {
        img.addEventListener("load", () => {
            img.classList.add("loaded");
        });
    });
});

// Navigation Highlight on Scroll
const highlightNavigation = () => {
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-item");

    const highlightCurrentSection = () => {
        const scrollPosition = window.scrollY;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120; // Offset for nav height
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navItems.forEach((item) => {
                    item.classList.remove("active");
                    if (item.getAttribute("href") === `#${sectionId}`) {
                        item.classList.add("active");
                    }
                });
            }
        });
    };

    // Add scroll event listener with debounce
    let isScrolling;
    window.addEventListener("scroll", () => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(highlightCurrentSection, 50);
    });

    // Initial highlight
    highlightCurrentSection();
};

// Dark Mode Toggle
const handleThemeToggle = () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check the saved theme in localStorage or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Event listener for the toggle button
    themeToggleButton.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        // Update the theme
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // Update the theme toggle button icon
    function updateThemeIcon(theme) {
        const moonIcon = themeToggleButton.querySelector('.fa-moon');
        const sunIcon = themeToggleButton.querySelector('.fa-sun');

        if (theme === 'dark') {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'inline';
        } else {
            moonIcon.style.display = 'inline';
            sunIcon.style.display = 'none';
        }
    }
};

// Initialize theme toggle on DOM content load
document.addEventListener('DOMContentLoaded', () => {
    handleThemeToggle();
});
