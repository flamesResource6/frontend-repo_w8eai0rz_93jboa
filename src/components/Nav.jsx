import { useState } from 'react'
import { Menu, Search, ShoppingBag, ChevronDown, User } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const NavItem = ({ label, to }) => (
  <NavLink to={to} className={({isActive}) => `px-3 py-2 rounded-full text-sm transition-colors ${isActive ? 'bg-black text-white' : 'text-zinc-700 hover:bg-zinc-100'}`}>{label}</NavLink>
)

export default function Nav({ onCartOpen }) {
  const [open, setOpen] = useState(false)

  const MenuLink = ({ to, label }) => (
    <Link to={to} className="block px-4 py-2 text-zinc-700 hover:bg-zinc-100 rounded-md">{label}</Link>
  )

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          <button className="p-2 lg:hidden" onClick={() => setOpen(!open)}><Menu className="w-6 h-6"/></button>
          <Link to="/" className="font-extrabold tracking-tight text-xl">ARC</Link>
          <nav className="hidden lg:flex items-center gap-1">
            <NavItem to="/men" label="Men"/>
            <NavItem to="/women" label="Women"/>
            <NavItem to="/accessories" label="Accessories"/>
            <NavItem to="/new" label="New"/>
            <NavItem to="/sale" label="Sale"/>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/search" className="p-2 hover:bg-zinc-100 rounded-full"><Search className="w-5 h-5"/></Link>
            <Link to="/profile" className="p-2 hover:bg-zinc-100 rounded-full"><User className="w-5 h-5"/></Link>
            <button onClick={onCartOpen} className="p-2 hover:bg-zinc-100 rounded-full relative">
              <ShoppingBag className="w-5 h-5"/>
              <span className="absolute -top-1 -right-1 text-[10px] bg-black text-white rounded-full px-1">2</span>
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden pb-4 grid grid-cols-2 gap-2">
            <MenuLink to="/men" label="Men"/>
            <MenuLink to="/women" label="Women"/>
            <MenuLink to="/accessories" label="Accessories"/>
            <MenuLink to="/new" label="New"/>
            <MenuLink to="/sale" label="Sale"/>
          </div>
        )}
      </div>
    </header>
  )
}
