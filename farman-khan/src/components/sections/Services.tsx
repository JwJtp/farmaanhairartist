import { ArrowUpRight } from "lucide-react";
import EditorialImage from "@/components/ui/EditorialImage";
import Reveal, { SectionHeading } from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

const SPAN = {
  tall: "md:row-span-2",
  wide: "md:col-span-2",
  square: "",
};

export default function Services() {
  return (
    <section id="services" className="relative bg-charcoal py-28 sm:py-40">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Signature Services" title="Crafted for" accent="your hair." />
          <Reveal>
            <p className="max-w-sm text-beige/70">Ten services, one approach: listen first, then create. Tap any service to enquire directly.</p>
          </Reveal>
        </div>

        <div className="mt-16 grid auto-rows-[340px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[300px] md:grid-flow-dense md:grid-cols-3 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.no} delay={(i % 4) * 0.06} className={SPAN[s.span]}>
              <article className="group relative h-full overflow-hidden">
                <a
                  href={whatsappLink(`Hi Farman, I'd like to enquire about ${s.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                  aria-label={`${s.name} — enquire on WhatsApp`}
                >
                  <EditorialImage
                    photo={s.photo}
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    className="absolute inset-0 h-full w-full"
                    imgClassName="scale-105 transition-transform duration-[1.4s] ease-out group-hover:scale-100 group-focus-visible:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="absolute inset-0 border border-champagne/0 transition-colors duration-700 group-hover:border-champagne/40" />

                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <span className="font-serif text-lg italic text-champagne">{s.no}</span>
                    <div>
                      <h3 className="display text-3xl sm:text-[2rem]">{s.name}</h3>
                      <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-beige/80 opacity-0 transition-all duration-700 group-hover:max-h-24 group-hover:opacity-100 group-focus-visible:max-h-24 group-focus-visible:opacity-100 max-md:max-h-24 max-md:opacity-100">
                        {s.desc}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-champagne">
                        Enquire <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
