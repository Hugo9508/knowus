import { useState } from 'react'
import './OraculoPage.css'

const tags = ['espacio', 'comunicación', 'dinero', 'familia', 'intimidad']

export default function OraculoPage() {
  const [activeTag, setActiveTag] = useState('comunicación')
  const [query, setQuery] = useState('')

  return (
    <div className="oraculo stagger">
      <header className="oraculo__header">
        <h2 className="text-display-lg" style={{ color: 'var(--color-primary-container)' }}>Oráculo</h2>
        <div className="oraculo__divider" />
      </header>

      <section>
        <label className="text-question" style={{ color: 'var(--color-secondary)', display: 'block', marginBottom: '16px' }} htmlFor="oracle-input">
          Describí la situación que quieren entender juntos
        </label>
        <div className="oraculo__input-wrap">
          <textarea
            id="oracle-input"
            className="textarea-card"
            rows={4}
            placeholder="Siento que nos está costando encontrar tiempo de calidad sin las pantallas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="material-symbols-outlined fill oraculo__input-icon">auto_awesome</span>
        </div>
      </section>

      <section className="oraculo__tags">
        {tags.map((tag) => (
          <button key={tag} className={`chip ${activeTag === tag ? 'chip--active' : ''}`} onClick={() => setActiveTag(tag)}>{tag}</button>
        ))}
      </section>

      <section className="oraculo__response card" style={{ borderStyle: 'dashed', padding: '64px 24px', textAlign: 'center' }}>
        <span className="material-symbols-outlined fill" style={{ fontSize: '32px', color: 'var(--color-terracotta)', opacity: 0.5, marginBottom: '16px' }}>auto_awesome</span>
        <p className="text-question" style={{ color: 'var(--color-secondary)', fontSize: '18px', marginBottom: '8px' }}>El Oráculo está en silencio...</p>
        <p className="text-body-md" style={{ color: 'var(--color-outline-variant)', fontSize: '14px' }}>Esperando tu reflexión para analizar la situación.</p>
      </section>

      <section className="oraculo__locked" style={{ opacity: 0.5, filter: 'grayscale(1)', pointerEvents: 'none' }}>
        <div className="card" style={{ borderStyle: 'dashed', textAlign: 'center', padding: '24px' }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--color-outline-variant)', marginBottom: '8px' }}>lock</span>
          <p className="text-question" style={{ color: 'var(--color-outline)', fontSize: '16px' }}>
            "La intimidad no es algo que se encuentra, es algo que se construye momento a momento."
          </p>
        </div>
      </section>

      <div style={{ textAlign: 'center' }}>
        <button style={{ background: 'none', border: 'none', color: 'var(--color-nav-active)', fontFamily: 'var(--font-body)', fontSize: '16px', cursor: 'pointer' }}>
          Nueva consulta →
        </button>
      </div>
    </div>
  )
}
