import React from "react";
import type { Metadata } from "next";
import { ContactMap } from "@/components/sections/ContactMap";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos o visítanos en Centro Oftalmológico Visión Plena. Ubicados en Av. Abraham Lincoln, Santo Domingo. Teléfono, WhatsApp y correo disponibles.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto | Visión Plena",
    description:
      "Agenda tu cita o visítanos. Estamos en Santo Domingo, República Dominicana.",
    images: ["/og-image.jpg"],
  },
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

