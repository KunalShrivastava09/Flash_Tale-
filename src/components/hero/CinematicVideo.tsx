import type { MediaSource } from "@/data/media";

interface CinematicVideoProps {
  sources: MediaSource[];
  mobileSources?: MediaSource[];
  poster?: string;
  className?: string;
}

/**
 * Full-screen autoplaying background video container. Always a real
 * <video> — no decorative fallback — so it stays an honest, ready-to-fill
 * container: point `sources` at real footage (e.g. /media/hero.mp4) in
 * src/data/media.ts and nothing else changes. Until then it just shows
 * `poster`, or the void background if that's missing too.
 */
export default function CinematicVideo({
  sources,
  mobileSources,
  poster,
  className = "",
}: CinematicVideoProps) {
  return (
    <video
      className={`${className} bg-void`}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      aria-hidden="true"
    >
      {mobileSources?.map((source) => (
        <source
          key={source.src}
          src={source.src}
          type={source.type}
          media="(max-width: 640px)"
        />
      ))}
      {sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
}
