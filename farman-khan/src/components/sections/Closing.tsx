import { Gem, HeartHandshake, Instagram, MapPin, MessageCircle, Palette, Phone, ScanEye, Scissors, Sparkles } from "lucide-react";
import EditorialImage from "@/components/ui/EditorialImage";
import GlassCubeAccent from "@/components/effects/GlassCubeAccent";
import Reveal, { SectionHeading } from "@/components/ui/Reveal";
import { WHY } from "@/lib/content";
import { PHOTOS } from "@/lib/images";
import { NAV, SITE, telLink, whatsappLink } from "@/lib/site";

const ICONS = [Sparkles, ScanEye, HeartHandshake, Palette, Scissors, Gem];

/* ---------------------------------------------------------------- why choose */
export function WhyChoose() {
  return (
    <section className="relative bg-obsidian py-28 sm:py-40">
      <div className="container-x">
        <SectionHeading eyebrow="Why Farman" title="The details" accent="make it art." align="center" />
        <div className="mt-20 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={w.title} delay={(i % 3) * 0.08} className="group bg-obsidian p-10 transition-colors duration-700 hover:bg-charcoal">
                <Icon className="h-6 w-6 text-champagne transition-transform duration-700 group-hover:-translate-y-1" strokeWidth={1.25} aria-hidden />
                <h3 className="display mt-8 text-3xl">{w.title}</h3>
                <p className="mt-3 text-beige/60">{w.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- instagram */
const GRID = [PHOTOS.blondeBrunette, PHOTOS.copperMirror, PHOTOS.salonCut, PHOTOS.brownBob, PHOTOS.extensions, PHOTOS.bwFlick];

export function InstagramSection() {
  return (
    <section aria-labelledby="ig-title" className="relative bg-charcoal py-28 sm:py-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3">
              <Instagram className="h-4 w-4" /> On Instagram
            </p>
            <h2 id="ig-title" className="display text-5xl sm:text-6xl lg:text-7xl">
              Follow the <em className="italic text-champagne">work.</em>
            </h2>
          </Reveal>
          <Reveal className="flex flex-col gap-3 sm:flex-row">
            {SITE.instagram.map((ig) => (
              <a key={ig.handle} href={ig.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 border border-white/10 px-5 py-4 transition hover:border-champagne">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-bronze via-champagne to-ivory text-obsidian">
                  <Instagram className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-serif text-xl group-hover:text-champagne">@{ig.handle}</span>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-beige/50">{ig.label} · Follow</span>
                </span>
              </a>
            ))}
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-1.5 sm:gap-3 lg:grid-cols-6">
          {GRID.map((p, i) => (
            <a key={i} href={SITE.instagram[0].url} target="_blank" rel="noopener noreferrer" className="group relative block" aria-label={`View on Instagram — ${p.alt}`}>
              <EditorialImage photo={p} sizes="(min-width:1024px) 16vw, 33vw" className="aspect-square w-full" imgClassName="transition duration-700 group-hover:scale-105 group-hover:opacity-70" />
              <Instagram className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 opacity-0 transition group-hover:opacity-100" aria-hidden />
            </a>
          ))}
        </div>
        <p className="mt-4 text-xs text-beige/40">Editorial preview grid. Replace with Farman&apos;s own posts in <code>src/components/sections/Closing.tsx</code>.</p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- contact */
export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-obsidian">
      <div className="container-x relative grid items-center gap-12 py-28 sm:py-36 lg:grid-cols-12 lg:gap-x-10">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow mb-6">Visit · Call · Message</p>
          <h2 className="display text-6xl sm:text-7xl lg:text-8xl">
            Let&apos;s create <br />
            <em className="italic text-champagne">your look.</em>
          </h2>
          <p className="mt-8 font-serif text-2xl italic text-beige/80">&ldquo;{SITE.tagline}.&rdquo;</p>
        </Reveal>

        {/* Originkit ray-traced glass cube — the closing visual */}
        <div className="relative mx-auto aspect-square w-full max-w-[560px] lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
          <GlassCubeAccent className="h-full w-full" />
          <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-[10px] uppercase tracking-[0.3em] text-beige/40">Drag the cube · hover to glow</p>
        </div>

        <Reveal delay={0.1} className="lg:col-span-6">
          <div className="border border-white/10 bg-obsidian/70 p-8 backdrop-blur-md sm:p-10">
            <p className="font-serif text-3xl">
              Farmaan<span className="text-champagne">.</span>Hair Artist
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-champagne">by {SITE.name} · {SITE.role}</p>

            <ul className="mt-8 space-y-5 text-beige/80">
              <li className="flex gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-champagne" />
                <span>
                  {SITE.location}
                  <span className="mt-1 block text-xs text-beige/45">Exact salon details are shared when you enquire.</span>
                </span>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-champagne" />
                <a href={telLink} className="hover:text-champagne">{SITE.phoneDisplay}</a>
              </li>
              <li className="flex gap-4">
                <Instagram className="mt-0.5 h-5 w-5 shrink-0 text-champagne" />
                <span className="flex flex-wrap gap-x-4">
                  {SITE.instagram.map((ig) => (
                    <a key={ig.handle} href={ig.url} target="_blank" rel="noopener noreferrer" className="hover:text-champagne">@{ig.handle}</a>
                  ))}
                </span>
              </li>
            </ul>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <a href={telLink} className="btn-line"><Phone className="h-4 w-4" /> Call now</a>
              <a href={whatsappLink("Hi Farman, I'd like to enquire about an appointment.")} target="_blank" rel="noopener noreferrer" className="btn-gold"><MessageCircle className="h-4 w-4" /> WhatsApp now</a>
              {SITE.mapsUrl && (
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-line sm:col-span-2"><MapPin className="h-4 w-4" /> Get directions</a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- footer */
export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-obsidian pb-28 pt-16 md:pb-12">
      <div className="container-x">
        <p className="display text-[16vw] leading-none text-ivory/[0.06] lg:text-[11rem]" aria-hidden>
          Farmaan.
        </p>
        <div className="mt-10 flex flex-col gap-8 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-beige/60">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} className="hover:text-champagne">{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <p className="text-xs text-beige/40">
            © {new Date().getFullYear()} {SITE.brand} by {SITE.name} · {SITE.role} · {SITE.location}
            <br />
            Editorial imagery via Unsplash, shown as inspiration only.
          </p>
        </div>
        <div className="mt-8 flex items-center justify-center border-t border-white/5 pt-6">
          <a
            href="https://nexobova.com"
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-beige/50 transition hover:text-champagne"
          >
            Designed &amp; developed by
            <span className="font-semibold text-champagne group-hover:text-ivory">Nexobova</span>
            <span className="normal-case tracking-normal text-beige/40 group-hover:text-champagne">· nexobova.com</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
