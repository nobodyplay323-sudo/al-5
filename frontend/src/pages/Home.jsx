import React from "react";
import { Hero } from "@/components/Hero";
import { EditorialMarquee } from "@/components/EditorialMarquee";
import { FeaturedGrid } from "@/components/FeaturedGrid";
import { Manifesto } from "@/components/Manifesto";
import { Rubrici } from "@/components/Rubrici";
import { Newsletter } from "@/components/Newsletter";

export default function Home() {
  return (
    <main data-testid="home-page">
      <Hero />
      <EditorialMarquee />
      <FeaturedGrid />
      <Manifesto />
      <Rubrici />
      <Newsletter />
    </main>
  );
}
