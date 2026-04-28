// /components/admin/ManualAppointmentModal.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DatePicker } from "@/components/ui/DatePicker";
import { TimePicker } from "@/components/ui/TimePicker";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { User, Phone, Mail, Calendar, Clock, Bell, FileText } from "lucide-react";
import { AppointmentReason, TimeSlot } from "@/types/admin";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const REASONS: AppointmentReason[] = [
  'Consulta General', 'Evaluación de Lentes', 'Dolor Ocular', 
  'Visión Borrosa', 'Seguimiento', 'Glaucoma', 'Cataratas', 
  'Emergencia Ocular', 'Otro'
];

export function ManualAppointmentModal({ isOpen, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    reason: 'Consulta General' as AppointmentReason,
    date: undefined as Date | undefined,
    time: "",
    notes: "",
    notify: true,
  });
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (formData.date && isOpen) {
      const fetchSlots = async () => {
        setIsLoadingSlots(true);
        try {
          const d = format(formData.date!, 'yyyy-MM-dd');
          const res = await fetch(`/api/admin/appointments/today-schedule?date=${d}`);
          const data = await res.json();
          setSlots(data);
        } catch {
          toast.error("Error al cargar horarios");
        } finally {
          setIsLoadingSlots(false);
        }
      };
      fetchSlots();
    }
  }, [formData.date, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      return toast.error("Completa los campos obligatorios");
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_name: formData.name,
          patient_phone: formData.phone,
          patient_email: formData.email,
          reason: formData.reason,
          date: format(formData.date, 'yyyy-MM-dd'),
          time: formData.time,
          notes: formData.notes,
          status: 'confirmed'
        })
      });
      if (res.ok) {
        toast.success("Cita registrada y confirmada");
        onSuccess();
        onClose();
        setFormData({ name: "", phone: "", email: "", reason: 'Consulta General', date: undefined, time: "", notes: "", notify: true });
      }
    } catch {
      toast.error("Error al registrar");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registrar Cita Manual" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-black text-primary tracking-widest flex items-center gap-2">
              <User className="w-3 h-3" /> Datos del Paciente
            </h4>
            <Input 
              label="Nombre Completo *" 
              value={formData.name} 
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Juan Pérez" 
            />
            <div className="grid grid-cols-2 gap-3">
              <Input 
                label="WhatsApp *" 
                value={formData.phone} 
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="809..." 
              />
              <Input 
                label="Email *" 
                value={formData.email} 
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="juan@email.com" 
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2 block">Motivo *</label>
              <select 
                className="w-full h-12 px-4 rounded-xl border border-border bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                value={formData.reason}
                onChange={e => setFormData({ ...formData, reason: e.target.value as AppointmentReason })}
              >
                {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-black text-primary tracking-widest flex items-center gap-2">
              <Calendar className="w-3 h-3" /> Fecha y Hora
            </h4>
            <div className="flex justify-center border rounded-2xl p-2 bg-neutral-50 dark:bg-slate-800/50">
              <DatePicker 
                selected={formData.date} 
                onSelect={d => setFormData({ ...formData, date: d, time: "" })}
              />
            </div>
            {formData.date && (
              <div className="animate-in fade-in slide-in-from-top-2">
                <TimePicker 
                  slots={slots.filter(s => s.available).map(s => s.time)} 
                  selected={formData.time} 
                  onSelect={t => setFormData({ ...formData, time: t })} 
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2 mb-2">
              <FileText className="w-3 h-3" /> Notas Internas
            </label>
            <Textarea 
              placeholder="Observaciones clínicas o antecedentes..." 
              value={formData.notes} 
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              className="rounded-xl min-h-[80px]"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-bold text-emerald-800 dark:text-emerald-200">Enviar confirmación automática por correo</span>
            </div>
            <input 
              type="checkbox" 
              checked={formData.notify} 
              onChange={e => setFormData({ ...formData, notify: e.target.checked })}
              className="w-5 h-5 rounded-lg text-emerald-600 focus:ring-emerald-600"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t font-bold">
          <Button variant="ghost" onClick={onClose} className="rounded-xl">Cancelar</Button>
          <Button 
            type="submit"
            disabled={!formData.date || !formData.time || !formData.name}
            isLoading={isSubmitting}
            className="rounded-xl px-12 shadow-lg shadow-primary/20"
          >
            Registrar Paciente
          </Button>
        </div>
      </form>
    </Modal>
  );
}

