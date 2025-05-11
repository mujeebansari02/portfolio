// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
let scrollTimeout;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Clear any existing timeout
    clearTimeout(scrollTimeout);
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        navbar.classList.remove('scroll-down');
        return;
    }
    
    // Add a small delay to prevent rapid class toggling
    scrollTimeout = setTimeout(() => {
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    }, 50);
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('.skill-item, .profile-info, .contact-form').forEach(el => {
    observer.observe(el);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        
        try {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = 'Send Message';
                submitBtn.disabled = false;
            }, 3000);
            
        } catch (error) {
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
            setTimeout(() => {
                submitBtn.innerHTML = 'Send Message';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// Add hover effect to skill icons
document.querySelectorAll('.skill-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0)';
    });
});

// Add parallax effect to profile image
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = profileImage.getBoundingClientRect();
        
        const x = (clientX - left - width / 2) / 20;
        const y = (clientY - top - height / 2) / 20;
        
        profileImage.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });
    
    window.addEventListener('mouseleave', () => {
        profileImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// Role Tags Animation
const roleTags = document.querySelectorAll('.role span');
roleTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
});

// Profile Image Hover Effect
const profileImageHover = document.querySelector('.profile-image');
if (profileImageHover) {
    profileImageHover.addEventListener('mouseenter', () => {
        profileImageHover.style.transform = 'scale(1.05)';
        profileImageHover.style.boxShadow = '0 0 30px rgba(0, 242, 255, 0.4)';
    });
    
    profileImageHover.addEventListener('mouseleave', () => {
        profileImageHover.style.transform = 'scale(1)';
        profileImageHover.style.boxShadow = '0 8px 24px rgba(0, 242, 255, 0.2)';
    });
}

// Mobile Menu Toggle with Touch Support
const menuButton = document.querySelector('.hamburger');
const menuLinks = document.querySelector('.nav-links');

if (menuButton && menuLinks) {
    let touchStartX = 0;
    let touchEndX = 0;

    const toggleMenu = () => {
        menuButton.classList.toggle('active');
        menuLinks.classList.toggle('active');
        document.body.style.overflow = menuLinks.classList.contains('active') ? 'hidden' : '';
    };

    menuButton.addEventListener('click', toggleMenu);

    // Touch support for mobile menu
    menuLinks.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    menuLinks.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    const handleSwipe = () => {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - close menu
            if (menuLinks.classList.contains('active')) {
                toggleMenu();
            }
        }
    };

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuLinks.classList.contains('active') && 
            !menuButton.contains(e.target) && 
            !menuLinks.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu when clicking a link
    menuLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Close menu on window resize if open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && menuLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
}

// Add CSS for mobile menu with improved animations
const style = document.createElement('style');
style.textContent = `
    .hamburger {
        display: none;
        flex-direction: column;
        gap: 6px;
        cursor: pointer;
        padding: 5px;
        z-index: 1001;
    }
    
    .hamburger span {
        width: 25px;
        height: 3px;
        background: var(--accent-primary);
        border-radius: 3px;
        transition: 0.3s ease;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
        transform: translateX(-10px);
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
    }
    
    @media (max-width: 768px) {
        .hamburger {
            display: flex;
        }
        
        .nav-links {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            align-items: center;
            padding: 2rem 0;
            transition: all 0.3s ease;
            gap: 1rem;
        }
        
        .nav-links.active {
            left: 0;
        }
        
        .nav-links a {
            font-size: 1.1rem;
            padding: 0.8rem 1.5rem;
            width: 100%;
            text-align: center;
            transition: all 0.3s ease;
        }
        
        .nav-links a:hover {
            background: rgba(0, 242, 255, 0.1);
            transform: translateX(5px);
        }
    }
`;

document.head.appendChild(style);

// Add active class to current page in navigation
const currentPage = window.location.pathname.split('/').pop();
const navigationLinks = document.querySelectorAll('.nav-links a');

navigationLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Add hover effect to navigation links
navigationLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', () => {
        if (!link.classList.contains('active')) {
            link.style.transform = 'translateY(0)';
        }
    });
});

// Certificates Section Animations
const certificateCards = document.querySelectorAll('.certificate-card');

// Add scroll reveal animation
const certificateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, {
    threshold: 0.1
});

certificateCards.forEach(card => {
    certificateObserver.observe(card);
    
    // Add mouse move effect
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        
        // Add parallax effect to image
        const image = card.querySelector('.certificate-image img');
        if (image) {
            const moveX = (centerX - x) / 20;
            const moveY = (centerY - y) / 20;
            image.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px) scale(1.02)';
        const image = card.querySelector('.certificate-image img');
        if (image) {
            image.style.transform = 'scale(1.1)';
        }
    });
    
    // Add click effect for certificate links
    const link = card.querySelector('.certificate-link');
    if (link) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = 'translateY(-3px)';
                // Add your link handling logic here
                window.open(link.href, '_blank');
            }, 150);
        });
    }
});

// Add typing effect for certificate titles
const certificateTitles = document.querySelectorAll('.certificate-content h3');
certificateTitles.forEach(title => {
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                titleObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    titleObserver.observe(title);
}); 