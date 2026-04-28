"use client";

import React, { useState, useEffect } from "react";
import { Appointment } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { DatePicker } from "@/components/ui/DatePicker";
import { TimePicker } from "@/components/ui/TimePicker";
import { Textarea } from "@/components/ui/Textarea";
import { AlertTriangle, Calendar, Bell } from "lucide-react";
import { toast } from "@/components/ui/Toast";
import { useAvailability } from "@/hooks/useAvailability";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface RescheduleProps {
  appt: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// --- RESCHEDULE MODAL ---
export function RescheduleModal({ appt, isOpen, onClose, onSuccess }: RescheduleProps) {
  const [newDate, setNewDate] = useState<Date | undefined>(undefined);
  const [newTime, setNewTime] = useState("");
  const [notify, setNotify] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { slots, loading, fetchAvailability } = useAvailability();

  useEffect(() => { if (newDate) { fetchAvailability(newDate); setNewTime(""); } }, [newDate, fetchAvailability]);

  const handleReschedule = async () => {
    if (!appt || !newDate || !newTime) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/appointments/${appt.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'rescheduled',
          new_date: format(newDate, 'yyyy-MM-dd'),
          new_time: newTime,
          notify_patient: notify
        })
      });
      if (res.ok) { toast.success("Cita reagendada"); onSuccess(); onClose(); }
    } catch { toast.error("Error al reagendar"); }
    finally { setIsSubmitting(false); }
  };

  if (!appt) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reagendar Cita Médico">
      <div className="space-y-6 py-4">
        <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 text-sm">
          Paciente: <span className="font-bold">{appt.patient_name}</span><br/>
          Actual: <span className="capitalize">{format(new Date(appt.date + 'T00:00:00'), "EEEE d MMM", { locale: es })}</span> a las {appt.time.substring(0, 5)}
        </div>
        <div className="flex justify-center"><DatePicker selected={newDate} onSelect={setNewDate} disabledDaysOfWeek={[0]}/></div>
        {newDate && (
          <div className="animate-in fade-in slide-in-from-top-2">
            <h4 className="text-[10px] uppercase font-black text-neutral-400 mb-3 tracking-widest text-center">Horarios Disponibles</h4>
            <TimePicker slots={slots} selected={newTime} onSelect={setNewTime} />
          </div>
        )}
        <div className="flex items-center gap-3 p-4 bg-neutral-50 dark:bg-slate-800 rounded-2xl border border-border">
          <input type="checkbox" id="res_notify" checked={notify} onChange={(e) => setNotify(e.target.checked)} className="w-4 h-4 text-primary rounded" />
          <label htmlFor="res_notify" className="text-sm font-bold flex items-center gap-2 cursor-pointer"><Bell className="w-3 h-3"/> Notificar al paciente por correo</label>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="ghost" onClick={onClose} className="rounded-xl">Cancelar</Button>
          <Button disabled={!newDate || !newTime} isLoading={isSubmitting} onClick={handleReschedule} className="rounded-xl px-8">Confirmar Reagendado</Button>
        </div>
      </div>
    </Modal>
  );
}

interface CancelProps {
  appt: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// --- CANCEL MODAL ---
export function CancelModal({ appt, isOpen, onClose, onSuccess }: CancelProps) {
  const [reason, setReason] = useState("");
  const [notify, setNotify] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCancel = async () => {
    if (!appt || !reason) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/appointments/${appt.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled', doctor_notes: `Cancelación: ${reason}`, notify_patient: notify })
      });
      if (res.ok) { toast.success("Cita cancelada"); onSuccess(); onClose(); }
    } catch { toast.error("Error"); }
    finally { setIsSubmitting(false); }
  };

  if (!appt) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cancelar Cita">
      <div className="space-y-6 py-4">
        <div className="flex gap-4 p-5 bg-error/5 border border-error/20 rounded-[2rem] items-start">
          <AlertTriangle className="w-6 h-6 text-error shrink-0" />
          <p className="text-sm text-error font-medium leading-relaxed">
            <strong>Advertencia:</strong> Esta acción informará al paciente y liberará el horario. No se puede deshacer.
          </p>
        </div>
        <div>
          <label className="block text-[10px] uppercase font-black text-neutral-400 mb-2 tracking-widest">Motivo de cancelación (Requerido)</label>
          <Textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Ej: Emergencia médica, cambio de horario de la clínica..." required className="rounded-2xl min-h-[100px]"/>
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="can_notify" checked={notify} onChange={(e) => setNotify(e.target.checked)} className="w-4 h-4 text-error rounded" />
          <label htmlFor="can_notify" className="text-sm font-bold cursor-pointer">Notificar al paciente vía Email</label>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="ghost" onClick={onClose} className="rounded-xl">Volver</Button>
          <Button variant="danger" disabled={!reason} isLoading={isSubmitting} onClick={handleCancel} className="rounded-xl px-8">Confirmar Cancelación</Button>
        </div>
      </div>
    </Modal>
  );
}

