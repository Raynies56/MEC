"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Star, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    badge: "Oftalmología Clínica y Quirúrgica",
    title: "Tu salud visual en manos expertas",
    description: "Especialista en Oftalmología con más de 12 años de experiencia. Diagnóstico preciso, tecnología de última generación y atención personalizada.",
    primaryCTA: { text: "Agendar Cita Ahora", href: "/citas" },
    secondaryCTA: { text: "Conocer Servicios", href: "/servicios" },
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop",
    imageAlt: "Dra. Valentina Reyes oftalmóloga",
    stats: [
      { text: "12+ Años de Experiencia" },
      { text: "+5,000 Pacientes Felices" }
    ],
    doctorName: "Dra. Valentina Reyes M.",
    doctorRole: "Cirujana Oftalmóloga - Glaucoma y Cataratas"
  },
  {
    id: 2,
    badge: "Tecnología de Vanguardia",
    title: "Cirugía Láser de Última Generación",
    description: "Recupera tu visión con procedimientos mínimamente invasivos. Especialistas en corrección de miopía, astigmatismo y cataratas.",
    primaryCTA: { text: "Consultar Procedimientos", href: "/servicios" },
    secondaryCTA: { text: "Ver Casos de Éxito", href: "/sobre-mi" },
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1000&auto=format&fit=crop",
    imageAlt: "Equipo oftalmológico avanzado",
    stats: [
      { text: "Tecnología 2024" },
      { text: "Resultados Garantizados" }
    ],
    doctorName: "Equipamiento Médico",
    doctorRole: "Precisión y seguridad en cada diagnóstico"
  }
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const slide = SLIDES[current];

  return (
    <section 
      className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28"
      role="region"
      aria-roledescription="carousel"
      aria-label="Presentación de servicios oftalmológicos"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary-light/50 to-white dark:from-slate-900 dark:to-slate-950" />
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8"
          >
            {/* Copy */}
            <div className="flex-1 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
                <Star className="h-4 w-4" />
                <span>{slide.badge}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6 leading-[1.1]">
                {slide.title.split(" ").map((word, i) => 
                  word.toLowerCase() === "expertas" ? (
                    <span key={i} className="text-primary italic font-accent"> {word}</span>
                  ) : (
                    <span key={i}> {word}</span>
                  )
                )}
              </h1>
              
              <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
                {slide.description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12">
                <Link href={slide.primaryCTA.href} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full text-base font-semibold">{slide.primaryCTA.text}</Button>
                </Link>
                <Link href={slide.secondaryCTA.href} className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full text-base">{slide.secondaryCTA.text}</Button>
                </Link>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
                {slide.stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span>{stat.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
                <div className="absolute inset-0 bg-neutral-200 dark:bg-slate-800 animate-pulse" />
                <img 
                  src={slide.image} 
                  alt={slide.imageAlt} 
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 p-4 glass rounded-2xl">
                  <p className="font-bold text-neutral-900 dark:text-white">{slide.doctorName}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">{slide.doctorRole}</p>
                </div>
              </div>
              
              {/* Floating badge (Solo en primer slide para mantener diseño original) */}
              {current === 0 && (
                <div className="absolute top-10 -left-10 lg:-left-16 p-4 glass rounded-2xl hidden sm:flex items-center gap-4 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="bg-success/20 p-3 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 dark:text-white text-sm">Seguros Aceptados</p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300">Humano, Universal, y más</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="flex items-center justify-between mt-12 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-0 lg:right-0 lg:px-4 pointer-events-none">
          <button 
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-md hover:bg-white dark:hover:bg-slate-800 transition-colors pointer-events-auto group focus:ring-2 focus:ring-primary"
            aria-label="Diapositiva anterior"
          >
            <ChevronLeft className="h-6 w-6 text-neutral-600 dark:text-neutral-300 group-hover:text-primary transition-colors" />
          </button>
          
          <div className="flex gap-2 pointer-events-auto">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition-all ${current === i ? "bg-primary w-8" : "bg-neutral-300 dark:bg-slate-700"}`}
                aria-label={`Ir a diapositiva ${i + 1}`}
                aria-current={current === i ? "true" : "false"}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-md hover:bg-white dark:hover:bg-slate-800 transition-colors pointer-events-auto group focus:ring-2 focus:ring-primary"
            aria-label="Siguiente diapositiva"
          >
            <ChevronRight className="h-6 w-6 text-neutral-600 dark:text-neutral-300 group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
}

