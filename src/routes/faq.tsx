import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — KAJOO ART" },
      { name: "description", content: "Answers to common questions about KAJOO ART custom wooden keychains." },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FAQPage,
});

const QS = [
  { q: "How long does it take to make my keychain?", a: "We craft each order within 48 hours and ship the same day. Delivery in Vietnam takes 2–4 days depending on your location." },
  { q: "What photos work best for engraving?", a: "Clear, well-lit photos with high contrast and a simple background give the best results. We'll always preview and contact you if anything looks off." },
  { q: "What wood types do you offer?", a: "Walnut (dark), Oak (warm brown), and Birch (light). Each has a unique grain that adds character to your keychain." },
  { q: "Can I order in bulk for weddings or events?", a: "Yes! We offer special pricing for orders of 20+ with custom packaging available. Reach out via the contact page." },
  { q: "What payment methods do you accept?", a: "COD nationwide, bank transfer, MoMo, and ZaloPay." },
  { q: "Do you ship internationally?", a: "Currently we ship within Vietnam. International shipping coming soon." },
  { q: "What's your return policy?", a: "Because each piece is personalized, we don't accept returns for change of mind. If there's a defect or error on our part, we'll remake it free of charge." },
];

function FAQPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Help</div>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold tracking-tight">Frequently asked questions</h1>

        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
          {QS.map(q => (
            <details key={q.q} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium">
                {q.q}
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-walnut transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{q.a}</p>
            </details>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
