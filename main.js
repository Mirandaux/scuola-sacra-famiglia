import { initRouter } from './router.js';
import { setupNavigation } from './navigation.js';

document.addEventListener('DOMContentLoaded', () => {
    // Icons in the static shell (nav / footer / floating buttons)
    if (window.lucide) lucide.createIcons();

    // Current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    setupNavigation();
    initRouter();

    setupScrollEffects();
    setupMapConsent();
});

// Google Maps caricato solo dopo consenso esplicito (GDPR): nessun dato a
// Google prima del click dell'utente.
function setupMapConsent() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.map-consent');
        if (!btn) return;
        const box = btn.closest('.map-embed');
        if (!box) return;
        const src = box.getAttribute('data-src');
        const title = box.getAttribute('data-title') || 'Mappa';
        box.innerHTML = `<iframe title="${title}" src="${src}" width="100%" height="100%" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
    });
}

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
