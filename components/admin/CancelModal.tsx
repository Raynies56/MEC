// /components/admin/CancelModal.tsx

"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Appointment } from "@/types/admin";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "react-hot-toast";
import { AlertCircle, Bell, XCircle } from "lucide-react";

interface Props {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CancelModal({ appointment, isOpen, onClose, onSuccess }: Props) {
  const [reason, setReason] = useState("");
  const [notifyPatient, setNotifyPatient] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!appointment) return null;

  const handleCancel = async () => {
    if (reason.length < 10) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/appointments/${appointment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: 'cancelled',
          doctor_notes: reason,
          notify_patient: notifyPatient
        })
      });
      if (res.ok) {
        toast.success("Cita cancelada");
        onSuccess();
        onClose();
      }
    } catch {
      toast.error("Error al cancelar");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Borrar o Cancelar Cita" size="md">
      <div className="space-y-6 py-4">
        {/* Advertencia Crítica */}
        <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-2xl border border-rose-100 dark:border-rose-800 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
          <div>
            <p className="text-sm font-black text-rose-600 uppercase tracking-widest mb-1">Advertencia</p>
            <p className="text-sm text-rose-800 dark:text-rose-200">
              Estás a punto de cancelar la cita de <strong>{appointment.patient_name}</strong>. Esta acción se notificará al paciente y liberará el horario en la agenda.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-black uppercase tracking-widest text-neutral-400 block">
            Motivo de la cancelación (Mín. 10 caracteres)
          </label>
          <div className="relative">
            <Textarea 
              placeholder="Ej: El médico no podrá asistir por emergencia quirúrgica..." 
              value={reason} 
              onChange={e => setReason(e.target.value)}
              className="rounded-2xl min-h-[120px] pr-10"
              maxLength={200}
            />
            <div className={`absolute bottom-3 right-4 text-[10px] font-black ${reason.length < 10 ? 'text-amber-500' : 'text-emerald-500'}`}>
              {reason.length}/200
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-slate-800 rounded-2xl">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold">Enviar email de cancelación al paciente</span>
          </div>
          <input 
            type="checkbox" 
            checked={notifyPatient} 
            onChange={e => setNotifyPatient(e.target.checked)}
            className="w-5 h-5 rounded-lg text-rose-600 focus:ring-rose-600"
          />
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t font-bold">
          <Button variant="ghost" onClick={onClose} className="rounded-xl">Volver</Button>
          <Button 
            variant="outline" 
            onClick={handleCancel} 
            disabled={reason.length < 10}
            isLoading={isSubmitting}
            className="rounded-xl px-8 border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Cancelar esta cita
          </Button>
        </div>
      </div>
    </Modal>
  );
}
