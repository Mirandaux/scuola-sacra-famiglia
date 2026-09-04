# Scuola Infanzia Paritaria Sacra Famiglia — Roverchiara (VR)

Sito ufficiale della scuola dell'infanzia paritaria FISM di Roverchiara.
Sito statico, **senza build step**: si pubblica su Vercel così com'è.

## Stack

- HTML statico + [Tailwind CSS](https://tailwindcss.com) **precompilato** in `tailwind.css`
- JavaScript vanilla in **moduli ES**, router con URL reali (History API, SPA multi-pagina)
- Animazioni con `IntersectionObserver` (reveal + contatori) — nessuna dipendenza pesante
- Icone [Lucide](https://lucide.dev), font Playfair Display (titoli) + Manrope (corpo)

### Rigenerare il CSS di Tailwind

Il file `tailwind.css` è **precompilato e committato** (niente CDN a runtime → più veloce).
Va rigenerato solo se cambi/aggiungi classi Tailwind nell'HTML o nei `.js`:

```bash
npx tailwindcss@3 -c tailwind.config.js -i tailwind.src.css -o tailwind.css --minify
```

Vercel continua a pubblicare i file così come sono (nessun build step lato server).

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
via email (`info@infanziaroverchiara.it`). Non è previsto un form da compilare.

## Pubblicare su Vercel

1. Collega il repository GitHub a Vercel.
2. Framework preset: **Other** (nessun comando di build, output dir = root).
3. Deploy. Fatto.
