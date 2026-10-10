-- Agent access requests from the For travel advisors page (10 Oct 2026).
-- Row level security on, no anon policies: only the server (service role) reads or writes.
create table if not exists public.advisor_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'verifying', 'approved', 'declined')),
  locale text not null check (locale in ('en', 'ar')),
  name text not null,
  agency text not null,
  country text not null,
  network text not null,
  registration text not null,
  email text not null,
  notes text not null default ''
);
create index if not exists advisor_requests_created_at_idx on public.advisor_requests (created_at desc);
alter table public.advisor_requests enable row level security;
