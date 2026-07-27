import Image from "next/image";

export function Logo({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  if (compact) {
    return (
      <span className="inline-flex items-center gap-2.5">
        <span className="relative block size-12 overflow-hidden rounded-full border border-gold/30 bg-white">
          <Image src="/images/nyoni-logo.png" width={1100} height={1430} sizes="48px" alt="" priority className="absolute left-1/2 top-0 w-[105%] max-w-none -translate-x-1/2" />
        </span>
        <span className="leading-none">
          <span className={`block font-serif text-xl font-semibold tracking-[.16em] ${inverse ? "text-white" : "text-charcoal"}`}>NYONI</span>
          <span className={`mt-1 block text-[.48rem] font-bold uppercase tracking-[.22em] ${inverse ? "text-[#d8bd8a]" : "text-gold"}`}>We are family</span>
        </span>
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center ${inverse ? "brightness-0 invert" : ""}`}>
      <Image
        src="/images/nyoni-logo.png"
        width={1100}
        height={1430}
        sizes="120px"
        alt="Nyoni cow and sunrise logo"
        priority
        className="h-36 w-auto object-contain"
      />
    </span>
  );
}
