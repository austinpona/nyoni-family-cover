import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site-data";

export function WhatsAppFloat() {
  return <a href={whatsappUrl("Hello Nyoni, I would like to learn more.")} target="_blank" rel="noreferrer" aria-label="Chat with Nyoni on WhatsApp" className="focus-ring fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg hover:scale-105"><MessageCircle aria-hidden="true" /></a>;
}
