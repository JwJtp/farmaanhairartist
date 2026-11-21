const WORDS = [
  "Butterfly Cut", "Balayage", "Taper Fade", "Global Colour", "Curtain Bangs", "Pompadour",
  "Highlights", "Military Cut", "Wolf Cut", "Copper", "French Crop", "Pixie", "Ombre", "Slick Back",
];

/** Slow, endless strip of style names — pauses on hover, static for reduced motion. */
export default function Marquee() {
  const row = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {WORDS.map((w) => (
        <span key={w} className="flex items-center">
          <span className="display whitespace-nowrap px-8 text-4xl italic text-ivory/85 sm:text-6xl">{w}</span>
          <span className="text-2xl text-champagne">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <section aria-label="Styles we create" className="group relative overflow-hidden border-y border-white/5 bg-obsidian py-8 sm:py-10">
      <p className="sr-only">Styles: {WORDS.join(", ")}.</p>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row}
        {row}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-obsidian to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-obsidian to-transparent" />
    </section>
  );
}
