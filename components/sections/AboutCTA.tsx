"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function AboutCTA() {
  return (
    <section className="py-24 bg-neutral-50 dark:bg-slate-900 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="relative aspect-square max-w-md mx-auto lg:mr-auto lg:ml-0 rounded-[2rem] overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1594824406282-51c6c547cefb?q=80&w=1000&auto=format&fit=crop" 
                alt="Doctora trabajando en consultorio" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary mix-blend-overlay opacity-20" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Dra. Valentina Reyes M.
            </h2>
            <div className="space-y-4 text-neutral-600 dark:text-neutral-300 text-lg mb-8">
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
              <Button size="lg">Conocer más sobre mi trayectoria →</Button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
