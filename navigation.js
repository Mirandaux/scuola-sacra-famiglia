export function setupNavigation() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const close = document.getElementById('mobile-menu-close');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-nav-link');

    const open = () => {
        menu.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
    };
    const shut = () => {
        menu.classList.add('translate-x-full');
        document.body.style.overflow = '';
    };

    toggle.addEventListener('click', open);
    close.addEventListener('click', shut);
    links.forEach(link => link.addEventListener('click', shut));

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') shut();
    });
}
