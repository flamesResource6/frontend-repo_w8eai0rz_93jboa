import { useEffect, useState } from 'react'
import { api, getCartId } from '../lib/api'

export default function CartPage() {
  const [cart, setCart] = useState({ items: [], subtotal: 0 })

  const load = () => api.cart.get(getCartId()).then(setCart)
  useEffect(() => { load() }, [])

  const remove = async (id) => { await api.cart.remove(id); load() }
  const update = async (id, quantity) => { await api.cart.update(id, quantity); load() }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-200 divide-y">
          {cart.items.length === 0 && <div className="p-6 text-sm text-zinc-500">Your cart is empty.</div>}
          {cart.items.map(it => (
            <div key={it.id || it._id} className="p-4 flex gap-4">
              <div className="w-24 h-28 rounded-lg overflow-hidden bg-zinc-100">
                {it.image && <img src={it.image} className="w-full h-full object-cover"/>}
              </div>
              <div className="flex-1">
                <div className="font-medium">{it.title}</div>
                <div className="text-sm text-zinc-500">{it.size} {it.color && `• ${it.color}`}</div>
                <div className="flex items-center gap-3 mt-2">
                  <button onClick={() => update(it.id || it._id, Math.max(1, (it.quantity||1)-1))} className="px-2 py-1 rounded-full bg-zinc-100">-</button>
                  <span>{it.quantity || 1}</span>
                  <button onClick={() => update(it.id || it._id, (it.quantity||1)+1)} className="px-2 py-1 rounded-full bg-zinc-100">+</button>
                </div>
                <button onClick={() => remove(it.id || it._id)} className="text-xs text-zinc-500 hover:text-black mt-2">Remove</button>
              </div>
              <div>${(it.price || 0).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="rounded-2xl border border-zinc-200 p-6">
            <div className="flex items-center justify-between font-medium mb-3"><span>Subtotal</span><span>${cart.subtotal.toFixed(2)}</span></div>
            <button className="w-full py-3 rounded-full bg-black text-white">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
