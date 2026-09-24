export interface SocialLink {
  label: string;
  href: string;
}

export interface ContactData {
  email: string;
  phone?: string;
  location?: string;
  availability?: string;
  socials?: SocialLink[];
}

export const contactData: ContactData = {
  email: "hello@flashtale.studio",
  location: "Worldwide / Remote & On-Location",
  availability: "Currently Booking Q3 / Q4 Productions",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
};
