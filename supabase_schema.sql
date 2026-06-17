-- SQL Script to set up the "articles" table in Supabase
-- Run this in the Supabase SQL Editor for your project.

create table public.articles (
  slug text primary key,
  title text not null,
  category text not null,
  badge text not null,
  badge_style text not null default 'badge--gray',
  tldr text not null,
  cover_gradient text not null default 'linear-gradient(135deg, #0B4F49 0%, #0F766E 50%, #1a8a81 100%)',
  cover_emoji text not null default '🌙',
  card_bg text not null default '#DFF0ED',
  sources integer not null default 0,
  updated_at text not null,
  kesimpulan jsonb not null default '[]'::jsonb,
  pendapat jsonb not null default '[]'::jsonb,
  dalil jsonb not null default '[]'::jsonb,
  sikap_praktis jsonb not null default '[]'::jsonb,
  sumber jsonb not null default '[]'::jsonb,
  created_at timestamp with time zone not null default now()
);

-- Enable Row Level Security (RLS)
alter table public.articles enable row level security;

-- Create Policy to allow read access to everyone
create policy "Allow public read access"
  on public.articles for select
  using (true);

-- Create Policy to allow write access to authenticated users or using service role / custom criteria.
-- Since the admin page uses PIN authorization checked on the server (via server actions), 
-- the server action executes as the Supabase client.
-- If you want the anonymous public client (used by the Server Actions) to insert/update/delete, 
-- you can use these simple policies (with caution, or secure them with a service role key in .env.local).
create policy "Allow public insert access"
  on public.articles for insert
  with check (true);

create policy "Allow public update access"
  on public.articles for update
  using (true);

create policy "Allow public delete access"
  on public.articles for delete
  using (true);
