'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { supabase, supabaseAdmin, getArticles } from '@/lib/supabase'
import fs from 'fs'
import path from 'path'

const PIN = process.env.ADMIN_PIN || '4166'

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export async function checkAdminPin(pin) {
  if (pin === PIN) {
    const cookieStore = await cookies()
    cookieStore.set('db_admin_session', 'authorized', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
    return { success: true }
  }
  return { success: false, error: 'PIN yang Anda masukkan salah.' }
}

export async function checkSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('db_admin_session')
  return session?.value === 'authorized'
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('db_admin_session')
  return { success: true }
}

// Helpers for local CRUD
function getLocalArticles() {
  try {
    const filePath = path.join(process.cwd(), 'src/lib/articles.js')
    if (!fs.existsSync(filePath)) {
      return []
    }
    const content = fs.readFileSync(filePath, 'utf-8')
    const startMarker = 'export const articles = '
    const startIdx = content.indexOf(startMarker)
    if (startIdx === -1) {
      const { articles } = require('../../lib/articles')
      return articles
    }
    const endIdx = content.indexOf('export function getArticleBySlug')
    let arrayStr = content.substring(startIdx + startMarker.length, endIdx).trim()
    if (arrayStr.endsWith(';')) {
      arrayStr = arrayStr.slice(0, -1)
    }
    const fn = new Function(`return ${arrayStr}`)
    return fn()
  } catch (err) {
    console.error('Error parsing local articles, falling back to require:', err)
    try {
      const { articles } = require('../../lib/articles')
      return articles
    } catch (e) {
      return []
    }
  }
}

function saveLocalArticles(articlesList) {
  const filePath = path.join(process.cwd(), 'src/lib/articles.js')
  const fileContent = `// src/lib/articles.js
// Static article data — frontend-only phase
// Replace with API/DB calls in backend phase

export const articles = ${JSON.stringify(articlesList, null, 2)}

export function getArticleBySlug(slug) {
  return articles.find((a) => a.slug === slug) ?? null
}

export function getAllSlugs() {
  return articles.map((a) => ({ slug: a.slug }))
}
`
  fs.writeFileSync(filePath, fileContent, 'utf-8')
}

// CRUD actions
export async function getArticlesAction() {
  const cookieStore = await cookies()
  const session = cookieStore.get('db_admin_session')
  if (session?.value !== 'authorized') {
    return { success: false, error: 'Sesi Anda tidak sah. Silakan login kembali.' }
  }

  try {
    const articles = await getArticles()
    return { success: true, articles }
  } catch (err) {
    console.error('Error in getArticlesAction:', err)
    return { success: false, error: 'Gagal memuat daftar catatan: ' + err.message }
  }
}

export async function createArticleAction(data) {
  const cookieStore = await cookies()
  const session = cookieStore.get('db_admin_session')
  if (session?.value !== 'authorized') {
    return { success: false, error: 'Sesi Anda tidak sah. Silakan login kembali.' }
  }

  const {
    title,
    category,
    badge,
    badgeStyle,
    tldr,
    coverGradient,
    coverEmoji,
    cardBg,
    sources,
    updatedAt,
    kesimpulan,
    pendapat,
    dalil,
    sikapPraktis,
    sumber,
  } = data

  if (!title || !category || !badge || !tldr || !coverEmoji || !cardBg || !updatedAt) {
    return { success: false, error: 'Harap lengkapi semua kolom wajib.' }
  }

  let slug = slugify(title)
  if (!slug) {
    slug = 'catatan-' + Math.random().toString(36).substring(2, 7)
  }

  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from('articles')
        .insert({
          slug,
          title,
          category,
          badge,
          badge_style: badgeStyle || 'badge--gray',
          tldr,
          cover_gradient: coverGradient || 'linear-gradient(135deg, #0B4F49 0%, #0F766E 50%, #1a8a81 100%)',
          cover_emoji: coverEmoji,
          card_bg: cardBg,
          sources: parseInt(sources) || 0,
          updated_at: updatedAt,
          kesimpulan: Array.isArray(kesimpulan) ? kesimpulan : [],
          pendapat: Array.isArray(pendapat) ? pendapat : [],
          dalil: Array.isArray(dalil) ? dalil : [],
          sikap_praktis: Array.isArray(sikapPraktis) ? sikapPraktis : [],
          sumber: Array.isArray(sumber) ? sumber : [],
        })

      if (error) {
        if (error.code === '23505') {
          return { success: false, error: 'Artikel dengan judul/slug serupa sudah ada.' }
        }
        throw error
      }

      revalidatePath('/')
      revalidatePath(`/artikel/${slug}`)
      return { success: true, slug }
    } catch (err) {
      console.error('Error creating article in Supabase:', err)
      return { success: false, error: 'Gagal membuat artikel di database: ' + err.message }
    }
  } else {
    try {
      const articles = getLocalArticles()
      if (articles.some((a) => a.slug === slug)) {
        return { success: false, error: 'Artikel dengan judul serupa sudah ada secara lokal.' }
      }

      const newArticle = {
        slug,
        title,
        category,
        badge,
        badgeStyle: badgeStyle || 'badge--gray',
        tldr,
        coverGradient: coverGradient || 'linear-gradient(135deg, #0B4F49 0%, #0F766E 50%, #1a8a81 100%)',
        coverEmoji,
        cardBg,
        sources: parseInt(sources) || 0,
        updatedAt,
        kesimpulan,
        pendapat,
        dalil,
        sikapPraktis,
        sumber,
      }

      saveLocalArticles([newArticle, ...articles])

      revalidatePath('/')
      revalidatePath(`/artikel/${slug}`)
      return { success: true, slug }
    } catch (err) {
      console.error('Error creating local article:', err)
      return { success: false, error: 'Gagal membuat artikel lokal: ' + err.message }
    }
  }
}

