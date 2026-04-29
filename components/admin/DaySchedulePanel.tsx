// /components/admin/DaySchedulePanel.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Appointment, TimeSlot } from "@/types/admin";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Clock, Lock, Plus, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { BlockSlotModal } from "./BlockSlotModal";
import { toast } from "react-hot-toast";

interface Props {
  selectedDate: string;
  onAppointmentClick: (apt: Appointment) => void;
  onRefresh: () => void;
  refreshKey?: number;
}

export function DaySchedulePanel({ selectedDate, onAppointmentClick, onRefresh, refreshKey }: Props) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBlockModal, setShowBlockModal] = useState(false);

  const fetchSchedule = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/appointments/today-schedule?date=${selectedDate}`);
      const data = await res.json();
      setSlots(data);
    } catch {
      toast.error("Error al cargar agenda lateral");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [selectedDate, refreshKey]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-border flex flex-col h-full shadow-sm sticky top-24 max-h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="p-6 border-b border-border bg-neutral-50/50 dark:bg-slate-800/50">
        <div className="flex items-center justify-between mb-2">
           <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
             <Activity className="w-3 h-3 text-primary" /> Agenda del Día
           </h3>
           <div className="flex gap-1">
             <button className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all"><ChevronLeft className="w-4 h-4 text-neutral-400" /></button>
             <button className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all"><ChevronRight className="w-4 h-4 text-neutral-400" /></button>
           </div>
        </div>
        <p className="text-sm font-bold text-neutral-900 dark:text-white capitalize">
          {format(new Date(selectedDate + 'T00:00:00'), "EEEE, d 'de' MMMM", { locale: es })}
        </p>
      </div>

      {/* Slots List */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3 no-scrollbar">
        {isLoading ? (
          <LoadingSkeleton variant="slots" count={10} />
        ) : slots.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-[10px] uppercase font-black text-neutral-400 tracking-tighter">No hay horarios activos</p>
          </div>
        ) : (
          slots.map((slot) => {
            const isAppt = !!slot.appointment;
            const isBlocked = slot.blocked;

            return (
              <div 
                key={slot.time}
                onClick={() => isAppt && onAppointmentClick(slot.appointment!)}
                className={`group relative flex items-center gap-4 p-3.5 rounded-2xl border transition-all duration-300 ${
                  isAppt 
                    ? 'bg-primary/5 border-primary/20 cursor-pointer hover:bg-primary/10 hover:translate-x-1 shadow-sm shadow-primary/5' 
                    : isBlocked 
                      ? 'bg-neutral-50 border-neutral-100 dark:bg-slate-800/50 dark:border-slate-700 opacity-60' 
                      : 'bg-transparent border-dashed border-neutral-200 dark:border-slate-800 hover:border-primary/30'
                }`}
              >
                <div className="flex flex-col items-center justify-center w-12 border-r border-border/50 pr-4 shrink-0">
                  <span className="text-[10px] font-black text-neutral-400">{slot.time}</span>
                </div>

                <div className="flex-1 min-w-0">
                  {isAppt ? (
                    <div className="animate-in fade-in slide-in-from-left-2 transition-all">
                      <p className="text-xs font-black text-neutral-900 dark:text-white truncate">
                        {slot.appointment?.patient_name}
                      </p>
                      <p className="text-[9px] font-black uppercase text-primary tracking-widest mt-0.5 truncate">
                        {slot.appointment?.reason}
                      </p>
                    </div>
                  ) : isBlocked ? (
                    <div className="flex items-center gap-2 text-neutral-400 italic">
                      <Lock className="w-3 h-3" />
                      <span className="text-[10px] font-bold truncate">{slot.blockReason || "Reservado"}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-neutral-300 font-bold italic uppercase tracking-widest">Disponible</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setShowBlockModal(true); }}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-neutral-100 hover:bg-primary hover:text-white text-neutral-400 transition-all scale-75 group-hover:scale-100"
                      >
                        <Lock className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {isAppt && (
                   <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                   </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-border bg-neutral-50/30">
        <Button 
          variant="outline" 
          className="w-full rounded-xl text-[10px] h-10 font-black uppercase tracking-widest border-dashed hover:border-solid transition-all"
          onClick={() => setShowBlockModal(true)}
        >
          <Lock className="w-3 h-3 mr-2" /> Bloqueo Manual
        </Button>
      </div>

      <BlockSlotModal 
        isOpen={showBlockModal} 
        onClose={() => setShowBlockModal(false)}
        date={selectedDate}
        onSuccess={onRefresh}
      />
    </div>
  );
}
