let _data = null;
async function fetchData() {
    if (_data) return _data;
    const res = await fetch('data.json');
    _data = await res.json();
    return _data;
}

/* ---------- Shared building blocks ---------- */

function contactButtons() {
    return `
        <div class="flex flex-wrap gap-4 justify-center">
            <a href="tel:044274383" class="bg-white text-sage px-8 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                <i data-lucide="phone" class="w-5 h-5"></i> 0442 74383
            </a>
            <a href="mailto:info@infanziaroverchiara.it" class="bg-gold text-white px-8 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                <i data-lucide="mail" class="w-5 h-5"></i> Scrivici una mail
            </a>
        </div>`;
}

function sectionHeading(eyebrow, title, sub, dark = false) {
    const titleColor = dark ? 'text-white' : 'text-sage';
    const subColor = dark ? 'text-white/80' : 'text-ink/50';
    return `
        <div class="max-w-2xl mx-auto text-center mb-16 reveal">
            <span class="inline-block text-xs font-bold uppercase tracking-[0.25em] text-gold mb-4">${eyebrow}</span>
            <h2 class="text-3xl md:text-5xl font-display font-bold ${titleColor} mb-5">${title}</h2>
            ${sub ? `<p class="${subColor} text-lg leading-relaxed">${sub}</p>` : ''}
        </div>`;
}

const OPEN_DAY = "Ogni anno è possibile visitare la scuola a dicembre e gennaio nelle giornate di Open Day. La segreteria risponde dalle 8:30 alle 12:00 lun - ven per darvi le informazioni necessarie";

function ctaBanner(title, sub = OPEN_DAY) {
    return `
        <section class="py-24 bg-sage relative overflow-hidden">
            <div class="blob w-72 h-72 bg-gold/30 -top-10 -right-10"></div>
            <div class="container mx-auto px-6 text-center relative z-10">
                <h2 class="text-3xl md:text-4xl font-display font-bold text-white mb-6 reveal">${title}</h2>
                <p class="max-w-2xl mx-auto mb-10 text-white/85 text-lg reveal">${sub}</p>
                <div class="reveal">${contactButtons()}</div>
            </div>
        </section>`;
}

/* ---------- HOME ---------- */

