// Modern Portfolio Script
const initApp = () => {
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.education-item, .section-title');
    elements.forEach(el => {
      const elementPosition = el.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        el.classList.add('animate');
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load

  // Education item hover effects
  const educationItems = document.querySelectorAll('.education-item');
  educationItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-5px)';
      item.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      item.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });
  });
};

document.addEventListener('DOMContentLoaded', initApp);