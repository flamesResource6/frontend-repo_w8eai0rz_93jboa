import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative">
      <div className="aspect-[16/7] w-full overflow-hidden rounded-3xl bg-zinc-100">
        <img
          src="https://images.unsplash.com/photo-1549887534-1541e9320b9f?q=80&w=1600&auto=format&fit=crop"
          alt="Cinematic fashion"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10">
          <div className="bg-white/70 backdrop-blur rounded-2xl inline-flex flex-col gap-3 p-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">New Season. Pure Form.</h1>
            <p className="text-sm text-zinc-700 max-w-md">Architected silhouettes in a monochrome palette. Essentials refined to their essence.</p>
            <div className="flex gap-2">
              <Link to="/new" className="px-5 py-2.5 rounded-full bg-black text-white">Shop New</Link>
              <Link to="/men" className="px-5 py-2.5 rounded-full border border-zinc-300">Men</Link>
              <Link to="/women" className="px-5 py-2.5 rounded-full border border-zinc-300">Women</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
