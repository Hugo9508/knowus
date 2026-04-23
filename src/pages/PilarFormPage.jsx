import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ISLA_RAICES, getPilarById } from '../data/islaRaices'
import { saveAnswers, loadAnswers } from '../lib/answersService'
import './PilarFormPage.css'

export default function PilarFormPage() {
  const { pilarId } = useParams()
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  const pilar = getPilarById(pilarId)

  /* If pilar not found, redirect */
  if (!pilar) {
    return (
      <div className="pilar-form" style={{ textAlign: 'center', paddingTop: '40px' }}>
        <p className="text-display-md" style={{ fontStyle: 'italic' }}>Pilar no encontrado</p>
        <button className="btn-primary" style={{ marginTop: '24px', maxWidth: '200px' }} onClick={() => navigate('/islas')}>
          Volver a Islas
        </button>
      </div>
    )
  }

  /* State for all answers */
  const [answers, setAnswers] = useState({})
  const [multiSelects, setMultiSelects] = useState({})
  const [sliderValues, setSliderValues] = useState({})
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loadingData, setLoadingData] = useState(true)

  /* Load existing answers on mount */
  useEffect(() => {
    async function load() {
      if (!user) return
      try {
        const result = await loadAnswers({
          pillarSlug: pilarId,
          userId: user.id,
        })
        if (result?.content) {
          const content = result.content
          const textAnswers = {}
          const multiAnswers = {}
          const sliderAnswers = {}

          // Distribuir las respuestas según tipo de pregunta
          pilar.questions.forEach((q) => {
            const val = content[q.id]
            if (val === undefined) return
            if (q.type === 'text' || q.type === 'choice') {
              textAnswers[q.id] = val
            } else if (q.type === 'multiselect') {
              multiAnswers[q.id] = Array.isArray(val) ? val : []
            } else if (q.type === 'slider') {
              sliderAnswers[q.id] = val
            }
          })

          setAnswers(textAnswers)
          setMultiSelects(multiAnswers)
          setSliderValues(sliderAnswers)
          setSaved(true)
        }
      } catch (err) {
        console.error('Error cargando respuestas:', err)
      } finally {
        setLoadingData(false)
      }
    }
    load()
  }, [pilarId, user])

  /* Nav: find prev/next pilar */
  const currentIndex = ISLA_RAICES.pilares.findIndex(p => p.id === pilarId)
  const prevPilar = currentIndex > 0 ? ISLA_RAICES.pilares[currentIndex - 1] : null
  const nextPilar = currentIndex < ISLA_RAICES.pilares.length - 1 ? ISLA_RAICES.pilares[currentIndex + 1] : null

  /* Calculate completion */
  const totalQuestions = pilar.questions.length
  const answeredCount = pilar.questions.filter(q => {
    if (q.type === 'text') return (answers[q.id] || '').trim().length > 10
    if (q.type === 'choice') return !!answers[q.id]
    if (q.type === 'multiselect') return (multiSelects[q.id] || []).length > 0
    if (q.type === 'slider') return sliderValues[q.id] !== undefined
    return false
  }).length
  const progress = Math.round((answeredCount / totalQuestions) * 100)

  const handleTextChange = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }))
    setSaved(false)
  }

  const handleChoiceSelect = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }))
    setSaved(false)
  }

  const handleMultiSelect = (qId, value) => {
    setMultiSelects(prev => {
      const current = prev[qId] || []
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      return { ...prev, [qId]: updated }
    })
    setSaved(false)
  }

  const handleSliderChange = (qId, value) => {
    setSliderValues(prev => ({ ...prev, [qId]: parseInt(value) }))
    setSaved(false)
  }

  const handleSave = async () => {
    if (!user) return
    setSaving(true)

    // Consolidar todas las respuestas en un solo JSONB
    const content = {}
    pilar.questions.forEach((q) => {
      if (q.type === 'text' || q.type === 'choice') {
        if (answers[q.id]) content[q.id] = answers[q.id]
      } else if (q.type === 'multiselect') {
        if (multiSelects[q.id]?.length > 0) content[q.id] = multiSelects[q.id]
      } else if (q.type === 'slider') {
        if (sliderValues[q.id] !== undefined) content[q.id] = sliderValues[q.id]
      }
    })

    try {
      await saveAnswers({
        pillarSlug: pilarId,
        userId: user.id,
        coupleId: profile?.couple_id || null,
        content,
        isComplete: progress === 100,
      })
      setSaved(true)
    } catch (err) {
      console.error('Error guardando:', err)
    } finally {
      setSaving(false)
    }
  }

  if (loadingData) {
    return (
      <div className="pilar-form" style={{ textAlign: 'center', paddingTop: '80px' }}>
        <div style={{
          width: 36, height: 36,
          border: '3px solid rgba(255,255,255,0.1)',
          borderTopColor: 'var(--color-accent, #e07a5f)',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite',
          margin: '0 auto',
        }} />
        <p style={{ marginTop: '16px', opacity: 0.6 }}>Cargando respuestas...</p>
      </div>
    )
  }

  return (
    <div className="pilar-form stagger">
      {/* Header with theory */}
      <header className="pilar-form__header">
        <div className="pilar-form__number-badge">P{pilar.number}</div>
        <h1 className="text-display-md">{pilar.name}</h1>
        <p className="pilar-form__theory">
          <span className="material-symbols-outlined" style={{ fontSize: '14px', verticalAlign: 'middle' }}>school</span>
          {' '}{pilar.theory}
        </p>
        <div className="pilar-form__tags">
          {pilar.tags.map(t => <span key={t} className="chip">{t}</span>)}
        </div>
      </header>

      {/* Intro */}
      <section className="pilar-form__intro card">
        <p className="text-body-md" style={{ lineHeight: 1.7, color: 'var(--color-on-surface)' }}>
          {pilar.intro}
        </p>
        {pilar.contextNote && (
          <p className="pilar-form__context-note">
            {pilar.contextNote}
          </p>
        )}
      </section>

      {/* Progress indicator */}
      <div className="pilar-form__progress">
        <div className="pilar-form__progress-info">
          <span className="text-label-xs">{answeredCount} / {totalQuestions} respondidas</span>
          <span className="text-label-xs" style={{ color: 'var(--color-secondary)' }}>{progress}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar__fill" style={{ width: `${progress}%`, background: ISLA_RAICES.color }} />
        </div>
      </div>

      {/* Questions */}
      <section className="pilar-form__questions">
        {pilar.questions.map((q, i) => (
          <div key={q.id} className="card pilar-form__card">
            <div className="pilar-form__q-number">{i + 1}</div>
            <h2 className="text-question" style={{ color: 'var(--color-on-surface)' }}>{q.prompt}</h2>
            {q.guidance && (
              <p className="pilar-form__guidance">{q.guidance}</p>
            )}

            {/* TEXT */}
            {q.type === 'text' && (
              <textarea
                className="textarea-minimal"
                placeholder={q.placeholder}
                value={answers[q.id] || ''}
                onChange={e => handleTextChange(q.id, e.target.value)}
              />
            )}

            {/* CHOICE (single select) */}
            {q.type === 'choice' && (
              <div className="pilar-form__choices">
                {q.options.map(opt => (
                  <button
                    key={opt}
                    className={`pilar-form__choice ${answers[q.id] === opt ? 'pilar-form__choice--active' : ''}`}
                    onClick={() => handleChoiceSelect(q.id, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* MULTISELECT */}
            {q.type === 'multiselect' && (
              <div className="pilar-form__multiselect">
                {q.options.map(opt => {
                  const isSelected = (multiSelects[q.id] || []).includes(opt)
                  return (
                    <button
                      key={opt}
                      className={`pilar-form__multi-chip ${isSelected ? 'pilar-form__multi-chip--active' : ''}`}
                      onClick={() => handleMultiSelect(q.id, opt)}
                    >
                      {isSelected && <span className="material-symbols-outlined fill" style={{ fontSize: '14px' }}>check</span>}
                      {opt}
                    </button>
                  )
                })}
              </div>
            )}

            {/* SLIDER */}
            {q.type === 'slider' && (
              <div className="pilar-form__slider-wrap">
                <div className="pilar-form__slider-labels">
                  <span>{q.minLabel}</span>
                  <span>{q.maxLabel}</span>
                </div>
                <input
                  type="range"
                  min={q.min}
                  max={q.max}
                  value={sliderValues[q.id] ?? Math.ceil((q.min + q.max) / 2)}
                  onChange={e => handleSliderChange(q.id, e.target.value)}
                  className="pilar-form__slider"
                />
                <div className="pilar-form__slider-value">
                  {sliderValues[q.id] ?? '—'}
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Partner Status */}
      <section className="pilar-form__status card-dark">
        <span className="material-symbols-outlined" style={{ color: 'var(--color-secondary-fixed-dim, #f3bb90)', fontSize: '20px' }}>hourglass_empty</span>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 500 }}>Ella aún no respondió este pilar</p>
          <p style={{ fontSize: '12px', opacity: 0.7, lineHeight: 1.5, marginTop: '4px' }}>
            El espejo se desbloqueará cuando ambos completen. Tomá tu tiempo para profundizar — no hay prisa.
          </p>
        </div>
      </section>

      {/* Save Button */}
      <div className="pilar-form__actions">
        <button
          className={`btn-secondary ${saved ? 'btn-secondary--saved' : ''}`}
          onClick={handleSave}
          disabled={answeredCount === 0 || saving}
          style={{ opacity: answeredCount === 0 ? 0.5 : 1 }}
        >
          {saving ? 'Guardando...' : saved ? '✓ Guardado' : `Guardar respuestas · +50 XP`}
        </button>
      </div>

      {/* Navigation between pilares */}
      <nav className="pilar-form__nav">
        {prevPilar ? (
          <button className="pilar-form__nav-btn" onClick={() => navigate(`/islas/raices/pilar/${prevPilar.id}`)}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_left</span>
            P{prevPilar.number} · {prevPilar.name}
          </button>
        ) : <div />}
        {nextPilar ? (
          <button className="pilar-form__nav-btn" onClick={() => navigate(`/islas/raices/pilar/${nextPilar.id}`)}>
            P{nextPilar.number} · {nextPilar.name}
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
          </button>
        ) : <div />}
      </nav>
    </div>
  )
}
