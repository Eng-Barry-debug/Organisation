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

// Automatic Scroll for Official Section
const officialsContent = document.querySelector('.officials-content');
let isPaused = false;

const scrollOfficials = () => {
    if (!isPaused) {
        officialsContent.scrollLeft += 1;
    }
    requestAnimationFrame(scrollOfficials);
};

officialsContent.addEventListener('mouseenter', () => isPaused = true);
officialsContent.addEventListener('mouseleave', () => isPaused = false);

scrollOfficials();
