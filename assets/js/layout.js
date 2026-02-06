(function () {
    'use strict';
    function buildHeaderElement() {
        const path = location.pathname.replace(/\\/g, '/');
        const isEnglish = /\/en\//.test(path);
        const isJapanese = /\/ja\//.test(path);
        const base = (isEnglish || isJapanese) ? '../' : '';
        const languages = [
            { code: 'zh-Hant', name: '中文', basePath: `${base}`, index: 'index.html', current: !isEnglish && !isJapanese },
            { code: 'en', name: 'English', basePath: `${base}en/`, index: 'index.html', current: isEnglish },
            { code: 'ja', name: '日本語', basePath: `${base}ja/`, index: 'index.html', current: isJapanese }
        ];
        const brandHref = (isEnglish || isJapanese) ? `${base}ja/index.html` : `${base}index.html`;
        let labels, prefix;
        if (isEnglish) {
            labels = { home: 'Home', about: 'About', edu: 'Education', exp: 'Experience', pubs: 'Publication', honors: 'Honor', toggle: 'Toggle menu' };
            prefix = `${base}en/`;
        } else if (isJapanese) {
            labels = { home: 'ホーム', about: 'プロフィール', edu: '学歴', exp: '経歴', pubs: '出版物', honors: '栄誉', toggle: 'メニューを切り替える' };
            prefix = `${base}ja/`;
        } else {
            labels = { home: '首頁', about: '簡介', edu: '學歷', exp: '經歷', pubs: '著作', honors: '榮譽', toggle: '切換選單' };
            prefix = `${base}`;
        }
        const header = document.createElement('header');
        header.className = 'header';
        const container = document.createElement('div');
        container.className = 'container navbar';
        header.appendChild(container);

        const brand = document.createElement('a');
        brand.className = 'brand';
        brand.href = brandHref;
        const logo = document.createElement('img');
        logo.src = `${base}assets/img/memu.webp`;
        logo.alt = 'Profile';
        logo.loading = 'lazy';
        const brandName = document.createElement('span');
        brandName.className = 'brand-name';
        brandName.lang = 'zh-Hant';
        brandName.textContent = '張簡雲翔';
        brand.append(logo, brandName);
        container.appendChild(brand);

        const toggle = document.createElement('button');
        toggle.className = 'nav-toggle';
        toggle.setAttribute('aria-label', labels.toggle);
        toggle.setAttribute('aria-expanded', 'false');
        toggle.appendChild(document.createElement('span'));
        container.appendChild(toggle);

        const menuWrapper = document.createElement('div');
        menuWrapper.className = 'nav-menu-wrapper';
        const menu = document.createElement('ul');
        menu.className = 'nav-menu';

        const addNavItem = (href, text) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = href;
            a.textContent = text;
            li.appendChild(a);
            menu.appendChild(li);
        };
        addNavItem(`${prefix}index.html`, labels.home);
        addNavItem(`${prefix}about.html`, labels.about);
        addNavItem(`${prefix}education.html`, labels.edu);
        addNavItem(`${prefix}experience.html`, labels.exp);
        addNavItem(`${prefix}publications.html`, labels.pubs);
        addNavItem(`${prefix}honors.html`, labels.honors);

        const langLi = document.createElement('li');
        langLi.className = 'nav-lang';
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        const langLabel = document.createElement('span');
        langLabel.className = 'lang-label';
        langLabel.textContent = 'Language';
        summary.appendChild(langLabel);
        const langList = document.createElement('ul');
        langList.className = 'lang-dropdown';
        languages.forEach((lang) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.className = `lang-link${lang.current ? ' active-lang' : ''}`;
            a.hreflang = lang.code;
            a.lang = lang.code;
            a.href = `${lang.basePath}${lang.index}`;
            a.textContent = lang.name;
            li.appendChild(a);
            langList.appendChild(li);
        });
        details.append(summary, langList);
        langLi.appendChild(details);
        menu.appendChild(langLi);

        menuWrapper.appendChild(menu);
        container.appendChild(menuWrapper);
        return header;
    }
    function buildFooterElement() {
        const pathNorm = location.pathname.replace(/\\/g, '/');
        const isEnglish = /\/en\//.test(pathNorm);
        const isJapanese = /\/ja\//.test(pathNorm);
        const year = new Date().getFullYear();

        const footer = document.createElement('footer');
        footer.setAttribute('aria-label', '頁尾');
        const container = document.createElement('div');
        container.className = 'container';

        const baseFooter = document.createElement('div');
        baseFooter.append(`Copyright © ${year} `);
        const name = document.createElement('span');
        name.className = 'cn-name';
        name.lang = 'zh-Hant';
        name.textContent = '張簡雲翔';
        baseFooter.appendChild(name);
        container.appendChild(baseFooter);

        if (isEnglish || isJapanese) {
            const footnote = document.createElement('div');
            footnote.className = 'footnote';
            footnote.style.marginTop = '.75rem';
            footnote.style.fontSize = '.7rem';
            footnote.style.lineHeight = '1.4';
            footnote.style.color = '#889099';
            footnote.textContent = isEnglish
                ? 'This English page is a translation of the original Traditional Chinese content. In the event of any inconsistency or ambiguity between the English and Traditional Chinese versions, the Traditional Chinese version shall prevail.'
                : 'このページは台湾華語版を翻訳したものです。日本語版と台湾華語版の内容に相違がある場合は、台湾華語版を正とします。';
            container.appendChild(footnote);
        }

        footer.appendChild(container);
        return footer;
    }
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
        const icon = document.createElement('span');
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = '↑';
        btn.appendChild(icon);
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
        if (hRoot) hRoot.replaceChildren(buildHeaderElement());
        if (fRoot) fRoot.replaceChildren(buildFooterElement());
        initNavInteractions();
        setActiveNav();
        ensureThemeColor();
        enhancePdfLinks();
        initGlobalDismiss();
        initBackToTop();
    });
})();
