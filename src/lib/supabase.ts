import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://koovcvgjkscvcatfehnz.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtvb3Zjdmdqa3NjdmNhdGZlaG56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNTc2NzUsImV4cCI6MjA4NjczMzY3NX0.H1ac8WkG4fQ9k6MSJ0igbcXRdzlp1UZIYWbXCF6F5mM';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL).trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY).trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;
