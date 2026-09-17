import { neon } from '@neondatabase/serverless'
import { articles as fallbackArticles } from './articles'

let rawUrl = process.env.DATABASE_URL ? process.env.DATABASE_URL.trim() : ''
if (rawUrl && ((rawUrl.startsWith('"') && rawUrl.endsWith('"')) || (rawUrl.startsWith("'") && rawUrl.endsWith("'")))) {
  rawUrl = rawUrl.slice(1, -1).trim()
}
const databaseUrl = rawUrl

// Initialize Neon SQL driver if DATABASE_URL is configured
export const sql =
  databaseUrl &&
  databaseUrl !== 'YOUR_NEON_DATABASE_URL_HERE' &&
  !databaseUrl.includes('placeholder')
    ? neon(databaseUrl)
    : null

function parseJsonField(val) {
  if (Array.isArray(val)) return val
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return []
}

function mapArticle(dbArticle) {
  if (!dbArticle) return null
  return {
    slug: dbArticle.slug,
    title: dbArticle.title,
    category: dbArticle.category,
    badge: dbArticle.badge,
    badgeStyle: dbArticle.badge_style,
    tldr: dbArticle.tldr,
    coverGradient: dbArticle.cover_gradient,
    coverEmoji: dbArticle.cover_emoji,
    cardBg: dbArticle.card_bg,
    sources: parseInt(dbArticle.sources, 10) || 0,
    updatedAt: dbArticle.updated_at,
    kesimpulan: parseJsonField(dbArticle.kesimpulan),
    pendapat: parseJsonField(dbArticle.pendapat),
    dalil: parseJsonField(dbArticle.dalil),
    sikapPraktis: parseJsonField(dbArticle.sikap_praktis),
    sumber: parseJsonField(dbArticle.sumber),
  }
}

import { cache } from 'react'

export const getArticles = cache(async () => {
  if (!sql) {
    return fallbackArticles
  }

  try {
    const rows = await sql`
      SELECT * FROM public.articles 
      ORDER BY created_at DESC
    `
    if (!rows || rows.length === 0) {
      return fallbackArticles
    }
    return rows.map(mapArticle)
  } catch (err) {
    console.error('Error fetching articles from Neon:', err)
    return fallbackArticles
  }
})

export const getArticleBySlug = cache(async (slug) => {
  if (!sql) {
    return fallbackArticles.find((a) => a.slug === slug) ?? null
  }

  try {
    const rows = await sql`
      SELECT * FROM public.articles 
      WHERE slug = ${slug} 
      LIMIT 1
    `
    if (rows && rows.length > 0) {
      return mapArticle(rows[0])
    }
    return fallbackArticles.find((a) => a.slug === slug) ?? null
  } catch (err) {
    console.error(`Error fetching article by slug "${slug}" from Neon:`, err)
    return fallbackArticles.find((a) => a.slug === slug) ?? null
  }
})

export const getAllSlugs = cache(async () => {
  if (!sql) {
    return fallbackArticles.map((a) => ({ slug: a.slug }))
  }

  try {
    const rows = await sql`SELECT slug FROM public.articles`
    if (!rows || rows.length === 0) {
      return fallbackArticles.map((a) => ({ slug: a.slug }))
    }
    return rows.map((r) => ({ slug: r.slug }))
  } catch (err) {
    console.error('Error fetching slugs from Neon:', err)
    return fallbackArticles.map((a) => ({ slug: a.slug }))
  }
})
