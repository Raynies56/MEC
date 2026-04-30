// /components/admin/BlockSlotModal.tsx

"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "react-hot-toast";
import { Lock, Clock, FileText } from "lucide-react";

interface Props {
  date: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialTime?: string;
}

export function BlockSlotModal({ date, isOpen, onClose, onSuccess, initialTime }: Props) {
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [isFullDay, setIsFullDay] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (initialTime) {
      setTime(initialTime);
      setIsFullDay(false);
    }
  }, [initialTime, isOpen]);

  const handleBlock = async () => {
    if (!isFullDay && !time) return toast.error("Indica una hora");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/blocked-slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          date, 
          time: isFullDay ? null : time, 
          reason 
        })
      });
      if (res.ok) {
        toast.success("Horario bloqueado");
        onSuccess();
        onClose();
        setTime(""); setReason("");
      }
    } catch {
      toast.error("Error al bloquear");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Bloquear Horario" size="sm">
      <div className="space-y-6 py-4">
        <div className="flex p-1 bg-bg-secondary dark:bg-bg-secondary rounded-xl">
          <button 
            onClick={() => setIsFullDay(false)}
            className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${!isFullDay ? 'bg-bg-card shadow-sm dark:text-text-primary' : 'text-neutral-400'}`}
          >
            Hora específica
          </button>
          <button 
            onClick={() => setIsFullDay(true)}
            className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${isFullDay ? 'bg-bg-card shadow-sm dark:text-text-primary' : 'text-neutral-400'}`}
          >
            Todo el día
          </button>
        </div>

        {!isFullDay && !initialTime && (
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2 block">Hora (HH:mm)</label>
            <div className="relative">
              <Input 
                value={time} 
                onChange={e => setTime(e.target.value)}
                placeholder="Ej: 10:30"
                className="pl-12"
              />
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
            </div>
          </div>
        )}

        {initialTime && !isFullDay && (
          <div className="p-4 bg-bg-secondary dark:bg-bg-secondary rounded-2xl border border-border">
             <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Hora seleccionada</p>
             <p className="text-sm font-bold text-text-primary dark:text-text-primary flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> {initialTime}
             </p>
          </div>
        )}

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2 block">Motivo / Razón</label>
          <div className="relative">
            <Input 
              value={reason} 
              onChange={e => setReason(e.target.value)}
              placeholder="Ej: Almuerzo, Quirófano..."
              className="pl-12"
            />
            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t font-bold">
          <Button variant="ghost" onClick={onClose} className="rounded-xl">Cancelar</Button>
          <Button 
            onClick={handleBlock} 
            isLoading={isSubmitting}
            className="rounded-xl px-8 shadow-lg shadow-primary/20"
          >
            <Lock className="w-4 h-4 mr-2" />
            Bloquear
          </Button>
        </div>
      </div>
    </Modal>
  );
}

