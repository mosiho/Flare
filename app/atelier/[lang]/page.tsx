import { notFound } from "next/navigation";
import {
  atelierMemoryWords,
  getAtelierDictionary,
} from "@/dictionaries/atelier";
import { isLocale } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Contrast from "@/components/Contrast";
import Engine from "@/components/Engine";
import Example from "@/components/Example";
import Architecture from "@/components/Architecture";
import Network from "@/components/Network";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const BRAND = "Flare Atelier";

export default async function AtelierHome({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getAtelierDictionary(lang);

  return (
    <>
      <Nav locale={lang} dict={dict} brand={BRAND} showContact />
      <main>
        <Hero
          dict={dict.hero}
          brand={BRAND}
          atmosphere={{
            imageSrc: "/images/atelier-hero-vitrine.jpg",
            imageAlt:
              lang === "ro"
                ? "Vitrină cu ceasuri și bijuterii rare; colecție de mașini clasice estompată prin sticlă"
                : "Showcase of rare watches and jewelry; blurred classic car collection through the glass",
            memoryWords: atelierMemoryWords[lang],
            imagePosition: "50% 48%",
            emberAt: "50% 55%",
          }}
        />
        <Problem dict={dict.problem} />
        <Contrast
          dict={dict.contrast}
          imageSrc="/images/atelier-contrast.jpg"
        />
        <Engine
          dict={dict.engine}
          stepImages={[
            "/images/atelier-whisper-capture.jpg",
            "/images/atelier-taste-graph.jpg",
            "/images/atelier-orchestrate.jpg",
            "/images/atelier-deliver.jpg",
          ]}
        />
        <Example
          dict={dict.example}
          imageSrc="/images/atelier-example-box.jpg"
        />
        <Architecture dict={dict.architecture} />
        <Network
          dict={dict.network}
          imageSrc="/images/atelier-memory-flow.jpg"
        />
        <Contact dict={dict.contact} />
      </main>
      <Footer dict={dict.footer} brand={BRAND} />
    </>
  );
}
