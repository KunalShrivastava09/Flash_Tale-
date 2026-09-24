import type { PlaceholderMediaConfig } from "@/data/media";

interface MediaPlaceholderProps extends PlaceholderMediaConfig {
  alt?: string;
  className?: string;
}

/**
 * A media slot ready for either an image or a video, with a plain dark
 * neutral panel (no color, no gradient) while `src` is unset — honest
 * placeholder, not decoration.
 */
export default function MediaPlaceholder({
  type,
  src,
  poster,
  alt = "",
  className = "",
}: MediaPlaceholderProps) {
  if (!src) {
    return <div className={`${className} bg-forest-dark`} aria-hidden="true" />;
  }

  if (type === "image") {
    // eslint-disable-next-line @next/next/no-img-element -- placeholder-ready slot, not yet a real optimized asset
    return <img src={src} alt={alt} className={`${className} object-cover`} />;
  }

  return (
    <video
      className={`${className} object-cover`}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      aria-hidden="true"
    >
      <source src={src} />
    </video>
  );
}
