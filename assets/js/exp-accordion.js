// Experience page accordion mutual exclusive logic
// Apply to #exp-accordion (學生組織 / 會議委員)
// Similar to about.js but scoped to this page only

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('exp-accordion');
    if (!root) return;
    const items = Array.from(root.querySelectorAll('details.acc-item'));
    items.forEach(item => {
        item.addEventListener('toggle', () => {
            if (!item.open) return;
            items.forEach(other => { if (other !== item && other.open) other.open = false; });
        });
    });
});
