export function setupNavigation() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
    });

    const closeMenu = () => {
        mobileMenu.classList.add('translate-x-full');
    };

    mobileClose.addEventListener('click', closeMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    const whatsappBtn = document.getElementById('whatsapp-float');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            whatsappBtn.classList.add('opacity-100');
            whatsappBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            whatsappBtn.classList.add('opacity-0', 'pointer-events-none');
            whatsappBtn.classList.remove('opacity-100');
        }
    });
}
