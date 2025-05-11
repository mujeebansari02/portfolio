// Highlight current page in navigation with error handling
function highlightCurrentPage() {
    try {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        if (!navLinks.length) return;
        
        navLinks.forEach(link => {
            try {
                const linkPage = link.getAttribute('href');
                if (linkPage === currentPage) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            } catch (e) {
                console.error('Error processing nav link:', e);
            }
        });
    } catch (e) {
        console.error('Error in highlightCurrentPage:', e);
    }
}

// Ensure content is visible even if JS fails
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('no-js');
    document.body.classList.add('js-enabled');
});

// Run on page load and when navigating with fallback
window.addEventListener('load', () => {
    try {
        highlightCurrentPage();
    } catch (e) {
        console.error('Load event error:', e);
    }
});

window.addEventListener('popstate', () => {
    try {
        highlightCurrentPage();
    } catch (e) {
        console.error('Popstate error:', e);
    }
});