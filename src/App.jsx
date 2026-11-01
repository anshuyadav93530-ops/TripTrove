import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Explore from './pages/Explore'
import DestinationDetails from './pages/DestinationDetails'
import Favourites from './pages/Favourites'
import MyTrips from './pages/MyTrips'
import Itinerary from './pages/Itinerary'
import Budget from './pages/Budget'
import { useApp } from './context/AppContext'
function Layout(){const location=useLocation(),{toast,setToast}=useApp();useEffect(()=>{window.scrollTo(0,0)},[location.pathname]);useEffect(()=>{const show=e=>setToast(e.detail);window.addEventListener('trip-toast',show);return()=>window.removeEventListener('trip-toast',show)},[setToast]);return <><Navbar/><Routes><Route path="/" element={<Home/>}/><Route path="/explore" element={<Explore/>}/><Route path="/destination/:id" element={<DestinationDetails/>}/><Route path="/favourites" element={<Favourites/>}/><Route path="/trips" element={<MyTrips/>}/><Route path="/itinerary/:id" element={<Itinerary/>}/><Route path="/budget" element={<Budget/>}/><Route path="*" element={<Home/>}/></Routes><Footer/>{toast&&<div className="toast-message">{toast}</div>}</>}
export default function App(){return <BrowserRouter><Layout/></BrowserRouter>}
