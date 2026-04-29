// /components/admin/AppointmentDetailModal.tsx

"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Appointment } from "@/types/admin";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Phone, Mail, User, Calendar, Clock, FileText, CheckCircle2, History } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "react-hot-toast";

interface Props {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onReschedule: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  onRefresh: () => void;
}

export function AppointmentDetailModal({ appointment, isOpen, onClose, onReschedule, onCancel, onConfirm, onRefresh }: Props) {
  const [docNotes, setDocNotes] = useState(appointment?.doctor_notes || "");
  const [isSaving, setIsSaving] = useState(false);

  if (!appointment) return null;

  const handleSaveNotes = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/appointments/${appointment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctor_notes: docNotes })
      });
      if (res.ok) {
        toast.success("Nota guardada");
        onRefresh();
      }
    } catch {
      toast.error("Error al guardar");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalle de la Cita" size="xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
        {/* Col 1: Patient & Info */}
        <div className="space-y-6">
          <section>
            <h4 className="text-[10px] uppercase font-black text-primary tracking-widest mb-4 flex items-center gap-2">
              <User className="w-3 h-3" /> Información del Paciente
            </h4>
            <div className="bg-neutral-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-border">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white capitalize">{appointment.patient_name}</h3>
              <p className="text-sm text-neutral-500 mt-1">{appointment.is_first_visit ? "Primera visita con la Dra. Valentina" : "Paciente recurrente"}</p>
              
              <div className="mt-4 space-y-3">
                <a href={`tel:${appointment.patient_phone}`} className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 text-neutral-400" /> {appointment.patient_phone}
                </a>
                <a href={`mailto:${appointment.patient_email}`} className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 text-neutral-400" /> {appointment.patient_email}
                </a>
              </div>
            </div>
          </section>

          <section>
            <h4 className="text-[10px] uppercase font-black text-primary tracking-widest mb-4 flex items-center gap-2">
              <FileText className="w-3 h-3" /> Motivo y Notas del Paciente
            </h4>
            <div className="p-5 rounded-2xl border border-border">
              <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300">{appointment.reason}</p>
              <div className="mt-3 p-3 bg-neutral-50 dark:bg-slate-800 rounded-xl text-xs text-neutral-500 italic">
                {appointment.notes || "El paciente no dejó notas adicionales."}
              </div>
            </div>
          </section>
        </div>

        {/* Col 2: Appointment Details & Notes */}
        <div className="space-y-6">
          <section>
            <h4 className="text-[10px] uppercase font-black text-primary tracking-widest mb-4 flex items-center gap-2">
              <Calendar className="w-3 h-3" /> Detalles de Cita
            </h4>
            <div className="flex gap-4">
              <div className="flex-1 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="text-[9px] font-black uppercase text-primary/60 mb-1">Fecha</p>
                <p className="text-sm font-bold capitalize">{format(new Date(appointment.date + 'T00:00:00'), "EEEE d 'de' MMMM", { locale: es })}</p>
              </div>
              <div className="w-24 p-4 bg-primary/5 rounded-2xl border border-primary/10 text-center">
                <p className="text-[9px] font-black uppercase text-primary/60 mb-1">Hora</p>
                <p className="text-sm font-bold">{appointment.time.substring(0, 5)}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between p-4 bg-neutral-50 dark:bg-slate-800 rounded-2xl border border-border">
              <span className="text-xs font-bold text-neutral-500">Estado Actual</span>
              <StatusBadge status={appointment.status} />
            </div>
          </section>

          <section>
            <h4 className="text-[10px] uppercase font-black text-primary tracking-widest mb-4 flex items-center gap-2">
              <History className="w-3 h-3" /> Notas Clínicas (Privadas)
            </h4>
            <Textarea 
              value={docNotes} 
              onChange={e => setDocNotes(e.target.value)}
              placeholder="Escribe observaciones para el historial médico del paciente..."
              className="min-h-[120px] rounded-2xl text-sm"
            />
            <Button 
              size="sm" 
              className="w-full mt-3 rounded-xl"
              onClick={handleSaveNotes}
              isLoading={isSaving}
            >
              Guardar Nota Interna
            </Button>
          </section>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t font-bold">
        {appointment.status === "pending" && (
           <Button variant="accent" onClick={onConfirm} className="rounded-xl flex-1 md:flex-none">
             <CheckCircle2 className="w-4 h-4 mr-2" /> Confirmar Cita
           </Button>
        )}
        <Button variant="outline" onClick={onReschedule} className="rounded-xl flex-1 md:flex-none">
          <Calendar className="w-4 h-4 mr-2" /> Reagendar
        </Button>
        <Button variant="outline" onClick={onCancel} className="rounded-xl flex-1 md:flex-none text-rose-500 hover:bg-rose-50">
          <FileText className="w-4 h-4 mr-2" /> Cancelar Cita
        </Button>
        <div className="flex-1" />
        <Button variant="ghost" onClick={onClose} className="rounded-xl">Cerrar</Button>
      </div>
    </Modal>
  );
}
