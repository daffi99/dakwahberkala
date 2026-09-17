export default function Loading() {
  return (
    <>
      <header className="article-header" id="article-header">
        <div className="back-btn" style={{ opacity: 0.5 }}>
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </div>
        <span className="article-header__label" style={{ opacity: 0.6 }}>Memuat...</span>
        <div style={{ width: 36 }} aria-hidden="true" />
      </header>

      <main className="article-main" id="article-main">
        <div className="article-content" style={{ opacity: 0.7 }}>
          <div className="article-meta-top">
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 50, height: 22, borderRadius: 6, background: 'rgba(0,0,0,0.06)' }} />
              <div style={{ width: 75, height: 22, borderRadius: 6, background: 'rgba(0,0,0,0.06)' }} />
            </div>
            <div style={{ width: '75%', height: 28, borderRadius: 8, background: 'rgba(0,0,0,0.08)', marginBottom: 10 }} />
            <div style={{ width: '40%', height: 16, borderRadius: 6, background: 'rgba(0,0,0,0.04)' }} />
          </div>

          <div style={{ marginTop: 24, padding: 18, borderRadius: 16, background: 'var(--soft-green)', minHeight: 120 }}>
            <div style={{ width: 130, height: 18, borderRadius: 6, background: 'rgba(15,118,110,0.15)', marginBottom: 12 }} />
            <div style={{ width: '100%', height: 14, borderRadius: 4, background: 'rgba(15,118,110,0.1)', marginBottom: 8 }} />
            <div style={{ width: '90%', height: 14, borderRadius: 4, background: 'rgba(15,118,110,0.1)' }} />
          </div>
        </div>
      </main>
    </>
  )
}
