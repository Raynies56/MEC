"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Carlos M.",
    service: "Cirugía de Cataratas",
    text: "La Dra. Valentina me devolvió la vista y la calidad de vida. La cirugía de cataratas fue rápida, sin dolor y el trato en consulta inmejorable. Un equipo muy profesional.",
  },
  {
    name: "Laura G.",
    service: "Tratamiento de Glaucoma",
    text: "Llevaba años buscando un diagnóstico certero para mi dolor ocular. La doctora detectó el problema a tiempo y su seguimiento ha sido constante y cercano.",
  },
  {
    name: "Miguel R.",
    service: "Examen Visual de Rutina",
    text: "Excelente profesional. El examen visual es detallado y se toma el tiempo de explicarte qué está viendo en cada estudio. La recomiendo a toda mi familia.",
  },
  {
    name: "Ana P.",
    service: "Oftalmología Pediátrica",
    text: "Trató a mi hijo de 6 años con muchísimo cariño y paciencia. Logró que estuviera tranquilo en la consulta. Es fantástica con los niños.",
  }
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent(c => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Lo Que Dicen Nuestros Pacientes</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Controls */}
          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 p-3 rounded-full bg-white shadow-lg border border-border text-neutral-600 hover:text-primary transition-colors dark:bg-slate-800 dark:border-slate-700">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 p-3 rounded-full bg-white shadow-lg border border-border text-neutral-600 hover:text-primary transition-colors dark:bg-slate-800 dark:border-slate-700">
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="relative bg-primary-light/50 dark:bg-slate-900 rounded-[2rem] p-8 md:p-16">
            <Quote className="absolute top-8 left-8 h-12 w-12 text-primary/20 rotate-180" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center relative z-10"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl italic font-medium text-neutral-800 dark:text-neutral-200 mb-8 leading-relaxed">
                  "{TESTIMONIALS[current].text}"
                </p>
                <div>
                  <h4 className="font-bold text-lg">{TESTIMONIALS[current].name}</h4>
                  <p className="text-primary text-sm font-medium">{TESTIMONIALS[current].service}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center gap-2 mt-8">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    current === i ? "bg-primary w-8" : "bg-primary/30"
                  }`}
                  aria-label={`Ver testimonio ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

