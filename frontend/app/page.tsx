import { fetchSurahs } from '@/lib/api'
import SurahCard from '@/components/SurahCard'
import Navbar from '@/components/Navbar'

export default async function HomePage() {
  const surahs = await fetchSurahs()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 max-w-6xl mx-auto px-6 pb-20">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight mb-4">
            The Holy <span className="text-emerald-700">Quran</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Explore the chapters and verses of the Quran with clear translations and a beautiful, high-performance interface.
          </p>
        </header>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {surahs.map((surah) => (
            <SurahCard key={surah.id} surah={surah} />
          ))}
        </div>
      </main>
      
      <footer className="py-10 border-t border-zinc-200 dark:border-zinc-800 text-center text-zinc-500 dark:text-zinc-500 text-sm">
        <p>© {new Date().getFullYear()} QuranWeb. Designed for reading and reflection.</p>
      </footer>
    </div>
  )
}
