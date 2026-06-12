import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useCart } from "@/lib/cart";
import { formatVND } from "@/lib/products";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — KAJOO ART" },
      { name: "description", content: "Review your selected handcrafted wooden keychains before checkout." },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, total, setQty, remove, clear } = useCart();

  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Checkout</div>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold tracking-tight">Your Cart</h1>

        {items.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-border bg-card p-12 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-walnut/50" />
            <p className="mt-4 text-lg font-medium">Your cart is empty</p>
            <p className="mt-1 text-sm text-muted-foreground">Discover our handcrafted keychains.</p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
            <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
              {items.map((i) => (
                <li key={i.id} className="flex gap-4 p-4 sm:p-5">
                  <img src={i.image} alt={i.name} className="h-24 w-24 rounded-xl object-cover" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-medium">{i.name}</h3>
                        <p className="text-sm text-muted-foreground">{formatVND(i.price)}</p>
                      </div>
                      <button
                        onClick={() => remove(i.id)}
                        aria-label="Remove"
                        className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-border">
                        <button
                          onClick={() => setQty(i.id, i.quantity - 1)}
                          className="p-2 hover:bg-muted rounded-l-full"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-sm">{i.quantity}</span>
                        <button
                          onClick={() => setQty(i.id, i.quantity + 1)}
                          className="p-2 hover:bg-muted rounded-r-full"
                          aria-label="Increase"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-medium">{formatVND(i.price * i.quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
              <h2 className="font-display text-xl font-semibold">Order Summary</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatVND(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-display text-2xl font-semibold">{formatVND(total)}</span>
              </div>
              <Link
                to="/checkout"
                className="mt-5 block w-full rounded-full bg-primary py-3.5 text-center text-sm font-medium text-primary-foreground hover:opacity-90 transition"
              >
                Checkout
              </Link>
              <button
                onClick={clear}
                className="mt-2 w-full rounded-full border border-border py-2.5 text-xs text-muted-foreground hover:bg-muted transition"
              >
                Clear cart
              </button>
            </aside>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
