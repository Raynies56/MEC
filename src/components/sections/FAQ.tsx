"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="section-padding bg-[var(--neutral-50)] dark:bg-[var(--neutral-200)] border-t border-[var(--border)]"
      aria-labelledby="faq-heading"
    >
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-14">
          <p className="text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-[var(--neutral-500)] text-lg">
            Respuestas rápidas a las dudas comunes de nuestros pacientes.
          </p>
        </div>

        <div className="space-y-3" role="list">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                role="listitem"
                className={cn(
                  "border rounded-[var(--radius-xl)] overflow-hidden transition-all duration-300",
                  isOpen
                    ? "bg-[var(--card)] border-[var(--primary)]/15 shadow-[var(--shadow-sm)]"
                    : "bg-transparent border-[var(--border)] hover:border-[var(--primary)]/20"
                )}
              >
                <button
                  id={buttonId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-inset rounded-[var(--radius-xl)]"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span
                    className={cn(
                      "font-semibold text-base pr-8 transition-colors duration-200",
                      isOpen ? "text-[var(--primary)]" : "text-[var(--neutral-800)]"
                    )}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300",
                      isOpen
                        ? "bg-[var(--primary)] text-white rotate-0"
                        : "bg-[var(--neutral-100)] text-[var(--neutral-400)]"
                    )}
                    aria-hidden="true"
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <div className="px-6 pb-6 text-[var(--neutral-500)] leading-relaxed text-[0.95rem]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
