import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PRODUCTS, formatVND } from "@/lib/products";

export const Route = createFileRoute("/products")({
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
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Collection</div>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold tracking-tight">All Products</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">Ready-made designs and customizable templates — every piece handcrafted in our Saigon studio.</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.concat(PRODUCTS).map((p, i) => (
            <Link to="/custom" key={i} className="group">
              <div className="overflow-hidden rounded-2xl border border-border bg-secondary aspect-square">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="mt-3">
                <div className="text-xs uppercase tracking-wider text-accent">{p.tag}</div>
                <h3 className="mt-1 font-medium">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{formatVND(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
