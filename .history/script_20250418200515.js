// Basic page highlighting
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || currentPage.startsWith(linkPage.replace('.html', ''))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Show all content immediately
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('js-enabled');
    highlightCurrentPage();
});