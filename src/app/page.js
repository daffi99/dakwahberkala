import ArticleFeed from '@/app/components/ArticleFeed'
import { getArticles } from '@/lib/supabase'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const articles = await getArticles()
  return (
    <>
      {/* STICKY HEADER */}
      <header className="header" id="header">
        <div className="header__logo">
          <span className="header__logo-text">دب</span>
        </div>
        <div className="header__brand">
          <div className="header__title">Dakwah Berkala</div>
          <div className="header__subtitle">Catatan fiqih pribadi</div>
        </div>
        <div className="header__actions">
          <Link href="/admin" className="icon-btn" aria-label="Admin Dashboard" title="Dashboard Penulis" style={{ display: 'inline-flex' }}>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </Link>
        </div>
      </header>

      <main className="main" id="main">
        <ArticleFeed articles={articles} />
      </main>

      {/* STICKY BOTTOM NAV
      <nav className="bottom-nav" aria-label="Navigasi utama" id="bottom-nav">
        <a href="#" className="nav-item nav-item--active" id="nav-home" aria-label="Beranda">
          <div className="nav-item__icon">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="nav-item__label">Home</span>
        </a>
        <a href="#filter-chips" className="nav-item" id="nav-kategori" aria-label="Kategori">
          <div className="nav-item__icon">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </div>
          <span className="nav-item__label">Kategori</span>
        </a>
        <a href="#article-feed" className="nav-item" id="nav-arsip" aria-label="Arsip">
          <div className="nav-item__icon">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <polyline points="21 8 21 21 3 21 3 8" />
              <rect x="1" y="3" width="22" height="5" />
              <line x1="10" y1="12" x2="14" y2="12" />
            </svg>
          </div>
          <span className="nav-item__label">Arsip</span>
        </a>
        <a href="#" className="nav-item nav-item--ai" id="nav-ai" aria-label="Tanya AI">
          <div className="nav-item__icon">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <span className="nav-item__label">AI</span>
        </a>
      </nav>
      */}
    </>
  )
}
