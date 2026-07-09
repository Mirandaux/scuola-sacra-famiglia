# Scuola Infanzia Paritaria Sacra Famiglia — Roverchiara (VR)

Sito ufficiale della scuola dell'infanzia paritaria FISM di Roverchiara.
Sito statico, **senza build step**: si pubblica su Vercel così com'è.

## Stack

- HTML statico + [Tailwind CSS](https://tailwindcss.com) (via CDN)
- JavaScript vanilla in **moduli ES**, con router hash-based (SPA multi-pagina)
- Animazioni con `IntersectionObserver` (reveal + contatori) — nessuna dipendenza pesante
- Icone [Lucide](https://lucide.dev), font Playfair Display (titoli) + Manrope (corpo)

## Struttura dei file

| File | Ruolo |
|------|-------|
| `index.html` | Shell: nav, footer, menu mobile, pulsanti flottanti |
| `style.css` | Stili custom (palette, animazioni, timeline, form) |
| `data.json` | **Tutti i contenuti** modificabili (contatori, servizi, team, FAQ, contributi, timeline…) |
| `main.js` | Entry point, effetti di scroll |
| `router.js` | Routing hash-based + animazioni |
| `views.js` | Rendering delle pagine |
| `navigation.js` | Menu mobile |
| `form_handler.js` | Invio form contatti (Formspree) |
| `vercel.json` | Configurazione di hosting |

## Pagine

Home · Il Metodo · Servizi · Team · Iscrizioni · FAQ · Contatti

## Come aggiornare i contenuti

Quasi tutto si modifica in **`data.json`** senza toccare il codice:

- **Contatori** → `counters`
- **Servizi** → `services`
- **Team** → `team`
- **FAQ** → `faq`
- **Timeline "Una giornata con noi"** → `day`
- **Contributi pubblici (Legge 124/2017)** → `contributi`
  (aggiorna importo e, quando disponibile, l'URL del PDF nel campo `pdf`)

## Attivare il form contatti (Formspree)

Il form nella pagina Contatti usa [Formspree](https://formspree.io) (piano gratuito):

1. Crea un form su Formspree indicando come destinatario `sacrafami.roverchi@libero.it`.
2. Copia l'**ID del form** (es. `xldbzabc`).
3. In `form_handler.js` sostituisci `your-form-id` con il tuo ID.

Finché non è configurato, il form invita a contattare la scuola via email/telefono.

## Pubblicare su Vercel

1. Collega il repository GitHub a Vercel.
2. Framework preset: **Other** (nessun comando di build, output dir = root).
3. Deploy. Fatto.
