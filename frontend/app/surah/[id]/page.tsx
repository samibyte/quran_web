import { fetchSurah, fetchSurahs } from '@/lib/api'
import AyahItem from '@/components/AyahItem'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export async function generateStaticParams() {
  const surahs = await fetchSurahs()
  return surahs.map((surah) => ({
    id: surah.id.toString(),
  }))
}

interface SurahPageProps {
  params: Promise<{ id: string }>
}

export default async function SurahPage({ params }: SurahPageProps) {
  const { id } = await params
  const surah = await fetchSurah(id)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto px-6 pb-20">
        <header className="mb-12 flex flex-col items-center text-center">
          <Link 
            href="/"
            className="mb-8 text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors flex items-center gap-1"
          >
            ← Back to all Surahs
          </Link>
          
          <div className="h-16 w-16 rounded-2xl bg-emerald-700 flex items-center justify-center text-white text-2xl font-bold mb-4">
            {surah.id}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight mb-2">
            {surah.nameEnglish}
          </h1>
          
          <div className="arabic-text text-4xl text-emerald-900 dark:text-emerald-400 mb-4">
            {surah.nameArabic}
          </div>
          
          <div className="h-px w-24 bg-zinc-200 dark:bg-zinc-800 my-4"></div>
          
          <p className="text-zinc-500 dark:text-zinc-400">
            {surah.ayahs.length} Ayahs
          </p>
        </header>
        
        <div className="flex flex-col gap-8">
          {surah.ayahs.map((ayah) => (
            <AyahItem key={ayah.number} ayah={ayah} />
          ))}
        </div>
      </main>
    </div>
  )
}
