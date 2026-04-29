"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

export function ContactMap() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Visítanos y Contáctanos</h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">
            Estamos ubicados en el corazón de Santo Domingo para brindarte la mejor atención.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-6"
          >
            <Card hoverEffect className="overflow-hidden border-primary/20">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Dirección</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Av. Abraham Lincoln 452,<br />
                    Torre Médica Naco, Suite 8B<br />
                    Santo Domingo, República Dominicana
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card hoverEffect>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Teléfono y WhatsApp</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">+1 (809) 555-0192</p>
                  <p className="text-sm text-neutral-500 mt-1">Urgencias disponibles 24/7 vía WhatsApp.</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card hoverEffect>
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Horario</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Lun – Vie: 8:00 AM – 6:00 PM<br />
                      Sábados: 8:00 AM – 1:00 PM
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card hoverEffect>
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Correo Electrónico</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      contacto@visionplena.com.do
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full h-full min-h-[400px] rounded-3xl overflow-hidden shadow-lg border border-border"
          >
            {/* Standard OpenStreetMap or generic Google maps Embed for demonstration without precise API key */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15138.831885065098!2d-69.94098908861217!3d18.47164998778401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea562145b5c92c5%3A0xc3dc3dbf88c8bd7!2sAv.%20Abraham%20Lincoln%2C%20Santo%20Domingo!5e0!3m2!1sen!2sdo!4v1714088012345!5m2!1sen!2sdo" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
