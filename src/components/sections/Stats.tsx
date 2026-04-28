"use client";

import React from "react";
import { motion } from "framer-motion";

export function Stats() {
  const stats = [
    { label: "Años de Experiencia", value: "12+" },
    { label: "Pacientes Atendidos", value: "5,000+" },
    { label: "Satisfacción", value: "98%" },
    { label: "Servicios", value: "15+" },
  ];

  return (
    <section className="bg-primary-light dark:bg-slate-900 py-12 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-primary/10 dark:divide-white/10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center flex flex-col"
            >
              <span className="text-3xl md:text-5xl font-bold text-primary dark:text-white mb-2">{stat.value}</span>
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

