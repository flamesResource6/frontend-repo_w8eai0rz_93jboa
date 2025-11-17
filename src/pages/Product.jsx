import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api, getCartId } from '../lib/api'
import ProductCard from '../components/ProductCard'

export default function ProductPage() {
  const { id } = useParams()
  const [p, setP] = useState(null)
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState('')

  useEffect(() => {
    api.product(id).then(setP).catch(()=>{})
  }, [id])

  if (!p) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">Loading...</div>

  const add = async () => {
    await api.cart.add({ cart_id: getCartId(), product_id: p.id || p._id, quantity: qty, size })
    alert('Added to cart')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="grid grid-cols-2 gap-3 content-start">
          {(p.images||[]).slice(0,4).map((img, i) => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-zinc-100">
              <img src={img} alt="" className="w-full h-full object-cover"/>
            </div>
          ))}
        </div>
        <div>
          <div className="text-2xl font-bold tracking-tight mb-2">{p.title}</div>
          <div className="text-lg mb-4">${p.price?.toFixed(2)}</div>
          <p className="text-sm text-zinc-600 mb-6 max-w-prose">{p.description || 'Elevated essentials crafted in premium materials with meticulous attention to proportion.'}</p>

          <div className="mb-4">
            <div className="text-sm font-medium mb-2">Size</div>
            <div className="flex flex-wrap gap-2">
              {(p.sizes?.length ? p.sizes : ['XS','S','M','L','XL']).map(s => (
                <button key={s} onClick={() => setSize(s)} className={`px-3 py-1.5 rounded-full text-sm border ${size===s?'bg-black text-white border-black':'border-zinc-300'}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="mb-6 flex items-center gap-3">
            <div className="flex items-center border border-zinc-300 rounded-full overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty-1))} className="px-3 py-2">-</button>
              <span className="px-4">{qty}</span>
              <button onClick={() => setQty(qty+1)} className="px-3 py-2">+</button>
            </div>
            <button onClick={add} className="flex-1 py-3 rounded-full bg-black text-white">Add to Cart</button>
          </div>

          <div className="border-t pt-8">
            <div className="font-medium mb-3">Recommended</div>
            <Recommended category={p.category} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Recommended({ category }) {
  const [items, setItems] = useState([])
  useEffect(() => { api.recommended({ category, limit: 4 }).then(setItems).catch(()=>{}) }, [category])
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {items.map(x => <ProductCard key={x.id || x._id} p={x}/>) }
    </div>
  )
}
