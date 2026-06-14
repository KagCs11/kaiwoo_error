import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { formatVND } from "@/lib/products";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/invoice")({
  head: () => ({
    meta: [
      { title: "Hóa đơn — KAJOO ART" },
      { name: "description", content: "Hóa đơn đặt hàng của bạn." },
    ],
  }),
  component: InvoicePage,
});

type Invoice = {
  id: string;
  createdAt: string;
  customer: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    note: string;
  };
  payment: string;
  items: { id: string; name: string; price: number; quantity: number; subtotal: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
  status: string;
};

function InvoicePage() {
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kajoo_last_invoice");
      if (raw) setInvoice(JSON.parse(raw));
    } catch {}
  }, []);




  if (!invoice) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-2xl px-4 py-20 text-center">
          <p className="text-muted-foreground">Không tìm thấy hóa đơn.</p>
          <Link to="/products" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
            Tiếp tục mua sắm
          </Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="font-display text-3xl font-semibold">Đặt hàng thành công!</h1>
              <p className="text-sm text-muted-foreground">Cảm ơn bạn đã mua hàng tại KAJOO ART.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 text-sm">
            <div>
              <div className="text-muted-foreground">Mã hóa đơn</div>
              <div className="font-medium">{invoice.id}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Ngày tạo</div>
              <div className="font-medium">{new Date(invoice.createdAt).toLocaleString("vi-VN")}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Khách hàng</div>
              <div className="font-medium">{invoice.customer.fullName} — {invoice.customer.phone}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Thanh toán</div>
              <div className="font-medium">{invoice.payment === "cod" ? "COD" : "Chuyển khoản"}</div>
            </div>
            <div className="sm:col-span-2">
              <div className="text-muted-foreground">Địa chỉ giao</div>
              <div className="font-medium">{invoice.customer.address}{invoice.customer.city ? `, ${invoice.customer.city}` : ""}</div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left">
                <tr>
                  <th className="px-4 py-2">Sản phẩm</th>
                  <th className="px-4 py-2 text-center">SL</th>
                  <th className="px-4 py-2 text-right">Đơn giá</th>
                  <th className="px-4 py-2 text-right">Thành tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoice.items.map((it) => (
                  <tr key={it.id}>
                    <td className="px-4 py-3">{it.name}</td>
                    <td className="px-4 py-3 text-center">{it.quantity}</td>
                    <td className="px-4 py-3 text-right">{formatVND(it.price)}</td>
                    <td className="px-4 py-3 text-right">{formatVND(it.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Tạm tính</span><span>{formatVND(invoice.subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Phí giao hàng</span><span>{formatVND(invoice.shipping)}</span></div>
            <div className="flex justify-between border-t border-border pt-2 mt-2">
              <span className="font-medium">Tổng cộng</span>
              <span className="font-display text-xl font-semibold">{formatVND(invoice.total)}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
