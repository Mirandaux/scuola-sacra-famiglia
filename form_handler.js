/*
 * Gestione invio form contatti tramite Formspree.
 *
 * COME ATTIVARE:
 * 1. Crea un form gratuito su https://formspree.io  (usa l'email
 *    sacrafami.roverchi@libero.it come destinatario).
 * 2. Copia l'ID del form (es. "xyzabcd") e incollalo qui sotto.
 * 3. Fatto: i messaggi arriveranno via email, nessun backend necessario.
 *
 * Finché l'ID resta "your-form-id", il form mostra un avviso e non invia.
 */
const FORMSPREE_ID = 'your-form-id';
const ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;

export function handleForms() {
    document.addEventListener('submit', async (e) => {
        if (e.target.id !== 'contact-form') return;
        e.preventDefault();

        const form = e.target;
        const btn = form.querySelector('button[type="submit"]');
        const status = form.querySelector('.form-status');
        const original = btn.innerHTML;

        // Formspree non ancora configurato: avvisa senza inviare
        if (FORMSPREE_ID === 'your-form-id') {
            showStatus(status, 'warn',
                'Form non ancora configurato. Nel frattempo scrivici a sacrafami.roverchi@libero.it o chiama lo 0442 74383.');
            return;
        }

        btn.disabled = true;
        btn.innerHTML = '<span class="flex items-center justify-center gap-2"><i data-lucide="loader-2" class="animate-spin w-5 h-5"></i> Invio in corso…</span>';
        if (window.lucide) lucide.createIcons();

        try {
            const res = await fetch(ENDPOINT, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            });

            if (res.ok) {
                form.reset();
                showStatus(status, 'ok', 'Grazie! Il tuo messaggio è stato inviato. Ti risponderemo al più presto.');
                btn.innerHTML = '<span class="flex items-center justify-center gap-2"><i data-lucide="check" class="w-5 h-5"></i> Inviato!</span>';
                if (window.lucide) lucide.createIcons();
                setTimeout(() => { btn.innerHTML = original; btn.disabled = false; }, 3500);
            } else {
                throw new Error('Formspree error');
            }
        } catch (err) {
            btn.innerHTML = original;
            btn.disabled = false;
            showStatus(status, 'err',
                'Ops, qualcosa è andato storto. Riprova o scrivici a sacrafami.roverchi@libero.it');
        }
    });
}

function showStatus(el, type, msg) {
    if (!el) return;
    const styles = {
        ok:   'bg-sage/10 text-sage border-sage/20',
        err:  'bg-red-50 text-red-600 border-red-200',
        warn: 'bg-gold/10 text-gold-dark border-gold/30'
    };
    el.className = `form-status mt-4 text-sm rounded-2xl border px-5 py-3 ${styles[type]}`;
    el.textContent = msg;
    el.classList.remove('hidden');
}
