"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    badge: "Oftalmología Clínica y Quirúrgica",
    title: "Tu salud visual en manos expertas",
    description: "Especialista en Oftalmología con más de 12 años de experiencia. Diagnóstico preciso, tecnología de última generación y atención personalizada.",
    primaryCTA: { text: "Agendar Cita Ahora", href: "/citas" },
    secondaryCTA: { text: "Conocer Servicios", href: "/servicios" },
    image: "/hero.png", // Usando imagen local
    imageAlt: "Dra. Valentina Reyes oftalmóloga especialista en glaucoma y cataratas",
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
  },
  {
    id: 3,
    badge: "Salud Ocular Integral",
    title: "Cuidado Completo para Toda la Familia",
    description: "Desde exámenes de rutina hasta tratamientos complejos. Brindamos una atención humana y detallada para proteger lo más valioso: tu visión.",
    primaryCTA: { text: "Agendar Evaluación", href: "/citas" },
    secondaryCTA: { text: "Preguntas Frecuentes", href: "/#faqs" },
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop",
    imageAlt: "Consulta oftalmológica integral",
    stats: [
      { text: "Atención Personalizada" },
      { text: "Todas las Edades" }
    ],
    doctorName: "Consulta Integral",
    doctorRole: "Dedicación y calidez en cada visita"
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
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const slide = SLIDES[current];

  return (
    <section 
      id="hero"
      className="relative overflow-hidden pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-32 lg:pb-24 bg-[var(--bg)]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Sección principal con diapositivas"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Background gradient mesh ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg)] via-[var(--bg-card)] to-[var(--bg-secondary)] opacity-100" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--primary)]/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[var(--accent)]/[0.03] blur-[100px]" />
      </div>

      {/* ── Subtle grid pattern ── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40' fill='%23000' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col lg:flex-row items-center gap-10 md:gap-12 lg:gap-16"
          >
            {/* ── Copy side ── */}
            <div className="flex-1 max-w-2xl text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-semibold text-sm border border-[var(--primary)]/20 mb-6 transition-colors">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {slide.badge}
                </span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] font-bold tracking-tight text-[var(--text)] drop-shadow-sm mb-6 leading-[1.08]">
                {slide.title.split(" ").map((word, i) => (
                  <span key={i} className="inline-block mr-[0.25em]">
                    {word.toLowerCase() === "expertas" ? (
                      <span className="text-[var(--primary)] italic font-accent relative">
                        {word}
                        <svg
                          className="absolute -bottom-2 left-0 w-full h-3 text-[var(--accent)]/30"
                          viewBox="0 0 200 12"
                          preserveAspectRatio="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M0 9c40-7 80-7 100 0s60 7 100 0"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    ) : (
                      word
                    )}
                  </span>
                ))}
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-[var(--text-soft)] mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {slide.description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12">
                <Link href={slide.primaryCTA.href} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full min-h-[44px] min-w-[44px] text-sm sm:text-base font-semibold group shadow-lg shadow-[var(--primary)]/20">
                    {slide.primaryCTA.text}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href={slide.secondaryCTA.href} className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full min-h-[44px] min-w-[44px] text-sm sm:text-base border-[var(--border)] text-[var(--text-soft)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text)]">
                    {slide.secondaryCTA.text}
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 text-sm md:text-base text-[var(--text-muted)]">
                {slide.stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[var(--success)]" />
                    <span>{stat.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Image side ── */}
            <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border border-[var(--border)]">
                <div className="absolute inset-0 bg-[var(--bg-secondary)] animate-pulse" />
                <Image 
                  src={slide.image} 
                  alt={slide.imageAlt} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover object-top"
                  priority={current === 0}
                />
                
                {/* Dynamic overlay gradient based on theme */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent dark:from-[var(--bg)]/90" />
                
                <div className="absolute bottom-6 left-6 right-6 p-5 bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] shadow-xl backdrop-blur-sm">
                  <p className="font-bold text-[var(--text)] text-lg mb-0.5">{slide.doctorName}</p>
                  <p className="text-sm text-[var(--text-soft)] font-medium">{slide.doctorRole}</p>
                </div>
              </div>
              
              {/* Floating badge for first slide */}
              {current === 0 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute top-10 -right-10 lg:-right-16 p-4 bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] shadow-2xl hidden sm:flex items-center gap-4 z-20"
                >
                  <div className="bg-[var(--success)]/10 p-3 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-[var(--success)]" />
                  </div>
                  <div>
                    <p className="font-bold text-[var(--text)] text-sm">Seguros Aceptados</p>
                    <p className="text-xs text-[var(--text-muted)]">Humano, Universal, Mapfre y más</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Carousel Controls ── */}
        <div className="flex items-center justify-between mt-12 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-0 lg:right-0 lg:px-4 pointer-events-none">
          <button 
            onClick={prevSlide}
            className="p-3 rounded-full bg-[var(--bg-card)]/80 border border-[var(--border)] shadow-md hover:bg-[var(--bg-card)] transition-colors pointer-events-auto group focus:ring-2 focus:ring-[var(--primary)]"
            aria-label="Diapositiva anterior"
          >
            <ChevronLeft className="h-6 w-6 text-[var(--text-soft)] group-hover:text-[var(--primary)] transition-colors" />
          </button>
          
          <div className="flex gap-3 pointer-events-auto">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${current === i ? "bg-[var(--primary)] w-8" : "bg-[var(--border)] w-2"}`}
                aria-label={`Ir a diapositiva ${i + 1}`}
                aria-current={current === i ? "true" : "false"}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className="p-3 rounded-full bg-[var(--bg-card)]/80 border border-[var(--border)] shadow-md hover:bg-[var(--bg-card)] transition-colors pointer-events-auto group focus:ring-2 focus:ring-[var(--primary)]"
            aria-label="Siguiente diapositiva"
          >
            <ChevronRight className="h-6 w-6 text-[var(--text-soft)] group-hover:text-[var(--primary)] transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
}
