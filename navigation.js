export function setupNavigation() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const close = document.getElementById('mobile-menu-close');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-nav-link');

    const open = () => {
        menu.classList.remove('translate-x-full');
        menu.removeAttribute('inert');          // rientra nell'albero di accessibilità
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        // sposta il focus nel menu (primo link)
        const first = menu.querySelector('.mobile-nav-link');
        if (first) first.focus();
    };
    const shut = () => {
        menu.classList.add('translate-x-full');
        menu.setAttribute('inert', '');         // fuori da focus e screen reader quando chiuso
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    toggle.addEventListener('click', open);
    close.addEventListener('click', () => { shut(); toggle.focus(); });
    links.forEach(link => link.addEventListener('click', shut));

    // Close on Escape (e riporta il focus sul pulsante)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !menu.hasAttribute('inert')) { shut(); toggle.focus(); }
    });
}
