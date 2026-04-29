// /components/admin/StatusBadge.tsx

"use client";

import { AppointmentStatus } from "@/types/admin";

interface Props {
  status: AppointmentStatus;
}

export function StatusBadge({ status }: Props) {
  const styles = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    cancelled: "bg-rose-100 text-rose-700 border-rose-200",
    rescheduled: "bg-blue-100 text-blue-700 border-blue-200",
  };

  const labels = {
    pending: "Pendiente",
    confirmed: "Confirmada",
    cancelled: "Cancelada",
    rescheduled: "Reagendada",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
