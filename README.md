# CleanGrid

Landing site for CleanGrid — fully managed humanoid robotic cleaning for large buildings.

## Local development

```bash
npm install
npm run dev
```

## Environment variables

Create `.env` from `.env.example`:

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon (public) key |

Set the same on **Vercel → Settings → Environment Variables**.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Open **SQL Editor** and run the full script in [`supabase/schema.sql`](supabase/schema.sql)
3. Copy **Project URL** and **anon key** into `.env` and Vercel
4. Leads appear in **Table Editor → leads**; invoices in **Storage → invoices**

## Deploy

Push to `main` — Vercel deploys automatically.
