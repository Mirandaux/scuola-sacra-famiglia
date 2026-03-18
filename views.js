async function fetchData() {
    const res = await fetch('data.json');
    return await res.json();
}

function renderContactButtons() {
    return `
        <div class="flex flex-wrap gap-4 justify-center">
            <a href="tel:044274383" class="bg-[#1A6B5A] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                <i data-lucide="phone" class="w-5 h-5"></i> Chiama: 0442 74383
            </a>
            <a href="mailto:sacrafami.roverchi@libero.it" class="bg-[#F5A623] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                <i data-lucide="mail" class="w-5 h-5"></i> Email: sacrafami.roverchi@libero.it
            </a>
        </div>
    `;
}

export async function renderHome() {
    const data = await fetchData();
    return `
        <section class="relative min-h-[90vh] pt-32 pb-20 flex items-center overflow-hidden">
            <div class="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1510531704581-5b2870972060?q=80&w=2070" class="w-full h-full object-cover opacity-20">
                <div class="absolute inset-0 bg-gradient-to-b from-[#FCF9F5]/80 to-[#FCF9F5]"></div>
            </div>
            <div class="container mx-auto px-6 relative z-10">
                <div class="max-w-3xl">
                    <span class="inline-block px-4 py-1 rounded-full bg-[#1A6B5A]/10 text-[#1A6B5A] text-sm font-semibold mb-6 reveal">Paritaria FISM dal 2000</span>
                    <h1 class="text-5xl md:text-7xl font-playfair font-bold text-[#1A6B5A] leading-tight mb-6 reveal">
                        Dove il bambino impara ad essere <span class="text-[#F5A623] italic">se stesso.</span>
                    </h1>
                    <p class="text-xl text-gray-600 mb-10 leading-relaxed reveal">Scuola dell'infanzia paritaria FISM dal 2000, con te, per loro.</p>
                    <div class="flex flex-wrap gap-4 reveal">
                        <a href="tel:044274383" class="bg-[#1A6B5A] text-white px-8 py-4 rounded-full text-lg font-medium shadow-xl hover:bg-[#135245] transition-all">Chiama per informazioni</a>
                        <a href="#/metodo" class="border-2 border-[#1A6B5A] text-[#1A6B5A] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#1A6B5A] hover:text-white transition-all">Scopri il metodo</a>
                    </div>
                </div>
                <div class="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 reveal text-[#1A6B5A]">
                    <div class="flex items-center gap-3"><i data-lucide="check-circle" class="text-[#F5A623]"></i> <span class="font-medium text-sm uppercase tracking-wider">Iscritta FISM</span></div>
                    <div class="flex items-center gap-3"><i data-lucide="award" class="text-[#F5A623]"></i> <span class="font-medium text-sm uppercase tracking-wider">Paritaria MIUR</span></div>
                    <div class="flex items-center gap-3"><i data-lucide="calendar" class="text-[#F5A623]"></i> <span class="font-medium text-sm uppercase tracking-wider">Calendario ministeriale</span></div>
                    <div class="flex items-center gap-3"><i data-lucide="heart" class="text-[#F5A623]"></i> <span class="font-medium text-sm uppercase tracking-wider">Cucina Interna</span></div>
                </div>
            </div>
        </section>

        <section class="py-20 bg-[#1A6B5A] text-white">
            <div class="container mx-auto px-6">
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    ${data.counters.map(c => `
                        <div>
                            <div class="text-4xl md:text-5xl font-playfair font-bold mb-2 counter-val" data-target="${c.val}">0</div>
                            <p class="text-sm opacity-80 uppercase tracking-widest">${c.label}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section class="py-24 bg-[#1A6B5A] text-white border-t border-white/10">
            <div class="container mx-auto px-6 text-center">
                <h2 class="text-4xl font-playfair font-bold mb-8">I contributi che ci sostengono</h2>
                <p class="max-w-3xl mx-auto mb-16 text-lg opacity-90 italic">Il nostro impegno è reso possibile anche grazie al supporto delle istituzioni che credono nel valore dell'educazione paritaria.</p>

                <div class="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-20">
                    <div class="p-8 border border-white/20 rounded-3xl bg-white/5 reveal">
                        <i data-lucide="landmark" class="w-12 h-12 text-[#F5A623] mx-auto mb-6"></i>
                        <h4 class="font-bold text-xl mb-3">MIUR</h4>
                        <p class="text-sm opacity-80 leading-relaxed">Contributi statali per le scuole paritarie riconosciute.</p>
                    </div>
                    <div class="p-8 border border-white/20 rounded-3xl bg-white/5 reveal">
                        <i data-lucide="home" class="w-12 h-12 text-[#F5A623] mx-auto mb-6"></i>
                        <h4 class="font-bold text-xl mb-3">Comune Roverchiara</h4>
                        <p class="text-sm opacity-80 leading-relaxed">Convenzioni territoriali per il sostegno alle famiglie.</p>
                    </div>
                    <div class="p-8 border border-white/20 rounded-3xl bg-white/5 reveal">
                        <i data-lucide="users" class="w-12 h-12 text-[#F5A623] mx-auto mb-6"></i>
                        <h4 class="font-bold text-xl mb-3">Enti Locali</h4>
                        <p class="text-sm opacity-80 leading-relaxed">Progetti specifici per l'inclusione e il benessere infantile.</p>
                    </div>
                </div>

                <div class="max-w-3xl mx-auto border border-white/20 rounded-3xl bg-white/5 overflow-hidden reveal">
                    <div class="px-8 py-5 border-b border-white/10">
                        <h3 class="font-bold text-lg tracking-wide">Erogazioni pubbliche — Legge n.124/2017, art.1 commi 125-129</h3>
                    </div>
                    <div class="divide-y divide-white/10">

                        <!-- =============================================
                             AGGIORNA QUI OGNI ANNO
                             Copia un blocco e aggiorna anno, ente, importo e URL PDF
                             ============================================= -->

                        <!-- ANNO 2024 -->
                        <div class="flex items-center justify-between px-8 py-5 hover:bg-white/5 transition-colors">
                            <div class="text-left">
                                <span class="text-[#F5A623] font-bold text-sm uppercase tracking-wider">2024</span>
                                <p class="font-medium mt-1">Enti pubblici — Legge n.124-2017</p>
                                <p class="text-sm opacity-70 mt-0.5">€ 164.478,64</p>
                            </div>
                           <span class="text-sm opacity-40 ml-4 shrink-0">PDF non disponibile</span>
                        </div>

                        <!-- ANNO 2022 -->
                        <div class="flex items-center justify-between px-8 py-5 hover:bg-white/5 transition-colors">
                            <div class="text-left">
                                <span class="text-[#F5A623] font-bold text-sm uppercase tracking-wider">2022</span>
                                <p class="font-medium mt-1">Enti pubblici — Legge n.124-2017</p>
                                <p class="text-sm opacity-70 mt-0.5">€ 128.663,43</p>
                            </div>
                            <span class="text-sm opacity-40 ml-4 shrink-0">PDF non disponibile</span>
                        </div>

                        <!-- ANNO 2021 -->
                        <div class="flex items-center justify-between px-8 py-5 hover:bg-white/5 transition-colors">
                            <div class="text-left">
                                <span class="text-[#F5A623] font-bold text-sm uppercase tracking-wider">2021</span>
                                <p class="font-medium mt-1">Enti pubblici — Legge n.124-2017</p>
                                <p class="text-sm opacity-70 mt-0.5">€ 129.741,51</p>
                            </div>
                            <span class="text-sm opacity-40 ml-4 shrink-0">PDF non disponibile</span>
                        </div>

                        <!-- ANNO 2020 -->
                        <div class="flex items-center justify-between px-8 py-5 hover:bg-white/5 transition-colors">
                            <div class="text-left">
                                <span class="text-[#F5A623] font-bold text-sm uppercase tracking-wider">2020</span>
                                <p class="font-medium mt-1">Enti pubblici — Legge n.124-2017</p>
                                <p class="text-sm opacity-70 mt-0.5">€ 105.714,44</p>
                            </div>
                            <span class="text-sm opacity-40 ml-4 shrink-0">PDF non disponibile</span>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        <section class="py-24 bg-white">
            <div class="container mx-auto px-6">
                <div class="max-w-xl mb-16">
                    <h2 class="text-4xl font-playfair font-bold text-[#1A6B5A] mb-6">Una giornata con noi</h2>
                    <p class="text-gray-500">I momenti che scandiscono la crescita dei nostri piccoli.</p>
                </div>
                <div>

                    <!-- Riga 1 -->
                    <div style="display:flex; align-items:flex-start;">
                        <div style="flex:1; text-align:center; position:relative;">
                            <div style="position:absolute; top:21px; left:50%; width:100%; height:2px; background:#c8e6da; z-index:0;"></div>
                            <div style="width:42px; height:42px; border-radius:50%; background:#1A6B5A; display:flex; align-items:center; justify-content:center; margin:0 auto 10px; position:relative; z-index:1;">
                                <svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:white;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
                            </div>
                            <div style="font-size:11px; color:#F5A623; font-weight:500; margin-bottom:3px;">7:30 – 9:00</div>
                            <div style="font-size:13px; font-weight:600; color:#2D3436;">Accoglienza</div>
                        </div>
                        <div style="flex:1; text-align:center; position:relative;">
                            <div style="position:absolute; top:21px; left:50%; width:100%; height:2px; background:#c8e6da; z-index:0;"></div>
                            <div style="width:42px; height:42px; border-radius:50%; background:#1A6B5A; display:flex; align-items:center; justify-content:center; margin:0 auto 10px; position:relative; z-index:1;">
                                <svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:white;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
                            </div>
                            <div style="font-size:11px; color:#F5A623; font-weight:500; margin-bottom:3px;">9:00 – 11:30</div>
                            <div style="font-size:13px; font-weight:600; color:#2D3436;">Attività</div>
                        </div>
                        <div style="flex:1; text-align:center; position:relative;">
                            <div style="width:42px; height:42px; border-radius:50%; background:#F5A623; display:flex; align-items:center; justify-content:center; margin:0 auto 10px; position:relative; z-index:1;">
                                <svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:white;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
                            </div>
                            <div style="font-size:11px; color:#F5A623; font-weight:500; margin-bottom:3px;">11:30 – 12:30</div>
                            <div style="font-size:13px; font-weight:600; color:#2D3436;">Pranzo</div>
                        </div>
                    </div>

                    <!-- Connettore serpentina -->
                    <div style="position:relative; height:80px;">
                        <svg width="100%" height="80" preserveAspectRatio="none" viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 250 0 Q 250 40 234 40 L 66 40 Q 50 40 50 80" fill="none" stroke="#c8e6da" stroke-width="2"/>
                        </svg>
                    </div>

                    <!-- Riga 2 -->
                    <div style="display:flex; align-items:flex-start;">
                        <div style="flex:1; text-align:center; position:relative;">
                            <div style="width:42px; height:42px; border-radius:50%; background:#1A6B5A; display:flex; align-items:center; justify-content:center; margin:0 auto 10px; position:relative; z-index:1;">
                                <svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:white;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;"><path d="M17 18a5 5 0 00-10 0"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><polyline points="8,6 12,2 16,6"/></svg>
                            </div>
                            <div style="font-size:11px; color:#F5A623; font-weight:500; margin-bottom:3px;">12:30 – 14:30</div>
                            <div style="font-size:13px; font-weight:600; color:#2D3436;">Riposo</div>
                        </div>
                        <div style="flex:1; text-align:center; position:relative;">
                            <div style="position:absolute; top:21px; right:50%; width:100%; height:2px; background:#c8e6da; z-index:0;"></div>
                            <div style="position:absolute; top:21px; left:50%; width:100%; height:2px; background:#c8e6da; z-index:0;"></div>

        <section class="py-24 bg-[#FCF9F5]">
            <div class="container mx-auto px-6 text-center">
                <h2 class="text-4xl font-playfair font-bold text-[#1A6B5A] mb-8">Genitori Attivi</h2>
                <p class="max-w-2xl mx-auto mb-12 text-gray-600 text-lg">La scuola è una comunità. Il coinvolgimento dei genitori è il cuore pulsante delle nostre iniziative extra-didattiche.</p>
                <div class="flex flex-wrap justify-center gap-6">
                    <div class="bg-white p-8 rounded-3xl shadow-sm border border-[#1A6B5A]/10 w-full md:w-auto min-w-[280px]">
                        <h4 class="text-2xl font-playfair font-bold text-[#1A6B5A] mb-4">Gruppo Mamme</h4>
                        <p class="text-sm text-gray-500 mb-6">Sostegno reciproco, laboratori e mercatini solidali.</p>
                        <a href="tel:044274383" class="inline-block border border-[#1A6B5A] text-[#1A6B5A] px-6 py-2 rounded-full text-sm font-bold hover:bg-[#1A6B5A] hover:text-white transition-all">Unisciti</a>
                    </div>
                    <div class="bg-white p-8 rounded-3xl shadow-sm border border-[#1A6B5A]/10 w-full md:w-auto min-w-[280px]">
                        <h4 class="text-2xl font-playfair font-bold text-[#1A6B5A] mb-4">Gruppo Papà</h4>
                        <p class="text-sm text-gray-500 mb-6">Manutenzione creativa degli spazi e gite comunitarie.</p>
                        <a href="tel:044274383" class="inline-block border border-[#1A6B5A] text-[#1A6B5A] px-6 py-2 rounded-full text-sm font-bold hover:bg-[#1A6B5A] hover:text-white transition-all">Unisciti</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-24 bg-[#1A6B5A] text-white">
            <div class="container mx-auto px-6 text-center">
                <h2 class="text-4xl font-playfair font-bold mb-8">Vuoi vedere la scuola di persona?</h2>
                <p class="max-w-2xl mx-auto mb-12 opacity-90 text-lg">Prenota una visita gratuita e senza impegno. Ti accompagniamo in ogni spazio per farti respirare il nostro metodo.</p>
                ${renderContactButtons()}
            </div>
        </section>
    `;
}

export async function renderMetodo() {
    const data = await fetchData();
    return `
        <section class="pt-40 pb-20 bg-white">
            <div class="container mx-auto px-6 text-center max-w-4xl">
                <h1 class="text-5xl md:text-6xl font-playfair font-bold text-[#1A6B5A] mb-8">Pedagogia Viva</h1>
                <div class="space-y-6 text-lg text-gray-600 leading-relaxed text-left">
                    <p>Alla Scuola Sacra Famiglia l'educazione non è un travaso di nozioni, ma l'accensione di un fuoco. Ci ispiriamo ai principi della <strong>pedagogia attiva</strong>, dove l'ambiente è il "terzo educatore".</p>
                    <p>Rifiutiamo l'approccio standardizzato. Ogni bambino ha un "linguaggio" diverso: c'è chi apprende osservando, chi toccando, chi muovendosi. La nostra programmazione è flessibile e si adatta al gruppo.</p>
                    <p>La relazione scuola-famiglia è il nostro pilastro. Non siamo un semplice servizio di custodia, ma un partner nel percorso di crescita di tuo figlio.</p>
                </div>
            </div>
        </section>

        <section class="py-24 bg-[#FCF9F5]">
            <div class="container mx-auto px-6">
                <h2 class="text-3xl font-playfair font-bold text-[#1A6B5A] text-center mb-16">I Nostri Valori Fondanti</h2>
                <div class="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
                    ${data.method.map(m => `
                        <div class="reveal p-8 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all">
                            <div class="w-12 h-12 bg-[#1A6B5A]/10 rounded-xl flex items-center justify-center text-[#F5A623] mb-6">
                                <i data-lucide="${m.icon}"></i>
                            </div>
                            <h3 class="font-playfair font-bold text-xl text-[#1A6B5A] mb-4">${m.title}</h3>
                            <p class="text-gray-500 text-sm leading-relaxed">${m.text}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- New Section: Progetti in itinere -->
        <section class="py-24 bg-[#FAF9F6]">
            <div class="container mx-auto px-6 max-w-5xl reveal">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-playfair font-bold text-[#1A6B5A] mb-4">Progetti in itinere: l'educazione che nasce dall'ascolto</h2>
                    <p class="text-gray-600 italic">Non seguiamo binari prestabiliti: costruiamo il percorso insieme ai bambini.</p>
                </div>
                <div class="grid md:grid-cols-3 gap-12">
                    <div class="text-center space-y-4">
                        <div class="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm text-[#F5A623]">
                            <i data-lucide="eye" class="w-8 h-8"></i>
                        </div>
                        <h4 class="font-bold text-[#1A6B5A] text-lg">Osservazione</h4>
                        <p class="text-sm text-gray-500">L'insegnante osserva gli interessi emergenti del gruppo durante il gioco libero.</p>
                    </div>
                    <div class="text-center space-y-4">
                        <div class="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm text-[#F5A623]">
                            <i data-lucide="sparkles" class="w-8 h-8"></i>
                        </div>
                        <h4 class="font-bold text-[#1A6B5A] text-lg">Trasformazione</h4>
                        <p class="text-sm text-gray-500">L'interesse diventa progetto: si allestiscono spazi e materiali per approfondire la scoperta.</p>
                    </div>
                    <div class="text-center space-y-4">
                        <div class="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm text-[#F5A623]">
                            <i data-lucide="share-2" class="w-8 h-8"></i>
                        </div>
                        <h4 class="font-bold text-[#1A6B5A] text-lg">Condivisione</h4>
                        <p class="text-sm text-gray-500">L'esperienza viene documentata e condivisa con le famiglie per valorizzare il fare del bambino.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- New Section: Lo spazio come terzo educatore -->
        <section class="py-24 bg-[#E8F5F1] border-y border-[#1A6B5A]/10 reveal">
            <div class="container mx-auto px-6 max-w-5xl">
                <div class="text-center mb-16">
                    <blockquote class="text-2xl md:text-3xl font-playfair italic text-[#1A6B5A] leading-relaxed">
                        "Lo spazio è un contenitore che si lascia plasmare e abitare dai bambini."
                        <footer class="text-sm font-bold uppercase tracking-widest mt-4 opacity-60">— Loris Malaguzzi</footer>
                    </blockquote>
                </div>
                <div class="grid md:grid-cols-2 gap-12 mb-16">
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold text-[#1A6B5A]">Intenzione</h4>
                        <p class="text-gray-600 leading-relaxed">Ogni angolo della nostra scuola è pensato con cura. Gli arredi non sono semplici mobili, ma inviti all'esplorazione e alla concentrazione.</p>
                    </div>
                    <div class="space-y-4">
                        <h4 class="text-xl font-bold text-[#1A6B5A]">Pratica</h4>
                        <p class="text-gray-600 leading-relaxed">Usiamo materiali "intelligenti" e destrutturati che permettono mille usi diversi, stimolando il problem-solving e la creatività infinita.</p>
                    </div>
                </div>
                <div class="grid md:grid-cols-3 gap-6">
                    <div class="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-[#1A6B5A]/10 text-center shadow-sm">
                        <i data-lucide="sun" class="w-6 h-6 mx-auto mb-3 text-[#F5A623]"></i>
                        <span class="text-sm font-bold text-[#1A6B5A]">Luce naturale</span>
                    </div>
                    <div class="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-[#1A6B5A]/10 text-center shadow-sm">
                        <i data-lucide="tree-pine" class="w-6 h-6 mx-auto mb-3 text-[#F5A623]"></i>
                        <span class="text-sm font-bold text-[#1A6B5A]">Materiali naturali</span>
                    </div>
                    <div class="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-[#1A6B5A]/10 text-center shadow-sm">
                        <i data-lucide="maximize" class="w-6 h-6 mx-auto mb-3 text-[#F5A623]"></i>
                        <span class="text-sm font-bold text-[#1A6B5A]">Libertà di movimento</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-24 bg-white">
            <div class="container mx-auto px-6 max-w-5xl">
                <h2 class="text-3xl font-playfair font-bold text-[#1A6B5A] text-center mb-16">In cosa ci differenziamo</h2>
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="p-10 bg-[#1A6B5A] rounded-[3rem] text-white reveal">
                        <h4 class="text-2xl font-playfair font-bold mb-8">Scuola Sacra Famiglia</h4>
                        <ul class="space-y-6">
                            ${data.comparison.map(c => `
                                <li class="border-b border-white/10 pb-4">
                                    <span class="block text-xs uppercase opacity-60 mb-1">${c.label}</span>
                                    <span class="font-medium">${c.sacra}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <div class="p-10 bg-gray-50 rounded-[3rem] text-gray-500 reveal">
                        <h4 class="text-2xl font-playfair font-bold mb-8 text-gray-400">Scuola Statale Standard</h4>
                        <ul class="space-y-6">
                            ${data.comparison.map(c => `
                                <li class="border-b border-gray-200 pb-4">
                                    <span class="block text-xs uppercase opacity-60 mb-1">${c.label}</span>
                                    <span class="font-medium">${c.statale}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                <div class="text-center mt-16">
                    <p class="text-gray-500 mb-8 italic">Contattaci per scoprire come viviamo questi valori ogni giorno.</p>
                    ${renderContactButtons()}
                </div>
            </div>
        </section>
    `;
}

export async function renderServizi() {
    const data = await fetchData();
    return `
        <section class="pt-40 pb-20 bg-[#FCF9F5]">
            <div class="container mx-auto px-6 text-center">
                <h1 class="text-5xl font-playfair font-bold text-[#1A6B5A] mb-6">Un'offerta completa</h1>
                <p class="text-gray-600 max-w-2xl mx-auto">Tutto ciò che serve per la crescita armonica del bambino, dalla cucina interna ai laboratori specialistici.</p>
            </div>
        </section>

        <section class="py-24 bg-white">
            <div class="container mx-auto px-6">
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${data.services.map(s => `
                        <div class="reveal p-8 bg-[#FCF9F5] rounded-[2.5rem] border border-transparent hover:border-[#F5A623]/30 transition-all group">
                            <div class="flex justify-between items-start mb-8">
                                <div class="text-[#1A6B5A] group-hover:scale-110 transition-transform">
                                    <i data-lucide="${s.icon}" class="w-10 h-10"></i>
                                </div>
                                ${s.isNew ? '<span class="bg-[#F5A623] text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">In Arrivo</span>' : ''}
                            </div>
                            <div class="flex justify-between items-center mb-4">
                                <h4 class="text-2xl font-playfair font-bold text-[#1A6B5A]">${s.title}</h4>
                                <span class="text-[10px] uppercase font-bold text-[#F5A623] bg-[#F5A623]/10 px-3 py-1 rounded-full">${s.age}</span>
                            </div>
                            <p class="text-gray-500 text-sm mb-6">${s.desc}</p>
                            <div class="pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-[#1A6B5A]/60">
                                <i data-lucide="clock" class="w-4 h-4"></i> ${s.hours}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section class="py-24 bg-[#FCF9F5]">
            <div class="container mx-auto px-6 text-center">
                <h3 class="text-3xl font-playfair font-bold text-[#1A6B5A] mb-12">Hai domande sui nostri servizi?</h3>
                ${renderContactButtons()}
            </div>
        </section>
    `;
}

export async function renderTeam() {
    const data = await fetchData();
    return `
        <section class="pt-40 pb-20 bg-[#FCF9F5]">
            <div class="container mx-auto px-6 text-center">
                <h1 class="text-5xl font-playfair font-bold text-[#1A6B5A] mb-8">Il Nostro Team</h1>
                <p class="text-gray-600 max-w-3xl mx-auto mb-20 text-lg">"Stabilità e passione: il nostro punto di forza. Un gruppo di educatrici stabili, sulla stessa linea educativa da anni."</p>
                <div class="grid md:grid-cols-4 gap-8">
                    ${data.team.map(t => `
                        <div class="reveal group text-center">
                            <div class="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] mb-6 shadow-lg">
                                <img src="${t.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                                <div class="absolute inset-0 bg-gradient-to-t from-[#1A6B5A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end">
                                    <p class="text-white text-sm italic">"${t.quote}"</p>
                                </div>
                            </div>
                            <h4 class="text-xl font-playfair font-bold text-[#1A6B5A]">${t.name}</h4>
                            <p class="text-xs uppercase font-bold text-[#F5A623] tracking-widest">${t.role}</p>
                        </div>
                    `).join('')}
                </div>
                <div class="mt-20 p-10 bg-white rounded-3xl border border-gray-100 max-w-2xl mx-auto italic text-gray-500">
                    <p>"Le nostre educatrici non sono solo insegnanti, ma guide attente che accompagnano ogni bambino nel suo percorso unico verso l'autonomia."</p>
                </div>
            </div>
        </section>
    `;
}

export async function renderIscrizioni() {
    return `
        <section class="pt-40 pb-24 bg-white">
            <div class="container mx-auto px-6 text-center">
                <h1 class="text-5xl font-playfair font-bold text-[#1A6B5A] mb-6">Inizia il percorso con noi</h1>
                <p class="text-gray-600 max-w-2xl mx-auto text-lg mb-16 italic">Accogliamo i bambini in un ambiente sereno, stimolante e sicuro. Scopri come far parte della nostra famiglia.</p>

                <div class="bg-[#1A6B5A]/5 rounded-[3rem] p-12 md:p-16 mb-24 reveal">
                    <h2 class="text-3xl font-playfair font-bold text-[#1A6B5A] mb-8">Scuola Aperta</h2>
                    <div class="grid md:grid-cols-3 gap-8 text-left">
                        <div class="bg-white p-8 rounded-2xl shadow-sm">
                            <div class="w-12 h-12 bg-[#1A6B5A] text-white rounded-full flex items-center justify-center font-bold mb-6">1</div>
                            <h4 class="font-bold text-[#1A6B5A] mb-3">Prenota una visita</h4>
                            <p class="text-sm text-gray-500">Chiamaci per fissare un incontro personalizzato negli orari di segreteria.</p>
                        </div>
                        <div class="bg-white p-8 rounded-2xl shadow-sm">
                            <div class="w-12 h-12 bg-[#F5A623] text-white rounded-full flex items-center justify-center font-bold mb-6">2</div>
                            <h4 class="font-bold text-[#1A6B5A] mb-3">Conosci la scuola</h4>
                            <p class="text-sm text-gray-500">Visita le aule, il giardino e incontra le educatrici per parlare del metodo.</p>
                        </div>
                        <div class="bg-white p-8 rounded-2xl shadow-sm">
                            <div class="w-12 h-12 bg-[#1A6B5A] text-white rounded-full flex items-center justify-center font-bold mb-6">3</div>
                            <h4 class="font-bold text-[#1A6B5A] mb-3">Iscrizione</h4>
                            <p class="text-sm text-gray-500">Ricevi i moduli e completa l'iscrizione con il supporto della segreteria.</p>
                        </div>
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-12 text-left mb-24">
                    <div class="space-y-8">
                        <div>
                            <h3 class="text-2xl font-playfair font-bold text-[#1A6B5A] mb-4">Quando iscriversi</h3>
                            <p class="text-gray-600 leading-relaxed">La segreteria è aperta per informazioni e iscrizioni ogni mattina dalle <strong>09:00 alle 12:00</strong>. Riceviamo tutto l'anno previa disponibilità posti.</p>
                        </div>
                        <div>
                            <h3 class="text-2xl font-playfair font-bold text-[#1A6B5A] mb-4">A chi è rivolta</h3>
                            <ul class="space-y-2 text-gray-600">
                                <li class="flex items-center gap-2"><i data-lucide="check" class="text-[#F5A623] w-4 h-4"></i> Sezione Primavera: 24-36 mesi</li>
                                <li class="flex items-center gap-2"><i data-lucide="check" class="text-[#F5A623] w-4 h-4"></i> Scuola dell'Infanzia: 3-6 anni</li>
                            </ul>
                        </div>
                    </div>
                    <div class="bg-[#1A6B5A] text-white p-10 rounded-[3rem]">
                        <h3 class="text-2xl font-playfair font-bold mb-6">Quanto costa?</h3>
                        <div class="space-y-4 text-sm opacity-90 leading-relaxed">
                            <p>Crediamo nell'accessibilità: applichiamo <strong>rette modulate in base all'ISEE</strong> per venire incontro alle esigenze di ogni famiglia.</p>
                            <p>La retta include il servizio mensa interna e tutti i laboratori standard (inglese, psicomotricità).</p>
                        </div>
                        <div class="mt-8 pt-6 border-t border-white/20">
                            <p class="text-xs italic opacity-80">Contattaci per una simulazione personalizzata basata sulla tua fascia ISEE.</p>
                        </div>
                    </div>
                </div>

                <div class="bg-[#FCF9F5] p-12 rounded-[4rem] text-center">
                    <h3 class="text-2xl font-playfair font-bold text-[#1A6B5A] mb-8">Siamo a tua disposizione</h3>
                    ${renderContactButtons()}
                </div>
            </div>
        </section>
    `;
}

export async function renderFAQ() {
    const data = await fetchData();
    return `
        <section class="pt-40 pb-24 bg-white">
            <div class="container mx-auto px-6 max-w-3xl">
                <div class="text-center mb-16">
                    <h1 class="text-5xl font-playfair font-bold text-[#1A6B5A] mb-4">FAQ</h1>
                    <p class="text-gray-500 italic">Le risposte ai dubbi più comuni dei genitori.</p>
                </div>
                <div class="space-y-4">
                    ${data.faq.map((item, i) => `
                        <div class="border border-gray-100 rounded-2xl overflow-hidden faq-item bg-[#FCF9F5]/30">
                            <button class="w-full p-6 text-left flex justify-between items-center hover:bg-[#FCF9F5] transition-colors" onclick="this.parentElement.classList.toggle('faq-open')">
                                <span class="font-bold text-[#1A6B5A] pr-4">${item.q}</span>
                                <i data-lucide="chevron-down" class="text-[#F5A623] transition-transform flex-shrink-0"></i>
                            </button>
                            <div class="faq-content overflow-hidden max-h-0 transition-all duration-300">
                                <p class="p-6 text-gray-600 border-t border-gray-100 bg-white">${item.a}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="mt-20 text-center">
                    <p class="text-gray-500 mb-8 font-medium italic">Ancora qualche dubbio? Contattaci direttamente.</p>
                    ${renderContactButtons()}
                </div>
            </div>
        </section>
    `;
}

export async function renderContatti() {
    return `
        <section class="pt-40 pb-24 bg-white">
            <div class="container mx-auto px-6">
                <div class="grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <h1 class="text-5xl font-playfair font-bold text-[#1A6B5A] mb-8">Mettiamoci in contatto</h1>
                        <p class="text-gray-600 mb-12 text-lg">La nostra porta è sempre aperta. Passa a trovarci o chiamaci per qualsiasi informazione.</p>
                        
                        <div class="space-y-6 mb-12">
                            <div class="flex items-start gap-4 p-6 bg-[#FCF9F5] rounded-3xl">
                                <i data-lucide="map-pin" class="text-[#F5A623] w-6 h-6 mt-1"></i>
                                <div>
                                    <h5 class="font-bold text-[#1A6B5A]">Indirizzo</h5>
                                    <p class="text-gray-500">Via Giacomo Leopardi, 16 - 37050 Roverchiara (VR)</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-4 p-6 bg-[#FCF9F5] rounded-3xl">
                                <i data-lucide="phone" class="text-[#F5A623] w-6 h-6 mt-1"></i>
                                <div>
                                    <h5 class="font-bold text-[#1A6B5A]">Telefono</h5>
                                    <p class="text-gray-500">0442 74383</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-4 p-6 bg-[#FCF9F5] rounded-3xl">
                                <i data-lucide="mail" class="text-[#F5A623] w-6 h-6 mt-1"></i>
                                <div>
                                    <h5 class="font-bold text-[#1A6B5A]">Email</h5>
                                    <p class="text-gray-500">sacrafami.roverchi@libero.it</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-4 p-6 bg-[#FCF9F5] rounded-3xl">
                                <i data-lucide="clock" class="text-[#F5A623] w-6 h-6 mt-1"></i>
                                <div>
                                    <h5 class="font-bold text-[#1A6B5A]">Orari Segreteria</h5>
                                    <p class="text-gray-500">Dal Lunedì al Venerdì: 09:00 - 12:00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-8">
                        <div class="rounded-[3rem] overflow-hidden shadow-xl h-[400px] border border-gray-100 reveal grayscale hover:grayscale-0 transition-all duration-700">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2805.395899435889!2d11.34181831206124!3d45.267868346399185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477f113400000001%3A0x6a0a09727404e3c1!2sScuola%20Materna%20Sacra%20Famiglia!5e0!3m2!1sit!2sit!4v1710320000000!5m2!1sit!2sit" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                        </div>
                        <div class="p-10 bg-[#1A6B5A] text-white rounded-[3rem] text-center">
                            <h3 class="text-2xl font-playfair font-bold mb-8">Contattaci Ora</h3>
                            ${renderContactButtons()}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}
