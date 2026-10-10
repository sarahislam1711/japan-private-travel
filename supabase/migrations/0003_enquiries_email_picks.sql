-- The itinerary email, asked of every family, and what they added to My trip (10 Oct 2026).
alter table public.enquiries add column if not exists email text not null default '';
alter table public.enquiries add column if not exists picks text[] not null default '{}';
