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
    window.addEventListener('hashchange', handleRouteChange);
    handleRouteChange();
}

async function handleRouteChange() {
    const hash = window.location.hash.replace('#', '') || '/';
    const route = routes[hash] || routes['/'];
    const app = document.getElementById('app');

    app.classList.add('is-leaving');

    await wait(280);

    app.innerHTML = await route.render();
    window.scrollTo(0, 0);

    document.title = route.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', route.desc);

    updateActiveLinks(hash);
    if (window.lucide) lucide.createIcons();
    initScrollAnimations();

    // Force reflow, then reveal
    requestAnimationFrame(() => app.classList.remove('is-leaving'));
}

function updateActiveLinks(currentHash) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('data-route') === currentHash);
    });
}

function initScrollAnimations() {
    if (currentObserver) currentObserver.disconnect();

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
        // subtle stagger via inline delay
        if (el.classList.contains('reveal') && !el.style.transitionDelay) {
            el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
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
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        el.textContent = Math.floor(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
}

const wait = (ms) => new Promise(r => setTimeout(r, ms));
