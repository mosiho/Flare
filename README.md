# Flare Atelier

Investor landing page for **Flare Atelier** — client memory for independent luxury retail.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

## Develop

```bash
npm install
npm run dev
```

- Landing: [http://localhost:3000](http://localhost:3000) → `/en`
- Sign-in: [http://localhost:3000/en/signin](http://localhost:3000/en/signin)

Production: `https://www.flaremind.site`

## Build

```bash
npm run build
npm start
```

## Deploy

One Next.js deployment on `flaremind.site` / `www.flaremind.site`. Locale routing and legacy `/atelier` / `atelier.` redirects live in [`proxy.ts`](./proxy.ts).

## Assets

- `public/images/`:
  - `atelier-hero-vitrine.jpg` — full-bleed hero
  - `atelier-contrast.jpg` — CRM vs human care
  - `atelier-whisper-capture.jpg`, `atelier-taste-graph.jpg`, `atelier-orchestrate.jpg`, `atelier-deliver.jpg` — engine steps
  - `atelier-example-box.jpg` — surprise heirloom box for inherited ring
  - `atelier-memory-flow.jpg` — signals → care diagram

## Notes

- Sign-in is UI-only (mock validation); no real auth backend yet.
- Concept source: [`line.md`](./line.md).
