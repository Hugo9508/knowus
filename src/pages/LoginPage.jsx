import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './AuthPages.css'

export default function LoginPage() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const navigate = useNavigate()
  const { sendOtp } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!displayName.trim() || !email.trim()) {
      setError('Necesito tu nombre y email para continuar')
      return
    }

    // Whitelist de emails permitidos
    const allowedEmails = (import.meta.env.VITE_ALLOWED_EMAILS || '')
      .split(',')
      .map((e) => e.trim().toLowerCase())

    if (!allowedEmails.includes(email.trim().toLowerCase())) {
      setError('Este email no tiene acceso a la app. Relational OS es por invitación.')
      return
    }

    setSending(true)
    try {
      await sendOtp(email.trim(), displayName.trim())
      // Guardamos en sessionStorage para la pantalla de verificación
      sessionStorage.setItem('otp_email', email.trim())
      sessionStorage.setItem('otp_name', displayName.trim())
      navigate('/verify')
    } catch (err) {
      console.error('Error enviando OTP:', err)
      setError(err.message || 'Error al enviar el código. Intentá de nuevo.')
    } finally {
      setSending(false)
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
            <label htmlFor="displayName">¿Cómo te llamás?</label>
            <input
              id="displayName"
              type="text"
              placeholder="Tu nombre"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              autoComplete="name"
              autoFocus
            />
          </div>

          <div className="auth-field">
            <label htmlFor="email">Tu email</label>
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
            disabled={sending}
          >
            {sending ? (
              <span className="auth-spinner" />
            ) : (
              'Enviar código de acceso'
            )}
          </button>

          <p className="auth-hint">
            Te enviaremos un código de 6 dígitos a tu email. Sin contraseñas.
          </p>
        </form>
      </div>
    </div>
  )
}
