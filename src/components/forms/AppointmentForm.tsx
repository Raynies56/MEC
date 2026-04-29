"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, ArrowLeft } from "lucide-react";
import { useAppointmentStore } from "@/hooks/useAppointments";
import { useAvailability } from "@/hooks/useAvailability";
import { SERVICES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { DatePicker } from "@/components/ui/DatePicker";
import { TimePicker } from "@/components/ui/TimePicker";
import { toast } from "@/components/ui/Toast";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";

const REASONS = [
  ...SERVICES.map(s => s.title),
  "Seguimiento",
  "Dolor Ocular",
  "Visión Borrosa",
  "Emergencia Ocular",
  "Otro"
];

function StepIndicator() {
  const { step } = useAppointmentStore();
  const steps = ["Motivo", "Fecha", "Hora", "Tus Datos", "Confirmar"];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-neutral-100 dark:bg-slate-800 rounded-full -z-10" />
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full -z-10 transition-all duration-500 ease-in-out"
          style={{ width: `${((step - 1) / 4) * 100}%` }}
        />
        
        {steps.map((label, i) => {
          const num = i + 1;
          const isActive = step === num;
          const isPast = step > num;
          
          return (
            <div key={label} className="flex flex-col items-center gap-2 bg-white dark:bg-slate-950 px-2">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  isActive ? "bg-primary text-white scale-110 shadow-lg shadow-primary/30" : 
                  isPast ? "bg-primary text-white" : "bg-neutral-200 text-neutral-500 dark:bg-slate-800 dark:text-neutral-400"
                }`}
              >
                {isPast ? <CheckCircle2 className="w-5 h-5" /> : num}
              </div>
              <span className={`text-xs hidden md:block font-medium ${isActive ? "text-primary" : "text-neutral-500"}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AppointmentForm() {
  const { step, setStep, reason, setReason, date, setDate, time, setTime, patientInfo, setPatientInfo, reset } = useAppointmentStore();
  const { slots, loading, fetchAvailability } = useAvailability();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    if (step === 1 && !reason) return toast.error("Por favor selecciona un motivo");
    if (step === 2 && !date) return toast.error("Por favor selecciona una fecha en el calendario");
    if (step === 3 && !time) return toast.error("Por favor selecciona un horario disponible");
    
    if (step === 2 && date) {
      fetchAvailability(date);
    }
    
    if (step === 4) {
      const newErrors: Record<string, string> = {};
      if (!patientInfo.name || patientInfo.name.length < 3) newErrors.name = "Nombre inválido";
      if (!patientInfo.phone || patientInfo.phone.length < 10) newErrors.phone = "Teléfono inválido";
      if (!patientInfo.email || !/^\S+@\S+\.\S+$/.test(patientInfo.email)) newErrors.email = "Email inválido";
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({});
    }

    setStep((step + 1) as any);
  };

  const submitAppointment = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_name: patientInfo.name,
          patient_phone: patientInfo.phone,
          patient_email: patientInfo.email,
          reason,
          is_first_visit: patientInfo.is_first_visit,
          notes: patientInfo.notes,
          date: date ? format(date, 'yyyy-MM-dd') : "",
          time
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error al agendar");
      
      setIsSuccess(true);
    } catch (e: any) {
      toast.error("Error", e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
        <div className="w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold mb-4">¡Cita Confirmada!</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto">
          Hemos enviado un correo electrónico a <strong>{patientInfo.email}</strong> con los detalles de tu cita. 
          Te esperamos el {date ? format(date, "EEEE d 'de' MMMM", { locale: es }) : ""} a las {time}.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={() => { reset(); setIsSuccess(false); }}>Agendar Otra Cita</Button>
          <Link href="/"><Button>Ir al Inicio</Button></Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-[var(--card)] rounded-3xl shadow-xl border border-border p-6 md:p-10 mb-20 relative overflow-hidden">
      <StepIndicator />
      
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* STEP 1: Reason */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">¿Cuál es el motivo de tu consulta?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {REASONS.map(r => (
                    <Card 
                      key={r}
                      hoverEffect
                      className={`cursor-pointer transition-all border-2 ${reason === r ? "border-primary bg-primary/5 dark:bg-primary/20" : "border-transparent dark:border-slate-800"}`}
                      onClick={() => {
                        setReason(r);
                        setTimeout(() => setStep(2 as any), 150);
                      }}
                    >
                      <div className="p-4 flex items-center justify-between font-medium text-neutral-900 dark:text-white">
                        {r}
                        {reason === r && <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Date */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Selecciona una fecha</h2>
                <div className="flex justify-center">
                  <DatePicker 
                    selected={date} 
                    onSelect={(d) => {
                      if(d) {
                        setDate(d);
                        fetchAvailability(d);
                        setTimeout(() => setStep(3 as any), 150);
                      }
                    }} 
                    className="shadow-md"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Time */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Horarios disponibles</h2>
                <p className="text-neutral-500 mb-6 capitalize">
                  {date ? format(date, "EEEE d 'de' MMMM", { locale: es }) : ""}
                </p>
                {loading ? (
                  <div className="flex justify-center p-12"><div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" /></div>
                ) : (
                  <TimePicker 
                    slots={slots} 
                    selected={time} 
                    onSelect={(t) => {
                      setTime(t);
                      setTimeout(() => setStep(4 as any), 150);
                    }} 
                  />
                )}
              </div>
            )}

            {/* STEP 4: Info */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Tus datos personales</h2>
                <div className="space-y-4">
                  <Input 
                    label="Nombre Completo *" 
                    placeholder="Ej. Juan Pérez" 
                    value={patientInfo.name}
                    onChange={e => setPatientInfo({ name: e.target.value })}
                    error={errors.name}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input 
                      label="Teléfono (WhatsApp) *" 
                      placeholder="+1 (809) 000-0000" 
                      value={patientInfo.phone}
                      onChange={e => setPatientInfo({ phone: e.target.value })}
                      error={errors.phone}
                    />
                    <Input 
                      label="Correo Electrónico *" 
                      type="email" 
                      placeholder="juan@email.com" 
                      value={patientInfo.email}
                      onChange={e => setPatientInfo({ email: e.target.value })}
                      error={errors.email}
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-4 p-4 rounded-xl bg-neutral-50 dark:bg-slate-800 border">
                    <input 
                      type="checkbox" 
                      id="first_visit" 
                      checked={patientInfo.is_first_visit}
                      onChange={e => setPatientInfo({ is_first_visit: e.target.checked })}
                      className="w-5 h-5 rounded border-neutral-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-primary focus:ring-primary"
                    />
                    <label htmlFor="first_visit" className="font-medium cursor-pointer text-neutral-900 dark:text-neutral-100">¿Es tu primera visita con la Dra. Valentina?</label>
                  </div>
                  <Textarea 
                    label="Notas Adicionales (Opcional)" 
                    placeholder="¿Algún detalle que debamos saber antes de la consulta?"
                    value={patientInfo.notes}
                    onChange={e => setPatientInfo({ notes: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* STEP 5: Confirm */}
            {step === 5 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Confirma tu cita</h2>
                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 space-y-4 shadow-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-neutral-500">Paciente</p>
                      <p className="font-semibold">{patientInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Contacto</p>
                      <p className="font-semibold">{patientInfo.phone}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-neutral-500">Motivo</p>
                      <p className="font-semibold">{reason}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Fecha</p>
                      <p className="font-semibold capitalize">{date ? format(date, "EEEE d 'de' MMMM yyyy", { locale: es }) : ""}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Hora</p>
                      <p className="font-semibold">{time}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
                  <input type="checkbox" id="terms" className="mt-1" defaultChecked />
                  <label htmlFor="terms" className="dark:text-neutral-300">
                    Acepto el tratamiento de mis datos personales para gestionar la reserva y recibir comunicaciones de salud visual. Entiendo que puedo cancelar con 24 horas de antelación.
                  </label>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex border-t border-border pt-6 mt-6 mt-auto">
        {step > 1 && (
          <Button variant="ghost" onClick={() => setStep((step - 1) as any)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Atrás
          </Button>
        )}
        
        <div className="ml-auto">
          {step < 5 ? (
            <Button 
              onClick={handleNext}
              disabled={
                (step === 1 && !reason) ||
                (step === 2 && !date) ||
                (step === 3 && !time)
              }
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button variant="accent" onClick={submitAppointment} isLoading={isSubmitting}>
              Confirmar Reserva
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

