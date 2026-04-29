"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export function Services() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
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
            className="text-neutral-600 dark:text-neutral-400 text-lg"
          >
            Ofrecemos atención integral para todas las edades con diagnósticos precisos mediante tecnología de vanguardia.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card hoverEffect className="h-full flex flex-col group">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-4 transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6 flex-grow">
                      {service.description}
                    </p>
                    <Link 
                      href={`/servicios#${service.id}`} 
                      className="inline-flex items-center text-sm font-semibold text-primary hover:text-accent transition-colors mt-auto"
                    >
                      Ver detalles <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
