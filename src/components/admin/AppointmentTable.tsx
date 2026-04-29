// /components/admin/AppointmentTable.tsx

"use client";

import React from "react";
import { Appointment } from "@/types/admin";
import { StatusBadge } from "./StatusBadge";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { Check, Eye, Calendar, X, Phone, Mail } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  appointments: Appointment[];
  isLoading: boolean;
  onView: (apt: Appointment) => void;
  onReschedule: (apt: Appointment) => void;
  onCancel: (apt: Appointment) => void;
  onConfirm: (apt: Appointment) => void;
}

export function AppointmentTable({ appointments, isLoading, onView, onReschedule, onCancel, onConfirm }: Props) {
  if (isLoading) return <LoadingSkeleton variant="table" rows={10} />;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50/50 dark:bg-slate-800/50 border-b border-border">
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-neutral-400">Paciente</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-neutral-400">Motivo</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-neutral-400">Fecha y Hora</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-neutral-400">Estado</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-neutral-400 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            <AnimatePresence>
            {appointments.map((apt, index) => (
              <motion.tr 
                key={apt.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="group hover:bg-neutral-50/50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="font-bold text-neutral-900 dark:text-white capitalize">{apt.patient_name}</span>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs text-neutral-400 flex items-center gap-1"><Phone className="w-3 h-3" /> {apt.patient_phone}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">{apt.reason}</span>
                  {apt.is_first_visit && (
                    <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black uppercase rounded-md">Nueva</span>
                  )}
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                      {format(new Date(apt.date + 'T00:00:00'), "d 'de' MMM", { locale: es })}
                    </span>
                    <span className="text-xs text-neutral-400">{apt.time.substring(0, 5)}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <StatusBadge status={apt.status} />
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center justify-end gap-2">
                    {apt.status === "pending" && (
                      <button 
                        onClick={() => onConfirm(apt)}
                        className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                        title="Confirmar"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => onView(apt)}
                      className="p-2.5 rounded-xl bg-neutral-100 text-neutral-600 hover:bg-neutral-600 hover:text-white transition-all shadow-sm dark:bg-slate-800 dark:text-neutral-400"
                      title="Ver Detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {apt.status !== "cancelled" && (
                      <>
                        <button 
                          onClick={() => onReschedule(apt)}
                          className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                          title="Reagendar"
                        >
                          <Calendar className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => onCancel(apt)}
                          className="p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                          title="Cancelar"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
                </motion.tr>
            ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}

