(function () {
    'use strict';
    function buildHeader() {
        const path = location.pathname.replace(/\\/g, '/');
        const isEnglish = /\/en\//.test(path);
        const base = isEnglish ? '../' : '';
        const languages = [
            { code: 'zh-Hant', name: '中文', basePath: `${base}`, index: 'index.html', current: !isEnglish },
            { code: 'en', name: 'English', basePath: `${base}en/`, index: 'index.html', current: isEnglish }
        ];
        const langDropdown = `<li class="nav-lang"><details><summary><span class="lang-label">Language</span></summary><ul class="lang-dropdown">${languages.map(l => `<li><a class="lang-link${l.current ? ' active-lang' : ''}" hreflang="${l.code}" lang="${l.code}" href="${l.basePath}${l.index}">${l.name}</a></li>`).join('')}</ul></details></li>`;
        const brandHref = isEnglish ? `${base}en/index.html` : `${base}index.html`;
        const labels = isEnglish
            ? { home: 'Home', about: 'About', edu: 'Education', exp: 'Experience', pubs: 'Publication', honors: 'Honor', toggle: 'Toggle menu' }
            : { home: '首頁', about: '簡介', edu: '學歷', exp: '經歷', pubs: '著作', honors: '榮譽', toggle: '切換選單' };
        const prefix = isEnglish ? `${base}en/` : `${base}`;
        return `\n<header class="header">\n  <div class="container navbar">\n    <a class="brand" href="${brandHref}">\n      <img src="${base}assets/img/memu.webp" alt="Profile" loading="lazy" />\n      <span class="brand-name">張簡雲翔</span>\n    </a>\n    <button class="nav-toggle" aria-label="${labels.toggle}" aria-expanded="false"><span></span></button>\n    <div class="nav-menu-wrapper">\n      <ul class="nav-menu">\n        <li><a href="${prefix}index.html">${labels.home}</a></li>\n        <li><a href="${prefix}about.html">${labels.about}</a></li>\n        <li><a href="${prefix}education.html">${labels.edu}</a></li>\n        <li><a href="${prefix}experience.html">${labels.exp}</a></li>\n        <li><a href="${prefix}publications.html">${labels.pubs}</a></li>\n        <li><a href="${prefix}honors.html">${labels.honors}</a></li>\n        ${langDropdown}\n      </ul>\n    </div>\n  </div>\n</header>`;
    }
    const headerHTML = buildHeader();
    const footerHTML = (() => {
        const isEnglish = /\/en\//.test(location.pathname.replace(/\\/g, '/'));
        const year = new Date().getFullYear();
        const baseFooter = `Copyright © ${year} 張簡雲翔`;
        const footnote = isEnglish ? `<div class="footnote" style="margin-top:.75rem;font-size:.7rem;line-height:1.4;color:#889099;">This English page is a translation of the original Traditional Chinese content. In the event of any inconsistency or ambiguity between the English and Chinese versions, the Traditional Chinese version shall prevail.</div>` : '';
        return `\n<footer aria-label="頁尾"><div class="container"><div>${baseFooter}</div>${footnote}</div></footer>`;
    })();
    function ensureThemeColor() {
        if (document.querySelector('meta[name="theme-color"]')) return; // fixed selector
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = '#0e1116';
        document.head.appendChild(meta);
    }
    function setActiveNav() {
        const full = location.pathname.replace(/\\/g, '/');
        const file = full.endsWith('/') ? 'index.html' : full.split('/').pop();
        document.querySelectorAll('.nav-menu a').forEach(a => {
            const href = a.getAttribute('href');
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
        document.querySelectorAll('a[href$=".pdf" i], a[href$=".wav" i]').forEach(a => {
            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener noreferrer');
        });
    }
    function initGlobalDismiss() {
        const toggle = document.querySelector('.nav-toggle');
        const menuWrapper = document.querySelector('.nav-menu-wrapper');
        const getLangDetails = () => document.querySelector('.nav-lang details');
        // Close language dropdown and mobile menu on outside click
        document.addEventListener('click', (e) => {
            const target = e.target;
            const langDetails = getLangDetails();
            if (langDetails && langDetails.open && !langDetails.contains(target)) {
                langDetails.open = false;
            }
            if (document.body.classList.contains('nav-open')) {
                const clickedInsideMenu = menuWrapper && menuWrapper.contains(target);
                const clickedToggle = toggle && (toggle === target || toggle.contains(target));
                if (!clickedInsideMenu && !clickedToggle) {
                    document.body.classList.remove('nav-open');
                    if (toggle) toggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
        // ESC to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.key === 'Esc') {
                const langDetails = getLangDetails();
                if (langDetails && langDetails.open) langDetails.open = false;
                if (document.body.classList.contains('nav-open')) {
                    document.body.classList.remove('nav-open');
                    if (toggle) toggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }
    function initBackToTop() {
        if (document.getElementById('back-to-top')) return;
        const isEnglish = /\/en\//.test(location.pathname.replace(/\\/g, '/'));
        const btn = document.createElement('button');
        btn.id = 'back-to-top';
        btn.className = 'back-to-top';
        btn.type = 'button';
        btn.setAttribute('aria-label', isEnglish ? 'Back to top' : '回到最上方');
        btn.innerHTML = '<span aria-hidden="true">↑</span>';
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        document.body.appendChild(btn);
        const toggleVisibility = () => {
            if (window.scrollY > 200) btn.classList.add('show'); else btn.classList.remove('show');
        };
        window.addEventListener('scroll', toggleVisibility, { passive: true });
        toggleVisibility();
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
        initGlobalDismiss();
        initBackToTop();
    });
})();
