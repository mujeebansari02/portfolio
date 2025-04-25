// Modern Portfolio Interactivity
// Smooth scroll, section transitions, dark mode, responsive nav

document.addEventListener('DOMContentLoaded', function () {
  // Smooth section fade-in
  const sections = document.querySelectorAll('section');
  const revealSection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };
  const sectionObserver = new IntersectionObserver(revealSection, {
    threshold: 0.15
  });
  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Hamburger menu for mobile
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // Dark mode toggle
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }
  // Detect system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  setTheme(savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light'));
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Accessibility: close nav on outside click (mobile)
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });

  // Animate nav on scroll
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    const curr = window.scrollY;
    if (curr > lastScroll && curr > 80) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScroll = curr;
  });
});

// Certificate filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const certificateCards = document.querySelectorAll('.certificate-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.dataset.filter;
        
        certificateCards.forEach(card => {
            card.style.display = filter === 'all' || card.dataset.category === filter 
                ? 'block' 
                : 'none';
        });
    });
});

// Modal functionality
const modal = document.getElementById('certificate-modal');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.certificate-card');
        const imgSrc = card.querySelector('img').src;
        const details = card.querySelector('h3').textContent;
        
        modal.querySelector('.modal-image').src = imgSrc;
        modal.querySelector('.modal-details').textContent = details;
        modal.style.display = 'block';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if(e.target === modal) {
        modal.style.display = 'none';
    }
});