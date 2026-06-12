import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PRODUCTS, formatVND } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — KAJOO ART" },
      { name: "description", content: "Browse our collection of handmade laser engraved wooden keychains." },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { add } = useCart();
  const navigate = useNavigate();

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Collection</div>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold tracking-tight">All Products</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">Ready-made designs and customizable templates — every piece handcrafted in our Saigon studio.</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.concat(PRODUCTS).map((p, i) => (
            <div key={`${p.id}-${i}`} className="group">
              <Link to="/products/$id" params={{ id: p.id }} className="block overflow-hidden rounded-2xl border border-border bg-secondary aspect-square">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </Link>
              <div className="mt-3 flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wider text-accent">{p.tag}</div>
                  <Link to="/products/$id" params={{ id: p.id }} className="mt-1 block font-medium hover:text-accent transition">{p.name}</Link>
                  <p className="mt-1 text-sm text-muted-foreground">{formatVND(p.price)}</p>
                </div>
                <div className="flex shrink-0 flex-col gap-1.5">
                  <button
                    onClick={() => {
                      add({ id: p.id, name: p.name, price: p.price, image: p.image });
                      toast.success(`Đã thêm "${p.name}" vào giỏ hàng`);
                    }}
                    className="rounded-full border border-border px-4 py-2 text-xs font-medium hover:bg-muted transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      add({ id: p.id, name: p.name, price: p.price, image: p.image });
                      navigate({ to: "/checkout" });
                    }}
                    className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-soft transition-all duration-200 hover:opacity-90 hover:shadow-warm hover:-translate-y-0.5 hover:scale-[1.03] active:scale-95"
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}