export async function renderHome() {
    const data = await fetchData();

    const trustItems = ['Iscritta FISM', 'Paritaria MIUR', 'Cucina Interna', 'Calendario Ministeriale', 'Entrata anticipata 7:30', 'Post-orario 18:00', 'Sezione Primavera'];
    const marquee = trustItems.concat(trustItems).map(t => `
        <span class="flex items-center gap-2 text-sage/80 font-semibold whitespace-nowrap">
            <i data-lucide="check-circle" class="w-4 h-4 text-gold"></i> ${t}
        </span>`).join('');

    const counters = data.counters.map(c => `
        <div class="reveal">
            <i data-lucide="${c.icon}" class="w-7 h-7 text-gold mx-auto mb-3"></i>
            <div class="text-4xl md:text-5xl font-display font-bold mb-2 counter-val" data-target="${c.val}" data-suffix="${c.suffix}">0</div>
            <p class="text-xs md:text-sm opacity-80 uppercase tracking-widest">${c.label}</p>
        </div>`).join('');

    return `
        <!-- HERO -->
        <section class="relative min-h-[92vh] flex items-center pt-32 pb-20 overflow-hidden">
            <div class="blob w-[28rem] h-[28rem] bg-sage/20 -top-20 -left-24"></div>
            <div class="blob w-[24rem] h-[24rem] bg-gold/20 top-40 right-0" style="animation-delay:-5s"></div>
            <div class="container mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
                <div class="lg:col-span-7">
                    <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage/10 text-sage text-sm font-semibold mb-6 reveal">
                        <i data-lucide="sparkles" class="w-4 h-4 text-gold"></i> Paritaria FISM dal 2000
                    </span>
                    <h1 class="text-5xl md:text-7xl font-display font-bold text-sage leading-[1.05] mb-6 reveal">
                        Dove il bambino impara ad essere <span class="hero-highlight text-gold italic">se stesso.</span>
                    </h1>
                    <p class="text-lg md:text-xl text-ink/70 mb-10 leading-relaxed max-w-xl reveal">
                        Scuola dell'infanzia paritaria FISM a Roverchiara. Un ambiente di apprendimento caldo e familiare, dove il gioco diventa scoperta e ogni giornata è pensata a misura di bambino per favorire l'autonomia.
                    </p>
                    <div class="flex flex-wrap gap-4 reveal">
                        <a href="/iscrizioni" class="bg-sage text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl shadow-sage/20 hover:bg-sage-dark hover:scale-105 transition-all flex items-center gap-2">
                            Prenota una visita <i data-lucide="arrow-right" class="w-5 h-5"></i>
                        </a>
                        <a href="/metodo" class="border-2 border-sage/20 text-sage px-8 py-4 rounded-full text-lg font-semibold hover:border-sage hover:bg-sage hover:text-white transition-all">
                            Scopri il metodo
                        </a>
                    </div>
                </div>
                <div class="lg:col-span-5 reveal">
                    <div class="relative">
                        <div class="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] rotate-2 hover:rotate-0 transition-transform duration-700">
                            <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop" alt="Bambini che giocano" class="w-full h-full object-cover" loading="eager">
                        </div>
                        <div class="absolute -bottom-6 -left-6 bg-white rounded-3xl shadow-xl p-5 flex items-center gap-4 max-w-[15rem]">
                            <span class="w-12 h-12 rounded-2xl bg-gold/15 text-gold flex items-center justify-center shrink-0">
                                <i data-lucide="utensils"></i>
                            </span>
                            <p class="text-sm font-semibold text-sage leading-snug">Cucina interna con menu freschi ogni giorno</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- TRUST MARQUEE -->
        <div class="marquee overflow-hidden border-y border-sage/10 bg-white/60 py-5">
            <div class="marquee-track">${marquee}</div>
        </div>

        <!-- COUNTERS -->
        <section class="py-20 bg-sage text-white relative overflow-hidden">
            <div class="container mx-auto px-6">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center max-w-3xl mx-auto">
                    ${counters}
                </div>
            </div>
        </section>

        <!-- UNA GIORNATA CON NOI -->
        <section class="py-24 bg-white">
            <div class="container mx-auto px-6">
                ${sectionHeading('Il ritmo dei giorni', 'Una giornata con noi', 'I momenti che scandiscono la crescita dei nostri piccoli, dall\'accoglienza al saluto.')}
                ${dayTimeline(data.day)}
            </div>
        </section>

        <!-- GENITORI ATTIVI -->
        <section class="py-24 bg-cream">
            <div class="container mx-auto px-6">
                ${sectionHeading('Comunità', 'Genitori attivi e associazioni', 'La scuola è una comunità: il coinvolgimento dei genitori e delle associazioni paesane è il cuore pulsante delle nostre iniziative didattiche ed extra-didattiche.')}
                <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    ${data.parents.map(p => `
                        <div class="reveal lift bg-white p-10 rounded-4xl border border-sage/10 text-center flex flex-col">
                            <div class="w-16 h-16 mx-auto rounded-2xl bg-sage/10 text-gold flex items-center justify-center mb-6">
                                <i data-lucide="${p.icon}" class="w-8 h-8"></i>
                            </div>
                            <h3 class="text-2xl font-display font-bold text-sage mb-3">${p.title}</h3>
                            <p class="text-ink/60 mb-6 leading-relaxed">${p.text}</p>
                            ${p.bullets
                                ? `<ul class="mt-auto space-y-2 text-left inline-block mx-auto">
                                    ${p.bullets.map(b => `<li class="flex items-center gap-2 text-sage font-semibold text-sm"><i data-lucide="check" class="w-4 h-4 text-gold shrink-0"></i> ${b}</li>`).join('')}
                                   </ul>`
                                : `<a href="tel:044274383" class="mt-auto inline-flex items-center gap-2 border border-sage/20 text-sage px-6 py-2.5 rounded-full text-sm font-bold hover:bg-sage hover:text-white transition-all self-center">
                                    <i data-lucide="hand-heart" class="w-4 h-4"></i> Unisciti
                                   </a>`}
                        </div>`).join('')}
                </div>
            </div>
        </section>

        <!-- CONTRIBUTI -->
        <section class="py-24 bg-sage text-white relative overflow-hidden">
            <div class="blob w-80 h-80 bg-gold/20 bottom-0 -left-20"></div>
            <div class="container mx-auto px-6 relative z-10">
                ${sectionHeading('Trasparenza', 'I contributi che ci sostengono', 'Il nostro impegno è reso possibile anche grazie al supporto delle istituzioni che credono nel valore dell\'educazione paritaria.', true)}
                <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                    ${data.contribCards.map(c => `
                        <div class="reveal lift p-8 border border-white/15 rounded-4xl bg-white/5 text-center backdrop-blur-sm">
                            <i data-lucide="${c.icon}" class="w-11 h-11 text-gold mx-auto mb-5"></i>
                            <h3 class="font-bold text-xl mb-3">${c.title}</h3>
                            <p class="text-sm text-white/75 leading-relaxed">${c.text}</p>
                        </div>`).join('')}
                </div>
                ${contributiTable(data.contributi)}
            </div>
        </section>

        ${ctaBanner('Vuoi vedere la scuola di persona?')}
    `;
}

