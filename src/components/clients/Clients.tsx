"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ClientMarquee from "./ClientMarquee";
import { clients } from "@/data/clients";
import {
  CLIENTS_LABEL,
  CLIENTS_META,
  CLIENTS_STATEMENT_LINES,
} from "@/data/copy";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const STATEMENT_SIZE = { fontSize: "clamp(2rem, 5.2vw, 4.25rem)" };

function StaticClientGrid({ clientList }: { clientList: typeof clients }) {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-6 sm:grid-cols-4 sm:gap-4 sm:px-8">
      {clientList.map((client, index) => (
        <div
          key={client.name}
          className="relative flex h-16 items-center justify-center border border-forest/20 bg-paper-light/60 px-4 text-center sm:h-20 sm:px-6 transition-colors hover:bg-paper-light hover:border-forest/40"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-2.5 top-1.5 font-body text-[8px] tracking-[0.2em] text-olive/70 tabular-nums sm:text-[9px]"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          {client.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={client.logo}
              alt={client.name}
              className="max-h-6 w-auto object-contain opacity-80 sm:max-h-8"
            />
          ) : (
            <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-forest sm:text-sm">
              {client.name}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Clients / Trusted By section.
 * Editorial header with film-strip style dual-row marquee.
 */
export default function Clients() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const headerElements = section.querySelectorAll<HTMLElement>(
        "[data-clients-header]"
      );
      const lines = gsap.utils.toArray<HTMLElement>("[data-clients-line]");
      const trigger = {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none",
      };

      if (reducedMotion) {
        gsap.set([...headerElements, ...lines, content], { opacity: 0 });
        gsap.to([...headerElements, ...lines, content], {
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power1.out",
          scrollTrigger: trigger,
        });
        return;
      }

      const tl = gsap.timeline({ scrollTrigger: trigger });

      // 1. Label & metadata header fade
      gsap.set(headerElements, { opacity: 0 });
      tl.to(headerElements, {
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
        stagger: 0.06,
      });

      // 2. Statement lines reveal with clip-path
      gsap.set(lines, {
        yPercent: 45,
        opacity: 0,
        clipPath: "inset(0 0 100% 0)",
      });
      tl.to(
        lines,
        {
          yPercent: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.85,
          stagger: 0.1,
          ease: "power4.out",
          clearProps: "clipPath",
        },
        "-=0.2"
      );

      // 3. Subtle pause
      tl.to({}, { duration: 0.18 });

      // 4. Marquee rows fade and slide smoothly into position
      if (content) {
        gsap.set(content, { opacity: 0, y: 18 });
        tl.to(
          content,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.05"
        );
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="clients"
      className="overflow-hidden border-t border-forest/15 bg-paper py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto mb-10 max-w-6xl px-6 sm:mb-14 sm:px-8 md:mb-16">
        <div className="mb-5 flex items-center justify-between gap-4 sm:mb-7">
          <p
            data-clients-header
            className="font-body text-xs uppercase tracking-[0.35em] text-olive font-semibold"
          >
            {CLIENTS_LABEL}
          </p>
          <span
            data-clients-header
            className="font-body text-[10px] uppercase tracking-[0.25em] text-forest/60 font-semibold sm:text-xs"
          >
            {CLIENTS_META}
          </span>
        </div>

        <h2 className="max-w-2xl font-display font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
          {CLIENTS_STATEMENT_LINES.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span data-clients-line className="block" style={STATEMENT_SIZE}>
                {line}
              </span>
            </span>
          ))}
        </h2>
      </div>

      <div ref={contentRef}>
        {reducedMotion ? (
          <StaticClientGrid clientList={clients} />
        ) : (
          <ClientMarquee clients={clients} />
        )}
      </div>
    </section>
  );
}
