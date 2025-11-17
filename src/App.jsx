import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Search from './pages/Search'
import { api, getCartId } from './lib/api'

export default function AppShell() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState({ items: [], subtotal: 0 })
  const loc = useLocation()

  const loadCart = () => api.cart.get(getCartId()).then(setCart)

  useEffect(() => { loadCart() }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Nav onCartOpen={() => setCartOpen(true)} />
      <main className="flex-1 py-6 sm:py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Collection title="Men" gender="men" category="men"/>} />
          <Route path="/women" element={<Collection title="Women" gender="women" category="women"/>} />
          <Route path="/accessories" element={<Collection title="Accessories" category="accessories"/>} />
          <Route path="/new" element={<Collection title="New Arrivals" sortOptions category=""/>} />
          <Route path="/sale" element={<Collection title="Sale"/>} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart.items}
        subtotal={cart.subtotal}
        onRemove={async (id) => { await api.cart.remove(id); loadCart() }}
        onUpdate={async (id, q) => { await api.cart.update(id, q); loadCart() }}
      />
    </div>
  )
}