/* ---------- Timeline helper ---------- */

function dayTimeline(day) {
    const goldIdx = new Set([2, 5]); // Pranzo & Uscita as milestones

    const node = (item, i) => {
        const gold = goldIdx.has(i);
        const bg = gold ? 'bg-gold' : 'bg-sage';
        return `
            <div class="timeline-node text-center relative reveal">
                <div class="timeline-dot w-14 h-14 mx-auto rounded-2xl ${bg} text-white flex items-center justify-center shadow-lg relative z-10">
                    <i data-lucide="${item.icon}" class="w-6 h-6"></i>
                </div>
                <div class="text-xs font-bold text-gold mt-4">${item.time}</div>
                <div class="font-display font-bold text-sage mt-1">${item.label}</div>
                <div class="text-xs text-ink/50 mt-1 max-w-[190px] mx-auto leading-relaxed">${item.desc}</div>
            </div>`;
    };

    const row = (items, offset) => `
        <div class="grid grid-cols-3 gap-8 relative">
            <div class="absolute top-7 left-[16.66%] right-[16.66%] h-0.5 timeline-line"></div>
            ${items.map((it, i) => node(it, offset + i)).join('')}
        </div>`;

    const mobile = day.map((item, i) => {
        const gold = goldIdx.has(i);
        const bg = gold ? 'bg-gold' : 'bg-sage';
        const last = i === day.length - 1;
        return `
            <div class="flex gap-5 reveal">
                <div class="flex flex-col items-center">
                    <div class="w-12 h-12 rounded-2xl ${bg} text-white flex items-center justify-center shadow-md shrink-0">
                        <i data-lucide="${item.icon}" class="w-5 h-5"></i>
                    </div>
                    ${last ? '' : '<div class="w-0.5 flex-1 bg-[#c8e6da] my-1"></div>'}
                </div>
                <div class="pb-8 pt-1">
                    <div class="text-xs font-bold text-gold">${item.time}</div>
                    <div class="font-display font-bold text-sage text-lg">${item.label}</div>
                    <div class="text-sm text-ink/50 mt-0.5">${item.desc}</div>
                </div>
            </div>`;
    }).join('');

    return `
        <div class="hidden md:block space-y-16 max-w-5xl mx-auto">
            ${row(day.slice(0, 3), 0)}
            ${row(day.slice(3, 6), 3)}
        </div>
        <div class="md:hidden max-w-sm mx-auto">${mobile}</div>`;
}

/* ---------- Contributi table helper ---------- */

function contributiTable(rows) {
    const body = rows.map(r => `
        <div class="flex items-center justify-between gap-4 px-6 md:px-8 py-5 hover:bg-white/5 transition-colors">
            <div class="text-left">
                <span class="text-gold font-bold text-sm uppercase tracking-wider">${r.year}</span>
                <p class="font-medium mt-1 text-sm md:text-base">${r.law}</p>
            </div>
            ${r.pdf
                ? `<a href="${r.pdf}" target="_blank" rel="noopener" class="flex items-center gap-2 text-gold text-sm font-semibold hover:opacity-80 transition-opacity shrink-0">
                       <i data-lucide="download" class="w-4 h-4"></i> <span class="hidden sm:inline">Scarica</span> PDF
                   </a>`
                : `<span class="text-xs text-white/40 shrink-0">PDF non disponibile</span>`}
        </div>`).join('');

    return `
        <div class="max-w-3xl mx-auto border border-white/15 rounded-4xl bg-white/5 overflow-hidden reveal">
            <div class="px-6 md:px-8 py-5 border-b border-white/10 flex items-center gap-3">
                <i data-lucide="scale" class="w-5 h-5 text-gold"></i>
                <h3 class="font-bold text-base md:text-lg tracking-wide text-left">Erogazioni pubbliche — Legge n. 124/2017, art. 1 commi 125-129</h3>
            </div>
            <div class="divide-y divide-white/10">${body}</div>
        </div>`;
}

/* ---------- IL METODO ---------- */

