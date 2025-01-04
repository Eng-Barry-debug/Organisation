// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
const scrollLinks = document.querySelectorAll('a[href^="#"]');
scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
const officialsContent = document.querySelector('.officials-content');
let isPaused = false;
let isMouseDown = false;
let startX;
let scrollLeft;

// Automatic scroll function (same as before)
const scrollOfficials = () => {
    if (!isPaused) {
        officialsContent.scrollLeft += 1;
    }
    requestAnimationFrame(scrollOfficials);
};

officialsContent.addEventListener('mouseenter', () => isPaused = true);
officialsContent.addEventListener('mouseleave', () => isPaused = false);

scrollOfficials();

// Manual scrolling
officialsContent.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX - officialsContent.getBoundingClientRect().left; // Use getBoundingClientRect for more accurate positioning
    scrollLeft = officialsContent.scrollLeft;
    isPaused = true; // Pause automatic scroll while manually scrolling
});

officialsContent.addEventListener('mouseleave', () => {
    isMouseDown = false;
    isPaused = false; // Resume automatic scroll if the mouse leaves the area
});

officialsContent.addEventListener('mouseup', () => {
    isMouseDown = false;
    isPaused = false; // Resume automatic scroll when mouse button is released
});

officialsContent.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - officialsContent.getBoundingClientRect().left; // Corrected positioning calculation
    const walk = (x - startX) * 3; // Adjust this factor to control scroll speed
    officialsContent.scrollLeft = scrollLeft - walk;
});

// Add animation to impact numbers
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-number');
        }
    });
}, observerOptions);

document.querySelectorAll('.impact-number').forEach(number => {
    observer.observe(number);
});

// Handle touch events for manual scrolling
officialsContent.addEventListener('touchstart', (e) => {
    isMouseDown = true;
    startX = e.touches[0].pageX - officialsContent.getBoundingClientRect().left;
    scrollLeft = officialsContent.scrollLeft;
    isPaused = true; // Pause auto-scroll on touch
});

officialsContent.addEventListener('touchend', () => {
    isMouseDown = false;
    isPaused = false; // Resume auto-scroll on touch end
});

officialsContent.addEventListener('touchmove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - officialsContent.getBoundingClientRect().left;
    const walk = (x - startX) * 3;
    officialsContent.scrollLeft = scrollLeft - walk;
});
