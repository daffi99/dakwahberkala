import { createClient } from '@supabase/supabase-js'
import { articles as fallbackArticles } from './articles'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Initialize Supabase only if environment variables are present
export const supabase =
  supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL_HERE'
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

// Initialize Supabase admin client for secure server-side writes bypassing RLS
export const supabaseAdmin =
  supabaseUrl && supabaseServiceRoleKey && supabaseServiceRoleKey !== 'YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE'
    ? createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : supabase

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
    sources: parseInt(dbArticle.sources) || 0,
    updatedAt: dbArticle.updated_at,
    kesimpulan: Array.isArray(dbArticle.kesimpulan) ? dbArticle.kesimpulan : [],
    pendapat: Array.isArray(dbArticle.pendapat) ? dbArticle.pendapat : [],
    dalil: Array.isArray(dbArticle.dalil) ? dbArticle.dalil : [],
    sikapPraktis: Array.isArray(dbArticle.sikap_praktis) ? dbArticle.sikap_praktis : [],
    sumber: Array.isArray(dbArticle.sumber) ? dbArticle.sumber : [],
  }
}

export async function getArticles() {
  if (!supabase) {
    console.warn('Supabase not configured. Falling back to static articles.')
    return fallbackArticles
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    if (!data) return []

    return data.map(mapArticle)
  } catch (err) {
    console.error('Error fetching articles from Supabase:', err)
    return []
  }
}

export async function getArticleBySlug(slug) {
  if (!supabase) {
    return fallbackArticles.find((a) => a.slug === slug) ?? null
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (error) throw error
    if (data) return mapArticle(data)

    return null
  } catch (err) {
    console.error(`Error fetching article by slug "${slug}":`, err)
    return null
  }
}

export async function getAllSlugs() {
  if (!supabase) {
    return fallbackArticles.map((a) => ({ slug: a.slug }))
  }

  try {
    const { data, error } = await supabase.from('articles').select('slug')
    if (error) throw error

    const dbSlugs = data ? data.map((d) => d.slug) : []
    return dbSlugs.map((slug) => ({ slug }))
  } catch (err) {
    console.error('Error fetching slugs:', err)
    return []
  }
}
