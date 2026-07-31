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

### Hospitality (apex)

Open [http://localhost:3000](http://localhost:3000).

### Flare Atelier (subdomain vertical)

Local preview options:

1. **Query + cookie:** [http://localhost:3000/?vertical=atelier](http://localhost:3000/?vertical=atelier) — sets an 8-hour cookie and rewrites to the Atelier site. Clear with `?vertical=hospitality`.
2. **Subdomain host:** add `127.0.0.1 atelier.localhost` to `/etc/hosts`, then open [http://atelier.localhost:3000](http://atelier.localhost:3000).
3. **Path:** visiting `/atelier` redirects to the public locale path and enables Atelier mode on localhost.

Sign-in: `/en/signin` on the Atelier host (or after enabling Atelier mode locally).

## Build

```bash
npm run build
npm start
```

## Deploy / DNS

Serve both verticals from the **same** Next.js deployment:

| Host | Vertical |
|------|----------|
| `flaremind.site` (and `www`) | Hospitality |
| `atelier.flaremind.site` | Flare Atelier |

On Vercel (or equivalent), add `atelier.flaremind.site` as a domain on the same project. Host-based routing lives in [`proxy.ts`](./proxy.ts).

## Assets

- Hospitality imagery: `public/images/` (hero-interval, whisper-capture, etc.)
- Atelier imagery (jewelry / boutique vertical):
  - `atelier-hero.jpg` — full-bleed hero
  - `atelier-contrast.jpg` — CRM vs human care
  - `atelier-whisper-capture.jpg`, `atelier-taste-graph.jpg`, `atelier-orchestrate.jpg`, `atelier-deliver.jpg` — engine steps
  - `atelier-example.jpg` — inherited ring appointment
  - `atelier-memory-flow.jpg` — signals → care diagram

## Notes

- Sign-in is UI-only (mock validation); no real auth backend yet.
- Concept sources: [`Business.md`](./Business.md) (hospitality), [`line.md`](./line.md) (Atelier).
