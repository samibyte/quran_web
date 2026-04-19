import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import path from 'path'
import fs from 'fs'
import { Surah } from './data/quran'
import { Env } from './types'
import surahsRoute from './routes/surahs'
import surahRoute from './routes/surah'
import searchRoute from './routes/search'

// ---------------------------------------------------------------------------
// Load Quran data ONCE into memory at startup
// ---------------------------------------------------------------------------

const dataPath = path.join(__dirname, 'data', 'quran.json')

if (!fs.existsSync(dataPath)) {
  console.error(`❌ quran.json not found at ${dataPath}`)
  console.error('   Run: npx tsx scripts/download-data.ts')
  process.exit(1)
}

const quranData: Surah[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
console.log(`✅ Loaded ${quranData.length} surahs into memory`)

// ---------------------------------------------------------------------------
// Hono app setup
// ---------------------------------------------------------------------------

const app = new Hono<Env>()

// Middleware: CORS (allow all origins for local dev + Vercel frontend)
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET'],
    allowHeaders: ['Content-Type'],
  })
)

// Middleware: request logger
app.use('*', logger())

// Middleware: inject quranData into every request context
app.use('*', async (c, next) => {
  c.set('quranData', quranData)
  await next()
})

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

app.route('/surahs', surahsRoute)
app.route('/surah', surahRoute)
app.route('/search', searchRoute)

// Health check
app.get('/health', (c) => c.json({ status: 'ok', surahs: quranData.length }))

// 404 fallback
app.notFound((c) => c.json({ error: 'Route not found' }, 404))

// ---------------------------------------------------------------------------
// Start server (Local only)
// ---------------------------------------------------------------------------

if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
  const PORT = Number(process.env.PORT) || 3001
  serve({ fetch: app.fetch, port: PORT }, () => {
    console.log(`🚀 Quran API running at http://localhost:${PORT}`)
  })
}

export default app
