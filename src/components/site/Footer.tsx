import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-[oklch(0.22_0.035_45)] text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-walnut font-display text-lg font-semibold">K</span>
            <span className="font-display text-xl font-semibold">KAJOO ART</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-cream/70">
            Handcrafted laser-engraved wooden keychains from Vietnam — turning your memories into keepsakes.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-cream">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li><Link to="/custom" className="hover:text-accent">Custom Keychain</Link></li>
            <li><Link to="/products" className="hover:text-accent">Products</Link></li>
            <li><Link to="/gallery" className="hover:text-accent">Gallery</Link></li>
            <li><Link to="/reviews" className="hover:text-accent">Reviews</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Help</h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li><Link to="/faq" className="hover:text-accent">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            <li><a href="#" className="hover:text-accent">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-accent">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-cream/70">
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-accent" /><span>0900 000 000</span></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-accent" /><span>hello@kajooart.vn</span></li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-accent" /><span>Hồ Chí Minh, Việt Nam</span></li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Facebook" className="rounded-full border border-cream/20 p-2 hover:bg-accent hover:text-walnut"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="rounded-full border border-cream/20 p-2 hover:bg-accent hover:text-walnut"><Instagram className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-cream/50 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} KAJOO ART. Handmade with love in Vietnam.
        </div>
      </div>
    </footer>
  );
}
