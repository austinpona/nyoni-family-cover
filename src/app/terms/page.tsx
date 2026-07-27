import Link from "next/link";
import { Logo } from "@/components/logo";

export const metadata = { title: "Membership Terms" };
export default function TermsPage() { return <main className="min-h-screen bg-cream py-12"><div className="container-shell max-w-3xl"><Link href="/"><Logo /></Link><p className="eyebrow mt-16">Legal information</p><h1 className="display-title mt-4 text-5xl">Membership Terms</h1><div className="mt-8 border-l-2 border-gold bg-soft-cream p-6"><p className="leading-7 text-muted">Nyoni’s complete official membership terms have not yet been supplied for publication. Please contact Nyoni on <a className="font-semibold text-gold" href="tel:+27636021868">063 602 1868</a> to request and review the current terms before joining.</p></div><Link href="/" className="mt-8 inline-block text-sm font-bold text-gold">← Return home</Link></div></main>; }
