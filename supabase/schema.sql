create table if not exists public.site_content (
  id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

insert into public.site_content (id, payload)
values ('main', '{}'::jsonb)
on conflict (id) do nothing;

alter table public.site_content enable row level security;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

drop policy if exists "admins can read admin_users" on public.admin_users;
create policy "admins can read admin_users"
on public.admin_users
for select
using (auth.uid() = user_id);

drop policy if exists "public read site_content" on public.site_content;
create policy "public read site_content"
on public.site_content
for select
using (true);

drop policy if exists "admins can insert site_content" on public.site_content;
create policy "admins can insert site_content"
on public.site_content
for insert
with check (
  exists (
    select 1 from public.admin_users au where au.user_id = auth.uid()
  )
);

drop policy if exists "admins can update site_content" on public.site_content;
create policy "admins can update site_content"
on public.site_content
for update
using (
  exists (
    select 1 from public.admin_users au where au.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.admin_users au where au.user_id = auth.uid()
  )
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  company text not null,
  budget text not null,
  project_type text not null,
  details text not null,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

drop policy if exists "public can insert leads" on public.leads;
create policy "public can insert leads"
on public.leads
for insert
with check (true);

drop policy if exists "admins can read leads" on public.leads;
create policy "admins can read leads"
on public.leads
for select
using (
  exists (
    select 1 from public.admin_users au where au.user_id = auth.uid()
  )
);
