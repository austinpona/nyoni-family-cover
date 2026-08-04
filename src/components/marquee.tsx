const items = ["We are family", "Nyoni", "Practical support", "Nyoni", "From R100 per month", "Nyoni"];

export function Marquee() {
  return (
    <div className="marquee border-y border-gold/25 bg-cream py-4" aria-hidden="true">
      {[0, 1].map((copy) => (
        <div key={copy} className="marquee-track">
          {items.map((item, index) => (
            <span key={`${copy}-${index}`} className={`whitespace-nowrap text-2xl sm:text-3xl ${index % 2 ? "font-display uppercase tracking-wide text-charcoal/80" : "serif-accent text-gold"}`}>{item}</span>
          ))}
        </div>
      ))}
    </div>
  );
}
