import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Upload, Wand2, Truck, Star, ShieldCheck, Heart, Leaf } from "lucide-react";
import heroImg from "@/assets/hero-keychain.jpg";
import flatlay from "@/assets/products-flatlay.jpg";
import craft from "@/assets/craft-process.jpg";
import { PRODUCTS, formatVND } from "@/lib/products";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KAJOO ART — Custom Wooden Keychains from Your Photos" },
      { name: "description", content: "Premium personalized laser engraved wooden keychains, handmade in Vietnam. Perfect gifts for couples, families, and pet lovers." },
      { property: "og:title", content: "KAJOO ART — Custom Wooden Keychains" },
      { property: "og:description", content: "Turn your photos into handcrafted wooden keepsakes." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <Marquee />
      <HowItWorks />
      <PreviewSection />
      <BestSellers />
      <WhyUs />
      <Gallery />
      <Testimonials />
      <FAQ />
      <CTABand />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 wood-grain opacity-60" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-24">
        <div className="lg:col-span-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-walnut/15 bg-card/70 px-3 py-1 text-xs font-medium text-walnut backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" /> Handmade in Vietnam
          </span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Your memories,<br />
            <span className="italic text-walnut">engraved in wood.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground text-balance">
            Personalized laser-engraved wooden keychains made from your favorite photos.
            A small keepsake that carries a big story — perfect for couples, families, and pet lovers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/custom" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-warm transition hover:translate-y-[-1px]">
              Create Your Keychain
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link to="/products" className="inline-flex items-center gap-2 rounded-full border border-walnut/20 bg-card px-6 py-3.5 text-sm font-medium text-walnut hover:bg-muted">
              Shop Ready-Made
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6 max-w-md">
            <Stat n="12K+" l="Happy gifts" />
            <Stat n="4.9★" l="Avg rating" />
            <Stat n="48h" l="Crafted & shipped" />
          </dl>
        </div>
        <div className="lg:col-span-6">
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-walnut/10 blur-2xl" />
            <img
              src={heroImg}
              alt="Wooden keychain engraved with couple portrait"
              width={1536}
              height={1280}
              className="rounded-3xl shadow-warm object-cover w-full aspect-[4/3]"
            />
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-soft border border-border">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-accent/20 text-walnut"><Heart className="h-5 w-5" /></div>
              <div>
                <div className="text-xs text-muted-foreground">Most loved</div>
                <div className="text-sm font-medium">Couple keychain set</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <dt className="font-display text-2xl font-semibold">{n}</dt>
      <dd className="text-xs text-muted-foreground">{l}</dd>
    </div>
  );
}

