"use client";

import { useState } from "react";
import CinematicIntro from "@/components/intro/CinematicIntro";
import Nav from "@/components/navigation/Nav";
import Hero from "@/components/hero/Hero";
import BigStatement from "@/components/statement/BigStatement";
import About from "@/components/about/About";
import Clients from "@/components/clients/Clients";
import SelectedWork from "@/components/selected-work/SelectedWork";
import Services from "@/components/services/Services";
import Contact from "@/components/contact/Contact";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <main>
      {/* Hero and Nav are mounted immediately behind the intro; both only
       * play their reveal once the intro reports completion. */}
      <Nav revealed={introDone} />
      <Hero revealed={introDone} />
      <BigStatement />
      <About />
      <Clients />
      <SelectedWork />
      <Services />
      <Contact />
      <CinematicIntro onComplete={() => setIntroDone(true)} />
    </main>
  );
}

