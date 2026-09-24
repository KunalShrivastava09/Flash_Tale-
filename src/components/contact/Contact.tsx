"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "./Footer";
import { contactData } from "@/data/contact";
import {
  CONTACT_LABEL,
  CONTACT_META,
  CONTACT_STATEMENT_LINES,
} from "@/data/copy";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const STATEMENT_SIZE = { fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)" };

/**
 * Contact / Start a Project section & closing footer.
 * Cinematic closing experience with direct mailto CTA and studio metadata.
 */
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const headerElements = section.querySelectorAll<HTMLElement>(
        "[data-contact-header]"
      );
      const lines = gsap.utils.toArray<HTMLElement>("[data-contact-line]");
      const ctaElements = section.querySelectorAll<HTMLElement>(
        "[data-contact-cta]"
      );

      const trigger = {
        trigger: section,
        start: "top 78%",
        toggleActions: "play none none none",
      };

      if (reducedMotion) {
        gsap.set([...headerElements, ...lines, ...ctaElements], { opacity: 0 });
        gsap.to([...headerElements, ...lines, ...ctaElements], {
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power1.out",
          scrollTrigger: trigger,
        });
      } else {
        const tl = gsap.timeline({ scrollTrigger: trigger });

        // 1. Label & metadata header fade
        gsap.set(headerElements, { opacity: 0 });
        tl.to(headerElements, {
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
          stagger: 0.06,
        });

        // 2. Closing statement lines reveal with clip-path
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
            duration: 0.9,
            stagger: 0.1,
            ease: "power4.out",
            clearProps: "clipPath",
          },
          "-=0.2"
        );

        // 3. Contact CTA & details fade and slide in
        gsap.set(ctaElements, { opacity: 0, y: 20 });
        tl.to(
          ctaElements,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="border-t border-line-dark bg-forest pt-20 sm:pt-28 lg:pt-36 text-cream"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-18 md:mb-24">
          <div className="mb-5 flex items-center justify-between gap-4 sm:mb-7">
            <p
              data-contact-header
              className="font-body text-xs uppercase tracking-[0.35em] text-cream-dim/90 font-semibold"
            >
              {CONTACT_LABEL}
            </p>
            <span
              data-contact-header
              className="font-body text-[10px] uppercase tracking-[0.25em] text-cream-dim/60 font-semibold sm:text-xs"
            >
              {CONTACT_META}
            </span>
          </div>

          <h2 className="max-w-3xl font-display font-extrabold uppercase leading-[0.95] tracking-tight text-cream">
            {CONTACT_STATEMENT_LINES.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span data-contact-line className="block" style={STATEMENT_SIZE}>
                  {line}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Primary Contact CTA & Details */}
        <div
          data-contact-cta
          className="grid gap-12 md:grid-cols-12 md:items-end md:gap-16"
        >
          {/* Main Direct Email Link */}
          <div className="flex flex-col gap-4 md:col-span-8">
            <span className="font-body text-[11px] uppercase tracking-[0.3em] text-cream-dim/80 font-semibold">
              DIRECT INQUIRIES & NEW COMMISSIONS
            </span>

            <a
              href={`mailto:${contactData.email}`}
              className="group inline-flex w-fit items-center gap-4 text-cream transition-colors hover:text-paper-light"
              aria-label={`Send email to ${contactData.email}`}
            >
              <span className="font-display text-2xl font-extrabold uppercase tracking-tight text-cream/95 transition-colors duration-300 group-hover:text-terracotta sm:text-4xl md:text-5xl lg:text-6xl">
                {contactData.email}
              </span>
              <span
                aria-hidden="true"
                className="font-display text-2xl font-extrabold text-terracotta transition-all duration-300 group-hover:translate-x-2 group-hover:text-terracotta-bright sm:text-4xl md:text-5xl lg:text-6xl"
              >
                →
              </span>
            </a>

            {/* Subtle interactive underline */}
            <div className="h-px w-full max-w-xl bg-line-dark transition-colors duration-300 group-hover:bg-terracotta/70" />
          </div>

          {/* Secondary Details & Location */}
          <div className="flex flex-col gap-5 md:col-span-4 md:items-start">
            {contactData.availability && (
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-terracotta animate-pulse" />
                <span className="font-body text-xs uppercase tracking-[0.2em] text-cream/90 font-medium">
                  {contactData.availability}
                </span>
              </div>
            )}

            {contactData.location && (
              <div className="flex flex-col gap-1">
                <span className="font-body text-[10px] uppercase tracking-[0.25em] text-cream-dim/70 font-semibold">
                  LOCATION & AVAILABILITY
                </span>
                <p className="font-body text-xs uppercase tracking-[0.2em] text-cream/90 sm:text-sm">
                  {contactData.location}
                </p>
              </div>
            )}

            {contactData.phone && (
              <div className="flex flex-col gap-1">
                <span className="font-body text-[10px] uppercase tracking-[0.25em] text-cream-dim/70 font-semibold">
                  PHONE
                </span>
                <a
                  href={`tel:${contactData.phone}`}
                  className="font-body text-xs tracking-[0.15em] text-cream transition-colors hover:text-terracotta sm:text-sm"
                >
                  {contactData.phone}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Closing Minimal Footer */}
      <Footer />
    </section>
  );
}
