import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext(null)
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback } }

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState(() => read('tripTroveFavorites', []))
  const [trips, setTrips] = useState(() => read('tripTroveTrips', []))
  const [theme, setTheme] = useState(() => localStorage.getItem('tripTroveTheme') || 'light')
  const [language, setLanguage] = useState(() => localStorage.getItem('tripTroveLanguage') || 'en')
  const [toast, setToast] = useState('')
  useEffect(() => { localStorage.setItem('tripTroveFavorites', JSON.stringify(favorites)) }, [favorites])
  useEffect(() => { localStorage.setItem('tripTroveTrips', JSON.stringify(trips)) }, [trips])
  useEffect(() => { localStorage.setItem('tripTroveTheme', theme); document.documentElement.dataset.theme = theme }, [theme])
  useEffect(() => { localStorage.setItem('tripTroveLanguage', language); document.documentElement.lang = language }, [language])
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 2600); return () => clearTimeout(timer) }, [toast])
  const toggleFavorite = id => { const saved = favorites.includes(id); setFavorites(saved ? favorites.filter(item => item !== id) : [...favorites, id]); setToast(saved ? 'Removed from your favourites' : 'Saved to your favourites') }
  const value = { favorites, setFavorites, trips, setTrips, theme, setTheme, language, setLanguage, toast, setToast, toggleFavorite }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export const useApp = () => useContext(AppContext)
