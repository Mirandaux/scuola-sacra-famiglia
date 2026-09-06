import {
    renderHome, renderMetodo, renderServizi, renderTeam,
    renderIscrizioni, renderFAQ, renderContatti, renderPrivacy, renderCookie
} from './views.js';

const SITE = 'https://infanziaroverchiara.it';
const SUFFIX = ' | Scuola Sacra Famiglia · Roverchiara';

const routes = {
    '/':          { render: renderHome,       title: 'Scuola dell\'Infanzia Sacra Famiglia · Roverchiara (VR)', desc: "Scuola dell'infanzia paritaria a Roverchiara (VR), associata FISM. Dove il bambino impara ad essere se stesso." },
    '/metodo':    { render: renderMetodo,     title: 'Il Metodo' + SUFFIX,    desc: 'Il nostro approccio pedagogico: gioco destrutturato, bambino al centro e alleanza educativa con le famiglie.' },
    '/servizi':   { render: renderServizi,    title: 'Servizi' + SUFFIX,      desc: 'Sezione Primavera, mensa interna, entrata anticipata, post-orario e laboratori della scuola dell\'infanzia Sacra Famiglia.' },
    '/team':      { render: renderTeam,       title: 'Il Team' + SUFFIX,      desc: 'Le insegnanti che accompagnano i bambini con passione verso l\'autonomia e uno sviluppo globale.' },
    '/iscrizioni':{ render: renderIscrizioni, title: 'Iscrizioni' + SUFFIX,   desc: 'Open Day, rette calmierate e procedura di iscrizione alla scuola dell\'infanzia Sacra Famiglia di Roverchiara.' },
    '/faq':       { render: renderFAQ,        title: 'Domande frequenti (FAQ)' + SUFFIX, desc: 'Le risposte ai dubbi più comuni dei genitori: orari, rette, mensa, Sezione Primavera e insegnanti.' },
    '/contatti':  { render: renderContatti,   title: 'Contatti' + SUFFIX,     desc: 'Indirizzo, telefono, email e orari di segreteria della scuola dell\'infanzia Sacra Famiglia a Roverchiara (VR).' },
    '/privacy':   { render: renderPrivacy,    title: 'Privacy Policy' + SUFFIX, desc: 'Informativa sul trattamento dei dati personali (GDPR) del sito infanziaroverchiara.it.' },
    '/cookie':    { render: renderCookie,     title: 'Cookie Policy' + SUFFIX,  desc: 'Informativa sull\'uso dei cookie del sito infanziaroverchiara.it.' }
};

const notFound = {
    render: async () => `
        <section class="pt-40 pb-32 bg-white text-center">
            <div class="container mx-auto px-6 max-w-xl">
                <span class="inline-block text-xs font-bold uppercase tracking-[0.25em] text-gold mb-4">Errore 404</span>
                <h1 class="text-5xl font-display font-bold text-sage mb-5">Pagina non trovata</h1>
                <p class="text-ink/60 mb-10">La pagina che cerchi non esiste o è stata spostata.</p>
                <a href="/" class="bg-sage text-white px-8 py-4 rounded-full font-semibold hover:bg-sage-dark transition-all inline-flex items-center gap-2"><i data-lucide="home" class="w-5 h-5"></i> Torna alla home</a>
            </div>
        </section>`,
    title: 'Pagina non trovata' + SUFFIX,
    desc: 'La pagina che cerchi non esiste o è stata spostata.'
};

let currentObserver = null;
let firstRender = true;

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
    const isKnown = !!routes[path];
    const route = routes[path] || notFound;
    const app = document.getElementById('app');

    app.classList.add('is-leaving');

    await wait(280);

    app.innerHTML = await route.render();
    window.scrollTo(0, 0);

    document.title = route.title;
    setMeta('name', 'description', route.desc);

    // Canonical + og:url specifici per pagina (SEO)
    const canonicalUrl = SITE + (isKnown ? path : '/');
    setLink('canonical', canonicalUrl);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:title', route.title);
    setMeta('property', 'og:description', route.desc);

    updateFaqSchema(path === '/faq');
    updateActiveLinks(path);
    if (window.lucide) lucide.createIcons();
    initScrollAnimations();

    // Accessibilità: alla navigazione (non al primo caricamento) sposta il
    // focus sul titolo della pagina e annuncia il cambio agli screen reader.
    if (!firstRender) {
        const heading = app.querySelector('h1');
        if (heading) {
            heading.setAttribute('tabindex', '-1');
            heading.focus({ preventScroll: true });
        }
        const announcer = document.getElementById('route-announcer');
        if (announcer) announcer.textContent = route.title.split('|')[0].trim() + ' — pagina caricata';
    }
    firstRender = false;

    requestAnimationFrame(() => app.classList.remove('is-leaving'));
}

function setMeta(attr, key, value) {
    const el = document.querySelector(`meta[${attr}="${key}"]`);
    if (el && value) el.setAttribute('content', value);
}

function setLink(rel, href) {
    const el = document.querySelector(`link[rel="${rel}"]`);
    if (el) el.setAttribute('href', href);
}

// Dati strutturati FAQ (schema.org/FAQPage) solo sulla pagina FAQ
async function updateFaqSchema(isFaq) {
    const existing = document.getElementById('faq-schema');
    if (existing) existing.remove();
    if (!isFaq) return;
    try {
        const data = await (await fetch('data.json')).json();
        const json = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: data.faq.map(f => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a }
            }))
        };
        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.id = 'faq-schema';
        s.textContent = JSON.stringify(json);
        document.head.appendChild(s);
    } catch (e) { /* no-op */ }
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
