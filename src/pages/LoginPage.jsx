import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './AuthPages.css'

export default function LoginPage() {
  const [displayName, setDisplayName] = useState('admin')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { loginStatic } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!displayName.trim() || !email.trim()) {
      setError('Necesito tu nombre y email para continuar')
      return
    }

    // Whitelist de emails permitidos (opcional en testing, pero lo mantenemos por seguridad)
    const allowedEmails = (import.meta.env.VITE_ALLOWED_EMAILS || '')
      .split(',')
      .map((e) => e.trim().toLowerCase())

    if (allowedEmails.length > 0 && import.meta.env.VITE_ALLOWED_EMAILS && !allowedEmails.includes(email.trim().toLowerCase())) {
      setError('Este email no tiene acceso a la app. Relational OS es por invitación.')
      return
    }

    try {
      // Login estático bypass
      loginStatic(displayName.trim(), email.trim())
      navigate('/')
    } catch (err) {
      console.error('Error en login estático:', err)
      setError('Error al iniciar sesión en modo testing.')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🏝️</div>
          <h1>Relational OS</h1>
          <p className="auth-subtitle">
            Conocerse es el primer acto de amor
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="displayName">Usuario</label>
            <input
              id="displayName"
              type="text"
              placeholder="Admin"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              autoComplete="name"
              autoFocus
            />
          </div>

          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="nombre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button
            type="submit"
            className="auth-btn"
          >
            Entrar (Modo Testing)
          </button>

          <p className="auth-hint">
            Login estático activado. Ingresa tu correo para probar.
          </p>
        </form>
      </div>
    </div>
  )
}
