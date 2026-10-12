# pistolinkr

Personal site for **pistolinkr** — *Pistol*, a symbol of grace and revolution, and *inkr*, the hope that it comes true in Korea.

Built with [Astro](https://astro.build), following the flat language of the g.gearservice team site.

## Run locally

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve the build
```

## Colorways

Each colorway is its own route, like the team site:

| route       | colorway |
|-------------|----------|
| `/`, `/paper` | paper (default) |
| `/ink`      | ink-lime (`/ink-lime` redirects here) |
| `/lilac`    | lilac |
| `/lime`     | lime |

Tokens live in `src/data/colorways.ts`; sections only read the CSS variables.

## Where things are

- `src/data/content.ts` — all copy
- `src/data/marks.ts` — wordmark path data (from `logo&flags/SVG`)
- `src/components/` — one component per section
- `src/styles/global.css` — layout, type and motion
- `logo&flags/SVG/` — source logo and flag files
