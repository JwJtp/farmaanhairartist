import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";

const description =
  "Farmaan.Hair Artist by Farman Khan — Hair Artist & Hair Colour Expert at Pacific Mall, Delhi. Women's and men's cuts, balayage, highlights, global colour and a style finder. Book via WhatsApp.";

export const metadata: Metadata = {
  ...(SITE.url ? { metadataBase: new URL(SITE.url), alternates: { canonical: "/" } } : {}),
  title: "Farmaan.Hair Artist by Farman Khan | Hair Artist & Colour Expert, Delhi",
  description,
  keywords: [
    "Farmaan Hair Artist",
    "Farman Khan Hair Artist",
    "Men's Haircut Pacific Mall Delhi",
    "Butterfly Cut Delhi",
    "Taper Fade Pacific Mall",
    "Hair Colour Expert Delhi",
    "Hair Stylist Pacific Mall Delhi",
    "Professional Hair Artist Delhi",
    "Balayage Hair Colour Delhi",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Farmaan.Hair Artist",
    title: "Farmaan.Hair Artist by Farman Khan | Artistry in Every Strand",
    description,
    ...(SITE.url ? { url: SITE.url } : {}),
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Farmaan.Hair Artist by Farman Khan" }],
  },
  twitter: { card: "summary_large_image", title: "Farmaan.Hair Artist by Farman Khan", description, images: ["/og.jpg"] },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#0B0B0B", width: "device-width", initialScale: 1 };

// Person schema built only from client-supplied facts.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: SITE.role,
  telephone: SITE.phoneRaw,
  brand: { "@type": "Brand", name: SITE.brand },
  knowsAbout: ["Hair colour", "Balayage", "Highlights", "Global hair colour", "Hair styling", "Hair transformation", "Men's haircuts"],
  address: { "@type": "PostalAddress", addressLocality: "Delhi", addressCountry: "IN" },
  ...(SITE.url ? { url: SITE.url } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@300;400;500;600&display=swap"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#main" className="sr-only z-[200] bg-champagne px-4 py-2 text-obsidian focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
