// Function to animate elements when they become visible
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .certificate-card');
    
    elements.forEach(element => {
        element.classList.add('animate');
    });
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    animateOnScroll();

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});