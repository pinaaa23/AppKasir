import { useState, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if already logged in
  const checkAuth = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured')
      setIsAuthenticated(false)
      return null
    }

    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        setIsAuthenticated(true)
        return user
      } else {
        setIsAuthenticated(false)
        return null
      }
    } catch (err) {
      console.error('Auth check error:', err.message)
      setError(err.message)
      setIsAuthenticated(false)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Sign up
  const signUp = useCallback(async (email, password) => {
    if (!isSupabaseConfigured()) {
      setError('Supabase not configured')
      return { error: 'Supabase not configured' }
    }

    try {
      setLoading(true)
      setError(null)
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}`,
        }
      })

      if (signUpError) throw signUpError

      setUser(data.user)
      return { data, error: null }
    } catch (err) {
      const errorMsg = err.message || 'Gagal daftar'
      setError(errorMsg)
      return { error: errorMsg }
    } finally {
      setLoading(false)
    }
  }, [])

  // Sign in
  const signIn = useCallback(async (email, password) => {
    if (!isSupabaseConfigured()) {
      setError('Supabase not configured')
      return { error: 'Supabase not configured' }
    }

    try {
      setLoading(true)
      setError(null)
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) throw signInError

      setUser(data.user)
      setIsAuthenticated(true)
      return { data, error: null }
    } catch (err) {
      const errorMsg = err.message || 'Gagal login'
      setError(errorMsg)
      return { error: errorMsg }
    } finally {
      setLoading(false)
    }
  }, [])

  // Sign out
  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setIsAuthenticated(false)
      setUser(null)
      return
    }

    try {
      setLoading(true)
      const { error: signOutError } = await supabase.auth.signOut()
      if (signOutError) throw signOutError
      
      setUser(null)
      setIsAuthenticated(false)
    } catch (err) {
      console.error('Sign out error:', err.message)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    user,
    loading,
    error,
    isAuthenticated,
    checkAuth,
    signUp,
    signIn,
    signOut,
    setError
  }
}
