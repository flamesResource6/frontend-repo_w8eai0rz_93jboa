import { useState } from 'react'

export default function Filters({ onChange, initial = {} }) {
  const [size, setSize] = useState(initial.size || '')
  const [color, setColor] = useState(initial.color || '')
  const [price, setPrice] = useState(initial.price || '')
  const [type, setType] = useState(initial.type || '')

  const apply = () => onChange({ size, color, price, type })

  return (
    <aside className="space-y-4">
      <div>
        <div className="text-sm font-medium mb-2">Size</div>
        <div className="flex flex-wrap gap-2">
          {['XS','S','M','L','XL'].map(s => (
            <button key={s} onClick={() => setSize(s)} className={`px-3 py-1.5 rounded-full text-sm border ${size===s?'bg-black text-white border-black':'border-zinc-300'}`}>{s}</button>
          ))}
        </div>
      </div>
      <div>
        <div className="text-sm font-medium mb-2">Color</div>
        <div className="flex gap-2">
          {['black','white','gray','navy','olive'].map(c => (
            <button key={c} onClick={() => setColor(c)} className={`w-7 h-7 rounded-full border ${color===c?'ring-2 ring-black':''}`} style={{background: c}}/>
          ))}
        </div>
      </div>
      <div>
        <div className="text-sm font-medium mb-2">Price</div>
        <select value={price} onChange={e=>setPrice(e.target.value)} className="w-full border border-zinc-300 rounded-xl px-3 py-2 text-sm">
          <option value="">Any</option>
          <option value="0-50">$0 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value=">100">$100+</option>
        </select>
      </div>
      <div>
        <div className="text-sm font-medium mb-2">Type</div>
        <select value={type} onChange={e=>setType(e.target.value)} className="w-full border border-zinc-300 rounded-xl px-3 py-2 text-sm">
          <option value="">All</option>
          <option value="shirts">Shirts</option>
          <option value="outerwear">Outerwear</option>
          <option value="pants">Pants</option>
          <option value="knitwear">Knitwear</option>
        </select>
      </div>
      <button onClick={apply} className="w-full py-2.5 rounded-full bg-black text-white text-sm">Apply Filters</button>
    </aside>
  )
}
