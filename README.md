# Flare

Investor landing pages for Flare — guest memory for independent hospitality — and **Flare Atelier**, the luxury-retail vertical.

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

### Hospitality

Open [http://localhost:3000](http://localhost:3000) → `/en`.

### Flare Atelier (path)

- Landing: [http://localhost:3000/atelier](http://localhost:3000/atelier) → `/atelier/en`
- Sign-in: [http://localhost:3000/atelier/en/signin](http://localhost:3000/atelier/en/signin)

Production: `https://www.flaremind.site/atelier`

## Build

```bash
npm run build
npm start
```

## Deploy

Both verticals share one Next.js deployment on `flaremind.site` / `www.flaremind.site`. Path routing for Atelier lives in [`proxy.ts`](./proxy.ts) (`/atelier/{lang}/…`).

## Assets

- Hospitality imagery: `public/images/` (hero-interval, whisper-capture, etc.)
- Atelier imagery (jewelry / boutique vertical):
  - `atelier-hero-vitrine.jpg` — full-bleed hero
  - `atelier-contrast.jpg` — CRM vs human care
  - `atelier-whisper-capture.jpg`, `atelier-taste-graph.jpg`, `atelier-orchestrate.jpg`, `atelier-deliver.jpg` — engine steps
  - `atelier-example-box.jpg` — surprise heirloom box for inherited ring
  - `atelier-memory-flow.jpg` — signals → care diagram

## Notes

- Sign-in is UI-only (mock validation); no real auth backend yet.
- Concept sources: [`Business.md`](./Business.md) (hospitality), [`line.md`](./line.md) (Atelier).
