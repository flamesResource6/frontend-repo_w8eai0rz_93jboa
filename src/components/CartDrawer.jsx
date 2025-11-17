import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { apiGet, apiPut, apiDelete, getSessionId } from '../lib/api'
import { Button } from './UI'

export default function CartDrawer({ open, onClose }){
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState({ items: [], subtotal: 0 })

  async function load(){
    setLoading(true)
    try{
      const data = await apiGet(`/cart/${getSessionId()}`)
      setCart(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ if(open) load() }, [open])

  async function updateQty(id, quantity){
    await apiPut('/cart', { id, quantity })
    load()
  }
  async function remove(id){
    await apiDelete(`/cart/${id}`)
    load()
  }

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}></div>
      <div className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="text-lg font-semibold">Your Cart</div>
          <button onClick={onClose}><X/></button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-160px)]">
          {loading && <div className="text-sm text-neutral-500">Loading…</div>}
          {!loading && cart.items.length === 0 && <div className="text-sm text-neutral-500">Your cart is empty.</div>}
          {cart.items.map(it => (
            <div key={it.id} className="flex gap-3">
              <img src={it.product?.images?.[0]} alt="" className="h-20 w-20 object-cover rounded-lg bg-neutral-100"/>
              <div className="flex-1">
                <div className="text-sm font-medium line-clamp-1">{it.product?.title}</div>
                <div className="text-xs text-neutral-500">{[it.size, it.color].filter(Boolean).join(' / ')}</div>
                <div className="flex items-center gap-2 mt-2">
                  <button className="h-7 w-7 rounded-full border" onClick={()=>updateQty(it.id, Math.max(1,(it.quantity||1)-1))}>-</button>
                  <span className="text-sm w-6 text-center">{it.quantity||1}</span>
                  <button className="h-7 w-7 rounded-full border" onClick={()=>updateQty(it.id, (it.quantity||1)+1)}>+</button>
                  <button className="text-xs text-neutral-500 ml-2" onClick={()=>remove(it.id)}>Remove</button>
                </div>
              </div>
              <div className="text-sm">${(it.product?.price || 0).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t space-y-3">
          <div className="flex items-center justify-between text-sm"><span>Subtotal</span><span>${(cart.subtotal||0).toFixed(2)}</span></div>
          <Button className="w-full">Checkout</Button>
        </div>
      </div>
    </div>
  )
}
