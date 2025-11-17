import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import { api } from '../lib/api'

export default function Home() {
  const [newArrivals, setNewArrivals] = useState([])
  const [trending, setTrending] = useState([])

  useEffect(() => {
    api.newArrivals(8).then(setNewArrivals).catch(()=>{})
    api.trending(8).then(setTrending).catch(()=>{})
  }, [])

  return (
    <div className="space-y-14">
      <Hero/>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">New Arrivals</h2>
          <Link to="/new" className="text-sm text-zinc-600 hover:text-black">View all</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map(p => <ProductCard key={p.id || p._id} p={p}/>) }
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden bg-zinc-100">
          <img src="https://images.unsplash.com/photo-1701808236285-9464dc96c4b4?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTZWFzb25hbCUyMENvbGxlY3Rpb258ZW58MHwwfHx8MTc2MzM5NDU0NHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Seasonal Collection" className="w-full h-[360px] object-cover"/>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Trending</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {trending.map(p => <ProductCard key={p.id || p._id} p={p}/>) }
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {[
          {to:'/men',title:'Men',img:'https://images.unsplash.com/photo-1520975867597-0f8a8f5d3a3d?q=80&w=1400&auto=format&fit=crop'},
          {to:'/women',title:'Women',img:'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1400&auto=format&fit=crop'},
          {to:'/accessories',title:'Accessories',img:'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1400&auto=format&fit=crop'}
        ].map(card => (
          <Link key={card.to} to={card.to} className="group">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-100">
              <img src={card.img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
            </div>
            <div className="pt-3 text-lg font-medium">{card.title}</div>
          </Link>
        ))}
      </section>
    </div>
  )
}
