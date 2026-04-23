import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './AuthPages.css'

export default function VerifyOtpPage() {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [resending, setResending] = useState(false)
  const inputRefs = useRef([])
  const navigate = useNavigate()
  const { verifyOtp, sendOtp } = useAuth()

  const email = sessionStorage.getItem('otp_email') || ''
  const displayName = sessionStorage.getItem('otp_name') || ''

  // Si no hay email, volver al login
  useEffect(() => {
    if (!email) navigate('/login', { replace: true })
  }, [email, navigate])

  // Foco automático en el primer input
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  function handleChange(index, value) {
    if (!/^\d*$/.test(value)) return // solo números

    const newCode = [...code]
    newCode[index] = value.slice(-1) // solo un dígito
    setCode(newCode)

    // Avanzar al siguiente input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setCode(pasted.split(''))
      inputRefs.current[5]?.focus()
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const token = code.join('')
    if (token.length < 6) {
      setError('Ingresá los 6 dígitos del código')
      return
    }

    setVerifying(true)
    try {
      await verifyOtp(email, token)
      sessionStorage.removeItem('otp_email')
      sessionStorage.removeItem('otp_name')
      navigate('/', { replace: true })
    } catch (err) {
      console.error('Error verificando OTP:', err)
      setError('Código incorrecto o expirado. Intentá de nuevo.')
      setCode(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } finally {
      setVerifying(false)
    }
  }

  async function handleResend() {
    setResending(true)
    setError('')
    try {
      await sendOtp(email, displayName)
      setError('') // limpiar errores previos
    } catch (err) {
      setError('Error reenviando código. Esperá un momento.')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">📬</div>
          <h1>Verificá tu email</h1>
          <p className="auth-subtitle">
            Enviamos un código de 6 dígitos a<br />
            <strong>{email}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="otp-inputs" onPaste={handlePaste}>
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="otp-digit"
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                autoComplete="one-time-code"
              />
            ))}
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button
            type="submit"
            className="auth-btn"
            disabled={verifying}
          >
            {verifying ? (
              <span className="auth-spinner" />
            ) : (
              'Verificar código'
            )}
          </button>

          <button
            type="button"
            className="auth-link"
            onClick={handleResend}
            disabled={resending}
          >
            {resending ? 'Reenviando...' : '¿No recibiste el código? Reenviar'}
          </button>

          <button
            type="button"
            className="auth-link"
            onClick={() => navigate('/login')}
          >
            ← Cambiar email
          </button>
        </form>
      </div>
    </div>
  )
}
