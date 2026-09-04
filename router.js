import {
    renderHome, renderMetodo, renderServizi, renderTeam,
    renderIscrizioni, renderFAQ, renderContatti
} from './views.js';

const SUFFIX = ' | Scuola Sacra Famiglia · Roverchiara';

const routes = {
    '/':          { render: renderHome,       title: 'Home' + SUFFIX,         desc: "Scuola dell'infanzia paritaria FISM a Roverchiara (VR). Dove il bambino impara ad essere se stesso." },
    '/metodo':    { render: renderMetodo,     title: 'Il Metodo' + SUFFIX,    desc: 'Il nostro approccio pedagogico: gioco destrutturato e bambino al centro.' },
    '/servizi':   { render: renderServizi,    title: 'Servizi' + SUFFIX,      desc: 'Sezione primavera, mensa interna, post-orario e laboratori.' },
    '/team':      { render: renderTeam,       title: 'Il Team' + SUFFIX,      desc: 'Le educatrici che accompagnano i vostri figli con passione e stabilità.' },
    '/iscrizioni':{ render: renderIscrizioni, title: 'Iscrizioni' + SUFFIX,   desc: 'Informazioni su rette, scuola aperta e procedura di iscrizione.' },
    '/faq':       { render: renderFAQ,        title: 'FAQ' + SUFFIX,          desc: 'Domande frequenti per i genitori.' },
    '/contatti':  { render: renderContatti,   title: 'Contatti' + SUFFIX,     desc: 'Contattaci o vieni a trovarci a Roverchiara.' }
};

let currentObserver = null;

export function initRouter() {
    // Compatibilità con i vecchi link hash (#/servizi -> /servizi)
    if (location.hash.startsWith('#/')) {
        history.replaceState(null, '', location.hash.slice(1) + location.search);
    }

    // Navigazione con i pulsanti avanti/indietro del browser
    window.addEventListener('popstate', handleRouteChange);

    // Intercetta i click sui link interni per non ricaricare la pagina
    document.addEventListener('click', onLinkClick);

    handleRouteChange();
}

function onLinkClick(e) {
    // ignora click modificati, tasto destro, ecc.
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const a = e.target.closest('a');
    if (!a) return;

    const href = a.getAttribute('href');
    if (!href) return;

    // solo link interni assoluti (/servizi). Esclude tel:, mailto:, http(s), #, target esterni, download
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    if (!href.startsWith('/') || href.startsWith('//')) return;

    e.preventDefault();
    navigate(href);
}

export function navigate(path) {
    if (path !== location.pathname) {
        history.pushState(null, '', path);
    }
    handleRouteChange();
}

async function handleRouteChange() {
    const path = normalizePath(location.pathname);
    const route = routes[path] || routes['/'];
    const app = document.getElementById('app');

    app.classList.add('is-leaving');

    await wait(280);

    app.innerHTML = await route.render();
    window.scrollTo(0, 0);

    document.title = route.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', route.desc);

    updateActiveLinks(path);
    if (window.lucide) lucide.createIcons();
    initScrollAnimations();

    requestAnimationFrame(() => app.classList.remove('is-leaving'));
}

function normalizePath(pathname) {
    // rimuove uno slash finale (tranne la root)
    if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
    return pathname || '/';
}

function updateActiveLinks(currentPath) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('data-route') === currentPath);
    });
}

function revealAll() {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    document.querySelectorAll('.counter-val').forEach(el => {
        el.textContent = el.getAttribute('data-target') + (el.getAttribute('data-suffix') || '');
    });
}

function initScrollAnimations() {
    if (currentObserver) currentObserver.disconnect();

    // Fallback: se IntersectionObserver non è disponibile, mostra tutto subito
    // (i contenuti non restano mai invisibili).
    if (!('IntersectionObserver' in window)) { revealAll(); return; }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    currentObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;

            if (el.classList.contains('counter-val')) {
                animateCounter(el, reduce);
            }
            el.classList.add('is-visible');
            obs.unobserve(el);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    document.querySelectorAll('.reveal, .counter-val').forEach((el, i) => {
        if (el.classList.contains('reveal') && !el.style.transitionDelay) {
            el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
        }
        // I contatori partono dal valore finale nell'HTML (visibili senza JS):
        // se JS è attivo e le animazioni sono consentite, li azzero prima di animarli.
        if (el.classList.contains('counter-val') && !reduce) {
            el.textContent = '0';
        }
        currentObserver.observe(el);
    });
}

function animateCounter(el, reduce) {
    const target = +el.getAttribute('data-target');
    const suffix = el.getAttribute('data-suffix') || '';

    if (reduce) { el.textContent = target + suffix; return; }

    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
}

const wait = (ms) => new Promise(r => setTimeout(r, ms));
