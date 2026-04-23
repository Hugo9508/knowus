import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { generateInviteCode, findUserByInviteCode, linkCouple, getCoupleInfo } from '../lib/coupleService'
import './LinkPage.css'

export default function LinkPage() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  const [coupleInfo, setCoupleInfo] = useState(null)
  const [inviteCode, setInviteCode] = useState(null)
  const [inputCode, setInputCode] = useState('')
  const [step, setStep] = useState('loading') // loading | choose | generate | enter | linked
  const [error, setError] = useState('')
  const [linking, setLinking] = useState(false)
  const [foundPartner, setFoundPartner] = useState(null)

  useEffect(() => {
    async function checkExisting() {
      if (!user) return
      const info = await getCoupleInfo(user.id)
      if (info) {
        setCoupleInfo(info)
        setStep('linked')
      } else {
        setStep('choose')
      }
    }
    checkExisting()
  }, [user])

  async function handleGenerate() {
    try {
      const code = await generateInviteCode(user.id)
      setInviteCode(code)
      setStep('generate')
    } catch (err) {
      setError('Error generando código: ' + err.message)
    }
  }

  async function handleSearch() {
    setError('')
    if (inputCode.length < 6) {
      setError('El código tiene 6 caracteres')
      return
    }

    const partner = await findUserByInviteCode(inputCode)
    if (!partner) {
      setError('Código no encontrado. Verificá que sea correcto.')
      return
    }
    if (partner.id === user.id) {
      setError('No podés vincularte con vos mismo 😅')
      return
    }
    setFoundPartner(partner)
  }

  async function handleLink() {
    if (!foundPartner) return
    setLinking(true)
    setError('')

    try {
      const result = await linkCouple(foundPartner.id, user.id)
      const info = await getCoupleInfo(user.id)
      setCoupleInfo(info)
      setStep('linked')
    } catch (err) {
      setError('Error vinculando: ' + err.message)
    } finally {
      setLinking(false)
    }
  }

  async function copyCode() {
    if (inviteCode) {
      await navigator.clipboard.writeText(inviteCode)
    }
  }

  if (step === 'loading') {
    return (
      <div className="link-page">
        <div className="link-page__loader" />
      </div>
    )
  }

  if (step === 'linked') {
    return (
      <div className="link-page stagger">
        <div className="link-page__success-icon">💞</div>
        <h1 className="text-display-md">Están conectados</h1>
        <p className="link-page__subtitle">
          Tu viaje con <strong>{coupleInfo?.partner?.display_name}</strong> ya comenzó
        </p>

        <div className="link-page__partner-card card">
          <div className="link-page__partner-avatar">
            {coupleInfo?.partner?.display_name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="link-page__partner-name">{coupleInfo?.partner?.display_name}</p>
            <p className="link-page__partner-email">{coupleInfo?.partner?.email}</p>
          </div>
          <span className="link-page__status-badge">Activa</span>
        </div>

        <button className="btn-primary" onClick={() => navigate('/')} style={{ marginTop: '24px' }}>
          Ir al inicio
        </button>
      </div>
    )
  }

  return (
    <div className="link-page stagger">
      <div className="link-page__header-icon">🔗</div>
      <h1 className="text-display-md">Vincular pareja</h1>
      <p className="link-page__subtitle">
        Relational OS es para dos. Conectá con tu persona para desbloquear El Espejo y El Oráculo.
      </p>

      {step === 'choose' && (
        <div className="link-page__options">
          <button className="link-page__option card" onClick={handleGenerate}>
            <span className="link-page__option-icon">📤</span>
            <h2 className="link-page__option-title">Generar código</h2>
            <p className="link-page__option-desc">Creá un código y compartilo con tu pareja</p>
          </button>

          <button className="link-page__option card" onClick={() => setStep('enter')}>
            <span className="link-page__option-icon">📥</span>
            <h2 className="link-page__option-title">Tengo un código</h2>
            <p className="link-page__option-desc">Tu pareja ya te compartió un código</p>
          </button>
        </div>
      )}

      {step === 'generate' && (
        <div className="link-page__code-section">
          <p className="link-page__code-label">Tu código de invitación:</p>
          <div className="link-page__code-display" onClick={copyCode} title="Click para copiar">
            {inviteCode?.split('').map((char, i) => (
              <span key={i} className="link-page__code-char">{char}</span>
            ))}
          </div>
          <p className="link-page__code-hint">
            <span className="material-symbols-outlined" style={{ fontSize: '14px', verticalAlign: 'middle' }}>content_copy</span>
            {' '}Tocá el código para copiarlo · Compartilo con tu pareja
          </p>
          <button className="link-page__back-btn" onClick={() => setStep('choose')}>
            ← Volver
          </button>
        </div>
      )}

      {step === 'enter' && (
        <div className="link-page__enter-section">
          <label className="link-page__input-label">Ingresá el código de 6 caracteres:</label>
          <input
            className="link-page__code-input"
            value={inputCode}
            onChange={e => setInputCode(e.target.value.toUpperCase().slice(0, 6))}
            placeholder="ABC123"
            maxLength={6}
            autoFocus
          />

          {!foundPartner ? (
            <button
              className="btn-primary"
              onClick={handleSearch}
              disabled={inputCode.length < 6}
              style={{ opacity: inputCode.length < 6 ? 0.5 : 1 }}
            >
              Buscar
            </button>
          ) : (
            <div className="link-page__confirm">
              <div className="link-page__partner-card card">
                <div className="link-page__partner-avatar">
                  {foundPartner.display_name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="link-page__partner-name">{foundPartner.display_name}</p>
                  <p className="link-page__partner-email">{foundPartner.email}</p>
                </div>
              </div>
              <p className="link-page__confirm-text">¿Es esta tu pareja?</p>
              <div className="link-page__confirm-actions">
                <button className="btn-primary" onClick={handleLink} disabled={linking}>
                  {linking ? 'Vinculando...' : 'Sí, vincular ✦'}
                </button>
                <button className="link-page__back-btn" onClick={() => { setFoundPartner(null); setInputCode('') }}>
                  No, cancelar
                </button>
              </div>
            </div>
          )}

          {!foundPartner && (
            <button className="link-page__back-btn" onClick={() => setStep('choose')}>
              ← Volver
            </button>
          )}
        </div>
      )}

      {error && (
        <div className="link-page__error">
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>error</span>
          {error}
        </div>
      )}
    </div>
  )
}
