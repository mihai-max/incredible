import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Process from "@/components/Process";
import LetsTalk from "@/components/LetsTalk";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/Reveal";
import SmoothScroll from "@/components/SmoothScroll";

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
        <LetsTalk />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <ScrollReveal />
      <SmoothScroll />
    </>
  );
}
