"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { label: "Años de Experiencia", value: "12+", suffix: "" },
  { label: "Pacientes Atendidos", value: "5,000", suffix: "+" },
  { label: "Satisfacción", value: "98", suffix: "%" },
  { label: "Servicios", value: "15", suffix: "+" },
];

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="bg-[var(--primary-light)] dark:bg-[var(--neutral-200)] py-14 border-y border-[var(--border)]"
      aria-label="Estadísticas del centro"
    >
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center flex flex-col items-center"
            >
              <div className="flex items-baseline gap-0.5">
                <span className="text-4xl sm:text-5xl font-bold text-[var(--primary)] tabular-nums">
                  {stat.value}
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-[var(--accent)]">
                  {stat.suffix}
                </span>
              </div>
              <span className="text-xs sm:text-sm md:text-base font-medium text-[var(--neutral-500)] mt-2">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
