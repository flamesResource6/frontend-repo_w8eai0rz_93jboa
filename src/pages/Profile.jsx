export default function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-sm text-zinc-600">Manage your orders, addresses and saved items.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="rounded-2xl border border-zinc-200 p-6">
          <div className="font-medium mb-3">Orders</div>
          <ul className="text-sm text-zinc-600 space-y-2">
            <li>No orders yet.</li>
          </ul>
        </section>
        <section className="rounded-2xl border border-zinc-200 p-6">
          <div className="font-medium mb-3">Addresses</div>
          <ul className="text-sm text-zinc-600 space-y-2">
            <li>Add your default shipping address at checkout.</li>
          </ul>
        </section>
        <section className="rounded-2xl border border-zinc-200 p-6">
          <div className="font-medium mb-3">Saved Items</div>
          <ul className="text-sm text-zinc-600 space-y-2">
            <li>Sign in to save products for later.</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
