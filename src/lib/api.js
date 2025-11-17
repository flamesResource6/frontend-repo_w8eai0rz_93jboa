const BASE = import.meta.env.VITE_BACKEND_URL || ''

async function http(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers||{}) },
    ...opts,
  })
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}

export const api = {
  products: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return http(`/api/products${qs ? `?${qs}` : ''}`)
  },
  product: (id) => http(`/api/products/${id}`),
  categories: () => http('/api/categories'),
  newArrivals: (limit=12) => http(`/api/new-arrivals?limit=${limit}`),
  trending: (limit=12) => http(`/api/trending?limit=${limit}`),
  recommended: (params={}) => {
    const qs = new URLSearchParams(params).toString()
    return http(`/api/recommended${qs?`?${qs}`:''}`)
  },
  search: (q) => http(`/api/search?q=${encodeURIComponent(q)}`),
  cart: {
    get: (cart_id) => http(`/api/cart?cart_id=${encodeURIComponent(cart_id)}`),
    add: (payload) => http('/api/cart/add', { method: 'POST', body: JSON.stringify(payload) }),
    remove: (id) => http(`/api/cart/${id}`, { method: 'DELETE' }),
    update: (id, quantity) => http(`/api/cart/${id}?quantity=${quantity}`, { method: 'PATCH' }),
  }
}

export function getCartId() {
  let id = localStorage.getItem('cart_id')
  if (!id) { id = crypto.randomUUID(); localStorage.setItem('cart_id', id) }
  return id
}
