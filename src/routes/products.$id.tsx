import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { type Product, PRODUCTS, formatVND } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/products/$id")({
  head: ({ params }) => {
    const p = PRODUCTS.find((x) => x.id === params.id);
    return {
      meta: [
        { title: `${p?.name ?? "Product"} — KAJOO ART` },
        { name: "description", content: p?.name ?? "KAJOO ART product" },
        { property: "og:title", content: `${p?.name ?? "Product"} — KAJOO ART` },
        { property: "og:image", content: p?.image ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const product = PRODUCTS.find((x) => x.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <section className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-semibold">Sản phẩm không tồn tại</h1>
        <Link to="/products" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
          Quay lại sản phẩm
        </Link>
      </section>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <section className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-muted-foreground">{error.message}</p>
      </section>
    </SiteLayout>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { add } = useCart();
  const navigate = useNavigate();

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition">
          <ChevronLeft className="h-4 w-4" /> Tất cả sản phẩm
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-secondary aspect-square">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>

          <div className="flex flex-col">
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-medium">{product.tag}</div>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold tracking-tight">{product.name}</h1>
            <p className="mt-4 font-display text-3xl font-semibold">{formatVND(product.price)}</p>

            <div className="mt-6 space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>Móc khóa gỗ khắc laser thủ công tại xưởng KAJOO ART Sài Gòn. Chất liệu gỗ óc chó / sồi tự nhiên, đường nét khắc sắc sảo, bền màu theo thời gian.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Kích thước: ~6 × 4 cm</li>
                <li>Khắc miễn phí tên / ngày / chữ ngắn</li>
                <li>Hoàn thiện dầu tự nhiên, an toàn</li>
                <li>Đóng gói quà tặng sang trọng</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  add({ id: product.id, name: product.name, price: product.price, image: product.image });
                  toast.success(`Đã thêm "${product.name}" vào giỏ hàng`);
                }}
                className="rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-muted transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  add({ id: product.id, name: product.name, price: product.price, image: product.image });
                  navigate({ to: "/checkout" });
                }}
                className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-all duration-200 hover:opacity-90 hover:shadow-warm hover:-translate-y-0.5 hover:scale-[1.03] active:scale-95"
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-semibold">Có thể bạn thích</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link key={p.id} to="/products/$id" params={{ id: p.id }} className="group">
                  <div className="overflow-hidden rounded-2xl border border-border bg-secondary aspect-square">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="mt-3">
                    <div className="text-xs uppercase tracking-wider text-accent">{p.tag}</div>
                    <h3 className="mt-1 font-medium">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{formatVND(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
