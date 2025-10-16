// Experience page accordion mutual exclusive logic
// Apply to #exp-accordion (學生組織 / 會議委員)
// Similar to about.js but scoped to this page only

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('exp-accordion');
    if (!root) return;
    const items = Array.from(root.querySelectorAll('details.acc-item'));

    function scrollToItem(el) {
        if (!el) return;
        const header = document.querySelector('.header');
        let offset = 0;
        if (header) {
            const style = window.getComputedStyle(header);
            if (style.position === 'fixed' || style.position === 'sticky') {
                offset = header.offsetHeight || 0;
            }
        }
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY - offset - 8; // leave small gap
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
    }
    items.forEach(item => {
        item.addEventListener('toggle', () => {
            if (!item.open) return;
            // close others
            items.forEach(other => { if (other !== item && other.open) other.open = false; });
            // scroll to the one being opened after layout updates
            setTimeout(() => scrollToItem(item), 0);
        });
    });
});
