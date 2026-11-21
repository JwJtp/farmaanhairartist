import Providers from "@/components/layout/Providers";
import { CustomCursor, FloatingActions, Navigation, Preloader, ScrollProgress } from "@/components/layout/Chrome";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import ColourStudio from "@/components/sections/ColourStudio";
import { CutCollection } from "@/components/sections/CutCollections";
import StyleFinder from "@/components/sections/StyleFinder";
import Marquee from "@/components/sections/Marquee";
import Booking from "@/components/sections/Booking";
import { Contact, Footer, InstagramSection, WhyChoose } from "@/components/sections/Closing";

export default function Home() {
  return (
    <Providers>
      <Preloader />
      <ScrollProgress />
      <Navigation />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <CutCollection side="women" />
        <CutCollection side="men" />
        <Gallery />
        <StyleFinder />
        <ColourStudio />
        <WhyChoose />
        <Booking />
        <InstagramSection />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <CustomCursor />
    </Providers>
  );
}
