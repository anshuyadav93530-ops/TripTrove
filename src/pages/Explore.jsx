import { useMemo, useState } from 'react'
import { ArrowDownWideNarrow, SlidersHorizontal } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import DestinationCard from '../components/DestinationCard'
import SearchBar from '../components/SearchBar'
import { destinations } from '../data/destinations'
import { useApp } from '../context/AppContext'
export default function Explore() {
  const [params, setParams] = useSearchParams(), [query, setQuery] = useState(params.get('q') || ''), [category, setCategory] = useState(params.get('category') || 'All places'), [budget, setBudget] = useState('Any budget'), [sort, setSort] = useState('Recommended')
  const { language } = useApp(), hi = language === 'hi'
  const categories = ['All places', ...new Set(destinations.map(item => item.category))]
  const results = useMemo(() => {
    const filtered = destinations.filter(item =>
      (category === 'All places' || item.category === category) &&
      item.budget <= (budget === 'Any budget' ? Infinity : Number(budget)) &&
      `${item.name} ${item.country} ${item.category} ${item.description}`.toLowerCase().includes(query.toLowerCase())
    )
    // Keep the curated sample-data order for Recommended; apply sorting only when requested.
    if (sort === 'Budget: low to high') filtered.sort((a, b) => a.budget - b.budget)
    if (sort === 'Budget: high to low') filtered.sort((a, b) => b.budget - a.budget)
    if (sort === 'Name: A to Z') filtered.sort((a, b) => a.name.localeCompare(b.name))
    return filtered
  }, [category,budget,query,sort])
  return <main className="page-main"><section className="page-hero explore-hero"><span className="eyebrow">{hi?'भारत और दुनिया, आपके क़रीब':'THE WORLD, A LITTLE CLOSER'}</span><h1>{hi?<>अपनी अगली<br/><em>मंज़िल चुनें।</em></>:<>Find your<br/><em>kind of far.</em></>}</h1><p>{hi?'पहाड़ों से समुद्र तटों तक, अपनी पसंद की जगह खोजें।':'Big horizons, little hideaways, and everything in between.'}</p><div className="explore-search"><SearchBar value={query} onChange={setQuery} placeholder={hi?'जगह, देश या अनुभव खोजें…':'Try a place, a feeling, a country…'}/><span>{destinations.length} {hi?'जगहें':'places to get lost in'}</span></div></section><section className="section-container browse-section"><div className="browse-heading"><div><span className="eyebrow">{hi?'घूमने की जगहें':'THE COLLECTION'}</span><h2>{hi?'अपनी राह चुनें।':'Pick a direction.'}</h2></div><label className="sort-control"><ArrowDownWideNarrow size={16}/><select value={sort} onChange={e=>setSort(e.target.value)}><option value="Recommended">{hi?'सुझाई गई':'Recommended'}</option><option value="Budget: low to high">{hi?'बजट: कम से ज़्यादा':'Budget: low to high'}</option><option value="Budget: high to low">{hi?'बजट: ज़्यादा से कम':'Budget: high to low'}</option><option value="Name: A to Z">{hi?'नाम: क से ज्ञ':'Name: A to Z'}</option></select></label></div><div className="filter-row"><SlidersHorizontal size={16}/><div className="category-pills">{categories.map(item=><button key={item} className={`filter-pill ${category===item?'active':''}`} onClick={()=>setCategory(item)}>{hi?({'All places':'सभी जगहें','Culture':'संस्कृति','Nature':'प्रकृति','Coastal':'समुद्र तट','Adventure':'रोमांच','City break':'शहर की सैर'}[item]||item):item}</button>)}</div><label className="budget-select">{hi?'बजट':'Budget'}<select value={budget} onChange={e=>setBudget(e.target.value)}><option value="Any budget">{hi?'कोई भी बजट':'Any budget'}</option><option value="1000">{hi?'$1,000 से कम':'Under $1,000'}</option><option value="1500">{hi?'$1,500 से कम':'Under $1,500'}</option><option value="2000">{hi?'$2,000 से कम':'Under $2,000'}</option><option value="3000">{hi?'$3,000 से कम':'Under $3,000'}</option></select></label></div><p className="result-count">{hi?'कुल':'SHOWING'} <b>{results.length}</b> {hi?'जगहें':'PLACES TO WANDER'}</p>{results.length ? <div className="destination-grid browse-grid">{results.map((item,i)=><DestinationCard key={item.id} destination={item} index={i}/>)}</div> : <div className="empty-state"><span>✳</span><h2>{hi?'यहाँ अभी कोई जगह नहीं मिली।':'Nothing on that map yet.'}</h2><p>{hi?'खोज या फ़िल्टर बदलकर देखें।':'Try a different search or loosen your filters.'}</p><button className="button button-dark" onClick={()=>{setQuery('');setBudget('Any budget');setCategory('All places')}}>{hi?'फ़िल्टर हटाएँ':'Clear the filters'}</button></div>}</section></main>
}
