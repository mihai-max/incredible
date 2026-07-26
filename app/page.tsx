import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Quote from "@/components/Quote";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Nav />

      <main id="main">
        <span id="top" />
        <Hero />
        <Marquee />
        <Manifesto />
        <Work />
        <Services />
        <Process />
        <Quote />
        <Pricing />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <ScrollReveal />
    </>
  );
}
