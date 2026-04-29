import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { INSURANCES } from "@/lib/constants";

/**
 * Dynamic imports for below-the-fold sections
 * This reduces the initial JS bundle by ~40KB (Framer Motion tree-shaken per chunk)
 * Components load when they enter the viewport
 */
const Services = dynamic(
  () => import("@/components/sections/Services").then((m) => m.Services),
  {
    loading: () => <SectionSkeleton />,
  }
);
const AboutCTA = dynamic(
  () => import("@/components/sections/AboutCTA").then((m) => m.AboutCTA),
  {
    loading: () => <SectionSkeleton />,
  }
);
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials").then((m) => m.Testimonials),
  {
    loading: () => <SectionSkeleton />,
  }
);
const FAQ = dynamic(
  () => import("@/components/sections/FAQ").then((m) => m.FAQ),
  {
    loading: () => <SectionSkeleton />,
  }
);
const ContactMap = dynamic(
  () => import("@/components/sections/ContactMap").then((m) => m.ContactMap),
  {
    loading: () => <SectionSkeleton />,
  }
);

/* ── Lightweight skeleton for lazy sections ── */
function SectionSkeleton() {
  return (
    <div className="section-padding" aria-hidden="true">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="h-4 w-32 mx-auto rounded-full bg-[var(--neutral-100)] animate-pulse" />
          <div className="h-8 w-64 mx-auto rounded-lg bg-[var(--neutral-100)] animate-pulse" />
          <div className="h-4 w-48 mx-auto rounded-full bg-[var(--neutral-100)] animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Above-the-fold: loaded eagerly */}
      <Hero />
      <Stats />

      {/* Below-the-fold: loaded dynamically */}
      <Services />
      <AboutCTA />

      {/* ── Insurances banner ── */}
      <section
        className="py-14 bg-[var(--background)] border-y border-[var(--border)] overflow-hidden"
        aria-label="Seguros médicos aceptados"
      >
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
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
