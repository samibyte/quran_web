import Link from 'next/link'
import { SurahMeta } from '@quran-web/shared/types/quran'

interface SurahCardProps {
  surah: SurahMeta
}

export default function SurahCard({ surah }: SurahCardProps) {
  return (
    <Link
      href={`/surah/${surah.id}`}
      className="group flex items-center justify-between p-4 rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-md hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-700"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800 font-bold dark:bg-emerald-900/30 dark:text-emerald-400">
          {surah.id}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
            {surah.nameEnglish}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Surah {surah.id}
          </p>
        </div>
      </div>
      
      <div className="arabic-text text-2xl text-emerald-900 dark:text-emerald-400">
        {surah.nameArabic}
      </div>
    </Link>
  )
}
