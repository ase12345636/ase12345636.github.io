// Honors page study-related accordion mutual exclusion
// Scoped to #study-accordion (求學相關)

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('study-accordion');
    if (!container) return;
    const items = Array.from(container.querySelectorAll('details.acc-item'));

    // Mutual exclusion among nested level (高中 / 國中 / 國小 / 幼稚園)
    items.forEach(item => {
        item.addEventListener('toggle', () => {
            if (!item.open) return; // only act when opening one
            items.forEach(o => { if (o !== item && o.open) o.open = false; });
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
