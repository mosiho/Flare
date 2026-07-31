import Image from "next/image";

export type HeroAtmosphereProps = {
  imageSrc?: string;
  imageAlt?: string;
  memoryWords?: readonly string[];
  /** CSS object-position for the hero image */
  imagePosition?: string;
  /** Where the warm ember glow sits, e.g. "50% 42%" */
  emberAt?: string;
}

const defaultMemoryWords = [
  "corner suite",
  "earl grey, unsweetened",
  "the quiet floor",
  "window left ajar",
  "returned in March",
  "travels alone",
  "extra pillows",
] as const;

const wordClass = [
  "memory-word--1",
  "memory-word--2",
  "memory-word--3",
  "memory-word--4",
  "memory-word--5",
  "memory-word--6",
  "memory-word--7",
] as const;

export default function HeroAtmosphere({
  imageSrc = "/images/hero-interval.jpg",
  imageAlt = "Quiet boutique hotel corridor at dusk",
  memoryWords = defaultMemoryWords,
  imagePosition = "52% 42%",
  emberAt,
}: HeroAtmosphereProps) {
  const words = memoryWords.slice(0, wordClass.length);

  return (
    <>
      <div className="hero-zoom absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: imagePosition }}
        />
      </div>
      <div className="memory-haze absolute inset-0" aria-hidden>
        <span className="memory-wisp memory-wisp--a" />
        <span className="memory-wisp memory-wisp--b" />
        <span className="memory-wisp memory-wisp--c" />
        {words.map((word, index) => (
          <span key={word} className={`memory-word ${wordClass[index]}`}>
            {word}
          </span>
        ))}
      </div>
      <div className="hero-vignette absolute inset-0" aria-hidden />
      <div
        className="ember-drift absolute inset-0"
        aria-hidden
        style={
          emberAt
            ? {
                background: `radial-gradient(ellipse 50% 40% at ${emberAt}, var(--ember-glow) 0%, transparent 70%)`,
              }
            : undefined
        }
      />
    </>
  );
}