function Marquee() {
  const items = ["Free shipping over 500K", "COD nationwide", "Real laser engraving", "Premium walnut & oak", "48h crafting"];
  return (
    <div className="border-y border-border bg-walnut text-cream">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-2 px-4 py-3 text-xs uppercase tracking-widest sm:px-6 lg:px-8">
        {items.map((i) => (
          <span key={i} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-accent" />{i}</span>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Upload, title: "Upload Photo", desc: "Send us your favorite memory — a couple, a pet, your family." },
    { icon: Wand2, title: "AI Preview", desc: "See your design on the wooden keychain instantly before ordering." },
    { icon: Sparkles, title: "Laser Engraving", desc: "Our artisans engrave with precision on premium wood." },
    { icon: Truck, title: "Delivery", desc: "Carefully packed and shipped to your door across Vietnam." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Header2 eyebrow="Process" title="From photo to keepsake in 4 steps" />
      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="group relative rounded-2xl border border-border bg-card p-6 transition hover:shadow-warm hover:-translate-y-1">
            <span className="font-display absolute right-4 top-3 text-5xl font-semibold text-walnut/10">{i + 1}</span>
            <s.icon className="h-7 w-7 text-walnut" />
            <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function PreviewSection() {
  return (
    <section className="bg-secondary/60 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <Header2 eyebrow="AI Preview" title="See it before we engrave it" align="left" />
          <p className="mt-4 text-muted-foreground max-w-md">
            Drop your photo and watch the magic — our AI generates a realistic preview
            on a wooden keychain mockup. Compare before and after instantly.
          </p>
          <Link to="/custom" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
            Try the Preview Tool <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative rounded-3xl overflow-hidden shadow-warm border border-border bg-card">
          <img src={craft} alt="Laser engraving wooden keychain" width={1280} height={960} loading="lazy" className="w-full aspect-[4/3] object-cover" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-px bg-cream/80" aria-hidden />
          <span className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-walnut">Before / After</span>
        </div>
      </div>
    </section>
  );
}

function BestSellers() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <Header2 eyebrow="Best Sellers" title="Loved by thousands" align="left" />
        <Link to="/products" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-walnut hover:underline">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map((p) => (
          <article key={p.id} className="group">
            <div className="overflow-hidden rounded-2xl bg-secondary aspect-square border border-border">
              <img src={p.image} alt={p.name} width={800} height={800} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="mt-3 flex items-start justify-between gap-2">
              <div>
                <div className="text-xs uppercase tracking-wider text-accent font-medium">{p.tag}</div>
                <h3 className="mt-1 font-medium">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{formatVND(p.price)}</p>
              </div>
              <button className="rounded-full border border-walnut/20 p-2 hover:bg-primary hover:text-primary-foreground transition" aria-label="Add to cart">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: Leaf, title: "Premium wood", desc: "Sustainably sourced walnut, oak, and birch." },
    { icon: Sparkles, title: "Precision laser", desc: "Industrial-grade machines for crisp detail." },
    { icon: Heart, title: "Handmade finish", desc: "Sanded, oiled, and polished by hand." },
    { icon: ShieldCheck, title: "Fast VN shipping", desc: "Express delivery anywhere in Vietnam." },
  ];
  return (
    <section className="bg-walnut text-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header2 eyebrow="Why KAJOO ART" title="Crafted with care, made to last" dark />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <div key={i.title}>
              <div className="grid h-12 w-12 place-items-center rounded-full bg-accent/20 text-accent">
                <i.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{i.title}</h3>
              <p className="mt-1 text-sm text-cream/70">{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Header2 eyebrow="Customer Gallery" title="Real keepsakes from real customers" />
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {[flatlay, heroImg, craft, ...PRODUCTS.map(p => p.image)].slice(0, 8).map((src, i) => (
          <div key={i} className={`overflow-hidden rounded-2xl bg-secondary ${i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"}`}>
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover hover:scale-105 transition duration-500" />
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link to="/gallery" className="inline-flex items-center gap-2 text-sm font-medium text-walnut hover:underline">
          View full gallery <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: "Linh N.", text: "Quá xinh! Quà tặng kỷ niệm 5 năm cho chồng, anh thích lắm. Khắc rất sắc nét.", rating: 5 },
    { name: "Minh T.", text: "Móc khoá hình bé cún nhà mình, giống y như ảnh. Đóng gói rất chỉn chu.", rating: 5 },
    { name: "Hà P.", text: "Mua tặng sinh nhật bố. Gỗ thơm, chữ khắc đẹp. Shop tư vấn nhiệt tình!", rating: 5 },
  ];
  return (
    <section className="bg-secondary/60 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header2 eyebrow="Testimonials" title="What our customers say" />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-2xl bg-card border border-border p-6 shadow-soft">
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 text-foreground leading-relaxed">"{r.text}"</blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">— {r.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const qs = [
    { q: "How long does it take to make my keychain?", a: "We craft each order within 48 hours and ship the same day." },
    { q: "What photos work best?", a: "Clear, well-lit photos with high contrast give the best engraving results." },
    { q: "Can I order in bulk for events?", a: "Yes — we offer wedding, corporate, and event bulk pricing. Contact us." },
    { q: "What payment methods do you accept?", a: "COD nationwide, bank transfer, MoMo, and ZaloPay." },
  ];
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <Header2 eyebrow="FAQ" title="Frequently asked questions" />
      <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
        {qs.map((q) => (
          <details key={q.q} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium">
              {q.q}
              <span className="grid h-7 w-7 place-items-center rounded-full border border-border text-walnut transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{q.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-walnut p-10 sm:p-16 text-cream">
        <div className="absolute inset-0 wood-grain opacity-10" aria-hidden />
        <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold leading-tight text-balance">
              Make a gift they'll keep forever.
            </h2>
            <p className="mt-4 text-cream/75 max-w-md">Upload your photo and get a free AI preview — no commitment.</p>
          </div>
          <div className="lg:justify-self-end">
            <Link to="/custom" className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-walnut hover:scale-[1.02] transition">
              Start Designing <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Header2({ eyebrow, title, align = "center", dark = false }: { eyebrow: string; title: string; align?: "center" | "left"; dark?: boolean }) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <div className={`text-xs uppercase tracking-[0.2em] font-medium ${dark ? "text-accent" : "text-accent"}`}>{eyebrow}</div>
      <h2 className={`mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-balance ${dark ? "text-cream" : ""}`}>{title}</h2>
    </div>
  );
}
