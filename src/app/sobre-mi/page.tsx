import React from "react";
import { AboutCTA } from "@/components/sections/AboutCTA";

export const metadata = {
  title: "Sobre Mí | Dra. Valentina Reyes Oftalmóloga",
  description: "Conoce más sobre la trayectoria y experiencia de la Dra. Valentina Reyes M.",
};

export default function SobreMiPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="bg-primary-light/50 dark:bg-slate-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Sobre Mí</h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">Conoce mi trayectoria y compromiso con tu salud visual.</p>
        </div>
      </div>
      {/* We reuse AboutCTA just to layout essentially the same content for simplicity, 
      in a true production site this would be fully expanded with CV/certifications array. */}
      <AboutCTA />
    </div>
  );
}

