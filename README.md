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
| `vercel.json` | Configurazione di hosting |

## Pagine

Home · Il Metodo · Servizi · Team · Iscrizioni · FAQ · Contatti

## Come aggiornare i contenuti

Quasi tutto si modifica in **`data.json`** senza toccare il codice:

- **Contatori** → `counters`
- **Servizi** → `services`
- **Team** → foto di gruppo in `teamPhoto`
- **FAQ** → `faq`
- **Timeline "Una giornata con noi"** → `day`
- **Contributi pubblici (Legge 124/2017)** → `contributi`
  (aggiorna importo e, quando disponibile, l'URL del PDF nel campo `pdf`)

## Contatti

La pagina Contatti invita a chiamare la scuola (**0442 74383**) o a scrivere
via email (`sacrafami.roverchi@libero.it`). Non è previsto un form da compilare.

## Pubblicare su Vercel

1. Collega il repository GitHub a Vercel.
2. Framework preset: **Other** (nessun comando di build, output dir = root).
3. Deploy. Fatto.
