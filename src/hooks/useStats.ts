import { useMemo } from "react";
import { Appointment } from "@/types/admin";

export function useStats(appointments: Appointment[]) {
  return useMemo(() => {
    const hoy = new Date();
    
    // Función para comparar solo fecha (año/mes/día)
    const mismaFecha = (dateStr: string) => {
      // Usamos el formato YYYY-MM-DD directamente
      const [y, m, d] = dateStr.split('-').map(Number);
      return y === hoy.getFullYear() &&
             (m - 1) === hoy.getMonth() &&
             d === hoy.getDate();
    };

    // Calcular límites de la semana (Lunes a Domingo)
    const inicioSemana = new Date(hoy);
    const day = hoy.getDay();
    // En JS 0 es Domingo, 1 es Lunes...
    // Queremos que Lunes sea el inicio.
    const diff = hoy.getDate() - (day === 0 ? 6 : day - 1);
    inicioSemana.setDate(diff);
    inicioSemana.setHours(0, 0, 0, 0);

    const finSemana = new Date(inicioSemana);
    finSemana.setDate(inicioSemana.getDate() + 6);
    finSemana.setHours(23, 59, 59, 999);

    const activas = appointments.filter(c => c.status !== 'cancelled');

    return {
      citasHoy: activas.filter(c => mismaFecha(c.date)).length,
      pendientes: appointments.filter(c => ['nueva', 'pending'].includes(c.status)).length,
      estaSemana: activas.filter(c => {
        const f = new Date(c.date + 'T00:00:00');
        return f >= inicioSemana && f <= finSemana;
      }).length,
      esteMes: activas.filter(c => {
        const f = new Date(c.date + 'T00:00:00');
        return f.getMonth() === hoy.getMonth() && f.getFullYear() === hoy.getFullYear();
      }).length
    };
  }, [appointments]);
}
