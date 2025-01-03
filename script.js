// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = this.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message. We will get back to you soon!');
            this.reset();
        });
    }

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scroll Down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scroll Up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
});

// Animate program cards on scroll
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.program-card').forEach((card) => {
        observer.observe(card);
    });
};

observeElements();

let currentIndex = 0;
const items = document.querySelector('.officials-content');
const totalItems = document.querySelectorAll('.official-card').length / 2; // Only count one set of images
const itemWidth = document.querySelector('.official-card').offsetWidth + 20; // Account for the gap between items

// Function to move to the next image
function moveRight() {
    if (currentIndex < totalItems - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Reset to the first image when reaching the end
    }
    items.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

// Function to move to the previous image
function moveLeft() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalItems - 1; // Reset to the last image when at the beginning
    }
    items.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

// Event listeners for the buttons
document.querySelector('.scroll-button-left').addEventListener('click', moveLeft);
document.querySelector('.scroll-button-right').addEventListener('click', moveRight);


let currentIndex = 0;
const images = document.querySelectorAll('.hero-image');
const totalImages = images.length;

function changeImage() {
    // Move to the next image, looping back to the first
    currentIndex = (currentIndex + 1) % totalImages;
    
    // Slide images to the left by adjusting the transform property
    const offset = -currentIndex * 100; // 100 is for full viewport width
    document.querySelector('.hero-images').style.transform = `translateX(${offset}vw)`;
}

// Change image every 5 seconds (5000ms)
setInterval(changeImage, 5000);
