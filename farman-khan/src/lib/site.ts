/**
 * Single source of truth for every business detail on the site.
 * Only verified, client-supplied facts live here. Edit this file — not the
 * components — when details change.
 */

export const SITE = {
  brand: "Farmaan.Hair Artist",
  name: "Farman Khan",
  title: "The Hair Artist",
  role: "Hair Artist & Hair Colour Expert",
  tagline: "Your Hair Is My Responsibility",
  // Set this once a domain is bought (e.g. "https://farmankhan.in").
  // Canonical URL, sitemap and Open Graph URLs switch on automatically.
  url: process.env.NEXT_PUBLIC_SITE_URL || "",
  phoneDisplay: "+91 81781 80929",
  phoneRaw: "+918178180929",
  whatsappNumber: "918178180929",
  location: "Pacific Mall, Delhi",
  // Leave null until the exact salon branch is confirmed. Delhi has several
  // Pacific Malls, so no map pin or street address is shown until then.
  mapsUrl: null as string | null,
  instagram: [
    { handle: "geetanjalisalon", url: "https://www.instagram.com/geetanjalisalon/", label: "Salon" },
    { handle: "pacificmalldelhi", url: "https://www.instagram.com/pacificmalldelhi/", label: "Location" },
  ],
} as const;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${SITE.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const telLink = `tel:${SITE.phoneRaw}`;

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Women", href: "#women-cuts" },
  { label: "Men", href: "#men-cuts" },
  { label: "Work", href: "#gallery" },
  { label: "Style Finder", href: "#finder" },
  { label: "Colour", href: "#colour" },
  { label: "Contact", href: "#contact" },
] as const;
