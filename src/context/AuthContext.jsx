import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Escuchar cambios de sesión
  useEffect(() => {
    // Obtener sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        fetchOrCreateProfile(session.user)
      } else {
        setLoading(false)
      }
    })

    // Suscribirse a cambios
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session)
        if (session?.user) {
          await fetchOrCreateProfile(session.user)
        } else {
          setProfile(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Buscar perfil existente o crear uno nuevo
  async function fetchOrCreateProfile(user) {
    try {
      // Intentar obtener perfil existente
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (data) {
        setProfile(data)
      } else if (error?.code === 'PGRST116') {
        // No existe -> crear perfil
        const displayName =
          user.user_metadata?.display_name ||
          user.user_metadata?.full_name ||
          user.email?.split('@')[0] ||
          'Usuario'

        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            display_name: displayName,
            email: user.email,
          })
          .select()
          .single()

        if (insertError) {
          console.error('Error creando perfil:', insertError)
        } else {
          setProfile(newProfile)
        }
      } else if (error) {
        console.error('Error obteniendo perfil:', error)
      }
    } catch (err) {
      console.error('Error en fetchOrCreateProfile:', err)
    } finally {
      setLoading(false)
    }
  }

  // Enviar OTP al email
  async function sendOtp(email, displayName) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        data: { display_name: displayName },
      },
    })
    if (error) throw error
  }

  // Verificar código OTP
  async function verifyOtp(email, token) {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    })
    if (error) throw error
    return data
  }

  // Cerrar sesión
  async function signOut() {
    await supabase.auth.signOut()
    setSession(null)
    setProfile(null)
  }

  const value = {
    session,
    user: session?.user ?? null,
    profile,
    loading,
    isAuthenticated: !!session,
    sendOtp,
    verifyOtp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
