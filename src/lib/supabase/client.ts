import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = (typeof process !== "undefined" ? process.env?.VITE_SUPABASE_URL : undefined) 
  || (typeof import.meta !== "undefined" ? (import.meta as any).env?.VITE_SUPABASE_URL : undefined)
  || "";

const supabaseAnonKey = (typeof process !== "undefined" ? process.env?.VITE_SUPABASE_ANON_KEY : undefined) 
  || (typeof import.meta !== "undefined" ? (import.meta as any).env?.VITE_SUPABASE_ANON_KEY : undefined)
  || "";

export const supabase: SupabaseClient | null = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;
