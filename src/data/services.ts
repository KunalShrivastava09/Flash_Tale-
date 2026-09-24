export interface Service {
  number: string;
  title: string;
  description: string;
  capabilities: string[];
}

export const services: Service[] = [
  {
    number: "01",
    title: "FILM & VIDEO",
    description:
      "Full-spectrum cinematic production from concept development and on-location shooting to final master delivery.",
    capabilities: [
      "Brand Films",
      "Commercials",
      "Campaign Films",
      "Production",
      "Cinematography",
    ],
  },
  {
    number: "02",
    title: "PHOTOGRAPHY",
    description:
      "Tactile, high-contrast imagery captured across commercial studio environments, natural daylight, and location sets.",
    capabilities: [
      "Campaign",
      "Editorial",
      "Product",
      "Events",
      "Portraits",
    ],
  },
  {
    number: "03",
    title: "CREATIVE DIRECTION",
    description:
      "Comprehensive visual systems, artistic alignment, and narrative strategy built to define memorable brand identities.",
    capabilities: [
      "Concept Development",
      "Visual Direction",
      "Art Direction",
      "Campaign Storytelling",
    ],
  },
  {
    number: "04",
    title: "POST PRODUCTION",
    description:
      "Precision editorial assembly, analog-inspired color science, motion design, and high-fidelity sound finishing.",
    capabilities: [
      "Editing",
      "Color Grading",
      "Motion Design",
      "Finishing",
    ],
  },
];
