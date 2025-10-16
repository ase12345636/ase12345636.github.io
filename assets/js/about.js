// Accordion mutual exclusive + symbol toggle
// - Make details act like an accordion (only one open)
// - Accessible: toggle via click and keyboard (native <details> already keyboard accessible)

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cert-accordion');
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
        const top = rect.top + window.scrollY - offset - 8;
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
    }

    // Attach toggle listener to each details for broader browser compatibility
    items.forEach(item => {
        item.addEventListener('toggle', () => {
            if (!item.open) return; // only act when being opened
            items.forEach(other => {
                if (other !== item && other.open) {
                    other.open = false; // close others
                }
            });
            // after closing others and layout updates, scroll to the opened item
            setTimeout(() => scrollToItem(item), 0);
        });
    });
});
