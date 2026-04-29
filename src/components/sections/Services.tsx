"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function Services() {
  return (
    <section
      id="servicios"
      className="section-padding bg-[var(--background)]"
      aria-labelledby="services-heading"
    >
      <div className="container mx-auto px-4">
        {/* ── Section header ── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-3"
          >
            Lo que hacemos
          </motion.p>
          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Nuestros Servicios Oftalmológicos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[var(--neutral-500)] text-lg leading-relaxed"
          >
            Atención integral para todas las edades con diagnósticos precisos mediante tecnología de vanguardia.
          </motion.p>
        </div>

        {/* ── Service cards grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.id} variants={cardVariants}>
                <Card hoverEffect className="h-full flex flex-col group">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[var(--primary)]/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="text-[var(--neutral-500)] text-sm leading-relaxed mb-6 flex-grow">
                      {service.description}
                    </p>
                    <Link
                      href={`/servicios#${service.id}`}
                      className="inline-flex items-center text-sm font-semibold text-[var(--primary)] hover:text-[var(--accent)] transition-colors duration-200 group/link"
                    >
                      Ver detalles
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
