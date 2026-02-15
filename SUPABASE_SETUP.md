# Supabase Setup

This project syncs site content to Supabase with RLS security:
- Public users can read published content.
- Only Supabase admin users can edit content in `/admin`.
- Public users can submit leads.
- Only Supabase admin users can read leads.

## 1) Environment variables

Create a `.env.local` file in project root:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

If these values are missing, the app falls back to localStorage.

## 2) Create tables and policies

Run the SQL in `supabase/schema.sql` in Supabase SQL Editor.

## 3) Create admin auth user

1. In Supabase Dashboard, open **Authentication -> Users**.
2. Click **Add user** and create your admin email/password.
3. Copy that user's UUID.
4. Insert it into `admin_users` table:

```sql
insert into public.admin_users (user_id)
values ('YOUR_AUTH_USER_UUID')
on conflict (user_id) do nothing;
```

## 4) Verify

1. Run the app/build.
2. Login at `/admin` with your Supabase admin user.
3. Edit content in `/admin`.
3. Refresh browser.
4. Confirm changes persist and the `site_content` row (`id = main`) updates.
5. Submit contact form as public user and confirm a row is added to `leads`.

## Notes

- If env vars are missing, app falls back to localStorage.
- `/admin` login uses Supabase Auth when env vars exist.
