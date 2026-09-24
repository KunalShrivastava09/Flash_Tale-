"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ViewfinderUI from "./ViewfinderUI";
import FocusLock from "./FocusLock";
import FlashTransition from "./FlashTransition";
import FlashTaleBrand from "./FlashTaleBrand";
import type { ParticleTaleHandle } from "./ParticleTale";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { formatTimecode } from "@/lib/formatTimecode";

interface CinematicIntroProps {
  /** Called once the intro has fully transitioned away and the overlay
   * has been removed from the DOM. */
  onComplete?: () => void;
}

/**
 * The full-screen opening sequence: camera viewfinder chrome → focus lock
 * → flash → "FLASH" exposure reveal → "TALE" particle formation → credit
 * → hold → FLASH fades as light, TALE disintegrates as story, revealing
 * the Hero that has been mounted behind it the whole time.
 */
export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [visible, setVisible] = useState(true);
  const [showSkip, setShowSkip] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const flashWordRef = useRef<HTMLSpanElement>(null);
  const particleRef = useRef<ParticleTaleHandle>(null);
  const creditRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const reducedMotion = usePrefersReducedMotion();

  const firedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const finish = useCallback(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    document.body.style.overflow = "";
    setVisible(false);
    onCompleteRef.current?.();
  }, []);

  // Timecode ticker — independent of the GSAP timeline, runs the whole
  // time the overlay is mounted.
  useEffect(() => {
    if (!visible) return;
    const root = rootRef.current;
    const timecodeEl = root?.querySelector<HTMLElement>(
      '[data-flash-el="timecode"]'
    );
    if (!timecodeEl) return;

    const start = performance.now();
    let rafId = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const frames = Math.floor((elapsed / 1000) * 24);
      timecodeEl.textContent = formatTimecode(frames, 24);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [visible]);

  // Main sequence.
  useEffect(() => {
    if (!visible) return;
    const root = rootRef.current;
    if (!root) return;

    document.body.style.overflow = "hidden";
    let cancelled = false;
    let blinkTween: gsap.core.Tween | null = null;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ paused: true, onComplete: finish });
      timelineRef.current = tl;

      if (reducedMotion) {
        gsap.set(
          q(
            '[data-flash-el="grid"], [data-flash-el="frame"], [data-flash-el="rec"], [data-flash-el="timecode-wrap"], [data-flash-el="battery"], [data-flash-el="iso"], [data-flash-el="res"]'
          ),
          { opacity: 1 }
        );

        tl.to(q('[data-flash-el="flash-word"]'), {
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
        })
          .to(
            q('[data-flash-el="credit"]'),
            { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" },
            "-=0.1"
          )
          .to({}, { duration: 1.1 })
          .to(root, { opacity: 0, duration: 0.7, ease: "power1.inOut" });
      } else {
        gsap.set(q('[data-flash-el="flash-char"]'), {
          opacity: 0,
          filter: "blur(10px)",
        });
        gsap.set(q('[data-flash-el="credit"]'), { opacity: 0, y: 6 });
        gsap.set(q('[data-flash-el="focus"]'), { opacity: 0, scale: 1.18 });

        tl
          // Phase 1 — camera UI reveals
          .to(
            q('[data-flash-el="grid"], [data-flash-el="frame"]'),
            { opacity: 1, duration: 0.6, ease: "power1.out" },
            0.15
          )
          .to(
            q(
              '[data-flash-el="rec"], [data-flash-el="timecode-wrap"], [data-flash-el="battery"], [data-flash-el="iso"], [data-flash-el="res"]'
            ),
            { opacity: 1, duration: 0.5, ease: "power1.out", stagger: 0.06 },
            0.3
          )
          .addLabel("camReady", 0.9)

          // Phase 2 — focus lock
          .to(
            q('[data-flash-el="focus"]'),
            { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" },
            "camReady"
          )
          .to({}, { duration: 0.22 })
          .to(q('[data-flash-el="focus"]'), {
            opacity: 0,
            duration: 0.3,
            ease: "power1.in",
          })
          .addLabel("preFlash")

          // Phase 3 — flash
          .to(
            q('[data-flash-el="flash-panel"]'),
            { opacity: 1, duration: 0.045, ease: "power1.in" },
            "preFlash"
          )
          .to(
            q('[data-flash-el="flash-panel"]'),
            { opacity: 0, duration: 0.09, ease: "power1.out" },
            "preFlash+=0.045"
          )
          .to(
            q('[data-flash-el="viewfinder"]'),
            { filter: "brightness(1.7)", duration: 0.05, ease: "power1.in" },
            "preFlash"
          )
          .to(
            q('[data-flash-el="viewfinder"]'),
            { filter: "brightness(1)", duration: 0.15, ease: "power1.out" },
            "preFlash+=0.05"
          )
          .to(
            q('[data-flash-el="rec-dot"]'),
            {
              boxShadow: "0 0 10px 3px rgba(226,80,58,0.85)",
              duration: 0.05,
            },
            "preFlash"
          )
          .to(
            q('[data-flash-el="rec-dot"]'),
            { boxShadow: "0 0 0px 0px rgba(226,80,58,0)", duration: 0.2 },
            "preFlash+=0.05"
          )
          .addLabel("flashDone", "preFlash+=0.14")

          // Phase 4 — FLASH exposure reveal
          .set(q('[data-flash-el="flash-word"]'), { opacity: 1 }, "flashDone")
          .to(
            q('[data-flash-el="flash-char"]'),
            {
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.22,
              ease: "power2.out",
              stagger: 0.035,
            },
            "flashDone"
          )
          .addLabel("flashLetters", "flashDone+=0.05")

          // Phase 5 — TALE particle formation: converge, then crossfade to
          // fully solid type (Phase C/D). Runs as its own GSAP timeline,
          // mirrored here with a matching-duration placeholder so later
          // phases stay in sync.
          .call(
            () => {
              particleRef.current?.formIn(0.85);
            },
            undefined,
            "flashLetters"
          )
          .to({}, { duration: 1.05 }, "flashLetters")
          .addLabel("taleDone")

          // Phase 6 — credit
          .to(
            q('[data-flash-el="credit"]'),
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "taleDone-=0.15"
          )

          // Phase 7 — hold
          .to({}, { duration: 1.5 })
          .addLabel("exitStart")

          // Phase 8 — FLASH fades as light, TALE disintegrates as story
          .to(
            q('[data-flash-el="flash-word"]'),
            { opacity: 0.7, filter: "blur(1px)", duration: 0.16, ease: "power1.in" },
            "exitStart"
          )
          .to(q('[data-flash-el="flash-word"]'), {
            opacity: 0.3,
            filter: "blur(2.5px)",
            duration: 0.16,
            ease: "power1.in",
          })
          .to(q('[data-flash-el="flash-word"]'), {
            opacity: 0,
            filter: "blur(5px)",
            duration: 0.22,
            ease: "power1.in",
          })
          .call(
            () => {
              particleRef.current?.disintegrate(0.9);
            },
            undefined,
            "exitStart"
          )
          .to(
            q('[data-flash-el="credit"]'),
            { opacity: 0, duration: 0.4, ease: "power1.in" },
            "exitStart"
          )
          .to(
            q('[data-flash-el="viewfinder"]'),
            { opacity: 0, duration: 0.5, ease: "power1.in" },
            "exitStart+=0.2"
          )
          .to(root, { opacity: 0, duration: 0.65, ease: "power1.inOut" }, "exitStart+=0.45");

        blinkTween = gsap.to(q('[data-flash-el="rec-dot"]'), {
          opacity: 0.3,
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.1,
        });
      }
    }, root);

    async function start() {
      if (typeof document !== "undefined" && "fonts" in document) {
        try {
          await document.fonts.ready;
        } catch {
          /* proceed regardless — worst case the particle silhouette uses
           * a fallback font metric for one frame */
        }
      }
      if (cancelled) return;
      if (!reducedMotion) particleRef.current?.prepare();
      timelineRef.current?.play();
    }

    start();
    const skipTimer = window.setTimeout(() => setShowSkip(true), 900);

    return () => {
      cancelled = true;
      window.clearTimeout(skipTimer);
      blinkTween?.kill();
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [visible, reducedMotion, finish]);

  const handleSkip = () => {
    const root = rootRef.current;
    timelineRef.current?.kill();
    if (root) {
      gsap.to(root, {
        opacity: 0,
        duration: 0.4,
        ease: "power1.inOut",
        onComplete: finish,
      });
    } else {
      finish();
    }
  };

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-50 overflow-hidden bg-forest-dark"
      role="presentation"
    >
      <ViewfinderUI reducedMotion={reducedMotion} />
      <FocusLock />
      <FlashTransition />
      <FlashTaleBrand
        flashWordRef={flashWordRef}
        particleRef={particleRef}
        creditRef={creditRef}
        reducedMotion={reducedMotion}
      />

      {showSkip && (
        <button
          type="button"
          onClick={handleSkip}
          className="absolute bottom-4 right-4 font-body text-[10px] uppercase tracking-[0.25em] text-cream-dim/80 transition-colors hover:text-cream sm:bottom-8 sm:right-8"
        >
          Skip intro
        </button>
      )}
    </div>
  );
}

