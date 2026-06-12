import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useCart } from "@/lib/cart";
import { formatVND } from "@/lib/products";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Thanh toán — KAJOO ART" },
      { name: "description", content: "Điền thông tin giao hàng và xác nhận đơn hàng." },
    ],
  }),
  component: CheckoutPage,
});

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  note: string;
  payment: "cod" | "bank";
};

const SHIPPING = 30000;

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clear } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    note: "",
    payment: "cod",
  });

  const grandTotal = total + (items.length ? SHIPPING : 0);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (items.length === 0) {
    toast.error("Giỏ hàng đang trống");
    return;
  }

  if (!form.fullName.trim() || !form.phone.trim() || !form.address.trim()) {
    toast.error("Vui lòng điền họ tên, số điện thoại và địa chỉ");
    return;
  }

  if (!/^[0-9+\s-]{8,15}$/.test(form.phone.trim())) {
    toast.error("Số điện thoại không hợp lệ");
    return;
  }

  setSubmitting(true);

  const invoice = {
    id: `KJ-${Date.now()}`,
    createdAt: new Date().toISOString(),
    customer: {
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      note: form.note.trim(),
    },
    payment: form.payment,
    items: items.map((i) => ({
      id: i.id,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      subtotal: i.price * i.quantity,
    })),
    subtotal: total,
    shipping: SHIPPING,
    total: grandTotal,
    currency: "VND",
    status: "pending",
  };

  try {
    const response = await fetch(
      "http://localhost:5000/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoice),
      }
    );

    if (!response.ok) {
      throw new Error("Không thể tạo đơn hàng");
    }

    // Lưu invoice cuối cùng để trang invoice hiển thị
    localStorage.setItem(
      "kajoo_last_invoice",
      JSON.stringify(invoice)
    );

    // Nếu muốn vẫn lưu lịch sử local
    const KEY = "kajoo_invoices_v1";
    const prev = JSON.parse(
      localStorage.getItem(KEY) || "[]"
    );

    prev.push(invoice);

    localStorage.setItem(
      KEY,
      JSON.stringify(prev)
    );

    clear();

    toast.success("Đặt hàng thành công!");

    navigate({
      to: "/invoice",
    });

  } catch (err) {
    console.error(err);

    toast.error(
      "Không thể gửi đơn hàng tới máy chủ"
    );
  } finally {
    setSubmitting(false);
  }
};

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Checkout</div>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold tracking-tight">Thanh toán</h1>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-border bg-card p-10 text-center">
            <p className="text-muted-foreground">Giỏ hàng trống. Hãy chọn sản phẩm trước nhé.</p>
            <Link to="/products" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
              Xem sản phẩm
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
              <h2 className="font-display text-xl font-semibold">Thông tin giao hàng</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Họ và tên *" value={form.fullName} onChange={(v) => update("fullName", v)} />
                <Field label="Số điện thoại *" value={form.phone} onChange={(v) => update("phone", v)} />
                <Field label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} />
                <Field label="Tỉnh / Thành phố" value={form.city} onChange={(v) => update("city", v)} />
                <div className="sm:col-span-2">
                  <Field label="Địa chỉ *" value={form.address} onChange={(v) => update("address", v)} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Ghi chú</label>
                  <textarea
                    value={form.note}
                    onChange={(e) => update("note", e.target.value)}
                    rows={3}
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Yêu cầu khắc, thời gian giao..."
                  />
                </div>
              </div>

              <div>
                <h3 className="font-medium">Phương thức thanh toán</h3>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {([
                    { v: "cod", label: "Thanh toán khi nhận (COD)" },
                    { v: "bank", label: "Chuyển khoản ngân hàng" },
                  ] as const).map((opt) => (
                    <label
                      key={opt.v}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                        form.payment === opt.v ? "border-primary bg-primary/5" : "border-border hover:bg-muted"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        className="accent-primary"
                        checked={form.payment === opt.v}
                        onChange={() => update("payment", opt.v)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
              <h2 className="font-display text-xl font-semibold">Đơn hàng</h2>
              <ul className="mt-4 divide-y divide-border">
                {items.map((i) => (
                  <li key={i.id} className="flex gap-3 py-3">
                    <img src={i.image} alt={i.name} className="h-14 w-14 rounded-lg object-cover" />
                    <div className="flex-1 text-sm">
                      <div className="font-medium">{i.name}</div>
                      <div className="text-muted-foreground">x{i.quantity}</div>
                    </div>
                    <div className="text-sm font-medium">{formatVND(i.price * i.quantity)}</div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                <Row label="Tạm tính" value={formatVND(total)} />
                <Row label="Phí giao hàng" value={formatVND(SHIPPING)} />
                <div className="flex items-baseline justify-between pt-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">Tổng cộng</span>
                  <span className="font-display text-2xl font-semibold">{formatVND(grandTotal)}</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="mt-5 w-full rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition disabled:opacity-60"
              >
                {submitting ? "Đang xử lý..." : "Xác nhận đặt hàng"}
              </button>
            </aside>
          </form>
        )}
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
