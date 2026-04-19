import { Hono } from 'hono'
import type { Surah, SearchResult } from '../data/quran'
import type { Env } from '../types'

const search = new Hono<Env>()

search.get('/', (c) => {
  const data = c.get('quranData')
  const query = c.req.query('q')?.trim()

  if (!query) {
    return c.json({ error: 'Missing query parameter: q' }, 400)
  }

  const lowerQuery = query.toLowerCase()
  const results: SearchResult[] = []

  for (const surah of data) {
    for (const ayah of surah.ayahs) {
      if (ayah.translation.toLowerCase().includes(lowerQuery)) {
        results.push({
          surahId: surah.id,
          surahNameEnglish: surah.nameEnglish,
          surahNameArabic: surah.nameArabic,
          ayahNumber: ayah.number,
          translation: ayah.translation,
        })
      }
    }
  }

  return c.json(results)
})

export default search
