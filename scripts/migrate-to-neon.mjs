// scripts/migrate-to-neon.mjs
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Client } from '@neondatabase/serverless'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

// Simple .env.local reader if DATABASE_URL is not already in process.env
function loadEnvLocal() {
  const envPath = path.join(rootDir, '.env.local')
  if (!fs.existsSync(envPath)) return

  const content = fs.readFileSync(envPath, 'utf8')
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim()
      let val = trimmed.slice(eqIdx + 1).trim()
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      if (!process.env[key]) {
        process.env[key] = val
      }
    }
  }
}

loadEnvLocal()

const dbUrl = process.env.DATABASE_URL

async function runMigration() {
  console.log('🚀 Starting migration to Neon Postgres...\n')

  if (!dbUrl || dbUrl.includes('YOUR_NEON_DATABASE_URL_HERE')) {
    console.error('❌ Error: DATABASE_URL is not configured.')
    console.error('👉 Please set DATABASE_URL in your .env.local file:')
    console.error('   DATABASE_URL="postgresql://user:password@ep-xyz.pooler.neon.tech/neondb?sslmode=require"\n')
    process.exit(1)
  }

  const schemaPath = path.join(rootDir, 'neon_schema.sql')
  if (!fs.existsSync(schemaPath)) {
    console.error(`❌ Error: schema file not found at ${schemaPath}`)
    process.exit(1)
  }

  const sqlContent = fs.readFileSync(schemaPath, 'utf8')
  console.log(`📄 Read ${schemaPath} (${sqlContent.length} bytes)`)

  console.log('🔌 Connecting to Neon database...')
  const client = new Client(dbUrl)

  try {
    await client.connect()
    console.log('✅ Connected successfully!')

    console.log('⏳ Executing schema and seed data...')
    await client.query(sqlContent)
    console.log('✅ Schema created and all articles seeded successfully!\n')

    // Verify count
    const res = await client.query('SELECT count(*) as total FROM public.articles')
    console.log(`🎉 Total articles now in Neon: ${res.rows[0].total}`)
    console.log('\nMigration completed successfully! You can now use Neon with your Next.js app.')
  } catch (err) {
    console.error('❌ Migration failed:', err)
    process.exit(1)
  } finally {
    await client.end()
  }
}

runMigration()
