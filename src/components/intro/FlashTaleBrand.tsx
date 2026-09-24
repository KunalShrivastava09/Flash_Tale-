import type { RefObject } from "react";
import ParticleTale, { type ParticleTaleHandle } from "./ParticleTale";

interface FlashTaleBrandProps {
  flashWordRef: RefObject<HTMLSpanElement | null>;
  particleRef: RefObject<ParticleTaleHandle | null>;
  creditRef: RefObject<HTMLParagraphElement | null>;
  reducedMotion: boolean;
}

const wordClass = "font-display font-extrabold uppercase leading-none tracking-tight";

// Shared, fluid font-size applied identically to FLASH and TALE so the two
// words are always pixel-identical in size/weight/baseline — never set
// per-word or per-breakpoint separately. ~35-45% of desktop viewport width
// for the full "FLASH TALE" lockup, ~25-35% larger than the old fixed
// text-6xl/8xl/9xl steps.
const wordStyle = { fontSize: "clamp(2.75rem, 8.5vw, 9.5rem)" };

/**
 * The identity reveal: "FLASH" as real, individually-animatable characters,
 * "TALE" as particle-formed type (or a static gradient in reduced-motion
 * mode), and the "BY DEV YADAV" credit line underneath.
 */
export default function FlashTaleBrand({
  flashWordRef,
  particleRef,
  creditRef,
  reducedMotion,
}: FlashTaleBrandProps) {
  return (
    <div
      data-flash-el="brand"
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"
    >
      <h1 className="sr-only">Flash Tale — creative production by Dev Yadav</h1>

      <div
        aria-hidden="true"
        className="flex items-baseline justify-center gap-3 sm:gap-5"
      >
        <span
          ref={flashWordRef}
          data-flash-el="flash-word"
          className={`${wordClass} opacity-0 text-cream`}
          style={wordStyle}
        >
          {Array.from("FLASH").map((char, i) => (
            <span key={i} data-flash-el="flash-char" className="inline-block">
              {char}
            </span>
          ))}
        </span>

        {reducedMotion ? (
          <span
            className={`${wordClass} bg-gradient-to-r from-terracotta to-olive-light bg-clip-text text-transparent`}
            style={wordStyle}
          >
            TALE
          </span>
        ) : (
          <ParticleTale
            ref={particleRef}
            text="TALE"
            className={wordClass}
            style={wordStyle}
          />
        )}
      </div>

      <p
        ref={creditRef}
        data-flash-el="credit"
        className="font-body text-[11px] uppercase tracking-[0.35em] text-cream-dim/90 opacity-0 sm:text-xs"
      >
        By Dev Yadav
      </p>
    </div>
  );
}
