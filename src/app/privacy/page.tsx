import Link from "next/link";
import { Logo } from "@/components/logo";

export const metadata = { title: "Privacy Notice" };
export default function PrivacyPage() { return <main className="min-h-screen bg-cream py-12"><div className="container-shell max-w-3xl"><Link href="/"><Logo /></Link><p className="eyebrow mt-16">Privacy</p><h1 className="display-title mt-4 text-5xl">Privacy Notice</h1><div className="mt-8 space-y-4 leading-7 text-muted"><p>This website currently does not store application form submissions. When you choose to continue, a WhatsApp message is prepared for your review. Your ID number, email and residential address are not placed in that message.</p><p>Nyoni’s complete privacy notice and secure application process must still be supplied. Contact Nyoni before sharing sensitive personal information.</p></div><Link href="/" className="mt-8 inline-block text-sm font-bold text-gold">← Return home</Link></div></main>; }