export async function renderMetodo() {
    const data = await fetchData();
    return `
        <section class="pt-40 pb-20 bg-white relative overflow-hidden">
            <div class="blob w-80 h-80 bg-sage/10 -top-10 right-0"></div>
            <div class="container mx-auto px-6 max-w-4xl relative z-10">
                <div class="text-center mb-12 reveal">
                    <span class="inline-block text-xs font-bold uppercase tracking-[0.25em] text-gold mb-4">Il nostro metodo</span>
                    <h1 class="text-5xl md:text-6xl font-display font-bold text-sage">Pedagogia Viva</h1>
                </div>
                <div class="space-y-6 text-lg text-ink/70 leading-relaxed reveal">
                    <p>Alla Scuola Sacra Famiglia l'educazione non è un travaso di nozioni, ma dare nutrimento ad un seme. Ci ispiriamo ai principi della <strong class="text-sage">pedagogia attiva</strong>, dove l'ambiente è il "terzo educatore".</p>
                    <p>Rifiutiamo l'approccio standardizzato. Ogni bambino ha tanti linguaggi diversi per apprendere: osservazione, manipolazione, movimento, musicalità, creatività. La nostra programmazione è flessibile e si adatta ai bambini.</p>
                    <p>La relazione scuola-famiglia è il nostro pilastro. Non siamo un semplice servizio di custodia, ma un partner nel percorso di crescita di tuo figlio.</p>
                </div>
            </div>
        </section>

        <section class="py-24 bg-cream">
            <div class="container mx-auto px-6">
                ${sectionHeading('Valori', 'I nostri principi fondanti', 'Cinque pilastri che guidano ogni scelta educativa.')}
                <div class="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                    ${data.method.map(m => `
                        <div class="reveal lift p-8 bg-white rounded-4xl border border-sage/10">
                            <div class="w-12 h-12 bg-sage/10 rounded-2xl flex items-center justify-center text-gold mb-6">
                                <i data-lucide="${m.icon}"></i>
                            </div>
                            <h3 class="font-display font-bold text-xl text-sage mb-3">${m.title}</h3>
                            <p class="text-ink/55 text-sm leading-relaxed">${m.text}</p>
                        </div>`).join('')}
                </div>
            </div>
        </section>

        <section class="py-24 bg-white">
            <div class="container mx-auto px-6 max-w-5xl">
                ${sectionHeading('Come lavoriamo', 'Progetti in itinere', 'Non seguiamo binari prestabiliti: costruiamo il percorso insieme ai bambini, partendo dall\'ascolto.')}
                <div class="grid md:grid-cols-3 gap-10">
                    ${[
                        { icon: 'eye', t: 'Osservazione', d: "L'insegnante osserva e ascolta gli interessi e i bisogni dei bambini durante tutta la giornata educativa." },
                        { icon: 'sparkles', t: 'Trasformazione', d: "L'interesse diventa progetto: si allestiscono spazi e materiali per approfondire la scoperta." },
                        { icon: 'share-2', t: 'Condivisione', d: "L'esperienza viene documentata e condivisa con le famiglie e la comunità per valorizzare il fare del bambino." }
                    ].map((s, i) => `
                        <div class="text-center reveal">
                            <div class="w-16 h-16 mx-auto bg-cream rounded-full flex items-center justify-center shadow-sm text-gold mb-5 relative">
                                <span class="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-sage text-white text-xs font-bold flex items-center justify-center">${i + 1}</span>
                                <i data-lucide="${s.icon}" class="w-7 h-7"></i>
                            </div>
                            <h3 class="font-bold text-sage text-lg mb-2">${s.t}</h3>
                            <p class="text-sm text-ink/55 leading-relaxed">${s.d}</p>
                        </div>`).join('')}
                </div>
            </div>
        </section>

        <section class="py-24 bg-sage-light border-y border-sage/10">
            <div class="container mx-auto px-6 max-w-5xl">
                <blockquote class="text-center mb-16 reveal">
                    <p class="text-2xl md:text-3xl font-display italic text-sage leading-relaxed">"Lo spazio è un contenitore che si lascia plasmare e abitare dai bambini."</p>
                    <footer class="text-xs font-bold uppercase tracking-[0.25em] mt-5 text-sage/60">— Loris Malaguzzi</footer>
                </blockquote>
                <div class="grid md:grid-cols-3 gap-6">
                    ${[
                        { icon: 'layout-dashboard', t: 'Spazi flessibili' },
                        { icon: 'tree-pine', t: 'Materiali naturali' },
                        { icon: 'maximize', t: 'Libertà di movimento' }
                    ].map(x => `
                        <div class="reveal bg-white/70 backdrop-blur-sm p-6 rounded-3xl border border-sage/10 text-center shadow-sm">
                            <i data-lucide="${x.icon}" class="w-6 h-6 mx-auto mb-3 text-gold"></i>
                            <span class="text-sm font-bold text-sage">${x.t}</span>
                        </div>`).join('')}
                </div>
            </div>
        </section>

        <section class="py-24 bg-cream">
            <div class="container mx-auto px-6 max-w-5xl">
                ${sectionHeading('Eventi', 'Feste scolastiche e manifestazioni comunitarie', 'Le insegnanti organizzano feste interne dove i bambini sono protagonisti attivi e manifestazioni rivolte alla comunità.')}
                <div class="grid md:grid-cols-3 gap-8">
                    ${[
                        { icon: 'party-popper', t: 'Festa dell\'accoglienza e Pranzo di Gala di Natale' },
                        { icon: 'drama', t: 'Recita di Natale e Fine anno' },
                        { icon: 'gift', t: 'Consegna doni', list: ['ai nonni nelle case di riposo limitrofe', 'a insegnanti e alunni delle scuole di grado superiore del paese'] }
                    ].map(e => `
                        <div class="reveal lift bg-cream rounded-4xl p-8 border border-sage/10 flex items-start gap-4">
                            <span class="w-12 h-12 rounded-2xl bg-white text-gold flex items-center justify-center shrink-0 shadow-sm"><i data-lucide="${e.icon}" class="w-6 h-6"></i></span>
                            <div class="pt-1.5">
                                <p class="text-sage font-semibold leading-snug">${e.t}</p>
                                ${e.list ? `<ul class="mt-2 space-y-1.5">
                                    ${e.list.map(li => `<li class="flex items-start gap-2 text-ink/60 text-sm leading-snug"><i data-lucide="check" class="w-4 h-4 text-gold shrink-0 mt-0.5"></i> ${li}</li>`).join('')}
                                </ul>` : ''}
                            </div>
                        </div>`).join('')}
                </div>
            </div>
        </section>

        <section class="py-24 bg-white">
            <div class="container mx-auto px-6 max-w-5xl">
                ${sectionHeading('Il confronto', 'In cosa ci differenziamo', '')}
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="p-10 bg-sage rounded-[2.5rem] text-white reveal lift">
                        <h3 class="text-2xl font-display font-bold mb-8 flex items-center gap-3"><i data-lucide="sprout" class="text-gold"></i> Sacra Famiglia</h3>
                        <ul class="space-y-6">
                            ${data.comparison.map(c => `
                                <li class="border-b border-white/10 pb-4">
                                    <span class="block text-xs uppercase opacity-60 mb-1">${c.label}</span>
                                    <span class="font-medium">${c.sacra}</span>
                                </li>`).join('')}
                        </ul>
                    </div>
                    <div class="p-10 bg-cream rounded-[2.5rem] text-ink/50 reveal">
                        <h3 class="text-2xl font-display font-bold mb-8 text-ink/40">Scuola Statale Standard</h3>
                        <ul class="space-y-6">
                            ${data.comparison.map(c => `
                                <li class="border-b border-ink/10 pb-4">
                                    <span class="block text-xs uppercase opacity-60 mb-1">${c.label}</span>
                                    <span class="font-medium">${c.statale}</span>
                                </li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        ${ctaBanner('Vivi i nostri valori ogni giorno')}
    `;
}

/* ---------- SERVIZI ---------- */

export async function renderServizi() {
    const data = await fetchData();
    const serviceCard = (s) => `
        <div class="reveal lift p-8 bg-cream rounded-[2rem] border border-transparent hover:border-gold/30 group">
            <div class="flex justify-between items-start mb-6">
                <div class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-sage group-hover:text-gold group-hover:scale-110 transition-all shadow-sm">
                    <i data-lucide="${s.icon}"></i>
                </div>
                ${s.isNew ? '<span class="bg-gold text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">In Arrivo</span>' : ''}
            </div>
            <div class="flex justify-between items-center gap-2 mb-3">
                <h3 class="text-xl font-display font-bold text-sage">${s.title}</h3>
                <span class="text-[10px] uppercase font-bold text-gold bg-gold/10 px-3 py-1 rounded-full whitespace-nowrap">${s.age}</span>
            </div>
            <p class="text-ink/55 text-sm mb-6 leading-relaxed">${s.desc}</p>
            <div class="pt-4 border-t border-sage/10 flex items-center gap-2 text-xs font-bold text-sage/60">
                <i data-lucide="clock" class="w-4 h-4"></i> ${s.hours}
            </div>
        </div>`;
    const featured = data.services.slice(0, 2);
    const rest = data.services.slice(2);
    return `
        <section class="pt-40 pb-16 bg-cream text-center relative overflow-hidden">
            <div class="blob w-72 h-72 bg-gold/15 -top-10 -left-10"></div>
            <div class="container mx-auto px-6 relative z-10 reveal">
                <span class="inline-block text-xs font-bold uppercase tracking-[0.25em] text-gold mb-4">Offerta educativa</span>
                <h1 class="text-5xl font-display font-bold text-sage mb-6">Un'offerta completa</h1>
                <p class="text-ink/60 max-w-2xl mx-auto text-lg">Tutto ciò che serve per la crescita armonica del bambino.</p>
            </div>
        </section>

        <section class="py-20 bg-white">
            <div class="container mx-auto px-6">
                <h2 class="sr-only">I nostri servizi</h2>
                <div class="grid md:grid-cols-2 gap-6 mb-6">
                    ${featured.map(serviceCard).join('')}
                </div>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${rest.map(serviceCard).join('')}
                </div>
            </div>
        </section>

        ${ctaBanner('Hai domande sui nostri servizi?')}
    `;
}

/* ---------- TEAM ---------- */

export async function renderTeam() {
    const data = await fetchData();
    return `
        <section class="pt-40 pb-24 bg-cream">
            <div class="container mx-auto px-6 text-center">
                <div class="reveal max-w-3xl mx-auto mb-16">
                    <span class="inline-block text-xs font-bold uppercase tracking-[0.25em] text-gold mb-4">Chi siamo</span>
                    <h1 class="text-5xl font-display font-bold text-sage mb-6">Il Nostro Team</h1>
                    <p class="text-ink/60 text-lg italic font-display">"Un gruppo unito e coeso che ogni giorno concretizza il pensiero educativo che mette il bambino al centro."</p>
                </div>
                <div class="reveal max-w-4xl mx-auto">
                    ${data.teamPhoto
                        ? `<div class="relative overflow-hidden rounded-[2.5rem] shadow-xl border border-sage/10 aspect-[16/10]">
                                <img src="${data.teamPhoto}" alt="La squadra della Scuola Sacra Famiglia: maestre, segretaria e cuoche" loading="lazy" class="w-full h-full object-cover">
                                <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sage/80 to-transparent p-6 pt-16">
                                    <p class="text-white font-display text-lg font-bold text-left">Maestre, segreteria e cuoche</p>
                                </div>
                           </div>`
                        : `<div class="rounded-[2.5rem] border-2 border-dashed border-sage/25 bg-sage-light/40 aspect-[16/10] flex flex-col items-center justify-center text-center p-8">
                                <span class="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-gold shadow-sm mb-5"><i data-lucide="camera" class="w-8 h-8"></i></span>
                                <span class="inline-block bg-gold text-white text-xs font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full mb-4">In arrivo</span>
                                <p class="font-display text-xl font-bold text-sage">Foto della squadra in arrivo</p>
                                <p class="text-ink/50 text-sm mt-2">Maestre, segreteria e cuoche</p>
                           </div>`}
                </div>
                <div class="mt-16 p-10 bg-white rounded-4xl border border-sage/10 max-w-2xl mx-auto reveal">
                    <i data-lucide="quote" class="w-8 h-8 text-gold mx-auto mb-4"></i>
                    <p class="italic text-ink/60 font-display text-lg">"Le nostre insegnanti sono guide attente che accompagnano ogni bambino nella sua unicità verso l'autonomia e uno sviluppo globale."</p>
                </div>
            </div>
        </section>
    `;
}

/* ---------- ISCRIZIONI ---------- */

export async function renderIscrizioni() {
    const steps = [
        { n: '1', t: 'Prenota una visita', d: 'Prenota la visita durante le giornate di Open Day.' },
        { n: '2', t: 'Conosci la scuola', d: 'Visita le aule, il giardino e incontra le educatrici per parlare del metodo.' },
        { n: '3', t: 'Iscrizione', d: "Ricevi i moduli e completa l'iscrizione con il supporto della segreteria." }
    ];
    return `
        <section class="pt-40 pb-16 bg-white text-center relative overflow-hidden">
            <div class="blob w-72 h-72 bg-sage/10 top-10 right-0"></div>
            <div class="container mx-auto px-6 relative z-10 reveal">
                <span class="inline-block text-xs font-bold uppercase tracking-[0.25em] text-gold mb-4">Unisciti a noi</span>
                <h1 class="text-5xl font-display font-bold text-sage mb-6">Inizia il percorso con noi</h1>
                <p class="text-ink/60 max-w-2xl mx-auto text-lg font-display italic">Accogliamo i bambini in un ambiente sereno, stimolante e sicuro. Scopri come far parte della nostra famiglia.</p>
            </div>
        </section>

        <section class="pb-20 bg-white">
            <div class="container mx-auto px-6">
                <div class="bg-sage-light rounded-[2.5rem] p-10 md:p-16 reveal">
                    <h2 class="text-3xl font-display font-bold text-sage mb-10 text-center">Scuola Aperta in 3 passi</h2>
                    <div class="grid md:grid-cols-3 gap-6">
                        ${steps.map(s => `
                            <div class="bg-white p-8 rounded-3xl shadow-sm">
                                <div class="w-12 h-12 bg-sage text-white rounded-2xl flex items-center justify-center font-bold text-lg mb-6">${s.n}</div>
                                <h3 class="font-bold text-sage mb-2 text-lg">${s.t}</h3>
                                <p class="text-sm text-ink/55 leading-relaxed">${s.d}</p>
                            </div>`).join('')}
                    </div>
                </div>
            </div>
        </section>

        <section class="py-20 bg-cream">
            <div class="container mx-auto px-6 grid md:grid-cols-2 gap-10 max-w-5xl">
                <div class="space-y-8 reveal">
                    <div>
                        <h3 class="text-2xl font-display font-bold text-sage mb-3 flex items-center gap-3"><i data-lucide="calendar-clock" class="text-gold"></i> Quando iscriversi</h3>
                        <p class="text-ink/65 leading-relaxed">La segreteria è aperta per informazioni e iscrizioni ogni mattina dalle <strong class="text-sage">08:30 alle 12:00</strong>, dal lunedì al venerdì. Riceviamo tutto l'anno previa disponibilità posti.</p>
                    </div>
                    <div>
                        <h3 class="text-2xl font-display font-bold text-sage mb-3 flex items-center gap-3"><i data-lucide="users" class="text-gold"></i> A chi è rivolta</h3>
                        <ul class="space-y-2 text-ink/65">
                            <li class="flex items-center gap-2"><i data-lucide="check" class="text-gold w-4 h-4"></i> Sezione Primavera: 24-36 mesi</li>
                            <li class="flex items-center gap-2"><i data-lucide="check" class="text-gold w-4 h-4"></i> Scuola dell'Infanzia: 3-6 anni</li>
                        </ul>
                    </div>
                </div>
                <div class="bg-sage text-white p-10 rounded-[2.5rem] reveal lift">
                    <h3 class="text-2xl font-display font-bold mb-6 flex items-center gap-3"><i data-lucide="piggy-bank" class="text-gold"></i> Quanto costa?</h3>
                    <div class="space-y-4 text-sm text-white/85 leading-relaxed">
                        <p>Crediamo nell'accessibilità: applichiamo <strong class="text-white">rette calmierate</strong> grazie ai contributi pubblici, per venire incontro alle esigenze di ogni famiglia.</p>
                    </div>
                    <div class="mt-8 pt-6 border-t border-white/20">
                        <a href="/contatti" class="inline-flex items-center gap-2 bg-gold text-white px-6 py-3 rounded-full text-sm font-bold hover:scale-105 transition-transform">
                            Richiedi info sui costi <i data-lucide="arrow-right" class="w-4 h-4"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        ${ctaBanner('Siamo a tua disposizione')}
    `;
}

/* ---------- FAQ ---------- */

export async function renderFAQ() {
    const data = await fetchData();
    return `
        <section class="pt-40 pb-24 bg-white">
            <div class="container mx-auto px-6 max-w-3xl">
                <div class="text-center mb-14 reveal">
                    <span class="inline-block text-xs font-bold uppercase tracking-[0.25em] text-gold mb-4">Domande frequenti</span>
                    <h1 class="text-5xl font-display font-bold text-sage mb-4">FAQ</h1>
                    <p class="text-ink/50 italic font-display">Le risposte ai dubbi più comuni dei genitori.</p>
                </div>
                <div class="space-y-4">
                    ${data.faq.map(item => `
                        <div class="border border-sage/10 rounded-3xl overflow-hidden faq-item bg-cream/40 reveal">
                            <button type="button" class="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-cream transition-colors" onclick="this.closest('.faq-item').classList.toggle('faq-open')">
                                <span class="font-bold text-sage">${item.q}</span>
                                <i data-lucide="chevron-down" class="faq-chevron text-gold shrink-0"></i>
                            </button>
                            <div class="faq-content">
                                <p class="px-6 pb-6 text-ink/65 leading-relaxed">${item.a}</p>
                            </div>
                        </div>`).join('')}
                </div>
            </div>
        </section>

        ${ctaBanner('Ancora qualche dubbio?')}
    `;
}

/* ---------- CONTATTI ---------- */

export async function renderContatti() {
    const infoCards = [
        { icon: 'map-pin', t: 'Indirizzo', v: 'Via Giacomo Leopardi, 16<br>37050 Roverchiara (VR)' },
        { icon: 'phone', t: 'Telefono', v: '<a href="tel:044274383" class="hover:text-sage">0442 74383</a>' },
        { icon: 'mail', t: 'Email', v: '<a href="mailto:info@infanziaroverchiara.it" class="hover:text-sage break-all">info@infanziaroverchiara.it</a>' },
        { icon: 'clock', t: 'Orari Segreteria', v: 'Dal Lunedì al Venerdì<br>08:30 - 12:00' }
    ];
    return `
        <section class="pt-40 pb-24 bg-white">
            <div class="container mx-auto px-6">
                <div class="grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <div class="reveal mb-10">
                            <span class="inline-block text-xs font-bold uppercase tracking-[0.25em] text-gold mb-4">Contatti</span>
                            <h1 class="text-5xl font-display font-bold text-sage mb-5">Mettiamoci in contatto</h1>
                            <p class="text-ink/60 text-lg">Ogni anno è possibile visitare la scuola a dicembre e gennaio nelle giornate di Open Day. La segreteria risponde dalle 8:30 alle 12:00 lun - ven per darvi le informazioni necessarie.</p>
                        </div>
                        <div class="grid sm:grid-cols-2 gap-4 mb-8">
                            ${infoCards.map(c => `
                                <div class="reveal flex items-start gap-4 p-5 bg-cream rounded-3xl">
                                    <span class="w-11 h-11 rounded-2xl bg-white text-gold flex items-center justify-center shrink-0 shadow-sm"><i data-lucide="${c.icon}" class="w-5 h-5"></i></span>
                                    <div>
                                        <p class="font-bold text-sage text-sm mb-1">${c.t}</p>
                                        <p class="text-ink/60 text-sm leading-relaxed">${c.v}</p>
                                    </div>
                                </div>`).join('')}
                        </div>
                        <div class="rounded-[2rem] overflow-hidden shadow-lg h-64 border border-sage/10 reveal grayscale hover:grayscale-0 transition-all duration-700">
                            <iframe title="Mappa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2805.395899435889!2d11.34181831206124!3d45.267868346399185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477f113400000001%3A0x6a0a09727404e3c1!2sScuola%20Materna%20Sacra%20Famiglia!5e0!3m2!1sit!2sit!4v1710320000000!5m2!1sit!2sit" width="100%" height="100%" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>

                    <div class="lg:sticky lg:top-28 reveal">
                        <div class="bg-sage text-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-sage/20 relative overflow-hidden">
                            <div class="blob w-56 h-56 bg-gold/25 -top-10 -right-10"></div>
                            <div class="relative z-10">
                                <span class="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                                    <i data-lucide="phone-call" class="w-7 h-7 text-gold"></i>
                                </span>
                                <h2 class="text-2xl font-display font-bold mb-3">Chiamaci, siamo qui per te</h2>
                                <p class="text-white/80 text-sm mb-8 leading-relaxed">Il modo più veloce per avere informazioni, prenotare una visita o parlare con la coordinatrice. Ti aspettiamo!</p>

                                <a href="tel:044274383" class="flex items-center gap-4 bg-white text-sage rounded-3xl p-5 mb-4 hover:scale-[1.02] transition-transform shadow-lg">
                                    <span class="w-12 h-12 rounded-2xl bg-gold/15 text-gold flex items-center justify-center shrink-0"><i data-lucide="phone" class="w-6 h-6"></i></span>
                                    <span>
                                        <span class="block text-xs uppercase tracking-widest text-ink/40 font-bold">Telefono</span>
                                        <span class="block text-2xl font-display font-bold">0442 74383</span>
                                    </span>
                                </a>

                                <a href="mailto:info@infanziaroverchiara.it" class="flex items-center gap-4 bg-white/10 rounded-3xl p-5 hover:bg-white/15 transition-colors">
                                    <span class="w-12 h-12 rounded-2xl bg-white/10 text-gold flex items-center justify-center shrink-0"><i data-lucide="mail" class="w-6 h-6"></i></span>
                                    <span class="min-w-0">
                                        <span class="block text-xs uppercase tracking-widest text-white/50 font-bold">Email</span>
                                        <span class="block font-semibold break-all">info@infanziaroverchiara.it</span>
                                    </span>
                                </a>

                                <p class="flex items-center gap-2 text-white/70 text-sm mt-8">
                                    <i data-lucide="clock" class="w-4 h-4 text-gold shrink-0"></i> Segreteria: Lun-Ven 09:00 - 12:00
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}
