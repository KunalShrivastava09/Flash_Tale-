"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATEMENT_LINES } from "@/data/copy";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Sized to read at roughly 60-75% of the viewport width on desktop.
const LINE_SIZE = { fontSize: "clamp(3rem, 11vw, 9.5rem)" };
const ACCENT_LINES = new Set(["VISUAL", "EXPERIENCES."]);
const GRADIENT_TEXT =
  "bg-gradient-to-r from-terracotta to-olive bg-clip-text text-transparent";

/**
 * A large editorial statement, revealed line-by-line as the section enters
 * the viewport — a film-title-sequence beat between the Hero and About.
 */
export default function BigStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-statement-line]");

      if (reducedMotion) {
        gsap.set(lines, { opacity: 0 });
        gsap.to(lines, {
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power1.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        });
        return;
      }

      // Kept subtle: a small vertical drift under the clip-path unmask,
      // not a big slide.
      gsap.set(lines, { yPercent: 45, opacity: 0, clipPath: "inset(0 0 100% 0)" });
      gsap.to(lines, {
        yPercent: 0,
        opacity: 1,
        clipPath: "inset(0 0 0% 0)",
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        clearProps: "clipPath",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="border-t border-forest/15 bg-paper-light px-6 py-24 sm:px-8 sm:py-32 lg:py-40"
    >
      <h2 className="font-display font-extrabold uppercase leading-[0.92] tracking-tight text-forest">
        {STATEMENT_LINES.map((line, i) => (
          <span key={i} className="block">
            <span
              data-statement-line
              className={`block ${ACCENT_LINES.has(line) ? GRADIENT_TEXT : ""}`}
              style={LINE_SIZE}
            >
              {line}
            </span>
          </span>
        ))}
      </h2>
    </section>
  );
}
