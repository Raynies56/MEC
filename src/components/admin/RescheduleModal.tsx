// /components/admin/RescheduleModal.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Appointment, TimeSlot } from "@/types/admin";
import { Button } from "@/components/ui/Button";
import { DatePicker } from "@/components/ui/DatePicker";
import { TimePicker } from "@/components/ui/TimePicker";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, Clock, Bell, Info } from "lucide-react";

interface Props {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function RescheduleModal({ appointment, isOpen, onClose, onSuccess }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [notifyPatient, setNotifyPatient] = useState(true);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedDate && isOpen) {
      const fetchSlots = async () => {
        setIsLoadingSlots(true);
        try {
          const d = format(selectedDate, 'yyyy-MM-dd');
          const res = await fetch(`/api/admin/appointments/today-schedule?date=${d}`);
          const data = await res.json();
          // Solo los strings "HH:MM" para el TimePicker
          setSlots(data.map((s: any) => ({ 
            time: s.time, 
            available: s.available 
          })));
        } catch {
          toast.error("Error al cargar horarios");
        } finally {
          setIsLoadingSlots(false);
        }
      };
      fetchSlots();
    }
  }, [selectedDate, isOpen]);

  if (!appointment) return null;

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/appointments/${appointment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: 'rescheduled',
          new_date: format(selectedDate, 'yyyy-MM-dd'),
          new_time: selectedTime,
          doctor_notes: reason,
          notify_patient: notifyPatient
        })
      });
      if (res.ok) {
        toast.success("Cita reagendada exitosamente");
        onSuccess();
        onClose();
      }
    } catch {
      toast.error("Error al reagendar");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reagendar Cita" size="lg">
      <div className="space-y-6 py-4">
        {/* Resumen Actual */}
        <div className="p-4 bg-bg-secondary rounded-2xl border border-border">
          <p className="text-[10px] uppercase font-black text-primary tracking-widest mb-1">Cita Actual</p>
          <div className="flex justify-between items-center">
            <span className="font-bold text-text">{appointment.patient_name}</span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-300">
               {format(new Date(appointment.date + 'T00:00:00'), "d 'de' MMM", { locale: es })} @ {appointment.time.substring(0, 5)}
            </span>
          </div>
        </div>

        <div className="reagendar-body">
          {/* Col 1: Fecha */}
          <div className="space-y-4">
            <label className="text-sm font-black uppercase tracking-widest text-text-soft flex items-center gap-2">
              <Calendar className="w-4 h-4" /> 1. Nueva Fecha
            </label>
            <div className="flex justify-center border border-border rounded-2xl p-2 bg-bg-card">
              <DatePicker 
                selected={selectedDate} 
                onSelect={setSelectedDate}
              />
            </div>
          </div>

          {/* Col 2: Hora */}
          <div className="space-y-4">
            <label className="text-sm font-black uppercase tracking-widest text-text-soft flex items-center gap-2">
              <Clock className="w-4 h-4" /> 2. Nueva Hora
            </label>
            {selectedDate ? (
               isLoadingSlots ? (
                 <div className="grid grid-cols-2 gap-2">
                    {[...Array(6)].map((_, i) => <div key={i} className="h-10 bg-bg-secondary animate-pulse rounded-xl" />)}
                 </div>
               ) : (
                 <div className="bg-bg-secondary p-2 rounded-2xl border-2 border-dashed border-border">
                   <TimePicker 
                     slots={slots.filter(s => s.available).map(s => s.time)} 
                     selected={selectedTime || ""} 
                     onSelect={setSelectedTime} 
                   />
                 </div>
               )
            ) : (
              <div className="h-[200px] flex items-center justify-center text-xs text-text-muted italic text-center p-6 border-2 border-dashed border-border bg-bg-secondary rounded-2xl">
                Selecciona primero una fecha para ver horarios disponibles
              </div>
            )}
          </div>
        </div>

        {/* Motivo y Notificación */}
        <div className="space-y-4 pt-6 border-t">
          <div>
            <label className="text-sm font-black uppercase tracking-widest text-text-secondary block mb-2">3. Motivo del cambio (Opcional)</label>
            <Textarea 
              placeholder="Ej: Cambio por requerimiento de la doctora..." 
              value={reason} 
              onChange={e => setReason(e.target.value)}
              className="rounded-xl min-h-[80px]"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-2xl">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-bold">Notificar al paciente</p>
                <p className="text-[10px] text-text-muted">Se enviará un correo con los nuevos datos</p>
              </div>
            </div>
            <input 
              type="checkbox" 
              checked={notifyPatient} 
              onChange={e => setNotifyPatient(e.target.checked)}
              className="w-5 h-5 rounded-lg text-primary focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t font-bold">
          <Button variant="ghost" onClick={onClose} className="rounded-xl">Cancelar</Button>
          <Button 
            variant="accent" 
            onClick={handleConfirm} 
            disabled={!selectedDate || !selectedTime}
            isLoading={isSubmitting}
            className="rounded-xl px-10 shadow-lg shadow-primary/20"
          >
            Confirmar Reagendado
          </Button>
        </div>
      </div>
    </Modal>
  );
}

