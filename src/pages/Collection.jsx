import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Filters from '../components/Filters'
import ProductCard from '../components/ProductCard'
import { api } from '../lib/api'

export default function Collection({ title, gender, category, sortOptions }) {
  const [params] = useSearchParams()
  const [items, setItems] = useState([])
  const [sort, setSort] = useState('newest')

  const load = () => {
    api.products({ gender, category, sort }).then(setItems).catch(()=>setItems([]))
  }

  useEffect(() => { load() }, [gender, category, sort])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="rounded-3xl overflow-hidden bg-zinc-100">
        <img src="https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjMzMDU0MTN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="" className="w-full h-[260px] object-cover"/>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3"><Filters onChange={() => load()}/></div>
        <div className="lg:col-span-9">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            <select value={sort} onChange={e=>setSort(e.target.value)} className="border border-zinc-300 rounded-full px-3 py-2 text-sm">
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
            {items.map(p => <ProductCard key={p.id || p._id} p={p}/>) }
          </div>
        </div>
      </div>
    </div>
  )
}
