// Unified header & footer injection + navigation behavior (active link, a11y)
(function () {
    'use strict';
    function buildHeader() {
        const path = location.pathname.replace(/\\\\/g, '/');
        const isEnglish = /\/en\//.test(path);
        const base = isEnglish ? '../' : '';
        // language config (extendable)
        const languages = [
            { code: 'zh-Hant', name: '中文', label: '中文', basePath: `${isEnglish ? '../' : ''}`, index: 'index.html', current: !isEnglish },
            { code: 'en', name: 'English', label: 'English', basePath: `${isEnglish ? '../' : ''}en/`, index: 'index.html', current: isEnglish }
        ];
        // Always show unified label 'Language' regardless of current page language
        const langLabel = 'Language';
        const langDropdown = `<li class=\"nav-lang\"><details><summary><span class=\"lang-label\">${langLabel}</span></summary><ul class=\"lang-dropdown\">${languages.map(l => `<li><a class=\"lang-link${l.current ? ' active-lang' : ''}\" hreflang=\"${l.code}\" href=\"${l.basePath}${l.index}\">${l.name}</a></li>`).join('')}</ul></details></li>`;
        return `\n<header class="header">\n  <div class="container navbar">\n    <a class="brand" href="${base}index.html">\n      <img src="${base}assets/img/memu.jpg" alt="Profile" loading="lazy" />\n      <span class="brand-name">張簡雲翔</span>\n    </a>\n    <button class="nav-toggle" aria-label="切換選單" aria-expanded="false"><span></span></button>\n    <div class="nav-menu-wrapper">\n      <ul class="nav-menu">\n        ${isEnglish ? `<li><a href="${base}en/index.html">Home</a></li>` : `<li><a href="${base}index.html">首頁</a></li>`}
        ${isEnglish ? `<li><a href="${base}en/about.html">About</a></li>` : `<li><a href="${base}about.html">簡介</a></li>`}
        ${isEnglish ? `<li><a href="${base}en/education.html">Education</a></li>` : `<li><a href="${base}education.html">學歷</a></li>`}
        ${isEnglish ? `<li><a href="${base}en/experience.html">Experience</a></li>` : `<li><a href="${base}experience.html">經歷</a></li>`}
        ${isEnglish ? `<li><a href="${base}en/publications.html">Publications</a></li>` : `<li><a href="${base}publications.html">著作</a></li>`}
        ${isEnglish ? `<li><a href="${base}en/honors.html">Honors</a></li>` : `<li><a href="${base}honors.html">榮譽</a></li>`}
        ${langDropdown}\n      </ul>\n    </div>\n  </div>\n</header>`;
    }
    const headerHTML = buildHeader();
    const footerHTML = (() => { const y = new Date().getFullYear(); return `\n<footer aria-label="頁尾"><div class="container"><div>Copyright © ${y} 張簡雲翔</div></div></footer>`; })();

    function ensureThemeColor() {
        if (document.querySelector('meta[name="theme-color"]')) return;
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = '#0e1116';
        document.head.appendChild(meta);
    }
    function setActiveNav() {
        const full = location.pathname.replace(/\\\\/g, '/');
        const file = full.endsWith('/') ? 'index.html' : full.split('/').pop();
        document.querySelectorAll('.nav-menu a').forEach(a => {
            const href = a.getAttribute('href');
            // Compare by filename only to allow '../' or 'en/' prefixes
            const target = href.split('/').pop();
            if (target === file) a.classList.add('active');
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
    function enhancePdfLinks() {
        // Open certain document/media types in a new tab for better UX
        document.querySelectorAll('a[href$=".pdf" i], a[href$=".wav" i]').forEach(a => {
            a.setAttribute('target', '_blank');
            // security + privacy
            a.setAttribute('rel', 'noopener noreferrer');
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
        enhancePdfLinks();
    });
})();
