import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-zinc-200 dark:border-zinc-800 py-4 px-6 mb-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
            Q
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Quran<span className="text-emerald-700">Web</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            href="/search" 
            className="text-sm font-medium text-zinc-600 hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-500 transition-colors"
          >
            Search
          </Link>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-2 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 transition-opacity items-center gap-2 hidden sm:flex"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  )
}
