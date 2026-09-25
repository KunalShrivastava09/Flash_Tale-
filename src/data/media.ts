export interface MediaSource {
  src: string;
  type: string;
}

export interface HeroMediaConfig {
  poster: string;
  /** Preferred-format sources, in order. */
  sources: MediaSource[];
  /** Optional alternate crop for small viewports. */
  mobileSources?: MediaSource[];
}

// PLACEHOLDER — points at a file that doesn't exist yet. Drop the real
// Flash Tale showreel/brand-film clip at /public/media/hero.mp4 (and a
// poster frame at /public/media/hero-poster.jpg) and it plays — nothing
// else needs to change. Until then CinematicVideo just shows the poster
// (or the void background if that's missing too) — no decorative filler.
export const heroMedia: HeroMediaConfig = {
  poster: "",
  sources: [{ src: "/media/projects/gram/gram-brand-film.mp4", type: "video/mp4" }],
  mobileSources: [],
};

export interface PlaceholderMediaConfig {
  type: "image" | "video";
  /** PLACEHOLDER — undefined until real photography/footage exists.
   * MediaPlaceholder renders a plain neutral panel while this is unset. */
  src?: string;
  poster?: string;
}

// The About section's media. Same swap-in-later pattern as heroMedia, but
// this slot can be either a still image or a video.
export const aboutMedia: PlaceholderMediaConfig = {
  type: "video",
  src: undefined,
  poster: undefined,
};
