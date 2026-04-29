"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Clock, Plus, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";

interface SlotData {
  time: string;
  type: 'appointment' | 'blocked' | 'free';
  data: any;
}

interface Props {
  date: Date;
  onSlotClick: (apptId: string) => void;
}

export function DaySchedulePanel({ date, onSlotClick }: Props) {
  const [schedule, setSchedule] = useState<SlotData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [blockReason, setBlockReason] = useState("");
  const [blockTime, setBlockTime] = useState("");

  const formattedDate = format(date, "EEEE, d 'de' MMMM", { locale: es });

  const fetchDaySchedule = async () => {
    setLoading(true);
    try {
      const d = format(date, 'yyyy-MM-dd');
      const res = await fetch(`/api/appointments/today-schedule?date=${d}`);
      const data = await res.json();
      setSchedule(data.schedule || []);
    } catch {
      toast.error("Error al cargar horarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDaySchedule();
  }, [date]);

  const handleBlockSlot = async () => {
    if (!blockTime) return;
    try {
      const res = await fetch('/api/blocked-slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: format(date, 'yyyy-MM-dd'),
          time: blockTime,
          reason: blockReason
        })
      });
      if (res.ok) {
        toast.success("Horario bloqueado");
        setIsBlockModalOpen(false);
        setBlockReason("");
        fetchDaySchedule();
      }
    } catch {
      toast.error("Error al bloquear");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border flex flex-col h-full shadow-sm">
      <div className="p-6 border-b border-border">
        <h3 className="font-bold flex items-center gap-2 text-lg">
          <Clock className="w-5 h-5 text-primary" /> Horarios de hoy
        </h3>
        <p className="text-sm text-neutral-500 capitalize mt-1">{formattedDate}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {loading ? (
          Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-14 bg-neutral-50 dark:bg-slate-800 animate-pulse rounded-xl" />
          ))
        ) : (
          schedule.map((slot) => {
            const isAppt = slot.type === 'appointment';
            const isBlocked = slot.type === 'blocked';

            return (
              <div 
                key={slot.time}
                onClick={() => isAppt && onSlotClick(slot.data.id)}
                className={`
                  flex items-center gap-4 p-3 rounded-xl border transition-all
                  ${isAppt ? 'bg-primary/5 border-primary/20 cursor-pointer hover:bg-primary/10' : 
                    isBlocked ? 'bg-neutral-100 border-neutral-200 dark:bg-slate-800/50 dark:border-slate-700 opacity-70' : 
                    'bg-white border-transparent border-dashed border-neutral-200 dark:bg-slate-900 dark:border-slate-800'}
                `}
              >
                <span className="text-xs font-bold text-neutral-400 w-10">
                  {slot.time}
                </span>
                
                <div className="flex-1 min-w-0">
                  {isAppt ? (
                    <div className="truncate">
                      <p className="text-sm font-bold truncate">{slot.data.patient_name}</p>
                      <p className="text-[10px] text-primary font-medium truncate uppercase">{slot.data.reason}</p>
                    </div>
                  ) : isBlocked ? (
                    <div className="flex items-center gap-2 text-neutral-400">
                      <Lock className="w-3 h-3" />
                      <span className="text-xs font-medium italic">{slot.data.reason || "Bloqueado"}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-neutral-300 font-medium italic">Libre</span>
                  )}
                </div>

                {!isAppt && !isBlocked && (
                   <button 
                    onClick={(e) => { e.stopPropagation(); setBlockTime(slot.time); setIsBlockModalOpen(true); }}
                    className="p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-slate-800 text-neutral-300 hover:text-primary transition-colors"
                   >
                     <Plus className="w-4 h-4" />
                   </button>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="p-4 border-t border-border">
        <Button 
          variant="outline" 
          className="w-full text-xs h-9 border-dashed" 
          onClick={() => { setBlockTime(""); setIsBlockModalOpen(true); }}
        >
          <Lock className="w-3 h-3 mr-2" /> Bloquear horario manual
        </Button>
      </div>

      {/* Block Modal */}
      <Modal isOpen={isBlockModalOpen} onClose={() => setIsBlockModalOpen(false)} title="Bloquear Horario" size="sm">
        <div className="space-y-4 py-4">
          <Input 
            label="Hora (Ej: 09:00)" 
            value={blockTime} 
            onChange={(e) => setBlockTime(e.target.value)}
            placeholder="HH:mm"
          />
          <Input 
            label="Razón del bloqueo" 
            value={blockReason} 
            onChange={(e) => setBlockReason(e.target.value)}
            placeholder="Ej: Almuerzo, Procedimiento..."
          />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" onClick={() => setIsBlockModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleBlockSlot}>Bloquear</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
