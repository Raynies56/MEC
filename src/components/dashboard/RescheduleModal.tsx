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
        <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
          <p className="text-xs text-neutral-500 mb-1">Cita actual con:</p>
          <p className="font-bold text-neutral-900 dark:text-white">{appt.patient_name}</p>
          <p className="text-neutral-500 capitalize mt-1">
            {format(new Date(appt.date + 'T00:00:00'), "EEEE d 'de' MMMM", { locale: es })} a las {appt.time.substring(0, 5)}
          </p>
        </div>

        <div>
          <label className="block font-bold mb-3">1. Selecciona nueva fecha</label>
          <div className="flex justify-center">
            <DatePicker 
              selected={newDate} 
              onSelect={setNewDate}
              disabledDaysOfWeek={[0]}
            />
          </div>
        </div>

        {newDate && (
          <div>
            <label className="block font-bold mb-3">2. Selecciona nuevo horario</label>
            {loading ? (
              <div className="flex justify-center p-8"><div className="w-6 h-6 border-2 border-primary border-t-transparent animate-spin rounded-full" /></div>
            ) : (
              <TimePicker slots={slots} selected={newTime} onSelect={setNewTime} />
            )}
          </div>
        )}

        <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-slate-800 rounded-lg border">
          <input 
            type="checkbox" 
            id="notify_patient" 
            checked={notify} 
            onChange={(e) => setNotify(e.target.checked)}
            className="w-4 h-4 text-primary rounded" 
          />
          <label htmlFor="notify_patient" className="font-medium cursor-pointer">
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

