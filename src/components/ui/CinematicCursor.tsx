"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Custom Cinematic Cursor
 *
 * Camera viewfinder-inspired pointer:
 * - Precision pinpoint center dot
 * - Lagging circular viewfinder ring with smooth GSAP inertia
 * - Expands & activates on interactive elements (links, buttons, project items)
 * - Automatically hidden on touch devices & disabled with prefers-reduced-motion
 * - Pure DOM ref transformations via GSAP quickTo — zero React state re-renders
 */
export default function CinematicCursor() {
  const prefersReduced = usePrefersReducedMotion();
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on client with fine pointer (desktop mouse/trackpad) and without reduced motion
    if (prefersReduced) return;

    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );
    if (!finePointerQuery.matches) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!cursor || !dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    // Center offset helpers
    // Dot is 4x4 (offset -2px), Ring is 32x32 (offset -16px)
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
    const setRingX = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (!isVisible) {
        isVisible = true;
        gsap.to(cursor, { opacity: 1, duration: 0.25, ease: "power2.out" });
      }

      setDotX(clientX);
      setDotY(clientY);
      setRingX(clientX);
      setRingY(clientY);
    };

    const onMouseLeave = () => {
      isVisible = false;
      gsap.to(cursor, { opacity: 0, duration: 0.25, ease: "power2.out" });
    };

    const onMouseEnter = () => {
      isVisible = true;
      gsap.to(cursor, { opacity: 1, duration: 0.25, ease: "power2.out" });
    };

    // Interactive element hover tracking
    const interactiveSelector =
      'a, button, input, textarea, select, [role="button"], [data-cursor], [data-project-item], summary';

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(interactiveSelector);
      if (target) {
        const isProject = target.hasAttribute("data-project-item") || target.getAttribute("data-cursor") === "view";
        gsap.to(ring, {
          scale: isProject ? 1.8 : 1.5,
          borderColor: "rgba(183, 110, 80, 0.75)",
          backgroundColor: "rgba(183, 110, 80, 0.08)",
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: 0.6,
          opacity: 0.9,
          backgroundColor: "#b76e50",
          duration: 0.25,
          ease: "power2.out",
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(interactiveSelector);
      if (target) {
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(58, 75, 65, 0.35)",
          backgroundColor: "rgba(0, 0, 0, 0)",
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: 1,
          opacity: 0.8,
          backgroundColor: "#3a4b41",
          duration: 0.25,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 opacity-0 transition-opacity hidden md:block"
      style={{ willChange: "transform, opacity" }}
    >
      {/* Outer viewfinder ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full border border-forest/35 transition-colors"
        style={{ willChange: "transform" }}
      >
        {/* Subtle camera crosshair ticks */}
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-0.5 w-[1px] bg-forest/40" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-0.5 w-[1px] bg-forest/40" />
        <span className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 h-[1px] w-0.5 bg-forest/40" />
        <span className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 h-[1px] w-0.5 bg-forest/40" />
      </div>

      {/* Inner pinpoint dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-forest/80"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
