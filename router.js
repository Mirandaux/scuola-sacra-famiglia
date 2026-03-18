import { renderHome, renderMetodo, renderServizi, renderTeam, renderIscrizioni, renderFAQ, renderContatti } from './views.js';

const routes = {
    '/': { render: renderHome, title: 'Home | Scuola Materna Sacra Famiglia', desc: 'Scuola dell\'infanzia paritaria a Roverchiara (VR). Dove il bambino impara ad essere se stesso.' },
    '/metodo': { render: renderMetodo, title: 'Il Metodo | Scuola Materna Sacra Famiglia', desc: 'Il nostro approccio pedagogico: gioco destrutturato e bambino al centro.' },
    '/servizi': { render: renderServizi, title: 'Servizi | Scuola Materna Sacra Famiglia', desc: 'Sezione primavera, mensa interna, post-orario e laboratori.' },
    '/team': { render: renderTeam, title: 'Il Team | Scuola Materna Sacra Famiglia', desc: 'Le educatrici che accompagnano i vostri figli con passione e stabilità.' },
    '/iscrizioni': { render: renderIscrizioni, title: 'Iscrizioni | Scuola Materna Sacra Famiglia', desc: 'Informazioni su rette ISEE e procedura di iscrizione.' },
    '/faq': { render: renderFAQ, title: 'FAQ | Scuola Materna Sacra Famiglia', desc: 'Domande frequenti per i genitori.' },
    '/contatti': { render: renderContatti, title: 'Contatti | Scuola Materna Sacra Famiglia', desc: 'Contattaci o vieni a trovarci a Roverchiara.' }
};

export function initRouter() {
    window.addEventListener('hashchange', handleRouteChange);
    handleRouteChange();
}

async function handleRouteChange() {
    const hash = window.location.hash.replace('#', '') || '/';
    const route = routes[hash] || routes['/'];

    const app = document.getElementById('app');
    app.classList.add('opacity-0');
    
    setTimeout(async () => {
        app.innerHTML = await route.render();
        window.scrollTo(0, 0);
        

        document.title = route.title;
        const metaDesc = document.querySelector('meta[name=\"description\"]');
        if (metaDesc) metaDesc.setAttribute('content', route.desc);

        updateActiveLinks(hash);
        lucide.createIcons();
        initScrollAnimations();
        
        app.classList.remove('opacity-0');
    }, 200);
}

function updateActiveLinks(currentHash) {
    document.querySelectorAll('.nav-link').forEach(link => {
        const route = link.getAttribute('data-route');
        if (route === currentHash) {
            link.classList.add('text-[#F5A623]', 'font-bold');
        } else {
            link.classList.remove('text-[#F5A623]', 'font-bold');
        }
    });
}

function initScrollAnimations() {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        ScrollTrigger.create({
            trigger: el,
            start: "top 92%",
            onEnter: () => el.classList.add('active')
        });
    });

    const counterVals = document.querySelectorAll('.counter-val');
    counterVals.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        ScrollTrigger.create({
            trigger: counter,
            start: "top 95%",
            onEnter: () => animateCounter(counter, target)
        });
    });
}

function animateCounter(el, target) {
    let count = 0;
    const duration = 2000;
    const start = performance.now();

    const update = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const current = Math.floor(progress * target);
        
        let suffix = '';
        if (target === 24 || target === 80) suffix = '+';
        
        el.innerText = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.innerText = target + suffix;
        }
    };
    requestAnimationFrame(update);
}
