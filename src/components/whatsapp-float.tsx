import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site-data";

export function WhatsAppFloat() {
  return <a href={whatsappUrl("Hello Nyoni, I would like to learn more.")} target="_blank" rel="noreferrer" aria-label="Chat with Nyoni on WhatsApp" className="focus-ring fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_16px_34px_-16px_rgba(34,33,31,.7)] hover:bg-[#1d6340]"><MessageCircle aria-hidden="true" /></a>;
}
