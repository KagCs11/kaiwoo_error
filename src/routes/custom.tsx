import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Upload, Sparkles } from "lucide-react";
import { formatVND } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/custom")({
  head: () => ({
    meta: [
      { title: "Custom Wooden Keychain — KAJOO ART" },
      { name: "description", content: "Design your own laser engraved wooden keychain. Upload a photo, pick wood and shape, see a live preview." },
    ],
    links: [{ rel: "canonical", href: "/custom" }],
  }),
  component: CustomPage,
});

const WOODS = [
  { id: "walnut", name: "Walnut", price: 0 },
  { id: "oak", name: "Oak", price: 20000 },
  { id: "birch", name: "Birch", price: 0 },
];
const SHAPES = [
  { id: "heart", name: "Heart" },
  { id: "circle", name: "Circle" },
  { id: "rect", name: "Rectangle" },
];
const SIZES = [
  { id: "s", name: "Small (35mm)", price: 0 },
  { id: "m", name: "Medium (45mm)", price: 30000 },
  { id: "l", name: "Large (55mm)", price: 60000 },
];

function CustomPage() {
  const { add } = useCart();
  const navigate = useNavigate();
  const [img, setImg] = useState<string | null>(null);
  const [wood, setWood] = useState("walnut");
  const [shape, setShape] = useState("heart");
  const [size, setSize] = useState("m");
  const base = 189000;
  const total = base + (WOODS.find(w => w.id === wood)?.price ?? 0) + (SIZES.find(s => s.id === size)?.price ?? 0);

  const buildItem = () => ({
    id: `custom-${wood}-${shape}-${size}-${Date.now()}`,
    name: `Custom Keychain (${WOODS.find(w => w.id === wood)?.name}, ${SHAPES.find(s => s.id === shape)?.name}, ${SIZES.find(s => s.id === size)?.name})`,
    price: total,
    image: img ?? "",
  });

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setImg(URL.createObjectURL(f));
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Custom Design</div>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold tracking-tight">Design your keychain</h1>
        <p className="mt-3 text-muted-foreground max-w-xl">Upload your favorite photo and customize every detail. AI preview included.</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Preview */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="aspect-square rounded-3xl wood-grain border border-border shadow-warm flex items-center justify-center overflow-hidden">
              {img ? (
                <div className={`relative h-3/4 w-3/4 ${shape === "heart" ? "[clip-path:polygon(50%_15%,80%_0,100%_30%,75%_75%,50%_100%,25%_75%,0_30%,20%_0)]" : shape === "circle" ? "rounded-full" : "rounded-2xl"} overflow-hidden`}>
                  <img src={img} alt="preview" className="h-full w-full object-cover sepia opacity-90" />
                  <div className="absolute inset-0 mix-blend-multiply bg-walnut/30" />
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <Sparkles className="h-8 w-8 mx-auto text-walnut/40" />
                  <p className="mt-3 text-sm">Live preview appears here</p>
                </div>
              )}
            </div>
            <p className="mt-3 text-xs text-center text-muted-foreground">Wood: {WOODS.find(w => w.id === wood)?.name} · Shape: {SHAPES.find(s => s.id === shape)?.name} · {SIZES.find(s => s.id === size)?.name}</p>
          </div>

          {/* Options */}
          <div className="space-y-8">
            <label className="block">
              <span className="text-sm font-medium">1. Upload your photo</span>
              <div className="mt-2 flex aspect-[3/2] cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card hover:bg-secondary/50 transition">
                <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
                <div className="text-center pointer-events-none">
                  <Upload className="h-8 w-8 mx-auto text-walnut/60" />
                  <p className="mt-2 text-sm font-medium">Drop or click to upload</p>
                  <p className="text-xs text-muted-foreground">JPG, PNG up to 10MB</p>
                </div>
              </div>
            </label>

            <Group label="2. Wood type">
              {WOODS.map(w => (
                <Chip key={w.id} active={wood === w.id} onClick={() => setWood(w.id)}>
                  {w.name}{w.price ? ` +${formatVND(w.price)}` : ""}
                </Chip>
              ))}
            </Group>

            <Group label="3. Shape">
              {SHAPES.map(s => <Chip key={s.id} active={shape === s.id} onClick={() => setShape(s.id)}>{s.name}</Chip>)}
            </Group>

            <Group label="4. Size">
              {SIZES.map(s => (
                <Chip key={s.id} active={size === s.id} onClick={() => setSize(s.id)}>
                  {s.name}{s.price ? ` +${formatVND(s.price)}` : ""}
                </Chip>
              ))}
            </Group>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-display text-3xl font-semibold">{formatVND(total)}</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    const item = buildItem();
                    add(item);
                    toast.success("Đã thêm vào giỏ hàng");
                  }}
                  className="rounded-full border border-border bg-card py-4 text-sm font-medium transition-all duration-200 hover:bg-secondary hover:-translate-y-0.5 active:scale-95"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    const item = buildItem();
                    add(item);
                    navigate({ to: "/checkout" });
                  }}
                  className="rounded-full bg-primary py-4 text-sm font-medium text-primary-foreground shadow-soft transition-all duration-200 hover:opacity-90 hover:shadow-warm hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95"
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-sm font-medium">{label}</div>
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition ${active ? "border-walnut bg-walnut text-cream" : "border-border bg-card hover:bg-secondary"}`}
    >
      {children}
    </button>
  );
}
