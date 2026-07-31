import Image from "next/image";

export default function HeroAtmosphere() {
  return (
    <>
      <div className="hero-zoom absolute inset-0">
        <Image
          src="/images/hero-interval.jpg"
          alt="Quiet boutique hotel corridor at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[52%_42%]"
        />
      </div>
      <div className="memory-haze absolute inset-0" aria-hidden>
        <span className="memory-wisp memory-wisp--a" />
        <span className="memory-wisp memory-wisp--b" />
        <span className="memory-wisp memory-wisp--c" />
        <span className="memory-word memory-word--1">corner suite</span>
        <span className="memory-word memory-word--2">earl grey, unsweetened</span>
        <span className="memory-word memory-word--3">the quiet floor</span>
        <span className="memory-word memory-word--4">window left ajar</span>
        <span className="memory-word memory-word--5">returned in March</span>
        <span className="memory-word memory-word--6">travels alone</span>
        <span className="memory-word memory-word--7">extra pillows</span>
      </div>
      <div className="hero-vignette absolute inset-0" aria-hidden />
      <div className="ember-drift absolute inset-0" aria-hidden />
    </>
  );
}
