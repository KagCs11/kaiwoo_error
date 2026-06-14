import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PRODUCTS } from "@/lib/products";
import hero from "@/assets/hero-keychain.jpg";
import flatlay from "@/assets/products-flatlay.jpg";
import craft from "@/assets/craft-process.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — KAJOO ART" },
      { name: "description", content: "Real customer keepsakes from KAJOO ART — wooden keychains engraved with love." },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const imgs = [hero, flatlay, craft, ...PRODUCTS.map(p => p.image), hero, flatlay, ...PRODUCTS.map(p => p.image)];
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Gallery</div>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold tracking-tight">Made with love</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">A look at the keepsakes we've crafted for our customers.</p>

        <div className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {imgs.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-2xl break-inside-avoid bg-secondary">
              <img src={src} alt="" loading="lazy" className="w-full h-auto object-cover hover:scale-105 transition duration-500" />
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
