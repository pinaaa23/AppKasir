import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase = null

try {
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  } else {
    console.warn("⚠️ Supabase env belum ada")
  }
} catch (err) {
  console.warn('⚠️ Supabase initialization error:', err.message)
}

export { supabase }

export const isSupabaseConfigured = () => {
  return supabase !== null
}