export async function updateArticleAction(oldSlug, data) {
  const cookieStore = await cookies()
  const session = cookieStore.get('db_admin_session')
  if (session?.value !== 'authorized') {
    return { success: false, error: 'Sesi Anda tidak sah. Silakan login kembali.' }
  }

  const {
    title,
    category,
    badge,
    badgeStyle,
    tldr,
    coverGradient,
    coverEmoji,
    cardBg,
    sources,
    updatedAt,
    kesimpulan,
    pendapat,
    dalil,
    sikapPraktis,
    sumber,
  } = data

  if (!title || !category || !badge || !tldr || !coverEmoji || !cardBg || !updatedAt) {
    return { success: false, error: 'Harap lengkapi semua kolom wajib.' }
  }

  const newSlug = slugify(title)

  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from('articles')
        .update({
          slug: newSlug,
          title,
          category,
          badge,
          badge_style: badgeStyle || 'badge--gray',
          tldr,
          cover_gradient: coverGradient || 'linear-gradient(135deg, #0B4F49 0%, #0F766E 50%, #1a8a81 100%)',
          cover_emoji: coverEmoji,
          card_bg: cardBg,
          sources: parseInt(sources) || 0,
          updated_at: updatedAt,
          kesimpulan: Array.isArray(kesimpulan) ? kesimpulan : [],
          pendapat: Array.isArray(pendapat) ? pendapat : [],
          dalil: Array.isArray(dalil) ? dalil : [],
          sikap_praktis: Array.isArray(sikapPraktis) ? sikapPraktis : [],
          sumber: Array.isArray(sumber) ? sumber : [],
        })
        .eq('slug', oldSlug)

      if (error) throw error

      revalidatePath('/')
      revalidatePath(`/artikel/${oldSlug}`)
      revalidatePath(`/artikel/${newSlug}`)
      return { success: true, slug: newSlug }
    } catch (err) {
      console.error('Error updating article in Supabase:', err)
      return { success: false, error: 'Gagal memperbarui artikel di database: ' + err.message }
    }
  } else {
    try {
      const articles = getLocalArticles()
      const index = articles.findIndex((a) => a.slug === oldSlug)
      if (index === -1) {
        return { success: false, error: 'Artikel tidak ditemukan secara lokal.' }
      }

      articles[index] = {
        slug: newSlug,
        title,
        category,
        badge,
        badgeStyle: badgeStyle || 'badge--gray',
        tldr,
        coverGradient: coverGradient || 'linear-gradient(135deg, #0B4F49 0%, #0F766E 50%, #1a8a81 100%)',
        coverEmoji,
        cardBg,
        sources: parseInt(sources) || 0,
        updatedAt,
        kesimpulan,
        pendapat,
        dalil,
        sikapPraktis,
        sumber,
      }

      saveLocalArticles(articles)

      revalidatePath('/')
      revalidatePath(`/artikel/${oldSlug}`)
      revalidatePath(`/artikel/${newSlug}`)
      return { success: true, slug: newSlug }
    } catch (err) {
      console.error('Error updating local article:', err)
      return { success: false, error: 'Gagal memperbarui artikel lokal: ' + err.message }
    }
  }
}

export async function deleteArticleAction(slug) {
  const cookieStore = await cookies()
  const session = cookieStore.get('db_admin_session')
  if (session?.value !== 'authorized') {
    return { success: false, error: 'Sesi Anda tidak sah. Silakan login kembali.' }
  }

  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from('articles')
        .delete()
        .eq('slug', slug)

      if (error) throw error

      revalidatePath('/')
      revalidatePath(`/artikel/${slug}`)
      return { success: true }
    } catch (err) {
      console.error('Error deleting article in Supabase:', err)
      return { success: false, error: 'Gagal menghapus artikel dari database: ' + err.message }
    }
  } else {
    try {
      const articles = getLocalArticles()
      const filtered = articles.filter((a) => a.slug !== slug)
      if (filtered.length === articles.length) {
        return { success: false, error: 'Artikel tidak ditemukan secara lokal.' }
      }

      saveLocalArticles(filtered)

      revalidatePath('/')
      revalidatePath(`/artikel/${slug}`)
      return { success: true }
    } catch (err) {
      console.error('Error deleting local article:', err)
      return { success: false, error: 'Gagal menghapus artikel lokal: ' + err.message }
    }
  }
}
