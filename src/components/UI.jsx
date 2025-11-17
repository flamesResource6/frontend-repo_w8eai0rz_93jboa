import { useState } from 'react'
import { Menu, Search, ShoppingBag, User, ChevronDown, X } from 'lucide-react'

export function Button({ variant='primary', className='', children, ...props }){
  const base = 'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  const variants = {
    primary: 'bg-black text-white hover:bg-neutral-800 focus:ring-black',
    secondary: 'bg-neutral-100 text-black hover:bg-neutral-200 focus:ring-neutral-300',
    outline: 'border border-neutral-300 text-black hover:bg-neutral-100 focus:ring-neutral-400'
  }
  return <button className={`${base} ${variants[variant]} ${className}`} {...props}>{children}</button>
}

export function Badge({ children, className='' }){
  return <span className={`inline-flex items-center rounded-full bg-black text-white text-xs px-2 py-0.5 ${className}`}>{children}</span>
}

export function Container({ children, className='' }){
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

export function NavBar({ onCartOpen }){
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-neutral-200">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="lg:hidden" onClick={()=>setOpen(true)} aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>
          <a href="/" className="text-xl font-semibold tracking-tight">ÆTHER</a>
          <nav className="hidden lg:flex items-center gap-6 ml-8 text-sm">
            <a href="/men" className="group inline-flex items-center gap-1">Men <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition"/></a>
            <a href="/women" className="group inline-flex items-center gap-1">Women <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition"/></a>
            <a href="/accessories" className="group inline-flex items-center gap-1">Accessories <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition"/></a>
            <a href="/new" className="">New Arrivals</a>
            <a href="/sale" className="text-red-600">Sale</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <a href="/search" className="p-2"><Search className="h-5 w-5"/></a>
          <a href="/profile" className="p-2"><User className="h-5 w-5"/></a>
          <button className="relative p-2" onClick={onCartOpen} aria-label="Open cart">
            <ShoppingBag className="h-5 w-5"/>
            <span className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-black text-white rounded-full grid place-items-center">•</span>
          </button>
        </div>
      </Container>
      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setOpen(false)}></div>
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">ÆTHER</span>
              <button onClick={()=>setOpen(false)} aria-label="Close menu"><X/></button>
            </div>
            <a href="/men" className="py-2">Men</a>
            <a href="/women" className="py-2">Women</a>
            <a href="/accessories" className="py-2">Accessories</a>
            <a href="/new" className="py-2">New Arrivals</a>
            <a href="/sale" className="py-2 text-red-600">Sale</a>
            <a href="/profile" className="py-2">Profile</a>
          </div>
        </div>
      )}
    </header>
  )
}

export function Footer(){
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <Container className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="text-lg font-semibold mb-3">ÆTHER</div>
          <p className="text-neutral-500">Modern essentials crafted with intention.</p>
        </div>
        <div>
          <div className="font-medium mb-3">Shop</div>
          <ul className="space-y-2 text-neutral-600">
            <li><a href="/men">Men</a></li>
            <li><a href="/women">Women</a></li>
            <li><a href="/accessories">Accessories</a></li>
            <li><a href="/new">New Arrivals</a></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-3">Support</div>
          <ul className="space-y-2 text-neutral-600">
            <li>Help Center</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-3">Follow</div>
          <ul className="space-y-2 text-neutral-600">
            <li>Instagram</li>
            <li>Twitter</li>
            <li>Pinterest</li>
          </ul>
        </div>
      </Container>
      <Container className="py-6 border-t border-neutral-200 text-xs text-neutral-500">© {new Date().getFullYear()} ÆTHER. All rights reserved.</Container>
    </footer>
  )
}
