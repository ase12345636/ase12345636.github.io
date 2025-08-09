// Simple client-side filter for publication types
(function () {
    const buttons = document.querySelectorAll('[data-filter]');
    const items = document.querySelectorAll('.pub-item');
    if (!buttons.length) return;
    buttons.forEach(btn => btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-filter');
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        items.forEach(it => {
            const t = it.getAttribute('data-type');
            if (type === 'all' || type === t) {
                it.style.display = '';
            } else {
                it.style.display = 'none';
            }
        });
    }));
})();
