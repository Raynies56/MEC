"use client";

import React from "react";
import { Appointment } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Eye, Calendar, XCircle, CheckCircle2, MoreVertical, Phone } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface AppointmentTableProps {
  appointments: Appointment[];
  loading: boolean;
  onView: (appt: Appointment) => void;
  onReschedule: (appt: Appointment) => void;
  onCancel: (appt: Appointment) => void;
}

export function AppointmentTable({ 
  appointments, 
  loading, 
  onView, 
  onReschedule, 
  onCancel 
}: AppointmentTableProps) {
  
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 w-full bg-neutral-100 dark:bg-slate-800 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-neutral-300 dark:border-slate-700">
        <div className="bg-neutral-100 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="text-neutral-400" />
        </div>
        <p className="text-neutral-500 font-medium">No se encontraron citas con esos filtros</p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed': return <Badge variant="success">Confirmada</Badge>;
      case 'pending': return <Badge variant="warning">Pendiente</Badge>;
      case 'cancelled': return <Badge variant="error">Cancelada</Badge>;
      case 'rescheduled': return <Badge variant="primary">Reagendada</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-neutral-50 dark:bg-slate-800/50 border-b border-border text-neutral-500 font-semibold">
            <tr>
              <th className="px-6 py-4">Paciente</th>
              <th className="px-6 py-4">Motivo</th>
              <th className="px-6 py-4">Fecha y Hora</th>
              <th className="px-6 py-4 text-center">1ra Visita</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {appointments.map((appt) => (
              <tr key={appt.id} className="hover:bg-neutral-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-semibold text-neutral-900 dark:text-white">{appt.patient_name}</div>
                  <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3" />
                    {appt.patient_phone}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium px-2 py-1 bg-neutral-100 dark:bg-slate-800 rounded-md">
                    {appt.reason}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium capitalize">
                  {format(new Date(appt.date + 'T00:00:00'), "d 'de' MMM", { locale: es })}
                  <span className="text-neutral-400 font-normal ml-2">{appt.time.substring(0, 5)}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  {appt.is_first_visit ? (
                    <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : (
                    <span className="text-neutral-300">X</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(appt.status || 'pending')}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0" 
                      onClick={() => onView(appt)}
                      title="Ver detalle"
                    >
                      <Eye className="w-4 h-4 text-primary" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0" 
                      onClick={() => onReschedule(appt)}
                      title="Reagendar"
                    >
                      <Calendar className="w-4 h-4 text-neutral-500" />
                    </Button>
                    {appt.status !== 'cancelled' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        onClick={() => onCancel(appt)}
                        title="Cancelar"
                      >
                        <XCircle className="w-4 h-4 text-error" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
