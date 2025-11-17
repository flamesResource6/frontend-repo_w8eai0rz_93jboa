import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { api } from '../lib/api'

export default function SearchPage() {
  const [sp, setSp] = useSearchParams()
  const q = sp.get('q') || ''
  const [items, setItems] = useState([])

  useEffect(() => { if (q) api.search(q).then(setItems).catch(()=>{}) }, [q])

  const submit = (e) => {
    e.preventDefault()
    const val = e.target.q.value
    setSp(prev => { prev.set('q', val); return prev }, { replace: true })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <form onSubmit={submit} className="mb-6 flex items-center gap-2">
        <input name="q" defaultValue={q} placeholder="Search products" className="flex-1 border border-zinc-300 rounded-full px-4 py-2"/>
        <button className="px-5 py-2 rounded-full bg-black text-white">Search</button>
      </form>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {items.map(p => <ProductCard key={p.id || p._id} p={p}/>) }
      </div>
    </div>
  )
}
