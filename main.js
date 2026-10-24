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
    setupLightbox();
});

// Lightbox: clic su una foto degli spazi (img[data-zoom]) la apre a tutto schermo.
function setupLightbox() {
    let box = null;

    const close = () => {
        if (!box) return;
        box.classList.remove('is-open');
        document.body.style.overflow = '';
        const onEnd = () => { if (box) box.remove(); box = null; };
        setTimeout(onEnd, 250);
    };

    document.addEventListener('click', (e) => {
        const img = e.target.closest('img[data-zoom]');
        if (!img) return;
        e.preventDefault();

        box = document.createElement('div');
        box.className = 'lightbox';
        box.setAttribute('role', 'dialog');
        box.setAttribute('aria-modal', 'true');
        box.setAttribute('aria-label', img.getAttribute('alt') || 'Immagine ingrandita');
        box.innerHTML = `
            <button type="button" class="lightbox-close" aria-label="Chiudi">&times;</button>
            <img src="${img.currentSrc || img.src}" alt="${img.getAttribute('alt') || ''}">`;
        document.body.appendChild(box);
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => box.classList.add('is-open'));

        box.querySelector('.lightbox-close').focus();
        box.addEventListener('click', (ev) => {
            if (ev.target === box || ev.target.closest('.lightbox-close')) close();
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });
}

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

    const onScroll = () => {
        const y = window.scrollY;

        // Sticky glass header
        header.classList.toggle('scrolled-header', y > 40);

        // Reading progress bar
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = docHeight > 0 ? y / docHeight : 0;
        if (progress) progress.style.transform = `scaleX(${ratio})`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}
