import { Link } from 'react-router-dom'

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="text-sm text-zinc-500 mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 flex-wrap">
        <li><Link to="/" className="hover:text-black">Home</Link></li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            <span>/</span>
            {it.to ? <Link to={it.to} className="hover:text-black">{it.label}</Link> : <span className="text-zinc-700">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )}
