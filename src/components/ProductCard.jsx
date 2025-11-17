import { motion } from 'framer-motion'
import { Badge } from './UI'

export default function ProductCard({ product }){
  const { title, images=[], price, compare_at_price, is_new, is_sale, slug } = product
  const image = images[0] || 'https://images.unsplash.com/photo-1520975898319-5f35d9d60b86?auto=format&fit=crop&w=1200&q=60'
  return (
    <a href={`/product/${slug}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-neutral-100">
        <motion.img src={image} alt={title} className="h-72 w-full object-cover group-hover:scale-105 transition-transform" whileHover={{ scale: 1.02 }} />
        {(is_new || is_sale) && (
          <div className="absolute top-3 left-3 flex gap-2">
            {is_new && <Badge>New</Badge>}
            {is_sale && <Badge className="bg-red-600">Sale</Badge>}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
        <div className="absolute bottom-3 right-3 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">View details →</div>
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <div className="text-sm text-neutral-600 truncate max-w-[70%]">{title}</div>
        <div className="text-sm font-medium">
          ${price.toFixed(2)}{compare_at_price && <span className="ml-2 line-through text-neutral-400">${compare_at_price.toFixed(2)}</span>}
        </div>
      </div>
    </a>
  )
}
