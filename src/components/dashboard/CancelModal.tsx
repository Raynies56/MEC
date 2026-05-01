"use client";

import React, { useState } from "react";
import { Appointment } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { AlertTriangle } from "lucide-react";
import { toast } from "@/components/ui/Toast";

interface Props {
  appt: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CancelModal({ appt, isOpen, onClose, onSuccess }: Props) {
  const [reason, setReason] = useState("");
  const [notify, setNotify] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCancel = async () => {
    if (!appt || !reason) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/appointments/${appt.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'cancelled',
          doctor_notes: `Cancelación: ${reason}`,
          notify_patient: notify
        })
      });

      if (!res.ok) throw new Error();
      
      toast.success("Cita cancelada correctamente");
      onSuccess();
      onClose();
    } catch {
      toast.error("Error al cancelar la cita");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!appt) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cancelar Cita">
      <div className="space-y-6 py-4">
        <div className="flex gap-4 p-4 bg-error/5 border border-error/20 rounded-2xl items-start">
          <AlertTriangle className="w-6 h-6 text-error shrink-0" />
          <div>
            <p className="font-bold text-error">¿Estás seguro de cancelar esta cita?</p>
            <p className="text-sm text-text-soft mt-1">
              Esta acción informará al paciente y liberará el horario de inmediato. Esta acción no se puede deshacer.
            </p>
          </div>
        </div>

        <div className="bg-bg-secondary p-4 rounded-xl text-sm italic">
          Paciente: <span className="font-bold not-italic">{appt.patient_name}</span> - {appt.date} {appt.time.substring(0, 5)}
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Motivo de cancelación *</label>
          <Textarea 
            placeholder="Ej: Doctora tiene una emergencia médica, Consultorio cerrado por feriado..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            id="cancel_notify" 
            checked={notify} 
            onChange={(e) => setNotify(e.target.checked)}
            className="w-4 h-4 text-error rounded" 
          />
          <label htmlFor="cancel_notify" className="text-sm font-medium cursor-pointer">
            Notificar al paciente por correo electrónico
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="ghost" onClick={onClose}>Volver</Button>
          <Button 
            variant="danger" 
            disabled={!reason} 
            isLoading={isSubmitting}
            onClick={handleCancel}
          >
            Confirmar Cancelación
          </Button>
        </div>
      </div>
    </Modal>
  );
}

