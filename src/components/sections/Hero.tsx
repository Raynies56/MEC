"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary-light/50 to-white dark:from-slate-900 dark:to-slate-950" />
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-2xl text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
              <Star className="h-4 w-4" />
              <span>Oftalmología Clínica y Quirúrgica</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6 leading-[1.1]">
              Tu salud visual en manos <span className="text-primary italic font-accent">expertas</span>
            </h1>
            
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
              Especialista en Oftalmología con más de 12 años de experiencia. Diagnóstico preciso, tecnología de última generación y atención personalizada.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12">
              <Link href="/citas" className="w-full sm:w-auto">
                <Button size="lg" className="w-full text-base font-semibold">Agendar Cita Ahora</Button>
              </Link>
              <Link href="/servicios" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full text-base">Conocer Servicios</Button>
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span>12+ Años de Experiencia</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span>+5,000 Pacientes Felices</span>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full max-w-lg lg:max-w-none relative"
          >
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
              {/* Fallback image if /images/doctor.jpg is missing */}
              <div className="absolute inset-0 bg-neutral-200 dark:bg-slate-800 animate-pulse" />
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop" 
                alt="Dra. Valentina Reyes oftalmóloga" 
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 glass rounded-2xl">
                <p className="font-bold text-neutral-900 dark:text-white">Dra. Valentina Reyes M.</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">Cirujana Oftalmóloga - Glaucoma y Cataratas</p>
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute top-10 -left-10 lg:-left-16 p-4 glass rounded-2xl hidden sm:flex items-center gap-4 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="bg-success/20 p-3 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="font-bold text-neutral-900 dark:text-white text-sm">Seguros Aceptados</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-300">Humano, Universal, y más</p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

