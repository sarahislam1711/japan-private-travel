-- Trip plans sent from the Contact page's planner (8 Oct 2026).
-- Row level security is on with no anon policies: only the server, using the
-- service role key, reads or writes this table.

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'in_progress', 'quoted', 'booked', 'closed')),
  source text not null default 'planner',
  locale text not null check (locale in ('en', 'ar')),
  name text not null,
  reply_channel text not null check (reply_channel in ('whatsapp', 'email', 'phone')),
  contact text not null,
  reply_language text not null check (reply_language in ('ar', 'en', 'ja')),
  adults smallint not null default 0,
  grandparents smallint not null default 0,
  child_ages smallint[] not null default '{}',
  months smallint[] not null default '{}',
  not_sure boolean not null default false,
  dates_note text not null default '',
  places text[] not null default '{}',
  needs text not null default '',
  notes text not null default ''
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);

alter table public.enquiries enable row level security;
-- Deliberately no policies: anon and authenticated roles can do nothing.
