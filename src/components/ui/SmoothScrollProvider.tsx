"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LenisContextValue {
  getLenis: () => Lenis | null;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: { offset?: number; duration?: number }
  ) => void;
}

const LenisContext = createContext<LenisContextValue | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Wraps the app in Lenis smooth scrolling and keeps it in lockstep with
 * GSAP's ticker so ScrollTrigger-driven animations stay in sync with the
 * smoothed scroll position. Respects prefers-reduced-motion by skipping
 * the smoothing layer entirely (native scroll still works).
 *
 * Also intercepts internal hash links to provide butter-smooth camera
 * pan navigation rather than sudden browser jumps.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  const scrollTo = useCallback(
    (
      target: string | number | HTMLElement,
      options?: { offset?: number; duration?: number }
    ) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {
          offset: options?.offset ?? -70,
          duration: options?.duration ?? 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else if (typeof target === "string") {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  const getLenis = useCallback(() => lenisRef.current, []);

  const contextValue = useMemo(
    () => ({
      getLenis,
      scrollTo,
    }),
    [getLenis, scrollTo]
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Global anchor interception for smooth internal section navigation
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Top of page navigation
      if (href === "#" || href === "/#") {
        e.preventDefault();
        lenis.scrollTo(0, {
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        window.history.pushState(null, "", window.location.pathname);
        return;
      }

      // Hash navigation on current page
      if (href.startsWith("#") || (href.startsWith("/#") && window.location.pathname === "/")) {
        const hash = href.startsWith("/#") ? href.slice(1) : href;
        const targetElement = document.querySelector(hash);

        if (targetElement) {
          e.preventDefault();
          window.history.pushState(null, "", hash);
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -70,
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Handle initial hash on page load
    if (window.location.hash) {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        // Small delay to allow layout and intro to settle
        const timeoutId = setTimeout(() => {
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -70,
            duration: 1.2,
          });
        }, 200);
        return () => clearTimeout(timeoutId);
      }
    }

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  );
}
