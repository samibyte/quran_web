'use client'

import { useState, useEffect } from 'react'
import { searchQuran } from '@/lib/api'
import { SearchResult } from '@quran-web/shared/types/quran'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useSettings } from '@/context/SettingsContext'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const { arabicFont, translationFontSize } = useSettings()

  // Debounce query to avoid too many requests
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    if (debouncedQuery.trim().length > 2) {
      handleSearch(debouncedQuery)
    } else {
      setResults([])
    }
  }, [debouncedQuery])

  const handleSearch = async (q: string) => {
    setLoading(true)
    try {
      const data = await searchQuran(q)
      setResults(data)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto px-6 pb-20 w-full">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            Search the <span className="text-emerald-700">Quran</span>
          </h1>
          
          <div className="relative group">
            <input
              type="text"
              placeholder="Search by translation text (e.g. 'mercy', 'praise')..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-14 pl-6 pr-14 rounded-2xl border border-zinc-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 transition-all"
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400">
              {loading ? (
                <div className="h-5 w-5 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>
          </div>
        </header>
        
        <div className="space-y-6">
          {results.length > 0 ? (
            <div className="mb-4 text-sm text-zinc-500">
              Found {results.length} results for "{debouncedQuery}"
            </div>
          ) : debouncedQuery.trim().length > 2 && !loading ? (
            <div className="text-center py-20 text-zinc-500">
              No results found for "{debouncedQuery}"
            </div>
          ) : null}
          
          {results.map((result, idx) => (
            <Link
              key={`${result.surahId}-${result.ayahNumber}-${idx}`}
              href={`/surah/${result.surahId}`}
              className="block p-6 rounded-2xl border border-zinc-100 bg-white hover:border-emerald-300 hover:shadow-md transition-all dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold text-emerald-700">{result.surahNameEnglish}</span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-zinc-500">Ayah {result.ayahNumber}</span>
                </div>
                <div 
                  className="text-xl text-emerald-900 dark:text-emerald-400"
                  style={{ fontFamily: arabicFont }}
                >
                  {result.surahNameArabic}
                </div>
              </div>
              <p 
                className="text-zinc-700 dark:text-zinc-300 italic leading-relaxed"
                style={{ fontSize: `${translationFontSize}px` }}
              >
                "{result.translation}"
              </p>
            </Link>
          ))}
          <div className='flex justify-center'>
            <Link 
            href="/"
            className="mb-8 font-medium text-emerald-700 hover:text-emerald-800 transition-colors flex items-center gap-1"
          >
            ← Back to all Surahs
          </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
