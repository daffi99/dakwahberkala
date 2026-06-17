import Link from 'next/link'
import { getArticleBySlug, getAllSlugs } from '@/lib/supabase'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getAllSlugs()
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: `${article.title} — Dakwah Berkala`,
    description: article.tldr,
  }
}

export default async function ArtikelPage({ params }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) notFound()

  return (
    <>
      {/* BACK HEADER */}
      <header className="article-header" id="article-header">
        <Link href="/" className="back-btn" id="btn-back" aria-label="Kembali ke beranda">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
        <span className="article-header__label">Ringkasan Artikel</span>
        <div style={{ width: 36 }} aria-hidden="true" />
      </header>

      <main className="article-main" id="article-main">

        <div className="article-content" id="article-content">

          {/* TITLE & BADGES */}
          <div className="article-meta-top">
            <div className="article-badges">
              <span className="badge badge--green">{article.category}</span>
              <span className={`badge ${article.badgeStyle}`}>{article.badge}</span>
              <span className="badge badge--gray">{article.sources} Sumber</span>
            </div>
            <h1 className="article-title">{article.title}</h1>
            <p className="article-updated">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              Diperbarui {article.updatedAt}
            </p>
          </div>

          {/* KESIMPULAN CEPAT */}
          <div className="quick-summary" id="kesimpulan-cepat">
            <div className="quick-summary__header">
              <div className="quick-summary__icon">⚡</div>
              <div className="quick-summary__label">Kesimpulan Cepat</div>
            </div>
            <ul className="quick-summary__list">
              {article.kesimpulan.map((item, i) => (
                <li key={i} className="quick-summary__item">
                  <span className="quick-summary__bullet">{i + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="divider" />

          {/* RINGKASAN PENDAPAT */}
          <h2 className="sub-heading">Ringkasan Pendapat Ulama</h2>
          <div className="opinion-list" id="ringkasan-pendapat">
            {article.pendapat.map((p, i) => (
              <div key={i} className="opinion-item">
                <div className={`opinion-item__bar opinion-item__bar--${p.bar}`} />
                <div className="opinion-item__school">{p.school}</div>
                <div className="opinion-item__view">{p.view}</div>
                <div className="opinion-item__detail">{p.detail}</div>
              </div>
            ))}
          </div>

          <div className="divider" />

          {/* DALIL & TERJEMAHAN */}
          <h2 className="sub-heading">Dalil &amp; Referensi</h2>
          {article.dalil.map((d, i) => (
            <div key={i} id={`dalil-${i}`}>
              <div className="arabic-card">
                <div className="arabic-card__label">{d.label}</div>
                <div className="arabic-card__text" lang="ar" dir="rtl">
                  {d.arabic}
                </div>
                <div className="arabic-card__source">{d.source}</div>
              </div>
              <div className="translation-box">
                <div className="translation-box__label">🌐 Terjemahan</div>
                <div className="translation-box__text">{d.terjemahan}</div>
              </div>
            </div>
          ))}

          <div className="divider" />

          {/* SIKAP PRAKTIS */}
          <div className="practical-box" id="sikap-praktis">
            <div className="practical-box__header">
              <div className="practical-box__icon">🧭</div>
              <div className="practical-box__title">Sikap Praktis yang Dianjurkan</div>
            </div>
            <div className="practical-box__text">
              <ul className="practical-list">
                {article.sikapPraktis.map((item, i) => (
                  <li key={i} className="practical-list__item">
                    <span className="practical-list__check">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SUMBER RUJUKAN */}
          <h2 className="sub-heading">Sumber Rujukan</h2>
          <div className="sources-list" id="sumber-rujukan">
            {article.sumber.map((src, i) => (
              <div key={i} className="source-item">
                <div className="source-item__num">{i + 1}</div>
                <div>
                  <div className="source-item__title">{src.title}</div>
                  <div className="source-item__author">{src.author}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ASK AI — secondary, after all content */}
          <div className="ask-ai" id="ask-ai-box">
            <div className="ask-ai__header">
              <div className="ask-ai__icon">✨</div>
              <div className="ask-ai__title">Tanya AI tentang topik ini</div>
            </div>
            <p className="ask-ai__subtitle">
              Punya pertanyaan lanjutan? AI akan membantu berdasarkan sumber yang ada di arsip ini.
            </p>
            <div className="ask-ai__input-row">
              <input
                className="ask-ai__input"
                type="text"
                placeholder="Tanyakan sesuatu..."
                id="ai-input"
                aria-label="Tanya AI"
              />
              <button className="ask-ai__send" aria-label="Kirim">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>

          {/* BACK TO FEED */}
          <Link href="/" className="btn-back-feed" id="btn-back-feed">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Kembali ke Semua Catatan
          </Link>

        </div>
      </main>

      {/* BOTTOM NAV
      <nav className="bottom-nav" aria-label="Navigasi utama" id="bottom-nav-article">
        <Link href="/" className="nav-item nav-item--active" id="nav-home-article" aria-label="Beranda">
          <div className="nav-item__icon">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="nav-item__label">Home</span>
        </Link>
        <Link href="/#filter-chips" className="nav-item" id="nav-kategori-article" aria-label="Kategori">
          <div className="nav-item__icon">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
          </div>
          <span className="nav-item__label">Kategori</span>
        </Link>
        <Link href="/#article-feed" className="nav-item" id="nav-arsip-article" aria-label="Arsip">
          <div className="nav-item__icon">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <polyline points="21 8 21 21 3 21 3 8" />
              <rect x="1" y="3" width="22" height="5" />
              <line x1="10" y1="12" x2="14" y2="12" />
            </svg>
          </div>
          <span className="nav-item__label">Arsip</span>
        </Link>
        <a href="#ask-ai-box" className="nav-item nav-item--ai" id="nav-ai-article" aria-label="Tanya AI">
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
