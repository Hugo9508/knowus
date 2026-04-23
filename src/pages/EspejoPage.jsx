import './EspejoPage.css'

export default function EspejoPage() {
  return (
    <div className="espejo stagger">
      <header>
        <h1 className="text-display-lg" style={{ fontStyle: 'italic', color: 'var(--color-primary-container)' }}>Espejo</h1>
      </header>

      <div className="espejo__users">
        <div className="espejo__user-card card">
          <div className="espejo__user-avatar espejo__user-avatar--user">
            <span style={{ color: 'var(--color-terracotta)', fontWeight: 600, fontSize: '22px' }}>N</span>
          </div>
          <p className="text-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>
            <span className="espejo__dot espejo__dot--user" />Never
          </p>
          <p className="espejo__pilares-count" style={{ color: 'var(--color-terracotta)' }}>12 Pilares</p>
        </div>
        <div className="espejo__user-card card">
          <div className="espejo__user-avatar espejo__user-avatar--partner">
            <span style={{ color: 'var(--color-partner-purple)', fontWeight: 600, fontSize: '22px' }}>E</span>
          </div>
          <p className="text-label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>
            <span className="espejo__dot espejo__dot--partner" />Ella
          </p>
          <p className="espejo__pilares-count" style={{ color: 'var(--color-partner-purple)' }}>12 Pilares</p>
        </div>
      </div>

      <section className="espejo__synced">
        <div style={{ textAlign: 'center', padding: '0 16px' }}>
          <p className="text-question" style={{ color: 'var(--color-on-surface)' }}>¿Qué significa para vos la seguridad?</p>
        </div>
        <div className="espejo__answers">
          <div className="espejo__answer espejo__answer--user card">
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-on-surface-variant)' }}>
              Es saber que puedo ser vulnerable sin que eso se use como un arma en el futuro.
            </p>
          </div>
          <div className="espejo__answer espejo__answer--partner card">
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-on-surface-variant)' }}>
              Sentir que mi espacio personal es respetado mientras construimos un hogar juntos.
            </p>
          </div>
        </div>
      </section>

      <article className="espejo__insight card">
        <div className="espejo__insight-header">
          <span className="material-symbols-outlined" style={{ color: 'var(--color-terracotta)', fontSize: '18px' }}>auto_awesome</span>
          <span className="text-label-caps" style={{ color: 'var(--color-terracotta)' }}>Insight de sinergia</span>
        </div>
        <p className="text-body-md" style={{ color: 'var(--color-on-surface-variant)', lineHeight: 1.7, marginTop: '12px' }}>
          Ambos valoran la autonomía pero de formas distintas: mientras N busca seguridad en el <em>resguardo emocional</em>, E la encuentra en el <em>respeto al espacio físico</em>. Esta diferencia es su mayor fortaleza si logran comunicarla antes de los conflictos.
        </p>
      </article>

      <section className="espejo__locked">
        <div className="espejo__locked-card card">
          <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--color-outline)', marginBottom: '12px' }}>hourglass_empty</span>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontStyle: 'italic', color: 'var(--color-on-surface-variant)' }}>Pilar 5: Pendiente</p>
          <p className="text-label-xs" style={{ color: 'var(--color-outline)', marginTop: '4px' }}>Requiere más interacciones</p>
          <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--color-outline)', marginTop: '8px' }}>lock</span>
        </div>
      </section>

      <div className="espejo__dots">
        <div className="espejo__dot-item" /><div className="espejo__dot-item" /><div className="espejo__dot-item" />
      </div>
    </div>
  )
}
