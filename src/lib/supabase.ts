
import { createClient } from '@supabase/supabase-js';

// These are safe to expose in client-side code
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  );
}

// Create a fallback configuration for development to prevent immediate crashes
const fallbackUrl = 'https://placeholder-url.supabase.co';
const fallbackKey = 'placeholder-key';

// Use fallbacks only if values are missing
export const supabase = createClient(
  supabaseUrl || fallbackUrl,
  supabaseAnonKey || fallbackKey
);
