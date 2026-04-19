// Local type definitions mirroring shared/types/quran.ts
// These are used within the backend to type the loaded JSON data.

export type Ayah = {
  number: number
  arabic: string
  translation: string
}

export type Surah = {
  id: number
  nameArabic: string
  nameEnglish: string
  ayahs: Ayah[]
}

export type SurahMeta = Pick<Surah, 'id' | 'nameArabic' | 'nameEnglish'>

export type SearchResult = {
  surahId: number
  surahNameEnglish: string
  surahNameArabic: string
  ayahNumber: number
  translation: string
}
