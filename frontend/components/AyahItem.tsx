import { Ayah } from '@quran-web/shared/types/quran'

interface AyahItemProps {
  ayah: Ayah
}

export default function AyahItem({ ayah }: AyahItemProps) {
  return (
    <div className="flex flex-col gap-6 p-6 rounded-2xl border border-zinc-100 bg-white/50 dark:border-zinc-800 dark:bg-zinc-900/50 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          {ayah.number}
        </span>
      </div>
      
      <div 
        className="arabic-text text-right text-3xl md:text-4xl leading-loose text-zinc-900 dark:text-zinc-100"
        dir="rtl"
      >
        {ayah.arabic}
      </div>
      
      <div className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
        <span className="font-bold text-emerald-700 dark:text-emerald-500 mr-2">
          {ayah.number}.
        </span>
        {ayah.translation}
      </div>
    </div>
  )
}
