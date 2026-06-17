'use client'

import { useState } from 'react'
import Link from 'next/link'

const CATEGORIES = ['Semua', 'Fiqih', 'Shalat', 'Adab', 'Aqidah', 'Keluarga', 'Puasa']

export default function ArticleFeed({ articles }) {
  const [query, setQuery]       = useState('')
  const [activeCategory, setActiveCategory] = useState('Semua')

  const filtered = articles.filter((a) => {
    const matchCat = activeCategory === 'Semua' || a.category === activeCategory
    const q = query.toLowerCase()
    const matchQ = !q ||
      a.title.toLowerCase().includes(q) ||
      a.tldr.toLowerCase().includes(q)  ||
      a.category.toLowerCase().includes(q) ||
      a.badge.toLowerCase().includes(q)
    return matchCat && matchQ
  })

  return (
    <>
      <div className="feed-sticky-header" id="feed-sticky-header">
        {/* SEARCH BAR */}
        <div className="feed-search" id="feed-search">
          <div className="feed-search__inner">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="feed-search__input"
              placeholder="Cari catatan..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              id="feed-search-input"
              aria-label="Cari catatan"
              autoComplete="off"
            />
            {query && (
              <button
                className="feed-search__clear"
                onClick={() => setQuery('')}
                aria-label="Hapus pencarian"
                id="btn-clear-search"
              >
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY CHIPS */}
        <section className="chips-section" id="filter-chips">
          <div className="chips-scroll">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`chip ${activeCategory === cat ? 'chip--active' : ''}`}
                id={`filter-${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* BENTO GRID */}
      <section className="section" id="article-feed">
        <div className="section__header">
          <h1 className="section__title">Catatan Saya</h1>
          <span className="section__count">
            {filtered.length} artikel
            {query && <span className="section__count-query"> untuk &ldquo;{query}&rdquo;</span>}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="feed-empty" id="feed-empty">
            <div className="feed-empty__icon">🔍</div>
            <p className="feed-empty__text">Tidak ada catatan yang cocok.</p>
            <button
              className="feed-empty__reset"
              onClick={() => { setQuery(''); setActiveCategory('Semua') }}
              id="btn-reset-search"
            >
              Reset pencarian
            </button>
          </div>
        ) : (
          <div className="bento-grid">
            {filtered.map((article) => (
              <article
                key={article.slug}
                className="article-card"
                id={`card-${article.slug}`}
                style={{ backgroundColor: article.cardBg }}
              >
                <div className="article-card__top">
                  <div className="article-card__badges">
                    <span className="badge badge--dark">{article.category}</span>
                  </div>
                  <Link
                    href={`/artikel/${article.slug}`}
                    className="card-arrow-btn"
                    aria-label={`Baca ${article.title}`}
                    id={`arrow-${article.slug}`}
                  >
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>

                <h2 className="article-card__title">{article.title}</h2>

                <div className="article-card__meta-row">
                  <span className="article-card__sources">{article.sources} sumber</span>
                  <span className={`badge badge--sm ${article.badgeStyle}`}>{article.badge}</span>
                </div>

                <p className="article-card__tldr-label">TLDR</p>
                <p className="article-card__tldr">{article.tldr}</p>

                <div className="article-card__footer">
                  <span className="article-card__date">{article.updatedAt}</span>
                  <span className="article-card__emoji" aria-hidden="true">{article.coverEmoji}</span>
                </div>
              </article>
            ))}
          </div>
        )}

        {filtered.length > 0 && filtered.length === articles.length && (
          <div className="load-more-wrap">
            <button className="btn-load-more" id="btn-load-more">
              Muat Lebih Banyak
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        )}
      </section>
    </>
  )
}
