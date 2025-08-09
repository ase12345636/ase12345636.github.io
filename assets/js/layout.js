// Unified header & footer injection + navigation behavior (+ active link + safe focus)
(function () {
    const headerHTML = `\n<header class="header">\n  <div class="container navbar">\n    <a class="brand" href="index.html">\n      <img src="assets/img/icon.png" alt="Profile" loading="lazy" />\n      <span>張簡雲翔</span>\n    </a>\n    <button class="nav-toggle" aria-label="切換選單"><span></span></button>\n    <div class="nav-menu-wrapper">\n      <ul class="nav-menu">\n        <li><a href="index.html">首頁</a></li>\n        <li><a href="about.html">簡介</a></li>\n        <li><a href="education.html">學歷</a></li>\n        <li><a href="experience.html">經歷</a></li>\n        <li><a href="publications.html">著作</a></li>\n        <li><a href="honors.html">榮譽</a></li>\n      </ul>\n    </div>\n  </div>\n</header>`;
    // Dynamic year footer
    const currentYear = new Date().getFullYear();
    const footerHTML = `\n<footer><div class="container"><div>Copyright © ${currentYear} 張簡雲翔</div></div></footer>`;
    document.addEventListener('DOMContentLoaded', () => {
        const hRoot = document.getElementById('site-header');
        const fRoot = document.getElementById('site-footer');
        if (hRoot) hRoot.innerHTML = headerHTML;
        if (fRoot) fRoot.innerHTML = footerHTML;

        // Navigation interactions
        const toggle = document.querySelector('.nav-toggle');
        if (toggle) toggle.addEventListener('click', () => document.body.classList.toggle('nav-open'));
        document.addEventListener('click', e => { if (e.target.matches('.nav-menu a')) document.body.classList.remove('nav-open'); });

        // Active link highlight
        const path = location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-menu a').forEach(a => {
            const href = a.getAttribute('href');
            if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
        });

        // Ensure theme-color meta (for mobile status bar) exists
        if (!document.querySelector('meta[name="theme-color"]')) {
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            meta.content = '#0e1116';
            document.head.appendChild(meta);
        }
    });
})();
