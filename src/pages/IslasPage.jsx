import { Link } from 'react-router-dom'
import { ISLA_RAICES } from '../data/islaRaices'
import './IslasPage.css'

const islands = [
  { ...ISLA_RAICES, progress: 0 },
  { id: 'motor', name: 'El Motor', subtitle: 'Qué te mueve, qué te agota', emoji: '⚡', color: '#C0392B', progress: 0, unlocked: false, pilares: [] },
  { id: 'puente', name: 'El Puente', subtitle: 'Cómo te conectás con el otro', emoji: '🌉', color: '#2980B9', progress: 0, unlocked: false, pilares: [] },
  { id: 'cueva', name: 'La Cueva', subtitle: 'Lo que guardás y protegés', emoji: '🕳️', color: '#6C3483', progress: 0, unlocked: false, pilares: [] },
  { id: 'horizonte', name: 'Horizonte', subtitle: 'Hacia dónde van juntos', emoji: '🌅', color: '#1A8754', progress: 0, unlocked: false, pilares: [] },
]

export default function IslasPage() {
  return (
    <div className="islas stagger">
      <header className="islas__header">
        <h2 className="text-display-lg" style={{ fontStyle: 'italic', color: 'var(--color-primary-container)' }}>
          Islas
        </h2>
        <p className="text-body-md" style={{ fontStyle: 'italic', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
          Explora la geografía de tu vínculo.
        </p>
      </header>

      {/* Islands List */}
      <div className="islas__list">
        {islands.map((isla) => (
          <div key={isla.id} className={`isla-row card ${!isla.unlocked ? 'isla-row--locked' : ''}`}>
            {!isla.unlocked && <span className="material-symbols-outlined isla-row__lock">lock</span>}
            <div className="isla-row__icon">
              <span style={{ fontSize: '24px' }}>{isla.emoji}</span>
            </div>
            <div className="isla-row__content">
              <h3 className="text-body-lg" style={{ fontWeight: 600 }}>{isla.name}</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>{isla.subtitle}</p>
              {isla.theories && (
                <p className="isla-row__theory">
                  {isla.theories.slice(0, 2).join(' · ')}
                </p>
              )}
              <div className="progress-bar" style={{ marginTop: '8px' }}>
                <div className="progress-bar__fill" style={{ width: `${isla.progress}%`, background: isla.color }} />
              </div>
            </div>
            {isla.unlocked && (
              <span className="material-symbols-outlined" style={{ color: 'var(--color-on-surface-variant)', opacity: 0.4 }}>chevron_right</span>
            )}
          </div>
        ))}
      </div>

      {/* Raíces Pilares — the real 7 pilares */}
      <div className="pilar-section">
        <div className="pilar-section__header">
          <h4 className="text-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>
            Pilares de Raíces
          </h4>
          <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', opacity: 0.7 }}>
            0 / {ISLA_RAICES.pilares.length} completados
          </span>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', fontStyle: 'italic', marginBottom: '16px', lineHeight: 1.5 }}>
          {ISLA_RAICES.description}
        </p>
        <div className="pilar-section__list stagger">
          {ISLA_RAICES.pilares.map((pilar) => (
            <Link
              key={pilar.id}
              to={`/islas/raices/pilar/${pilar.id}`}
              className="pilar-row card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="pilar-row__number">
                <span>P{pilar.number}</span>
              </div>
              <div style={{ flex: 1 }}>
                <h5 className="text-body-md" style={{ fontWeight: 600 }}>{pilar.name}</h5>
                <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '2px', fontStyle: 'italic' }}>
                  {pilar.theory}
                </p>
                <div className="pilar-row__tags">
                  {pilar.tags.map(t => (
                    <span key={t} className="pilar-row__tag">{t}</span>
                  ))}
                </div>
              </div>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-on-surface-variant)', opacity: 0.4 }}>chevron_right</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Locked Islands Preview */}
      <div className="locked-preview">
        <h4 className="text-label-caps" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '12px' }}>
          Próximas Islas
        </h4>
        <p style={{ fontSize: '14px', color: 'var(--color-outline)', lineHeight: 1.6, marginBottom: '16px' }}>
          Completá 4+ pilares sincronizados en Raíces para desbloquear <strong>El Motor</strong>. La profundidad se gana con tiempo y datos.
        </p>
      </div>

      {/* Global Progress */}
      <div className="global-progress">
        <div className="global-progress__header">
          <h4 className="text-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>Progreso Global</h4>
          <span className="font-display" style={{ fontStyle: 'italic', fontSize: '18px', color: 'var(--color-primary-container)' }}>
            0 / 35
          </span>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', opacity: 0.8, marginBottom: '16px' }}>
          pilares sincronizados
        </p>
        <div className="progress-bar">
          <div className="progress-bar__fill" style={{ width: '0%', background: 'var(--color-secondary-fixed-dim, #f3bb90)' }} />
        </div>
      </div>
    </div>
  )
}
