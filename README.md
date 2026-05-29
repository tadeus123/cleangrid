# CleanGrid

Landing site for **Cleanliness-as-a-Service** — fully managed robotic cleaning for large buildings.

**Live:** https://cleangrid.vercel.app/

## Run locally

```bash
npm install
npm run dev
```

## Deploy (Vercel)

1. Push to GitHub and import in Vercel.
2. Add environment variable:
   - `WEB3FORMS_ACCESS_KEY` — get a free key at [web3forms.com](https://web3forms.com) (restrict to your domain).
3. Optional client fallback: `VITE_WEB3FORMS_ACCESS_KEY` (same key; used if `/api/lead` is unavailable in dev).

Forms submit to `/api/lead`, which forwards to Web3Forms and emails your inbox.

## Build

```bash
npm run build
npm run preview
```

## Features

- Savings calculator with EUR / USD / GBP
- Multi-step quote upload with file attachment
- Site scan booking, calculator lead capture
- Performance guarantee, FAQ, privacy & terms
- Mobile nav + sticky CTAs
