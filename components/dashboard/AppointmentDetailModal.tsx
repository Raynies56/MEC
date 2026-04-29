"use client";

import React, { useState } from "react";
import { Appointment } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Textarea } from "@/components/ui/Textarea";
import { Phone, Mail, Calendar, Clock, User, FileText, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "@/components/ui/Toast";

interface Props {
  appt: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (id: string, status: string) => void;
  onReschedule: (appt: Appointment) => void;
  onCancel: (appt: Appointment) => void;
}

export function AppointmentDetailModal({ appt, isOpen, onClose, onStatusChange, onReschedule, onCancel }: Props) {
  const [internalNotes, setInternalNotes] = useState(appt?.doctor_notes || "");
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (appt) setInternalNotes(appt.doctor_notes || "");
  }, [appt]);

  if (!appt) return null;

  const handleSaveNotes = async () => {
    if (!appt.id) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/appointments/${appt.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doctor_notes: internalNotes })
      });
      if (res.ok) {
        toast.success("Nota guardada correctamente");
      } else {
        throw new Error();
      }
    } catch {
      toast.error("Error al guardar nota");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalle de la Cita" size="lg">
      <div className="space-y-8 py-4">
        
        {/* Section: Patient */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-4 flex items-center gap-2">
              <User className="w-3 h-3" /> Datos del Paciente
            </h4>
            <p className="text-xl font-bold mb-1">{appt.patient_name}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a href={`tel:${appt.patient_phone}`}>
                <Button variant="outline" size="sm" className="h-9 gap-2">
                  <Phone className="w-4 h-4" /> Llamar
                </Button>
              </a>
              <a href={`mailto:${appt.patient_email}`}>
                <Button variant="outline" size="sm" className="h-9 gap-2">
                  <Mail className="w-4 h-4" /> Email
                </Button>
              </a>
            </div>
          </div>
          <div className="bg-neutral-50 dark:bg-slate-800/50 p-4 rounded-2xl flex flex-col justify-center">
             <div className="flex justify-between items-center mb-2">
               <span className="text-sm text-neutral-500">¿Primera visita?</span>
               <Badge variant={appt.is_first_visit ? "primary" : "outline"}>
                 {appt.is_first_visit ? "Sí" : "No"}
               </Badge>
             </div>
             {appt.notes && (
               <div className="mt-2 text-sm italic text-neutral-600 dark:text-neutral-400">
                 "{appt.notes}"
               </div>
             )}
          </div>
        </div>

        {/* Section: Appointment */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-2">Motivo</h4>
            <p className="font-semibold">{appt.reason}</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-2">Fecha y Hora</h4>
            <div className="flex items-center gap-2 font-semibold capitalize">
              <Calendar className="w-4 h-4 text-primary" />
              {format(new Date(appt.date + 'T00:00:00'), "EEEE d 'de' MMMM", { locale: es })}
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-500 mt-1">
              <Clock className="w-3 h-3" /> {appt.time.substring(0, 5)}
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-2">Estado</h4>
            <Badge variant={
              appt.status === 'confirmed' ? 'success' : 
              appt.status === 'pending' ? 'warning' : 'outline'
            } className="text-sm px-3 py-1">
              {appt.status?.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Section: Dr Notes */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-4 flex items-center gap-2">
            <FileText className="w-3 h-3" /> Notas Internas (Privadas)
          </h4>
          <Textarea 
            placeholder="Escribe detalles médicos o recordatorios sobre este paciente..."
            value={internalNotes}
            onChange={(e) => setInternalNotes(e.target.value)}
            className="min-h-[120px] mb-4"
          />
          <Button onClick={handleSaveNotes} isLoading={isSaving} size="sm">
            Guardar Nota Interna
          </Button>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap gap-3 pt-4 border-t justify-end">
          {appt.status === 'pending' && (
            <Button variant="primary" onClick={() => onStatusChange(appt.id!, 'confirmed')}>
              <CheckCircle2 className="w-4 h-4 mr-2" /> Confirmar Cita
            </Button>
          )}
          <Button variant="outline" onClick={() => onReschedule(appt)}>
            <Calendar className="w-4 h-4 mr-2" /> Reagendar
          </Button>
          {appt.status !== 'cancelled' && (
            <Button variant="danger" onClick={() => onCancel(appt)}>
              Cancelar Cita
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
