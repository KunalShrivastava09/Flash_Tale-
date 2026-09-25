export interface ProjectGalleryItem {
  src?: string;
  alt: string;
  caption?: string;
  layout?: "wide" | "landscape" | "portrait" | "full";
}

export interface ProjectHero {
  type: "video" | "youtube" | "image";
  video?: string;
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
  aspectRatio?: "cinema" | "video" | "wide" | "portrait";
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "01",
    slug: "gram",
    title: "GRAM",
    category: "BRAND FILM / CINEMATOGRAPHY",
    year: "2026",
    aspectRatio: "cinema",
    featured: true,
    hero: {
      type: "video",
      video: "/media/projects/gram/gram-brand-film.mp4",
      alt: "GRAM brand film",
    },
  },
  {
    id: "02",
    slug: "portrait-study",
    title: "PORTRAIT STUDY",
    category: "PHOTOGRAPHY",
    year: "2026",
    aspectRatio: "portrait",
    thumbnail: "/media/projects/project-02/portrait-study-01.jpg",
    hero: {
      type: "image",
      alt: "Editorial portrait photography",
    },
    gallery: [
      {
        src: "/media/projects/project-02/portrait-study-01.jpg",
        alt: "Editorial portrait photography",
        caption: "PORTRAIT STUDY",
        layout: "portrait",
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
