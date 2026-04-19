'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type ArabicFont = 'var(--font-amiri)' | 'var(--font-scheherazade)'

interface Settings {
  arabicFont: ArabicFont
  arabicFontSize: number
  translationFontSize: number
  isSidebarOpen: boolean
}

interface SettingsContextType extends Settings {
  setArabicFont: (font: ArabicFont) => void
  setArabicFontSize: (size: number) => void
  setTranslationFontSize: (size: number) => void
  setSidebarOpen: (isOpen: boolean) => void
}

const SETTINGS_KEY = 'quran_app_settings'

const defaultSettings: Settings = {
  arabicFont: 'var(--font-amiri)',
  arabicFontSize: 32,
  translationFontSize: 18,
  isSidebarOpen: false
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with defaults, will be hydrated from localStorage on mount
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(SETTINGS_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setSettings((prev) => ({ ...prev, ...parsed, isSidebarOpen: false }))
      } catch (e) {
        console.error('Failed to parse settings', e)
      }
    }
    setIsHydrated(true)
  }, [])

  // Save to localStorage whenever settings change
  useEffect(() => {
    if (isHydrated) {
      const { isSidebarOpen, ...toSave } = settings
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(toSave))
    }
  }, [settings, isHydrated])

  const setArabicFont = (arabicFont: ArabicFont) => setSettings(s => ({ ...s, arabicFont }))
  const setArabicFontSize = (arabicFontSize: number) => setSettings(s => ({ ...s, arabicFontSize }))
  const setTranslationFontSize = (translationFontSize: number) => setSettings(s => ({ ...s, translationFontSize }))
  const setSidebarOpen = (isSidebarOpen: boolean) => setSettings(s => ({ ...s, isSidebarOpen }))

  return (
    <SettingsContext.Provider 
      value={{ 
        ...settings, 
        setArabicFont, 
        setArabicFontSize, 
        setTranslationFontSize, 
        setSidebarOpen 
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
