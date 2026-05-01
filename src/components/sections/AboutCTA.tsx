"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function AboutCTA() {
  return (
    <section
      className="section-padding bg-[var(--bg)] border-y border-[var(--border)]"
      aria-labelledby="about-heading"
    >
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* ── Image ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1 w-full"
          >
            <div className="relative aspect-square max-w-md mx-auto lg:mr-auto lg:ml-0 rounded-[var(--radius-2xl)] overflow-hidden shadow-[var(--shadow-xl)]">
              <Image
                src="/about.png"
                alt="Dra. Valentina Reyes atendiendo pacientes en su consultorio"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[var(--primary)] mix-blend-overlay opacity-15" />
            </div>
          </motion.div>

          {/* ── Copy ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1"
          >
            <p className="text-xs sm:text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-3">
              Sobre la doctora
            </p>
            <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Dra. Valentina Reyes M.
            </h2>
            <div className="space-y-4 text-[var(--text-soft)] text-sm sm:text-base md:text-lg leading-relaxed mb-8">
              <p>
                Con gran vocación por la salud visual, me he dedicado a la oftalmología clínica y quirúrgica, especializándome en el diagnóstico y tratamiento del glaucoma ocular y cataratas.
              </p>
              <p>
                Graduada de la Universidad Autónoma de Santo Domingo (UASD) con especialidad en el Instituto Tecnológico de Santo Domingo (INTEC) y fellowship internacional en España.
              </p>
              <p>
                Mi filosofía es brindar un trato humano, escuchar detalladamente a cada paciente y ofrecer diagnósticos certeros utilizando tecnología de punta mundial.
              </p>
            </div>
            <Link href="/sobre-mi">
              <Button size="lg" className="group min-h-[44px] min-w-[44px] text-sm sm:text-base motion-safe:transition-all">
                Conocer más sobre mi trayectoria
                <ArrowRight className="ml-2 h-4 w-4 motion-safe:transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
