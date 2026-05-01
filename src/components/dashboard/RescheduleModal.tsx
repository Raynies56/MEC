"use client";

import React, { useState, useEffect } from "react";
import { Appointment } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { DatePicker } from "@/components/ui/DatePicker";
import { TimePicker } from "@/components/ui/TimePicker";
import { toast } from "@/components/ui/Toast";
import { useAvailability } from "@/hooks/useAvailability";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  appt: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function RescheduleModal({ appt, isOpen, onClose, onSuccess }: Props) {
  const [newDate, setNewDate] = useState<Date | undefined>(undefined);
  const [newTime, setNewTime] = useState("");
  const [notify, setNotify] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { slots, loading, fetchAvailability } = useAvailability();

  useEffect(() => {
    if (newDate) {
      fetchAvailability(newDate);
      setNewTime("");
    }
  }, [newDate, fetchAvailability]);

  const handleReschedule = async () => {
    if (!appt || !newDate || !newTime) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/appointments/${appt.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'rescheduled',
          new_date: format(newDate, 'yyyy-MM-dd'),
          new_time: newTime,
          notify_patient: notify
        })
      });

      if (!res.ok) throw new Error();
      
      toast.success("Cita reagendada correctamente");
      onSuccess();
      onClose();
    } catch {
      toast.error("Error al reagendar la cita");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!appt) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reagendar Cita">
      <div className="space-y-6 py-4 text-sm">
        {/* ── 1. CITA ACTUAL ── */}
        <div className="bg-bg-secondary p-4 rounded-2xl border border-border transition-colors">
          <p className="text-[10px] uppercase tracking-wider font-bold text-text-muted mb-2">Cita Actual</p>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-lg text-text leading-tight">{appt.patient_name}</p>
            <p className="text-text-soft font-medium capitalize">
              {format(new Date(appt.date + 'T00:00:00'), "EEEE d 'de' MMMM", { locale: es })} a las {appt.time.substring(0, 5)}
            </p>
          </div>
        </div>

        {/* ── 1. NUEVA FECHA ── */}
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-wider font-bold text-text-soft">1. Nueva Fecha</label>
          <div className="flex justify-center p-4 bg-bg-card rounded-2xl border border-border shadow-sm transition-colors">
            <DatePicker 
              selected={newDate} 
              onSelect={setNewDate}
              disabledDaysOfWeek={[0]}
            />
          </div>
        </div>

        {/* ── 2. NUEVA HORA ── */}
        {newDate && (
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-wider font-bold text-text-soft">2. Nueva Hora</label>
            <div className="p-5 bg-bg rounded-2xl border border-dashed border-border transition-colors">
              {loading ? (
                <div className="flex justify-center p-8">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent animate-spin rounded-full" />
                </div>
              ) : (
                <TimePicker slots={slots} selected={newTime} onSelect={setNewTime} />
              )}
            </div>
          </div>
        )}

        {/* ── NOTIFICACIÓN ── */}
        <div className="flex items-center gap-3 p-4 bg-bg-secondary rounded-xl border border-border transition-colors">
          <div className="relative flex items-center">
            <input 
              type="checkbox" 
              id="notify_patient" 
              checked={notify} 
              onChange={(e) => setNotify(e.target.checked)}
              className="w-5 h-5 text-primary rounded-md border-border focus:ring-primary bg-bg-card transition-all cursor-pointer" 
            />
          </div>
          <label htmlFor="notify_patient" className="text-sm font-medium text-text cursor-pointer select-none">
            Notificar al paciente por correo electrónico
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button 
            variant="primary" 
            disabled={!newDate || !newTime} 
            isLoading={isSubmitting}
            onClick={handleReschedule}
          >
            Confirmar Reagendado
          </Button>
        </div>
      </div>
    </Modal>
  );
}

