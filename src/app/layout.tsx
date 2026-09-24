import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Instrument_Sans } from "next/font/google";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import AmbientBackground from "@/components/ui/AmbientBackground";
import CinematicCursor from "@/components/ui/CinematicCursor";
import "./globals.css";

// Condensed, high-impact display face for large editorial statements —
// stands in for the "camera flash" boldness in the brand idea.
const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  display: "swap",
});

// Clean, modern grotesk for navigation, UI labels, and body copy.
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flash Tale — Creative Production by Dev Yadav",
  description:
    "Flash Tale is a creative production studio working across brand shoots, films, photography, campaigns, and commercial content.",
};

export const viewport: Viewport = {
  themeColor: "#e6cfa7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bigShoulders.variable} ${instrumentSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink antialiased relative">
        <AmbientBackground />
        <SmoothScrollProvider>
          <div className="relative z-10 flex flex-col min-h-full">
            {children}
          </div>
        </SmoothScrollProvider>
        <CinematicCursor />
      </body>
    </html>
  );
}
