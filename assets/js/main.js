// Shared navigation + small helpers
(function () {
    const toggle = document.querySelector('.nav-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
        });
    }
    // Close when clicking links (mobile)
    document.addEventListener('click', e => {
        if (e.target.matches('.nav-menu a')) {
            document.body.classList.remove('nav-open');
        }
    });
    // Highlight active nav link
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === path || (path === '' && href === 'index.html')) {
            a.classList.add('active');
        }
    });
})();
