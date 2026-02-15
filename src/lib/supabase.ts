import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://koovcvgjkscvcatfehnz.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtvb3Zjdmdqa3NjdmNhdGZlaG56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNTc2NzUsImV4cCI6MjA4NjczMzY3NX0.H1ac8WkG4fQ9k6MSJ0igbcXRdzlp1UZIYWbXCF6F5mM';

function cleanEnvValue(value: string | undefined, fallback: string) {
  return (value || fallback).replace(/\s+/g, '').trim();
}

function normalizeSupabaseUrl(value: string) {
  try {
    return new URL(value).toString().replace(/\/$/, '');
  } catch {
    return DEFAULT_SUPABASE_URL;
  }
}

const rawSupabaseUrl = cleanEnvValue(import.meta.env.VITE_SUPABASE_URL, DEFAULT_SUPABASE_URL);
const supabaseUrl = normalizeSupabaseUrl(rawSupabaseUrl);
const supabaseAnonKey = cleanEnvValue(import.meta.env.VITE_SUPABASE_ANON_KEY, DEFAULT_SUPABASE_ANON_KEY);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const resilientFetch: typeof fetch = async (input, init) => {
  const run = async (withSignal: boolean) => {
    const requestInit = withSignal ? init : { ...(init || {}), signal: undefined };
    return fetch(input, requestInit as RequestInit);
  };

  try {
    return await run(true);
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return run(false);
    }
    throw error;
  }
};

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        fetch: resilientFetch,
      },
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;
