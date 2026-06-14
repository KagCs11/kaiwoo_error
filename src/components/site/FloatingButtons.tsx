import { MessageCircle } from "lucide-react";

export function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a
        href="https://zalo.me/"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on Zalo"
        className="grid h-12 w-12 place-items-center rounded-full bg-[#0068FF] text-white shadow-warm transition hover:scale-105"
      >
        <span className="text-xs font-bold">Zalo</span>
      </a>
      <a
        href="https://m.me/"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on Messenger"
        className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#0078FF] to-[#A21FFF] text-white shadow-warm transition hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    </div>
  );
}
