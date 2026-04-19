import { Hono } from 'hono'
import type { Surah, SurahMeta } from '../data/quran'
import type { Env } from '../types'

const surahs = new Hono<Env>()

surahs.get('/', (c) => {
  const data = c.get('quranData')

  const meta: SurahMeta[] = data.map(({ id, nameArabic, nameEnglish }) => ({
    id,
    nameArabic,
    nameEnglish,
  }))

  return c.json(meta)
})

export default surahs
