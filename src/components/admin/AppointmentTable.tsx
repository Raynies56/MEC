// /components/admin/AppointmentTable.tsx

"use client";

import React from "react";
import { Appointment } from "@/types/admin";
import { StatusBadge } from "./StatusBadge";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { Check, Eye, Calendar, X, Phone, Mail, Trash2 } from "lucide-react";
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
  onDelete: (apt: Appointment) => void;
  selectedIds?: string[];
  onToggleSelection?: (id: string) => void;
  onSelectAll?: (ids: string[]) => void;
  activeTab?: string;
}

export function AppointmentTable({ 
  appointments, 
  isLoading, 
  onView, 
  onReschedule, 
  onCancel, 
  onConfirm, 
  onDelete,
  selectedIds = [],
  onToggleSelection,
  onSelectAll,
  activeTab 
}: Props) {
  if (isLoading) return <LoadingSkeleton variant="table" rows={10} />;

  const isAllSelected = appointments.length > 0 && selectedIds.length === appointments.length;

  // Agrupar citas por fecha si estamos en la pestaña "Próximas"
  const groupedAppointments: { [key: string]: Appointment[] } = {};
  if (activeTab === 'upcoming') {
    appointments.forEach(apt => {
      if (!groupedAppointments[apt.date]) groupedAppointments[apt.date] = [];
      groupedAppointments[apt.date].push(apt);
    });
  }

  const renderRow = (apt: Appointment, index: number) => (
    <motion.tr 
      key={apt.id} 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className={`group hover:bg-bg-secondary dark:hover:bg-bg-secondary/50 transition-colors ${
        selectedIds.includes(apt.id) ? 'bg-primary/5' : ''
      }`}
    >
      <td className="px-6 py-5">
        <input 
          type="checkbox" 
          className="w-4 h-4 rounded border-border text-primary focus:ring-primary transition-all cursor-pointer"
          checked={selectedIds.includes(apt.id)}
          onChange={() => onToggleSelection?.(apt.id)}
        />
      </td>
      <td className="px-6 py-5">
        <div className="flex flex-col">
          <span className="font-bold text-neutral-900 dark:text-white capitalize">{apt.patient_name}</span>
          <div className="flex gap-2 mt-1">
            <span className="text-xs text-neutral-400 dark:text-gray-500 flex items-center gap-1"><Phone className="w-3 h-3" /> {apt.patient_phone}</span>
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
          <span className="text-xs text-neutral-400 dark:text-gray-500">{apt.time.substring(0, 5)}</span>
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
              className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
              title="Confirmar"
            >
              <Check className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => onView(apt)}
            className="p-2.5 rounded-xl bg-bg-secondary text-neutral-600 hover:bg-neutral-600 hover:text-white transition-all shadow-sm dark:bg-bg-secondary dark:text-neutral-400"
            title="Ver Detalles"
          >
            <Eye className="w-4 h-4" />
          </button>
          {apt.status !== "cancelled" && (
            <>
              <button 
                onClick={() => onReschedule(apt)}
                className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                title="Reagendar"
              >
                <Calendar className="w-4 h-4" />
              </button>
              <button 
                onClick={() => onCancel(apt)}
                className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                title="Cancelar"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
          <button 
            onClick={() => onDelete(apt)}
            className="p-2.5 rounded-xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-500 hover:bg-red-600 hover:text-white transition-all shadow-sm"
            title="Eliminar permanentemente"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </motion.tr>
  );

  return (
    <div className="bg-bg-card dark:bg-bg-card rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-bg-secondary dark:bg-bg-secondary/50 border-b border-border">
              <th className="px-6 py-5 w-10">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary transition-all cursor-pointer"
                  checked={isAllSelected}
                  onChange={() => onSelectAll?.(isAllSelected ? [] : appointments.map(a => a.id))}
                />
              </th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-gray-500">Paciente</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-gray-500">Motivo</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-gray-500">Fecha y Hora</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-gray-500">Estado</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-gray-500 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            <AnimatePresence>
            {activeTab === 'upcoming' ? (
              Object.entries(groupedAppointments).map(([date, appts]) => (
                <React.Fragment key={date}>
                  <tr className="bg-bg-secondary dark:bg-bg-secondary/30">
                    <td colSpan={6} className="px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                      {format(new Date(date + 'T00:00:00'), "EEEE, d 'de' MMMM", { locale: es })}
                    </td>
                  </tr>
                  {appts.map((apt, idx) => renderRow(apt, idx))}
                </React.Fragment>
              ))
            ) : (
              appointments.map((apt, index) => renderRow(apt, index))
            )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}

