import React from "react";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { AboutCTA } from "@/components/sections/AboutCTA";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { ContactMap } from "@/components/sections/ContactMap";
import { Metadata } from "next";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Stats />
      <Services />
      <AboutCTA />
      
      {/* Insurances banner */}
      <section className="py-12 bg-white dark:bg-slate-950 border-y border-border overflow-hidden">
        <div className="container mx-auto px-4">
          <p className="text-center font-semibold text-neutral-500 uppercase tracking-widest text-sm mb-8">
            Seguros Médicos Aceptados
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {/* Simulated Insurance Logos (text for fallback) */}
            {["Humano", "Universal", "Senasa", "Mapfre BHD", "Banreservas"].map(insurer => (
              <div key={insurer} className="text-2xl font-bold font-accent text-neutral-400">
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
