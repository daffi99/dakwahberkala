import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const dbUrl = process.env.DATABASE_URL
  const hasDbUrl = Boolean(dbUrl)
  const isPlaceholder = !dbUrl || dbUrl.includes('placeholder') || dbUrl.includes('YOUR_NEON_DATABASE_URL_HERE')

  if (!hasDbUrl || isPlaceholder) {
    return Response.json({
      connected: false,
      status: 'DATABASE_URL_NOT_CONFIGURED',
      message: 'DATABASE_URL belum diset di Vercel Environment Variables atau masih menggunakan placeholder.',
    })
  }

  try {
    const startTime = Date.now()
    const countRes = await sql`SELECT count(*)::int as count FROM public.articles`
    const sample = await sql`SELECT slug, title, updated_at FROM public.articles ORDER BY created_at DESC LIMIT 5`
    const latency = Date.now() - startTime

    return Response.json({
      connected: true,
      status: 'OK',
      message: 'Berhasil terkoneksi ke Neon Postgres!',
      latencyMs: latency,
      totalArticles: countRes[0]?.count,
      articles: sample,
    })
  } catch (err) {
    return Response.json({
      connected: false,
      status: 'DATABASE_ERROR',
      error: err.message,
      code: err.code || null,
      hint: err.hint || null,
    }, { status: 500 })
  }
}
