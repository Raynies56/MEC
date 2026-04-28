import React from "react";
import { AppointmentForm } from "@/components/forms/AppointmentForm";

export const metadata = {
  title: "Agendar Cita Online | Dra. Valentina Reyes Oftalmóloga",
  description: "Agenda tu cita oftalmológica de manera rápida y segura. Selecciona tu día y hora para una evaluación visual completa.",
};

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-slate-950 pt-32 pb-20">
      
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-96 bg-primary/80 dark:bg-slate-900 z-0 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Agenda tu Consulta</h1>
          <p className="text-white/90 text-lg max-w-xl mx-auto">
            Da el primer paso para proteger tu salud visual. El proceso de reserva solo te tomará unos minutos.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <AppointmentForm />
      </div>

    </div>
  );
}

