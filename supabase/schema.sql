-- =============================================================================
-- CleanGrid — full Supabase setup
-- Run in Supabase Dashboard → SQL Editor (paste all, then Run)
-- =============================================================================

-- Extensions
create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
-- Leads (quote uploads, calculator submissions, site-scan requests)
-- -----------------------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('quote', 'calculator', 'site-scan')),
  company text not null,
  email text,
  name text,
  phone text,
  building_type text,
  country text,
  cleanable_area_sqm integer,
  monthly_bill numeric(12, 2),
  monthly_cleangrid numeric(12, 2),
  monthly_savings numeric(12, 2),
  yearly_savings numeric(12, 2),
  currency text not null default 'USD' check (currency in ('EUR', 'USD', 'GBP')),
  contract_end text,
  notes text,
  invoice_storage_path text,
  invoice_file_name text,
  source_url text,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_type_idx on public.leads (type);
create index if not exists leads_company_idx on public.leads (company);

comment on table public.leads is 'All inbound leads from cleangrid.company';

-- -----------------------------------------------------------------------------
-- Row Level Security — website can INSERT only (no public reads)
-- -----------------------------------------------------------------------------
alter table public.leads enable row level security;

drop policy if exists "anon_insert_leads" on public.leads;
create policy "anon_insert_leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

-- Service role / dashboard reads leads via Supabase Table Editor (bypasses RLS)

-- -----------------------------------------------------------------------------
-- Storage bucket for cleaning invoices (PDF/DOC)
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'invoices',
  'invoices',
  false,
  26214400, -- 25 MB
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update set
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "anon_upload_invoices" on storage.objects;
create policy "anon_upload_invoices"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'invoices');

-- Optional: allow anon to update only their folder after insert (for path fix)
drop policy if exists "anon_update_own_invoice" on storage.objects;
create policy "anon_update_own_invoice"
  on storage.objects
  for update
  to anon, authenticated
  using (bucket_id = 'invoices')
  with check (bucket_id = 'invoices');

-- -----------------------------------------------------------------------------
-- Admin view (optional — use in Supabase Table Editor or connect Metabase)
-- -----------------------------------------------------------------------------
create or replace view public.leads_summary as
select
  id,
  type,
  company,
  coalesce(name, '—') as contact_name,
  coalesce(email, '—') as email,
  coalesce(phone, '—') as phone,
  monthly_bill,
  monthly_cleangrid,
  monthly_savings,
  yearly_savings,
  currency,
  invoice_file_name,
  invoice_storage_path is not null as has_invoice,
  created_at
from public.leads
order by created_at desc;

-- Grant anon access to insert only (default for public API)
grant insert on table public.leads to anon;
grant select on table public.leads to service_role;

-- =============================================================================
-- After running SQL:
-- 1. Project Settings → API → copy Project URL + anon public key
-- 2. Add to Vercel / .env:
--      VITE_SUPABASE_URL=https://xxxx.supabase.co
--      VITE_SUPABASE_ANON_KEY=eyJ...
-- 3. Storage → invoices → policies should show insert allowed for anon
-- =============================================================================
