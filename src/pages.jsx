import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { apiGet, apiPost, getSessionId } from './lib/api'
import ProductCard from './components/ProductCard'
import { Button, Container } from './components/UI'

export function HomePage(){
  const [newArrivals, setNew] = useState([])
  useEffect(()=>{ apiGet('/products/new').then(setNew).catch(()=>{}) },[])
  return (
    <div>
      <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjMzMDU0MTN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="" className="absolute inset-0 h-full w-full object-cover"/>
        <div className="absolute inset-0 bg-black/30"/>
        <Container className="relative h-full flex items-end pb-16">
          <div className="text-white max-w-xl">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">Quiet Luxury, Everyday.</h1>
            <p className="mt-4 text-neutral-200">Elevated essentials crafted in premium fabrics and timeless silhouettes.</p>
            <div className="mt-8 flex gap-3">
              <Button variant="primary" onClick={()=>location.assign('/new')}>Shop New</Button>
              <Button variant="secondary" onClick={()=>location.assign('/men')}>Shop Men</Button>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">New Arrivals</h2>
          <a href="/new" className="text-sm text-neutral-500">View all</a>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrivals.map(p=> <ProductCard key={p.id} product={p} />)}
        </div>
      </Container>

      <Container className="pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/men" className="group relative overflow-hidden rounded-2xl bg-neutral-100 h-64">
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=60" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform"/>
            <div className="absolute inset-0 bg-black/20"/>
            <div className="absolute bottom-4 left-4 text-white text-lg">Men</div>
          </a>
          <a href="/women" className="group relative overflow-hidden rounded-2xl bg-neutral-100 h-64">
            <img src="https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjMzMDU0MTN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform"/>
            <div className="absolute inset-0 bg-black/20"/>
            <div className="absolute bottom-4 left-4 text-white text-lg">Women</div>
          </a>
          <a href="/accessories" className="group relative overflow-hidden rounded-2xl bg-neutral-100 h-64">
            <img src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1400&q=60" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform"/>
            <div className="absolute inset-0 bg-black/20"/>
            <div className="absolute bottom-4 left-4 text-white text-lg">Accessories</div>
          </a>
        </div>
      </Container>

      <Container className="pb-20">
        <div className="rounded-2xl bg-neutral-100 p-8 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1400&q=60" className="rounded-xl"/>
          <div>
            <h3 className="text-2xl font-semibold">Seasonal Collection</h3>
            <p className="text-neutral-600 mt-3">Textured knits, layered tailoring, and grounded palettes. Discover the looks we designed for now.</p>
            <Button className="mt-6">Explore</Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

function CategoryGrid({ title, query }){
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  useEffect(()=>{ load() }, [page, query])
  async function load(){
    setLoading(true)
    try{
      const data = await apiGet('/products', { ...query, page, limit: 24 })
      setItems(data)
    } finally { setLoading(false) }
  }
  return (
    <Container className="py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map(p=> <ProductCard key={p.id} product={p}/>) }
      </div>
      <div className="flex justify-center mt-10 gap-3">
        <button className="px-4 py-2 rounded-full border" onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
        <button className="px-4 py-2 rounded-full border" onClick={()=>setPage(p=>p+1)}>Next</button>
      </div>
    </Container>
  )
}

export function MenPage(){
  return (
    <div>
      <section className="relative h-56 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=60" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/30"/>
        <Container className="relative h-full flex items-center"><h1 className="text-white text-3xl font-semibold">Men</h1></Container>
      </section>
      <CategoryGrid title="All Men" query={{ gender: 'men' }}/>
    </div>
  )
}

export function WomenPage(){
  return (
    <div>
      <section className="relative h-56 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjMzMDU0MTN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/30"/>
        <Container className="relative h-full flex items-center"><h1 className="text-white text-3xl font-semibold">Women</h1></Container>
      </section>
      <CategoryGrid title="All Women" query={{ gender: 'women' }}/>
    </div>
  )
}

export function AccessoriesPage(){
  return (
    <div>
      <section className="relative h-56 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1600&q=60" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/30"/>
        <Container className="relative h-full flex items-center"><h1 className="text-white text-3xl font-semibold">Accessories</h1></Container>
      </section>
      <CategoryGrid title="Accessories" query={{ category: 'accessories' }}/>
    </div>
  )
}

export function NewArrivalsPage(){
  const [items, setItems] = useState([])
  useEffect(()=>{ apiGet('/products/new').then(setItems) },[])
  return (
    <Container className="py-10">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-semibold">New Arrivals</h1></div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map(p=> <ProductCard key={p.id} product={p}/>) }
      </div>
    </Container>
  )
}

export function SalePage(){
  const [items, setItems] = useState([])
  useEffect(()=>{ apiGet('/products/sale').then(setItems) },[])
  return (
    <Container className="py-10">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-semibold">Sale</h1></div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map(p=> <ProductCard key={p.id} product={p}/>) }
      </div>
    </Container>
  )
}

export function ProductPage({ slug }){
  const [product, setProduct] = useState(null)
  const [rec, setRec] = useState([])
  const [size, setSize] = useState('M')
  const [qty, setQty] = useState(1)
  useEffect(()=>{
    apiGet(`/product/${slug}`).then(p=>{ setProduct(p); if(p?.id) apiGet(`/products/recommended/${p.id}`).then(setRec) })
  },[slug])

  async function add(){
    if(!product) return
    await apiPost('/cart', { session_id: getSessionId(), product_id: product.id, size, quantity: qty })
    alert('Added to cart')
  }

  if(!product) return <Container className="py-10">Loading…</Container>
  const image = product.images?.[0]
  return (
    <Container className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img src={image} alt={product.title} className="w-full rounded-2xl bg-neutral-100 object-cover"/>
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <div className="mt-2 text-lg">${product.price?.toFixed(2)}</div>
          <p className="mt-4 text-neutral-600">{product.description}</p>
          <div className="mt-6">
            <div className="text-sm mb-2">Size</div>
            <div className="flex flex-wrap gap-2">
              {(product.sizes||['XS','S','M','L','XL']).map(s=> (
                <button key={s} className={`h-9 px-4 rounded-full border ${s===size?'bg-black text-white':'hover:bg-neutral-50'}`} onClick={()=>setSize(s)}>{s}</button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center border rounded-full">
              <button className="h-10 w-10" onClick={()=>setQty(q=>Math.max(1,q-1))}>-</button>
              <div className="w-10 text-center">{qty}</div>
              <button className="h-10 w-10" onClick={()=>setQty(q=>q+1)}>+</button>
            </div>
            <Button onClick={add}>Add to cart</Button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-lg font-semibold">Recommended</h3>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {rec.map(p=> <ProductCard key={p.id} product={p}/>) }
        </div>
      </div>
    </Container>
  )
}

export function SearchPage(){
  const [q, setQ] = useState('')
  const [items, setItems] = useState([])
  async function run(){ const data = await apiGet('/search', { q }); setItems(data) }
  return (
    <Container className="py-10">
      <div className="flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products" className="flex-1 border rounded-full px-4 h-11"/>
        <Button onClick={run}>Search</Button>
      </div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map(p=> <ProductCard key={p.id} product={p}/>) }
      </div>
    </Container>
  )
}

export function ProfilePage(){
  const email = 'guest@example.com'
  const [profile, setProfile] = useState(null)
  useEffect(()=>{ apiGet(`/profile/${email}`).then(setProfile) },[])
  if(!profile) return <Container className="py-10">Loading…</Container>
  return (
    <Container className="py-10">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        <div className="md:col-span-2">
          <div className="font-medium mb-3">Orders</div>
          <div className="rounded-xl border p-6 text-sm text-neutral-600">No orders yet.</div>
        </div>
        <div>
          <div className="font-medium mb-3">Saved Items</div>
          <div className="grid grid-cols-2 gap-4">
            {(profile.saved_items||[]).map(id=> <div key={id} className="h-28 rounded-lg bg-neutral-100"/>) }
          </div>
        </div>
      </div>
    </Container>
  )
}
