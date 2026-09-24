"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Ambient Background
 *
 * Cinematic, extremely subtle atmospheric radial gradients in negative space:
 * - 3 soft, organic orbs (muted teal, warm ember, safelight cream/amber)
 * - Slow-drifting, non-distracting 25–40s asynchronous loops
 * - Fixed in background behind content (z-0, pointer-events-none)
 * - Safe for reading contrast and performance
 * - Renders statically when prefers-reduced-motion is enabled
 */
export default function AmbientBackground() {
  const prefersReduced = usePrefersReducedMotion();
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced) return;

    const orb1 = orb1Ref.current;
    const orb2 = orb2Ref.current;
    const orb3 = orb3Ref.current;

    if (!orb1 || !orb2 || !orb3) return;

    const ctx = gsap.context(() => {
      // Orb 1: Muted Teal atmospheric drift
      gsap.to(orb1, {
        x: "+=120",
        y: "+=80",
        scale: 1.15,
        duration: 28,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Orb 2: Warm Ember darkroom safelight drift
      gsap.to(orb2, {
        x: "-=140",
        y: "-=90",
        scale: 1.2,
        duration: 34,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });

      // Orb 3: Subtle Cream/Amber ambient glow
      gsap.to(orb3, {
        x: "+=90",
        y: "-=110",
        scale: 0.9,
        duration: 40,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 5,
      });
    });

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Orb 1: Top-left Forest Green pigment aura */}
      <div
        ref={orb1Ref}
        className="absolute -top-32 -left-32 h-[550px] w-[550px] rounded-full opacity-15 blur-[160px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle at center, rgba(58, 75, 65, 0.08) 0%, rgba(58, 75, 65, 0) 70%)",
        }}
      />

      {/* Orb 2: Bottom-right Warm Terracotta light leak */}
      <div
        ref={orb2Ref}
        className="absolute top-1/2 -right-36 h-[600px] w-[600px] rounded-full opacity-12 blur-[160px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle at center, rgba(183, 110, 80, 0.07) 0%, rgba(183, 110, 80, 0) 70%)",
        }}
      />

      {/* Orb 3: Lower-left Soft Olive nuance */}
      <div
        ref={orb3Ref}
        className="absolute bottom-10 left-1/4 h-[480px] w-[480px] rounded-full opacity-10 blur-[150px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle at center, rgba(105, 116, 93, 0.06) 0%, rgba(105, 116, 93, 0) 70%)",
        }}
      />
    </div>
  );
}
