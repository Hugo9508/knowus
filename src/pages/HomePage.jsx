import { Link } from 'react-router-dom'
import './HomePage.css'

const moods = [
  { emoji: '😊', label: 'Feliz' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😔', label: 'Triste' },
  { emoji: '🥰', label: 'Enamorado' },
  { emoji: '😫', label: 'Agotado' },
]

const islands = [
  { id: 'raices', name: 'Raíces', icon: 'eco', progress: 43, color: 'var(--color-secondary)', unlocked: true },
  { id: 'motor', name: 'El Motor', icon: 'favorite', progress: 14, color: 'var(--color-error)', unlocked: true },
  { id: 'puente', name: 'El Puente', icon: 'link', progress: 0, color: 'var(--color-on-surface-variant)', unlocked: false },
  { id: 'horizonte', name: 'Horizonte', icon: 'distance', progress: 0, color: 'var(--color-on-surface-variant)', unlocked: false },
]

export default function HomePage() {
  return (
    <div className="home stagger">
      {/* Sync Score Card */}
      <section className="sync-card card-dark">
        <div className="sync-card__header">
          <div className="sync-card__avatars">
            <div className="sync-card__avatar sync-card__avatar--user">N</div>
            <div className="sync-card__avatar sync-card__avatar--partner">E</div>
          </div>
          <div className="sync-card__score">
            <span className="text-label-xs" style={{ opacity: 0.8 }}>Sincronía</span>
            <p className="text-display-md" style={{ color: 'var(--color-header-text)' }}>
              340 <span className="text-body-md" style={{ opacity: 0.8, fontSize: '14px' }}>XP</span>
            </p>
          </div>
        </div>
        <div className="sync-card__streak">
          <span className="material-symbols-outlined fill" style={{ fontSize: '18px', color: 'var(--color-terracotta)' }}>bolt</span>
          <span style={{ fontWeight: 700, fontSize: '14px' }}>7 días en racha</span>
        </div>
      </section>

      {/* Pregunta del día */}
      <section className="card daily-question">
        <span className="text-label-xs" style={{ color: 'var(--color-terracotta)', letterSpacing: '0.15em' }}>
          Pregunta del día
        </span>
        <p className="text-question" style={{ color: 'var(--color-primary-container)', marginTop: '12px' }}>
          "Si pudieras revivir un momento de nuestra primera semana, ¿cuál elegirías?"
        </p>
        <button className="btn-primary" style={{ marginTop: '16px' }}>
          Responder ahora
        </button>
      </section>

      {/* Mood Tracker */}
      <section className="mood-tracker">
        <p className="text-question" style={{ textAlign: 'center', fontSize: '18px', color: 'var(--color-primary-container)' }}>
          ¿Cómo te sientes hoy?
        </p>
        <div className="mood-tracker__grid card">
          {moods.map((m) => (
            <button key={m.label} className="mood-tracker__btn" title={m.label}>
              <span style={{ fontSize: '28px' }}>{m.emoji}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Island Grid */}
      <div className="island-grid">
        {islands.map((isla) => (
          <Link
            key={isla.id}
            to={isla.unlocked ? `/islas` : '#'}
            className={`island-card card ${!isla.unlocked ? 'island-card--locked' : ''}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {!isla.unlocked && (
              <span className="material-symbols-outlined island-card__lock">lock</span>
            )}
            <div className="island-card__header">
              <span className="material-symbols-outlined" style={{ color: isla.color, opacity: isla.unlocked ? 1 : 0.4 }}>
                {isla.icon}
              </span>
              {isla.unlocked && (
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-on-surface-variant)' }}>
                  {isla.progress}%
                </span>
              )}
            </div>
            <div className="island-card__footer">
              <h3 className="text-display-md" style={{
                fontSize: '18px',
                lineHeight: 1.2,
                marginBottom: '8px',
                color: isla.unlocked ? 'var(--color-on-surface)' : 'var(--color-on-surface-variant)',
              }}>
                {isla.name}
              </h3>
              <div className="progress-bar">
                <div
                  className="progress-bar__fill"
                  style={{ width: `${isla.progress}%`, background: isla.color }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
