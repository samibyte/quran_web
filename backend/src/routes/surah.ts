import { Hono } from 'hono'
import type { Surah } from '../data/quran'
import type { Env } from '../types'

const surah = new Hono<Env>()

surah.get('/:id', (c) => {
  const data = c.get('quranData')
  const idParam = Number(c.req.param('id'))

  if (isNaN(idParam) || idParam < 1 || idParam > 114) {
    return c.json({ error: 'Invalid surah id. Must be between 1 and 114.' }, 400)
  }

  const found = data.find((s) => s.id === idParam)

  if (!found) {
    return c.json({ error: `Surah ${idParam} not found.` }, 404)
  }

  return c.json(found)
})

export default surah
