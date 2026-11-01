import { useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
export default function SearchBar({ value, onChange, placeholder = 'Where would you like to go?' }) {
  const inputRef = useRef(null)
  useEffect(() => {
    const focusSearch = event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [])
  return <label className="search-field"><Search size={19}/><input ref={inputRef} value={value} onChange={event => onChange(event.target.value)} placeholder={placeholder}/><kbd>⌘ K</kbd></label>
}
