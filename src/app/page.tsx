import React from "react";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { AboutCTA } from "@/components/sections/AboutCTA";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { ContactMap } from "@/components/sections/ContactMap";
import { INSURANCES } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Stats />
      <Services />
      <AboutCTA />

      {/* ── Insurances banner ── */}
      <section
        className="py-14 bg-[var(--background)] border-y border-[var(--border)] overflow-hidden"
        aria-label="Seguros médicos aceptados"
      >
        <div className="container mx-auto px-4">
          <p className="text-center font-medium text-[var(--neutral-400)] uppercase tracking-[0.2em] text-xs mb-10">
            Seguros Médicos Aceptados
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {INSURANCES.map((insurer) => (
              <div
                key={insurer}
                className="text-xl md:text-2xl font-bold font-accent text-[var(--neutral-400)] select-none"
              >
                {insurer}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <FAQ />
      <ContactMap />
    </div>
  );
}
