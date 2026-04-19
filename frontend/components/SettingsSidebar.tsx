'use client'

import { useSettings, ArabicFont } from '@/context/SettingsContext'

export default function SettingsSidebar() {
  const { 
    isSidebarOpen, 
    setSidebarOpen,
    arabicFont,
    setArabicFont,
    arabicFontSize,
    setArabicFontSize,
    translationFontSize,
    setTranslationFontSize
  } = useSettings()

  if (!isSidebarOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={() => setSidebarOpen(false)}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl transition-transform dark:bg-zinc-900 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Settings</h2>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-8">
            {/* Arabic Font Selection */}
            <div>
              <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-4 uppercase tracking-wider">
                Arabic Font
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setArabicFont('var(--font-amiri)')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    arabicFont === 'var(--font-amiri)'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                      : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-400'
                  }`}
                >
                  <span className="block text-xl mb-1" style={{ fontFamily: 'var(--font-amiri)' }}>الحمد</span>
                  <span className="text-xs font-medium">Amiri</span>
                </button>
                <button
                  onClick={() => setArabicFont('var(--font-scheherazade)')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    arabicFont === 'var(--font-scheherazade)'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                      : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-400'
                  }`}
                >
                  <span className="block text-xl mb-1" style={{ fontFamily: 'var(--font-scheherazade)' }}>الحمد</span>
                  <span className="text-xs font-medium">Scheherazade</span>
                </button>
              </div>
            </div>

            {/* Arabic Font Size */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Arabic Size
                </label>
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-500">{arabicFontSize}px</span>
              </div>
              <input
                type="range"
                min="18"
                max="48"
                value={arabicFontSize}
                onChange={(e) => setArabicFontSize(parseInt(e.target.value))}
                className="w-auto h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:bg-zinc-800"
              />
            </div>

            {/* Translation Font Size */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Translation Size
                </label>
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-500">{translationFontSize}px</span>
              </div>
              <input
                type="range"
                min="14"
                max="32"
                value={translationFontSize}
                onChange={(e) => setTranslationFontSize(parseInt(e.target.value))}
                className="w-auto h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:bg-zinc-800"
              />
            </div>
          </div>
          
          <div className="mt-12 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Settings are automatically saved to your browser and will persist on your next visit.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
