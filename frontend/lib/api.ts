import { Surah, SurahMeta, SearchResult } from '@quran-web/shared/types/quran'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export async function fetchSurahs(): Promise<SurahMeta[]> {
  const res = await fetch(`${API_BASE}/surahs`)
  if (!res.ok) throw new Error('Failed to fetch surahs')
  return res.json()
}

export async function fetchSurah(id: number | string): Promise<Surah> {
  const res = await fetch(`${API_BASE}/surah/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch surah ${id}`)
  return res.json()
}

export async function searchQuran(query: string): Promise<SearchResult[]> {
  const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error('Search failed')
  return res.json()
}
