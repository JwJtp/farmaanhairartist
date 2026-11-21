"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, CalendarHeart, Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV, telLink, whatsappLink } from "@/lib/site";

/* ---------------------------------------------------------------- preloader */
export function Preloader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const finish = () => setTimeout(() => setDone(true), 650);
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const cap = setTimeout(() => setDone(true), 2400); // never hold the page hostage
    return () => clearTimeout(cap);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = done ? "" : "hidden";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="pre"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <motion.span
            className="display text-7xl italic text-champagne sm:text-8xl"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
          >
            F<span className="not-italic">.</span>
          </motion.span>
          <div className="mt-8 h-px w-40 overflow-hidden bg-ivory/10">
            <motion.div className="h-full bg-champagne" initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1.6, ease: "easeInOut" }} />
          </div>
          <p className="eyebrow mt-6 text-beige/60">Farmaan.Hair Artist</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------------------------------------------------------- nav */
export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-white/5 bg-obsidian/80 py-3 backdrop-blur-xl" : "py-6"
      }`}
    >
      <div className="container-x flex items-center justify-between">
        <a href="#top" className="group flex items-baseline gap-3" aria-label="Farmaan.Hair Artist — back to top">
          <span className="font-serif text-2xl tracking-wide">
            Farmaan<span className="text-champagne">.</span>
            <em className="italic text-champagne">Hair Artist</em>
          </span>
          <span className="hidden text-[9px] uppercase tracking-luxe text-beige/50 xl:inline">by Farman Khan</span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-9">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="group relative text-[11px] uppercase tracking-[0.24em] text-ivory/75 transition hover:text-ivory">
                  {n.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-champagne transition-all duration-500 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href="#book" className="btn-gold hidden !px-5 !py-3 sm:inline-flex">
            Book
          </a>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center border border-ivory/20 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-obsidian lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="container-x flex items-center justify-between py-6">
              <span className="font-serif text-2xl">
                Farmaan<span className="text-champagne">.</span><em className="italic text-champagne">Hair Artist</em>
              </span>
              <button type="button" onClick={() => setOpen(false)} className="flex h-11 w-11 items-center justify-center border border-ivory/20" aria-label="Close menu" autoFocus>
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="container-x mt-6 flex flex-1 flex-col gap-2">
              {[...NAV, { label: "Book an Appointment", href: "#book" }].map((n, i) => (
                <motion.li key={n.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  <a href={n.href} onClick={() => setOpen(false)} className="display block border-b border-white/5 py-4 text-4xl">
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-x flex gap-3 pb-10">
              <a href={telLink} className="btn-line flex-1"><Phone className="h-4 w-4" /> Call</a>
              <a href={whatsappLink("Hi Farman, I'd like to book an appointment.")} target="_blank" rel="noopener noreferrer" className="btn-gold flex-1"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------------------------------------------------------------- scroll progress */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-bronze via-champagne to-ivory" style={{ scaleX }} />;
}

/* ---------------------------------------------------------------- floating actions */
export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* WhatsApp — always available */}
      <a
        href={whatsappLink("Hi Farman, I found Farmaan.Hair Artist through the website and would like to enquire about an appointment.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Farman on WhatsApp"
        className="fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_40px_-10px_rgba(37,211,102,0.7)] transition hover:scale-105 md:bottom-8 md:right-8"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.57-.48-.5-.67-.5h-.57c-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 9.88 9.89c0 5.45-4.44 9.88-9.89 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41" />
        </svg>
      </a>

      {/* Back to top */}
      <AnimatePresence>
        {show && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-[10.5rem] right-6 z-40 hidden h-11 w-11 items-center justify-center border border-ivory/20 bg-obsidian/70 backdrop-blur transition hover:border-champagne hover:text-champagne md:bottom-28 md:right-[2.35rem] md:flex"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Smart mobile booking bar */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-40 flex border-t border-white/10 bg-obsidian/90 backdrop-blur-xl md:hidden"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <a href={telLink} className="flex flex-1 items-center justify-center gap-2 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory">
              <Phone className="h-4 w-4 text-champagne" /> Call
            </a>
            <a href="#book" className="flex flex-[1.4] items-center justify-center gap-2 bg-champagne py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-obsidian">
              <CalendarHeart className="h-4 w-4" /> Book Appointment
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------------------------------------------------------- custom cursor (desktop only) */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a,button,[role=button],input,select,textarea,label"));
    };
    const leave = () => setPos({ x: -100, y: -100 });
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-champagne" style={{ transform: `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0)` }} />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-champagne/60"
        animate={{ x: pos.x - (hover ? 26 : 16), y: pos.y - (hover ? 26 : 16), width: hover ? 52 : 32, height: hover ? 52 : 32, opacity: pos.x < 0 ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.4 }}
      />
    </>
  );
}
