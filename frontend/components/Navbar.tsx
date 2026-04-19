'use client'

import Link from 'next/link'
import { useSettings } from '@/context/SettingsContext'

export default function Navbar() {
  const { setSidebarOpen } = useSettings()

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200/50 bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-950/90 py-4 px-6 mb-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">
            Q
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Quran<span className="text-emerald-600">Web</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-4 sm:gap-8">
          <Link 
            href="/search" 
            className="text-sm font-semibold text-zinc-600 hover:text-emerald-600 dark:text-zinc-300 dark:hover:text-emerald-400 transition-colors"
          >
            Search
          </Link>

          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800/50"
            title="Open Settings"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          <a 
            href="https://github.com/samibyte/quran_web" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-bold h-9 px-5 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:scale-105 active:scale-95 transition-all items-center gap-2 hidden sm:flex shadow-lg shadow-black/10 dark:shadow-white/5"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  )
}
