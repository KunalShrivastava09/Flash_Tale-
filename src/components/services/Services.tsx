"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceRow from "./ServiceRow";
import { services } from "@/data/services";
import {
  SERVICES_LABEL,
  SERVICES_META,
  SERVICES_STATEMENT_LINES,
} from "@/data/copy";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const STATEMENT_SIZE = { fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)" };

/**
 * What We Do / Services Section.
 * Confident editorial production capabilities showcase.
 */
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header reveal
      const headerElements = section.querySelectorAll<HTMLElement>(
        "[data-services-header]"
      );
      const lines = gsap.utils.toArray<HTMLElement>("[data-services-line]");

      const headerTrigger = {
        trigger: section,
        start: "top 78%",
        toggleActions: "play none none none",
      };

      if (reducedMotion) {
        gsap.set([...headerElements, ...lines], { opacity: 0 });
        gsap.to([...headerElements, ...lines], {
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power1.out",
          scrollTrigger: headerTrigger,
        });
      } else {
        const headerTl = gsap.timeline({ scrollTrigger: headerTrigger });

        gsap.set(headerElements, { opacity: 0 });
        headerTl.to(headerElements, {
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
          stagger: 0.06,
        });

        gsap.set(lines, {
          yPercent: 45,
          opacity: 0,
          clipPath: "inset(0 0 100% 0)",
        });
        headerTl.to(
          lines,
          {
            yPercent: 0,
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.9,
            stagger: 0.1,
            ease: "power4.out",
            clearProps: "clipPath",
          },
          "-=0.2"
        );
      }

      // 2. Service rows sequential scroll reveals
      const rows = gsap.utils.toArray<HTMLElement>("[data-service-row]");

      rows.forEach((row) => {
        const rowTrigger = {
          trigger: row,
          start: "top 85%",
          toggleActions: "play none none none",
        };

        if (reducedMotion) {
          gsap.set(row, { opacity: 0 });
          gsap.to(row, {
            opacity: 1,
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: rowTrigger,
          });
        } else {
          gsap.set(row, { opacity: 0, y: 24 });
          gsap.to(row, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: rowTrigger,
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="border-t border-forest/15 bg-paper px-6 py-20 sm:px-8 sm:py-28 lg:py-36 text-ink"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header with Refined Spacing */}
        <div className="mb-10 sm:mb-14 md:mb-16">
          <div className="mb-5 flex items-center justify-between gap-4 sm:mb-7">
            <p
              data-services-header
              className="font-body text-xs uppercase tracking-[0.35em] text-olive font-semibold"
            >
              {SERVICES_LABEL}
            </p>
            <span
              data-services-header
              className="font-body text-[10px] uppercase tracking-[0.25em] text-forest/60 font-semibold sm:text-xs"
            >
              {SERVICES_META}
            </span>
          </div>

          <h2 className="max-w-2xl font-display font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
            {SERVICES_STATEMENT_LINES.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span data-services-line className="block" style={STATEMENT_SIZE}>
                  {line}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Vertical Editorial Services List */}
        <div className="flex flex-col">
          {services.map((service, index) => (
            <ServiceRow
              key={service.number}
              service={service}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
