"use client";

import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  type CSSProperties,
} from "react";
import gsap from "gsap";

export interface ParticleTaleHandle {
  /** Samples the current text layout into particle targets. Call once the
   * display font is confirmed loaded and the element has its final size. */
  prepare: () => void;
  /** Converges scattered particles into the letterforms, then crossfades
   * to a fully solid rendering of the word (Phase C/D — no permanent
   * particle gaps once settled). */
  formIn: (duration?: number) => gsap.core.Timeline;
  /** Crossfades back to the particle field at its fully-formed resting
   * positions, holds the recognizable shape briefly, then disperses it. */
  disintegrate: (duration?: number) => gsap.core.Timeline;
}

interface Particle {
  tx: number;
  ty: number; // resting position (the letterform)
  sx: number;
  sy: number; // scattered starting position (formIn origin)
  ox: number;
  oy: number; // dispersed position (disintegrate destination)
  x: number;
  y: number; // current drawn position
  size: number;
  color: string;
  delay: number; // 0..1 per-particle stagger offset
}

interface ParticleTaleProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

// Sophisticated terracotta → soft olive treatment, interpolated across
// the word rather than a single flat gradient sweep.
const TERRACOTTA: [number, number, number] = [183, 110, 80];
const OLIVE: [number, number, number] = [132, 145, 119];

function colorForRatio(ratio: number): string {
  const r = Math.round(TERRACOTTA[0] + (OLIVE[0] - TERRACOTTA[0]) * ratio);
  const g = Math.round(TERRACOTTA[1] + (OLIVE[1] - TERRACOTTA[1]) * ratio);
  const b = Math.round(TERRACOTTA[2] + (OLIVE[2] - TERRACOTTA[2]) * ratio);
  return `rgb(${r}, ${g}, ${b})`;
}

