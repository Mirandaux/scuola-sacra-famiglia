import { initRouter } from './router.js';
import { setupNavigation } from './navigation.js';
import { handleForms } from './form_handler.js';

document.addEventListener('DOMContentLoaded', () => {
    // Icons in the static shell (nav / footer / floating buttons)
    if (window.lucide) lucide.createIcons();

    // Current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    setupNavigation();
    initRouter();
    handleForms();

    setupScrollEffects();
});

function setupScrollEffects() {
    const header = document.getElementById('main-nav');
    const progress = document.getElementById('scroll-progress');
    const callFloat = document.getElementById('call-float');
    const toTop = document.getElementById('to-top');

    const onScroll = () => {
        const y = window.scrollY;

        // Sticky glass header
        header.classList.toggle('scrolled-header', y > 40);

        // Reading progress bar
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = docHeight > 0 ? y / docHeight : 0;
        if (progress) progress.style.transform = `scaleX(${ratio})`;

        // Floating buttons appear after some scroll
        const show = y > 320;
        callFloat.classList.toggle('is-shown', show);
        toTop.classList.toggle('is-shown', show);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toTop) {
        toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
}
