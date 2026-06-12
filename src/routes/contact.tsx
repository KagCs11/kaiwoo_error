import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — KAIWOO" },
      { name: "description", content: "Get in touch with KAIWOO for custom orders, bulk pricing, and support." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Contact</div>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold tracking-tight">Let's make something special</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">Have a question, custom request, or bulk order? Drop us a message and we'll reply within 24 hours.</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <form className="space-y-5 rounded-2xl border border-border bg-card p-6 sm:p-8" onSubmit={(e) => e.preventDefault()}>
            <Field label="Name"><input className="input" placeholder="Your name" /></Field>
            <Field label="Email"><input type="email" className="input" placeholder="you@email.com" /></Field>
            <Field label="Phone"><input className="input" placeholder="0900 000 000" /></Field>
            <Field label="Message"><textarea rows={5} className="input" placeholder="Tell us about your project…" /></Field>
            <button type="submit" className="w-full rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
              Send Message
            </button>
            <style>{`.input{width:100%;border:1px solid var(--color-border);background:var(--color-background);border-radius:0.75rem;padding:0.75rem 1rem;font-size:0.875rem;outline:none;transition:border-color .15s}.input:focus{border-color:var(--color-ring)}`}</style>
          </form>

          <div className="space-y-6">
            <Info icon={Phone} title="Phone" value="0900 000 000" />
            <Info icon={Mail} title="Email" value="hello@kajooart.vn" />
            <Info icon={MessageCircle} title="Zalo / Messenger" value="Tap the floating button anytime" />
            <Info icon={MapPin} title="Studio" value="Quận 1, Hồ Chí Minh, Việt Nam" />
            <div className="rounded-2xl border border-border bg-secondary p-6">
              <h3 className="font-display text-lg font-semibold">Studio hours</h3>
              <ul className="mt-3 text-sm text-muted-foreground space-y-1">
                <li className="flex justify-between"><span>Mon – Fri</span><span>9:00 – 18:00</span></li>
                <li className="flex justify-between"><span>Saturday</span><span>9:00 – 16:00</span></li>
                <li className="flex justify-between"><span>Sunday</span><span>Closed</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Info({ icon: Icon, title, value }: { icon: React.ElementType; title: string; value: string }) {
  return (
    <div className="flex gap-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-walnut text-cream"><Icon className="h-5 w-5" /></div>
      <div>
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}
