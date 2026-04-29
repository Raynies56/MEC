import React from "react";
import type { Metadata } from "next";
import { Services } from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "Servicios Oftalmológicos",
  description:
    "Tratamientos y servicios oftalmológicos: consultas generales, cataratas, glaucoma, examen visual, lentes y urgencias oculares. Tecnología de vanguardia en Santo Domingo.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios Oftalmológicos | Visión Plena",
    description:
      "Diagnóstico y tratamiento integral para cataratas, glaucoma, miopía y más.",
    images: ["/og-image.jpg"],
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="bg-primary-light/50 dark:bg-slate-900 py-16 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Nuestros Servicios</h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
            Ofrecemos un diagnóstico certero para asegurar el mejor tratamiento posible 
            para tus ojos con la última tecnología disponible.
          </p>
        </div>
      </div>
      <Services />
    </div>
  );
}

