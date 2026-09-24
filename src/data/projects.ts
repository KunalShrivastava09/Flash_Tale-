export interface ProjectGalleryItem {
  src?: string;
  alt: string;
  caption?: string;
  layout?: "wide" | "landscape" | "portrait" | "full";
}

export interface ProjectHero {
  type: "youtube" | "image";
  youtubeUrl?: string;
  poster?: string;
  image?: string;
  alt?: string;
}

export interface ProjectCredits {
  director?: string;
  cinematography?: string;
  client?: string;
  production?: string;
  colorGrade?: string;
  aspectRatio?: string;
  year?: string;
  [key: string]: string | undefined;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  client?: string;
  thumbnail?: string;

  hero: ProjectHero;

  description?: string;
  credits?: ProjectCredits;
  gallery?: ProjectGalleryItem[];
  aspectRatio?: "cinema" | "video" | "wide";
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "01",
    slug: "silent-horizon",
    title: "SILENT HORIZON",
    category: "BRAND FILM / CINEMATOGRAPHY",
    year: "2026",
    aspectRatio: "cinema",
    featured: true,
    hero: {
      type: "youtube",
      youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
      poster: "/media/projects/silent-horizon-hero.jpg",
      alt: "Silent Horizon — Brand Film Opening Frame",
    },
    description:
      "An atmospheric exploration of vast coastal horizons, documenting the intersection of natural silence, architectural stillness, and high-contrast light.",
    credits: {
      director: "DEV YADAV",
      cinematography: "FLASH TALE STUDIO",
      colorGrade: "KODAK 5219 EMULATION",
      aspectRatio: "2.39:1 ANAMORPHIC",
      year: "2026",
    },
    gallery: [
      {
        alt: "Silent Horizon — Coastal mist and natural ridge lines",
        caption: "DAWN RIDGE STUDY",
        layout: "wide",
      },
      {
        alt: "Silent Horizon — Architectural concrete structure in fog",
        caption: "MONOLITHIC ELEVATION",
        layout: "portrait",
      },
      {
        alt: "Silent Horizon — Horizon gradient over calm water",
        caption: "EXTENDED TWILIGHT SEQUENCE",
        layout: "landscape",
      },
      {
        alt: "Silent Horizon — Full panoramic coastal ridge",
        caption: "ULTRA-WIDE ANAMORPHIC HORIZON",
        layout: "full",
      },
    ],
  },
  {
    id: "02",
    slug: "chronicle-of-light",
    title: "CHRONICLE OF LIGHT",
    category: "COMMERCIAL / CREATIVE DIRECTION",
    year: "2025",
    aspectRatio: "video",
    hero: {
      type: "image",
      image: "/media/projects/chronicle-hero.jpg",
      alt: "Chronicle of Light — Sculptural Studio Key Visual",
    },
    description:
      "A cinematic visual study of daylight transitions and sculptural form, crafted for an editorial high-fashion and spatial design campaign.",
    credits: {
      director: "DEV YADAV",
      production: "STUDIO ARCHIVE",
      colorGrade: "NATURAL LIGHT CONTRAST",
      aspectRatio: "16:9 CINEMA",
      year: "2025",
    },
    gallery: [
      {
        alt: "Chronicle of Light — Geometric shadow cast across studio walls",
        caption: "SOLAR SHADOW TRANSITIONS",
        layout: "landscape",
      },
      {
        alt: "Chronicle of Light — Editorial portrait under directional beam",
        caption: "HIGH KEY SCULPTURAL STUDY",
        layout: "portrait",
      },
      {
        alt: "Chronicle of Light — Wide studio architectural composition",
        caption: "FULL SPATIAL PERSPECTIVE",
        layout: "wide",
      },
    ],
  },
  {
    id: "03",
    slug: "ember-and-ash",
    title: "EMBER & ASH",
    category: "CAMPAIGN / EDITORIAL PHOTOGRAPHY",
    year: "2026",
    aspectRatio: "video",
    hero: {
      type: "youtube",
      youtubeUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
      poster: "/media/projects/ember-hero.jpg",
      alt: "Ember & Ash — Campaign Opening Still",
    },
    description:
      "A high-contrast cinematic portrait series captured during twilight, exploring raw tactile textures, ambient warmth, and fleeting moments of stillness.",
    credits: {
      director: "DEV YADAV",
      cinematography: "35MM / MEDIUM FORMAT",
      production: "FLASH TALE CREATIVE",
      year: "2026",
    },
    gallery: [
      {
        alt: "Ember & Ash — Close crop textural study of smoke and skin",
        caption: "TEXTURE & LIGHT",
        layout: "portrait",
      },
      {
        alt: "Ember & Ash — Wide dusk landscape with ember illumination",
        caption: "TWILIGHT PANORAMA",
        layout: "wide",
      },
      {
        alt: "Ember & Ash — Cinematic motion blur capture",
        caption: "FLEETING MOVEMENT",
        layout: "landscape",
      },
    ],
  },
  {
    id: "04",
    slug: "monolith-sessions",
    title: "MONOLITH SESSIONS",
    category: "DOCUMENTARY / SOUND DESIGN",
    year: "2025",
    aspectRatio: "wide",
    featured: true,
    hero: {
      type: "image",
      image: "/media/projects/monolith-hero.jpg",
      alt: "Monolith Sessions — Brutalist Space Documentation",
    },
    description:
      "An intimate short-form documentary tracking brutalist acoustic spaces and sonic resonance, balancing heavy concrete architecture with delicate audio design.",
    credits: {
      director: "DEV YADAV",
      cinematography: "DIGITAL 4K + 16MM",
      production: "RESONANCE LABS",
      year: "2025",
    },
    gallery: [
      {
        alt: "Monolith Sessions — Brutalist acoustic chamber interior",
        caption: "SONIC REFLECTION ROOM",
        layout: "full",
      },
      {
        alt: "Monolith Sessions — Sound engineer adjusting analog equipment",
        caption: "ANALOG CAPTURE",
        layout: "landscape",
      },
      {
        alt: "Monolith Sessions — Concrete texture detail",
        caption: "MATERIAL RESONANCE",
        layout: "portrait",
      },
    ],
  },
  {
    id: "05",
    slug: "nocturne-velocity",
    title: "NOCTURNE VELOCITY",
    category: "AUTOMOTIVE / VISUAL STORYTELLING",
    year: "2026",
    aspectRatio: "video",
    hero: {
      type: "youtube",
      youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
      poster: "/media/projects/nocturne-hero.jpg",
      alt: "Nocturne Velocity — High Speed Tracking Shot",
    },
    description:
      "Night-time motion sequences captured across illuminated urban infrastructure, pairing high-speed tracking vehicles with precision anamorphic color grading.",
    credits: {
      director: "DEV YADAV",
      cinematography: "FLASH TALE MOTO UNIT",
      colorGrade: "EMBER POST",
      aspectRatio: "2.39:1 SCOPE",
      year: "2026",
    },
    gallery: [
      {
        alt: "Nocturne Velocity — Light trails along highway overpass",
        caption: "KINETIC ILLUMINATION",
        layout: "landscape",
      },
      {
        alt: "Nocturne Velocity — Low angle vehicular silhouette",
        caption: "AERODYNAMIC PROFILE",
        layout: "portrait",
      },
      {
        alt: "Nocturne Velocity — Cinematic rain reflections on tarmac",
        caption: "RAIN CIRCUIT SEQUENCE",
        layout: "wide",
      },
    ],
  },
];
