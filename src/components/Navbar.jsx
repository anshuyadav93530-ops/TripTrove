import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Compass, Heart, Menu, Moon, Sun, Wallet, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme, setTheme, language, setLanguage, favorites } = useApp()
  const labels = language === 'hi' ? ['होम', 'खोजें', 'मेरी यात्राएँ', 'पसंदीदा', 'बजट'] : ['Home', 'Explore', 'My Trips', 'Favourites', 'Budget']
  const links = [['/', labels[0]], ['/explore', labels[1]], ['/trips', labels[2]], ['/favourites', labels[3]], ['/budget', labels[4]]]
  return <header className="site-header"><div className="nav-shell"><Link to="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark"><Compass size={21}/></span><span>trip<span className="brand-accent">trove</span><small>{language === 'hi' ? 'थोड़ा और आगे चलें' : 'GO A LITTLE FURTHER'}</small></span></Link><button className="menu-toggle icon-button" onClick={() => setOpen(!open)} aria-label={language === 'hi' ? 'नेविगेशन खोलें' : 'Toggle navigation'}>{open ? <X/> : <Menu/>}</button><nav className={open ? 'nav-links is-open' : 'nav-links'}>{links.map(([path, label], index) => <NavLink key={path} to={path} end={path === '/'} onClick={() => setOpen(false)}>{label}{index === 3 && favorites.length > 0 && <span className="nav-count">{favorites.length}</span>}</NavLink>)}</nav><div className="nav-tools"><button className="language-toggle" onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')} aria-label={language === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}>{language === 'hi' ? 'हि' : 'EN'}<span>{language === 'hi' ? 'English' : 'हिन्दी'}</span></button><button className="theme-toggle icon-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={language === 'hi' ? 'रंग थीम बदलें' : 'Toggle colour theme'}>{theme === 'light' ? <Moon size={19}/> : <Sun size={19}/>}</button></div></div></header>
}
