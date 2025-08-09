// Honors page study-related accordion mutual exclusion
// Scoped to #study-accordion (求學相關)

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('study-accordion');
    if (!container) return;
    const items = Array.from(container.querySelectorAll('details.acc-item'));
    items.forEach(item => {
        item.addEventListener('toggle', () => {
            if (!item.open) return;
            items.forEach(o => { if (o !== item && o.open) o.open = false; });
        });
    });
});
