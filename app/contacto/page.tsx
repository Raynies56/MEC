import React from "react";
import { ContactMap } from "@/components/sections/ContactMap";
import { FAQ } from "@/components/sections/FAQ";

export const metadata = {
  title: "Contacto | Dra. Valentina Reyes Oftalmóloga",
  description: "Contáctanos o visítanos en Centro Oftalmológico Visión Plena en Santo Domingo.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="bg-primary-light/50 dark:bg-slate-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contacto</h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">Estamos aquí para ayudarte. Escríbenos o llámanos para resolver tus dudas.</p>
        </div>
      </div>
      <ContactMap />
      <FAQ />
    </div>
  );
}
