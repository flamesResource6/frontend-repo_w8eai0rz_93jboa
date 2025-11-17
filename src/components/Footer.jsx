import { Facebook, Instagram, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="font-extrabold text-xl mb-4">ARC</div>
          <p className="text-sm text-zinc-600">Premium essentials for everyday life. Designed with intention. Built to last.</p>
        </div>
        <div>
          <div className="font-semibold mb-3">Shop</div>
          <ul className="space-y-2 text-sm text-zinc-600">
            <li><Link to="/men" className="hover:text-black">Men</Link></li>
            <li><Link to="/women" className="hover:text-black">Women</Link></li>
            <li><Link to="/accessories" className="hover:text-black">Accessories</Link></li>
            <li><Link to="/new" className="hover:text-black">New Arrivals</Link></li>
            <li><Link to="/sale" className="hover:text-black">Sale</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Support</div>
          <ul className="space-y-2 text-sm text-zinc-600">
            <li>Help Center</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Follow</div>
          <div className="flex gap-3 text-zinc-600">
            <a href="#" aria-label="Instagram" className="p-2 hover:bg-zinc-100 rounded-full"><Instagram className="w-5 h-5"/></a>
            <a href="#" aria-label="Twitter" className="p-2 hover:bg-zinc-100 rounded-full"><Twitter className="w-5 h-5"/></a>
            <a href="#" aria-label="Facebook" className="p-2 hover:bg-zinc-100 rounded-full"><Facebook className="w-5 h-5"/></a>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-200 py-6 text-center text-xs text-zinc-500">© {new Date().getFullYear()} ARC. All rights reserved.</div>
    </footer>
  )
}
