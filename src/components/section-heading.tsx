export function SectionHeading({ eyebrow, title, intro, light = false, align = "left" }: { eyebrow: string; title: string; intro?: string; light?: boolean; align?: "left" | "center" }) {
  return (
    <header className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`display-title ${eyebrow ? "mt-4" : ""} text-4xl sm:text-5xl lg:text-6xl ${light ? "text-soft-cream" : "text-charcoal"}`}>{title}</h2>
      {intro && <p className={`mt-5 text-base leading-7 sm:text-lg ${light ? "text-cream/70" : "text-muted"}`}>{intro}</p>}
    </header>
  );
}
