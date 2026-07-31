import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { isLocale } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Contrast from "@/components/Contrast";
import Engine from "@/components/Engine";
import Example from "@/components/Example";
import Architecture from "@/components/Architecture";
import Network from "@/components/Network";
// import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <>
      <Nav locale={lang} dict={dict} />
      <main>
        <Hero dict={dict.hero} />
        <Problem dict={dict.problem} />
        <Contrast dict={dict.contrast} />
        <Engine dict={dict.engine} />
        <Example dict={dict.example} />
        <Architecture dict={dict.architecture} />
        <Network dict={dict.network} />
        {/* <Contact dict={dict.contact} /> */}
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
