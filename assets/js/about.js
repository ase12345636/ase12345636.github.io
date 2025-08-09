// Accordion mutual exclusive + symbol toggle
// - Make details act like an accordion (only one open)
// - Accessible: toggle via click and keyboard (native <details> already keyboard accessible)

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cert-accordion');
    if (!container) return;
    const items = Array.from(container.querySelectorAll('details.acc-item'));

    // Attach toggle listener to each details for broader browser compatibility
    items.forEach(item => {
        item.addEventListener('toggle', () => {
            if (!item.open) return; // only act when being opened
            items.forEach(other => {
                if (other !== item && other.open) {
                    other.open = false; // close others
                }
            });
        });
    });
});
