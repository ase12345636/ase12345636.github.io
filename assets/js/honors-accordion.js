// Honors page nested accordion mutual exclusion

document.addEventListener('DOMContentLoaded', () => {
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
        const top = rect.top + window.scrollY - offset - 8;
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
    }

    // Mutual exclusion among nested details within each .acc-nested
    document.querySelectorAll('.acc-nested').forEach(container => {
        const items = Array.from(container.querySelectorAll(':scope > details.acc-item'));
        if (!items.length) return;

        items.forEach(item => {
            item.addEventListener('toggle', () => {
                if (!item.open) return;
                items.forEach(o => { if (o !== item && o.open) o.open = false; });
                setTimeout(() => scrollToItem(item), 0);
            });
        });

        // When outer accordion is closed, close all inner details too
        const outer = container.closest('details.acc-item');
        if (outer) {
            outer.addEventListener('toggle', () => {
                if (!outer.open) {
                    items.forEach(o => { if (o.open) o.open = false; });
                }
            });
        }
    });

    // Mutual exclusion among top-level record-group accordions
    const topItems = Array.from(document.querySelectorAll('.record-group > details.acc-item'));
    topItems.forEach(item => {
        item.addEventListener('toggle', () => {
            if (!item.open) return;
            topItems.forEach(o => {
                if (o !== item && o.open) o.open = false;
            });
            setTimeout(() => scrollToItem(item), 0);
        });
    });
});
