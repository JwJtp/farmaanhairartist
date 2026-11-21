import { Instagram } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import EditorialImage from "@/components/ui/EditorialImage";
import { PHOTOS } from "@/lib/images";
import { SITE } from "@/lib/site";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-obsidian py-28 sm:py-40">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        <Reveal className="relative lg:col-span-5">
          {/* Editorial salon imagery — swap for Farman's own portrait in src/lib/images.ts when available */}
          <EditorialImage photo={PHOTOS.salonCut} sizes="(min-width:1024px) 40vw, 100vw" className="aspect-[4/5] w-full" />
          <div className="absolute -bottom-10 -right-4 hidden w-44 border-4 border-obsidian sm:block lg:-right-16 lg:w-56">
            <EditorialImage photo={PHOTOS.menComb} sizes="224px" className="aspect-[3/4]" />
          </div>
        </Reveal>

        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-champagne/60" /> About · {SITE.brand}
            </p>
            <h2 className="display text-6xl sm:text-7xl lg:text-8xl">
              Behind the <em className="italic text-champagne">artistry.</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-10 text-lg leading-relaxed text-beige/80">
              <span className="text-ivory">Farmaan.Hair Artist</span> is the studio name of Farman Khan — a hair artist for women and men who treats every appointment as a creative brief. His focus is colour — understanding how a shade
              will live on <em>your</em> hair, under <em>your</em> light, and building it with precision so the result looks effortless.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-beige/80">
              From a subtle gloss to a complete transformation, the promise stays the same: <span className="text-ivory">your hair is his responsibility.</span>
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-12 grid grid-cols-2 gap-px border border-white/10 bg-white/10">
              <div className="bg-obsidian p-6">
                <dt className="eyebrow text-beige/50">Identity</dt>
                <dd className="mt-2 font-serif text-2xl">Hair Artist</dd>
              </div>
              <div className="bg-obsidian p-6">
                <dt className="eyebrow text-beige/50">Speciality</dt>
                <dd className="mt-2 font-serif text-2xl">Hair Colour Expert</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.2}>
            <blockquote className="mt-14 border-l border-champagne pl-8">
              <p className="font-serif text-3xl italic leading-snug text-ivory sm:text-4xl">
                &ldquo;Every strand has a story.
                <br /> I create the look that tells yours.&rdquo;
              </p>
              <footer className="eyebrow mt-5 text-beige/60">— {SITE.name}</footer>
            </blockquote>
          </Reveal>

          <Reveal delay={0.25} className="mt-12 flex flex-wrap gap-3">
            {SITE.instagram.map((ig) => (
              <a key={ig.handle} href={ig.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/10 px-4 py-2.5 text-sm text-beige/80 transition hover:border-champagne hover:text-champagne">
                <Instagram className="h-4 w-4" /> @{ig.handle}
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
