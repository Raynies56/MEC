"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

export function ContactMap() {
  return (
    <section
      className="section-padding bg-[var(--background)]"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-3">
            Encuéntranos
          </p>
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-4">
            Visítanos y Contáctanos
          </h2>
          <p className="text-[var(--neutral-500)] dark:text-gray-400 text-lg">
            Estamos ubicados en el corazón de Santo Domingo para brindarte la mejor atención.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* ── Contact Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col justify-center space-y-4"
          >
            <Card hoverEffect className="overflow-hidden border-[var(--primary)]/15">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-[var(--primary)]" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1">Dirección</h3>
                  <p className="text-[var(--neutral-500)] dark:text-gray-400 text-sm leading-relaxed">
                    Av. Abraham Lincoln 452,<br />
                    Torre Médica Naco, Suite 8B<br />
                    Santo Domingo, República Dominicana
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card hoverEffect>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-[var(--primary)]" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1">Teléfono y WhatsApp</h3>
                  <a href="tel:+18095550192" className="text-[var(--neutral-500)] dark:text-gray-400 text-sm hover:text-[var(--primary)] transition-colors">
                    +1 (809) 555-0192
                  </a>
                  <p className="text-xs text-[var(--neutral-400)] dark:text-gray-500 mt-1">Urgencias disponibles 24/7 vía WhatsApp.</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card hoverEffect>
                <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">Horario</h3>
                    <p className="text-xs text-[var(--neutral-500)] dark:text-gray-400 leading-relaxed">
                      Lun – Vie: 8:00 AM – 6:00 PM<br />
                      Sábados: 8:00 AM – 1:00 PM
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card hoverEffect>
                <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">Correo Electrónico</h3>
                    <a
                      href="mailto:contacto@visionplena.com.do"
                      className="text-xs text-[var(--neutral-500)] dark:text-gray-400 hover:text-[var(--primary)] transition-colors"
                    >
                      contacto@visionplena.com.do
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* ── Map ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full min-h-[400px] lg:min-h-0 rounded-[var(--radius-2xl)] overflow-hidden shadow-[var(--shadow-lg)] border border-[var(--border)]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15138.831885065098!2d-69.94098908861217!3d18.47164998778401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea562145b5c92c5%3A0xc3dc3dbf88c8bd7!2sAv.%20Abraham%20Lincoln%2C%20Santo%20Domingo!5e0!3m2!1sen!2sdo!4v1714088012345!5m2!1sen!2sdo"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del Centro Oftalmológico Visión Plena en Google Maps"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
