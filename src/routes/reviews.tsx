import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Star } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — KAJOO ART" },
      { name: "description", content: "Read what KAJOO ART customers say about our handcrafted wooden keychains." },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

const REVIEWS = [
  { name: "Linh Nguyễn", rating: 5, text: "Quá xinh và ý nghĩa! Mua tặng kỷ niệm 5 năm cho chồng, anh thích lắm. Khắc rất sắc nét, gỗ thơm." },
  { name: "Minh Trần", rating: 5, text: "Móc khoá hình bé cún nhà mình, giống y như ảnh. Đóng gói rất chỉn chu, ship nhanh." },
  { name: "Hà Phạm", rating: 5, text: "Mua tặng sinh nhật bố. Shop tư vấn nhiệt tình, sản phẩm vượt mong đợi." },
  { name: "Tuấn Lê", rating: 5, text: "Order bulk 50 chiếc cho đám cưới, mỗi cái khắc tên khách mời. Quà cảm ơn rất đẹp." },
  { name: "Mai Vũ", rating: 4, text: "Chất lượng tốt, giá hợp lý. Sẽ ủng hộ shop dài dài." },
  { name: "An Hoàng", rating: 5, text: "Preview AI cực kỳ giống thành phẩm. Rất ấn tượng với độ chuyên nghiệp." },
];

function ReviewsPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Reviews</div>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold tracking-tight">4.9 / 5 from 2,400+ orders</h1>
        <div className="mt-3 flex items-center gap-1 text-accent">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map(r => (
            <figure key={r.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 leading-relaxed">"{r.text}"</blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">— {r.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
