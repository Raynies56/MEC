"use client";

import React, { useState, useCallback, useRef } from "react";
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
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = useCallback((newIndex: number) => {
    setDirection(newIndex > current ? 1 : -1);
    setCurrent(newIndex);
  }, [current]);

  const prev = () => navigate(current === 0 ? TESTIMONIALS.length - 1 : current - 1);
  const next = () => navigate(current === TESTIMONIALS.length - 1 ? 0 : current + 1);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  /* ── Keyboard navigation (WCAG 2.1.1) ── */
  const containerRef = useRef<HTMLDivElement>(null);
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      }
    },
    [next, prev]
  );

  return (
    <section
      className="section-padding bg-[var(--background)] overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-3">
            Testimonios
          </p>
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Lo Que Dicen Nuestros Pacientes
          </h2>
        </div>

        <div
          ref={containerRef}
          className="relative max-w-4xl mx-auto"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-roledescription="carrusel"
          aria-label="Testimonios de pacientes"
        >
          {/* Screen reader live region */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            Testimonio {current + 1} de {TESTIMONIALS.length}: {TESTIMONIALS[current].name}, {TESTIMONIALS[current].service}
          </div>
          {/* ── Navigation arrows ── */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-14 z-10 p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-[var(--card)] shadow-[var(--shadow-md)] border border-[var(--border)] text-[var(--neutral-500)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 motion-safe:transition-all duration-200"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-14 z-10 p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-[var(--card)] shadow-[var(--shadow-md)] border border-[var(--border)] text-[var(--neutral-500)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 motion-safe:transition-all duration-200"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* ── Testimonial card ── */}
          <div
            className="relative bg-[var(--primary-light)]/50 dark:bg-[var(--neutral-200)] rounded-[var(--radius-2xl)] p-8 md:p-16 min-h-[320px] flex items-center justify-center"
          >
            <Quote className="absolute top-6 left-6 md:top-8 md:left-8 h-10 w-10 text-[var(--primary)]/10 rotate-180" aria-hidden="true" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center relative z-10"
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`Testimonio ${current + 1} de ${TESTIMONIALS.length}`}
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6" aria-label="Calificación: 5 de 5 estrellas">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-[var(--accent)] text-[var(--accent)]" aria-hidden="true" />
                  ))}
                </div>

                {/* Quote text */}
                <blockquote className="text-lg md:text-xl font-medium text-[var(--neutral-800)] dark:text-gray-200 mb-8 leading-relaxed italic max-w-2xl mx-auto">
                  &ldquo;{TESTIMONIALS[current].text}&rdquo;
                </blockquote>

                {/* Author */}
                <div>
                  <p className="font-bold text-lg text-[var(--neutral-900)] dark:text-white">
                    {TESTIMONIALS[current].name}
                  </p>
                  <p className="text-[var(--primary)] text-sm font-medium mt-0.5">
                    {TESTIMONIALS[current].service}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── Dots ── */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigate(i)}
                  className={`h-2 rounded-full motion-safe:transition-all duration-300 ${
                    current === i
                      ? "bg-[var(--primary)] w-8"
                      : "bg-[var(--primary)]/20 w-2 hover:bg-[var(--primary)]/40"
                  }`}
                  aria-label={`Ir al testimonio ${i + 1}`}
                  aria-current={current === i ? "true" : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
