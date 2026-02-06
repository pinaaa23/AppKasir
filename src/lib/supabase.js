import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

let supabase = null

try {
  if (SUPABASE_URL && SUPABASE_ANON_KEY && !SUPABASE_URL.includes('placeholder')) {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  }
} catch (err) {
  console.warn('⚠️ Supabase initialization error:', err.message)
}

export { supabase }
export const isSupabaseConfigured = () => {
  return supabase !== null && SUPABASE_URL && !SUPABASE_URL.includes('placeholder')
}