const ParticleTale = forwardRef<ParticleTaleHandle, ParticleTaleProps>(
  function ParticleTale({ text, className, style }, ref) {
    const measureRef = useRef<HTMLSpanElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const solidRef = useRef<HTMLSpanElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const dimsRef = useRef({ w: 0, h: 0, dpr: 1 });
    const inEase = useRef(gsap.parseEase("power3.out"));
    const outEase = useRef(gsap.parseEase("power2.in"));

    const prepare = useCallback(() => {
      const canvas = canvasRef.current;
      const measureEl = measureRef.current;
      if (!canvas || !measureEl) return;

      const rect = measureEl.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dimsRef.current = { w, h, dpr };

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const style = getComputedStyle(measureEl);

      const sampleCanvas = document.createElement("canvas");
      sampleCanvas.width = w;
      sampleCanvas.height = h;
      const sctx = sampleCanvas.getContext("2d", { willReadFrequently: true });
      if (!sctx) return;

      sctx.clearRect(0, 0, w, h);
      sctx.fillStyle = "#fff";
      sctx.textBaseline = "alphabetic";
      sctx.textAlign = "left";
      sctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      // Condensed uppercase display faces sit with their baseline roughly
      // 78% down the line box — close enough for a particle silhouette.
      sctx.fillText(text, 0, h * 0.78);

      const { data } = sctx.getImageData(0, 0, w, h);
      // Denser sampling than a purely decorative particle effect needs —
      // TALE has to read as solid, equal-weight typography once formed,
      // not a sparse cloud, even in the brief particle-only moment before
      // the crossfade to real type.
      const stride = Math.max(1.5, Math.round(Math.min(w, h) / 60));
      const candidates: Particle[] = [];

      for (let y = 0; y < h; y += stride) {
        for (let x = 0; x < w; x += stride) {
          const alpha = data[(y * w + x) * 4 + 3];
          if (alpha <= 128) continue;

          const tx = x + (Math.random() - 0.5) * stride * 0.6;
          const ty = y + (Math.random() - 0.5) * stride * 0.6;

          const scatterAngle = Math.random() * Math.PI * 2;
          const scatterRadius = Math.max(w, h) * (0.55 + Math.random() * 0.45);
          const sx = w / 2 + Math.cos(scatterAngle) * scatterRadius;
          const sy = h / 2 + Math.sin(scatterAngle) * scatterRadius * 0.6;

          // Disperse mostly upward and slightly outward — dust, not fireworks.
          const outAngle = -Math.PI / 2 + (Math.random() - 0.5) * (Math.PI * 0.8);
          const outDist = 36 + Math.random() * 84;

          candidates.push({
            tx,
            ty,
            sx,
            sy,
            x: sx,
            y: sy,
            ox: tx + Math.cos(outAngle) * outDist,
            oy: ty + Math.sin(outAngle) * outDist,
            size: 1 + Math.random() * 1.5,
            color: colorForRatio(x / w),
            delay: Math.random() * 0.55,
          });
        }
      }

      // Keep the particle count reasonably low for performance.
      const cap = 620;
      particlesRef.current =
        candidates.length > cap
          ? candidates.filter(
              (_, i) => i % Math.ceil(candidates.length / cap) === 0
            )
          : candidates;
    }, [text]);

    const draw = useCallback((mode: "in" | "out", progress: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { w, h, dpr } = dimsRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      for (const p of particlesRef.current) {
        const span = 1 - p.delay * (mode === "in" ? 0.4 : 0.3);
        const local = gsap.utils.clamp(
          0,
          1,
          (progress - p.delay * (mode === "in" ? 0.4 : 0.3)) / span
        );

        let alpha: number;
        if (mode === "in") {
          const eased = inEase.current(local);
          p.x = p.sx + (p.tx - p.sx) * eased;
          p.y = p.sy + (p.ty - p.sy) * eased;
          alpha = gsap.utils.clamp(0, 1, eased * 1.15);
        } else {
          const eased = outEase.current(local);
          p.x = p.tx + (p.ox - p.tx) * eased;
          p.y = p.ty + (p.oy - p.ty) * eased;
          alpha = gsap.utils.clamp(0, 1, 1 - eased);
        }

        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }, []);

    const formIn = useCallback(
      (duration = 0.85) => {
        if (particlesRef.current.length === 0) prepare();
        const proxy = { p: 0 };
        const tl = gsap.timeline();

        tl.set(solidRef.current, { opacity: 0 })
          .set(canvasRef.current, { opacity: 1 })
          // Phase A/B — particles scatter in and converge on the letterforms.
          .to(proxy, {
            p: 1,
            duration,
            ease: "none",
            onUpdate: () => draw("in", proxy.p),
          })
          // Phase C/D — crossfade to real, fully solid type so the settled
          // word has no particle gaps and matches FLASH's weight exactly.
          .to(
            canvasRef.current,
            { opacity: 0, duration: 0.22, ease: "power1.out" },
            "-=0.05"
          )
          .to(
            solidRef.current,
            { opacity: 1, duration: 0.22, ease: "power1.out" },
            "<"
          );

        return tl;
      },
      [draw, prepare]
    );

    const disintegrate = useCallback(
      (duration = 0.9) => {
        const proxy = { p: 0 };
        const tl = gsap.timeline();

        tl
          // Start from the full, readable word: redraw the canvas at its
          // fully-formed resting positions before swapping back to it, so
          // the disintegration begins from the solid shape, not a sparse one.
          .call(() => draw("in", 1))
          .to(canvasRef.current, { opacity: 1, duration: 0.15, ease: "power1.out" }, 0)
          .to(solidRef.current, { opacity: 0, duration: 0.15, ease: "power1.out" }, 0)
          .to(proxy, {
            p: 1,
            duration,
            ease: "none",
            onUpdate: () => draw("out", proxy.p),
            onComplete: () => {
              const canvas = canvasRef.current;
              const ctx = canvas?.getContext("2d");
              const { w, h } = dimsRef.current;
              ctx?.clearRect(0, 0, w, h);
            },
          });

        return tl;
      },
      [draw]
    );

    useImperativeHandle(ref, () => ({ prepare, formIn, disintegrate }), [
      prepare,
      formIn,
      disintegrate,
    ]);

    return (
      <span
        className={className}
        style={{ position: "relative", display: "inline-block", ...style }}
      >
        <span ref={measureRef} style={{ visibility: "hidden" }} aria-hidden="true">
          {text}
        </span>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        />
        <span
          ref={solidRef}
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-terracotta to-olive-light bg-clip-text text-transparent"
          style={{ opacity: 0 }}
        >
          {text}
        </span>
      </span>
    );
  }
);

export default ParticleTale;
