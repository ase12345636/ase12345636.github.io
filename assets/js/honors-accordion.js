// Honors page study-related accordion mutual exclusion
// Scoped to #study-accordion (求學相關)

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('study-accordion');
    if (!container) return;
    const items = Array.from(container.querySelectorAll('details.acc-item'));

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
        const top = rect.top + window.scrollY - offset - 8; // small gap
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
    }

    // Mutual exclusion among nested level (高中 / 國中 / 國小 / 幼稚園)
    items.forEach(item => {
        item.addEventListener('toggle', () => {
            if (!item.open) return; // only act when opening one
            // close others
            items.forEach(o => { if (o !== item && o.open) o.open = false; });
            // after layout updates, scroll to the item being opened
            setTimeout(() => scrollToItem(item), 0);
        });
    });

    // Also ensure: when outer "求學獎項" is closed, all inner details close too.
    const outer = container.closest('details.acc-item');
    if (outer) {
        outer.addEventListener('toggle', () => {
            if (!outer.open) {
                items.forEach(o => { if (o.open) o.open = false; });
            }
        });
    }
});
