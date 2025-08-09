// Unified header & footer injection + navigation behavior (active link, a11y)
(function () {
    'use strict';
    const headerHTML = `\n<header class="header">\n  <div class="container navbar">\n    <a class="brand" href="index.html">\n      <img src="assets/img/icon.png" alt="Profile" loading="lazy" />\n      <span class="brand-name">張簡雲翔</span>\n    </a>\n    <button class="nav-toggle" aria-label="切換選單" aria-expanded="false"><span></span></button>\n    <div class="nav-menu-wrapper">\n      <ul class="nav-menu">\n        <li><a href="index.html">首頁</a></li>\n        <li><a href="about.html">簡介</a></li>\n        <li><a href="education.html">學歷</a></li>\n        <li><a href="experience.html">經歷</a></li>\n        <li><a href="publications.html">著作</a></li>\n        <li><a href="honors.html">榮譽</a></li>\n      </ul>\n    </div>\n  </div>\n</header>`;
    const footerHTML = (() => { const y = new Date().getFullYear(); return `\n<footer aria-label="頁尾"><div class="container"><div>Copyright © ${y} 張簡雲翔</div></div></footer>`; })();

    function ensureThemeColor() {
        if (document.querySelector('meta[name="theme-color"]')) return;
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = '#0e1116';
        document.head.appendChild(meta);
    }
    function setActiveNav() {
        const path = location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-menu a').forEach(a => {
            const href = a.getAttribute('href');
            if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
        });
    }
    function initNavInteractions() {
        const toggle = document.querySelector('.nav-toggle');
        if (!toggle) return;
        toggle.addEventListener('click', () => {
            const open = document.body.classList.toggle('nav-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        document.addEventListener('click', e => {
            if (e.target.matches('.nav-menu a')) {
                document.body.classList.remove('nav-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    document.addEventListener('DOMContentLoaded', () => {
        const hRoot = document.getElementById('site-header');
        const fRoot = document.getElementById('site-footer');
        if (hRoot) hRoot.innerHTML = headerHTML;
        if (fRoot) fRoot.innerHTML = footerHTML;
        initNavInteractions();
        setActiveNav();
        ensureThemeColor();
    });
})();
