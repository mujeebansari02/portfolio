// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Form validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Reset errors
    clearErrors();
    
    // Validate inputs
    let isValid = true;
    
    if (!nameInput.value.trim()) {
        showError(nameInput, 'Name is required');
        isValid = false;
    }
    
    if (!emailInput.value.trim()) {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
    }
    
    if (!subjectInput.value.trim()) {
        showError(subjectInput, 'Subject is required');
        isValid = false;
    }
    
    if (!messageInput.value.trim()) {
        showError(messageInput, 'Message is required');
        isValid = false;
    }
    
    if (isValid) {
        // Here you would typically send the form data to a server
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    }
});

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = document.createElement('small');
    error.className = 'error-message';
    error.style.color = '#dc2626';
    error.style.display = 'block';
    error.style.marginTop = '0.5rem';
    error.textContent = message;
    formGroup.appendChild(error);
    input.style.borderColor = '#dc2626';
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => input.style.borderColor = '#e5e7eb');
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Animate skill items when they come into view
const skillItems = document.querySelectorAll('.skill-item');
const animateSkillItems = () => {
    skillItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const isInView = (rect.top >= 0 && rect.bottom <= window.innerHeight);
        
        if (isInView) {
            item.classList.add('reveal');
        }
    });
};

// Initial check for elements in view
animateSkillItems();

// Check on scroll
window.addEventListener('scroll', animateSkillItems);

// Intersection Observer for animated elements
const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .certificate-card, .education-item, .skill-category, section');

const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.tagName.toLowerCase() === 'section') {
                entry.target.classList.add('fade-in');
            } else {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
animatedElements.forEach(element => {
    if (element.tagName.toLowerCase() === 'section') {
        element.classList.add('fade-out');
    } else {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
    }
    observer.observe(element);
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.progress');
const animateSkills = () => {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            bar.style.width = bar.parentElement.getAttribute('data-progress') || '0%';
        }
    });
};

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// Add CSS for fade animations
const style = document.createElement('style');
style.textContent = `
    .fade-out {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Reveal sections on scroll
const revealSections = document.querySelectorAll('section');
const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-reveal', 'active');
            sectionObserver.unobserve(entry.target);
        }
    });
}, revealOptions);

revealSections.forEach(section => {
    section.classList.add('section-reveal');
    sectionObserver.observe(section);
});

// Enhanced hover effects for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.style.transform = 'none';
    card.style.transition = 'none';
});

// Add smooth reveal for timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            timelineObserver.unobserve(entry.target);
        }
    });
}, timelineOptions);

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Add particle effect to hero section
const heroSection = document.querySelector('.hero-about');
const createParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = Math.random() * 3 + 2 + 's';
    particle.style.opacity = Math.random();
    heroSection.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 5000);
};

setInterval(createParticle, 200);

// Add CSS for particles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        animation: particleFall linear forwards;
    }

    @keyframes particleFall {
        0% {
            transform: translateY(-10vh) scale(0);
        }
        100% {
            transform: translateY(100vh) scale(1);
        }
    }
`;
document.head.appendChild(particleStyles);

// Scroll reveal animation
function reveal() {
    const reveals = document.querySelectorAll('.timeline-item, .skill-item, .certificate-card, .contact-form');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('animate');
        }
    });
}

// Initialize animations
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// Form submission animation
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('.submit-btn');
        submitBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            submitBtn.style.transform = '';
            // Add your form submission logic here
        }, 200);
    });
}

// Skill icons hover effect
const skillItemsHover = document.querySelectorAll('.skill-item');
skillItemsHover.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.skill-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.skill-icon');
        if (icon) {
            icon.style.transform = '';
        }
    });
});

// Function to update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for better trigger point
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Update active state when clicking navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
}); 