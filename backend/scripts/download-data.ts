/**
 * download-data.ts
 * Fetches the Quran dataset from alquran.cloud and normalizes it into our
 * Surah/Ayah schema, saving to backend/src/data/quran.json
 *
 * Run once at setup: npx tsx scripts/download-data.ts
 */

import fs from 'fs'
import path from 'path'
import https from 'https'

// ---------------------------------------------------------------------------
// Types (mirrors shared/types/quran.ts)
// ---------------------------------------------------------------------------

type Ayah = {
  number: number
  arabic: string
  translation: string
}

type Surah = {
  id: number
  nameArabic: string
  nameEnglish: string
  ayahs: Ayah[]
}

// ---------------------------------------------------------------------------
// Raw shapes from alquran.cloud /v1/quran/:edition
// Response: { code, status, data: { surahs: RawSurah[] } }
// ---------------------------------------------------------------------------

type RawAyah = {
  number: number
  numberInSurah: number
  text: string
}

type RawSurah = {
  number: number
  name: string            // Arabic name
  englishName: string     // e.g. "Al-Faatiha"
  englishNameTranslation: string
  ayahs: RawAyah[]
}

type RawResponse = {
  code: number
  status: string
  data: {
    surahs: RawSurah[]
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fetchJson(url: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let raw = ''
      res.on('data', (chunk: Buffer) => { raw += chunk.toString() })
      res.on('end', () => {
        try { resolve(JSON.parse(raw)) } catch (e) { reject(e) }
      })
    }).on('error', reject)
  })
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const BASE = 'https://api.alquran.cloud/v1/quran'
  const arabicEdition      = 'quran-uthmani'
  const translationEdition = 'en.sahih'

  console.log('📥 Fetching Arabic text ...')
  const arabicRes = await fetchJson(`${BASE}/${arabicEdition}`) as RawResponse

  console.log('📥 Fetching English translation ...')
  const engRes = await fetchJson(`${BASE}/${translationEdition}`) as RawResponse

  const arabicSurahs = arabicRes.data.surahs
  const engSurahs    = engRes.data.surahs

  if (arabicSurahs.length !== 114 || engSurahs.length !== 114) {
    throw new Error(`Expected 114 surahs. Got arabic=${arabicSurahs.length}, english=${engSurahs.length}`)
  }

  const surahs: Surah[] = arabicSurahs.map((arSurah, idx) => {
    const enSurah = engSurahs[idx]

    if (arSurah.number !== enSurah.number) {
      throw new Error(`Surah number mismatch at index ${idx}: ${arSurah.number} vs ${enSurah.number}`)
    }

    if (arSurah.ayahs.length !== enSurah.ayahs.length) {
      throw new Error(`Ayah count mismatch in surah ${arSurah.number}`)
    }

    const ayahs: Ayah[] = arSurah.ayahs.map((arAyah, aIdx) => {
      const enAyah = enSurah.ayahs[aIdx]
      return {
        number: arAyah.numberInSurah,
        arabic: arAyah.text,
        translation: enAyah.text,
      }
    })

    return {
      id: arSurah.number,
      nameArabic: arSurah.name,
      nameEnglish: arSurah.englishName,
      ayahs,
    }
  })

  const outDir  = path.join(__dirname, '..', 'src', 'data')
  const outFile = path.join(outDir, 'quran.json')

  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(outFile, JSON.stringify(surahs, null, 2), 'utf-8')

  const totalAyahs = surahs.reduce((sum, s) => sum + s.ayahs.length, 0)
  console.log(`✅ Saved ${surahs.length} surahs | ${totalAyahs} ayahs → ${outFile}`)
}

main().catch((err) => {
  console.error('❌ Error:', err)
  process.exit(1)
})
