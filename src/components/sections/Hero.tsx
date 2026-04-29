"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Star, ArrowRight } from "lucide-react";

/* ── Staggered animation variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-32 lg:pb-24"
      aria-label="Sección principal"
    >
      {/* ── Background gradient mesh ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-light)] via-[var(--background)] to-[var(--background)] dark:from-slate-900 dark:via-slate-950 dark:to-slate-950" />
        <div className="absolute top-[20%] left-[5%] w-[400px] h-[400px] bg-[var(--accent)]/[0.08] rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-[var(--primary)]/[0.06] rounded-full blur-[120px]" />
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
        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-12 lg:gap-16">

          {/* ── Copy side ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 max-w-2xl text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-medium text-sm border border-[var(--primary)]/15 mb-6">
                <Star className="h-3.5 w-3.5 fill-current" />
                Oftalmología Clínica y Quirúrgica
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] font-bold tracking-tight text-[var(--neutral-900)] dark:text-white mb-6 leading-[1.08]"
            >
              Tu salud visual{" "}
              <br className="hidden sm:block" />
              en manos{" "}
              <span className="text-[var(--primary)] italic font-accent relative">
                expertas
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
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-[var(--neutral-600)] dark:text-gray-300 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Más de 12 años brindando diagnósticos precisos, tecnología de última generación y atención humana personalizada.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12"
            >
              <Link href="/citas" className="w-full sm:w-auto">
                <Button size="lg" className="w-full min-h-[44px] min-w-[44px] text-sm sm:text-base font-semibold group motion-safe:transition-all">
                  Agendar Cita Ahora
                  <ArrowRight className="ml-2 h-4 w-4 motion-safe:transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/servicios" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full min-h-[44px] min-w-[44px] text-sm sm:text-base motion-safe:transition-all">
                  Conocer Servicios
                </Button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-6 text-sm md:text-base text-[var(--neutral-500)] dark:text-gray-400"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[var(--success)]" />
                <span>12+ Años de Experiencia</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-[var(--neutral-300)] dark:bg-gray-600" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[var(--success)]" />
                <span>+5,000 Pacientes Felices</span>
              </div>
            </motion.div>

            {/* Insurance badge (moved from image) */}
            <motion.div
              variants={itemVariants}
              className="mt-8 inline-flex items-center gap-3 p-4 bg-white dark:bg-[var(--card)] rounded-xl shadow-sm border border-neutral-100 dark:border-slate-800 text-left motion-safe:transition-all hover:shadow-md"
            >
              <div className="bg-[var(--success)]/15 p-2.5 rounded-lg shrink-0">
                <CheckCircle2 className="h-5 w-5 text-[var(--success)]" />
              </div>
              <div>
                <p className="font-bold text-[var(--neutral-900)] dark:text-white text-sm md:text-base">Seguros Aceptados</p>
                <p className="text-xs md:text-sm text-[var(--neutral-500)] dark:text-gray-400">Humano, Universal, Mapfre y más</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Image side ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1 w-full max-w-lg lg:max-w-none relative"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl border-2 border-[var(--background)] dark:border-[var(--neutral-200)]">
              {/* Skeleton placeholder */}
              <div className="absolute inset-0 bg-[var(--neutral-100)] animate-pulse" />
              <Image
                src="/hero.png"
                alt="Dra. Valentina Reyes, oftalmóloga especialista en glaucoma y cataratas"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover object-top"
                priority
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--neutral-950)]/50 via-transparent to-transparent" />

              {/* Doctor info card */}
              <div className="absolute bottom-5 left-5 right-5 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl border border-white/20 dark:border-slate-800/50 shadow-lg">
                <p className="font-bold text-[var(--neutral-900)] dark:text-white">
                  Dra. Valentina Reyes M.
                </p>
                <p className="text-sm text-[var(--neutral-600)]">
                  Cirujana Oftalmóloga — Glaucoma y Cataratas
                </p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
