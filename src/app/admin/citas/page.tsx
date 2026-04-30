// /app/admin/citas/page.tsx

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Plus, Search, Download, Trash2, 
  ChevronLeft, ChevronRight, Activity 
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";
import { StatsBar } from "@/components/admin/StatsBar";
import { AppointmentTable } from "@/components/admin/AppointmentTable";
import { EmptyState } from "@/components/admin/EmptyState";
import { DaySchedulePanel } from "@/components/admin/DaySchedulePanel";
import { AppointmentDetailModal } from "@/components/admin/AppointmentDetailModal";
import { RescheduleModal } from "@/components/admin/RescheduleModal";
import { CancelModal } from "@/components/admin/CancelModal";
import { ManualAppointmentModal } from "@/components/admin/ManualAppointmentModal";

import { Appointment, AppointmentStatus } from "@/types/admin";

const TABS = [
  { id: 'today', label: 'Hoy' },
  { id: 'upcoming', label: 'Próximas' },
  { id: 'all', label: 'Todas' },
  { id: 'cancelled', label: 'Canceladas' }
];

export default function AdminCitasPage() {
  // Estado de Datos
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState('today');
  
  // Filtros
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [sidebarDate, setSidebarDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  // Modales
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isManualOpen, setIsManualOpen] = useState(false);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ 
        tab: activeTab, 
        page: page.toString(), 
        limit: '10', 
        search, 
        status: statusFilter 
      });
      const res = await fetch(`/api/admin/appointments?${params.toString()}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAppointments(data.appointments || []);
      setTotal(data.total || 0);
    } catch {
      toast.error("Error al cargar citas");
    } finally {
      setLoading(false);
    }
  }, [activeTab, page, search, statusFilter]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments, refreshKey]);

  const triggerRefresh = () => setRefreshKey(prev => prev + 1);

  const handleConfirm = async (apt: Appointment) => {
    try {
      const res = await fetch(`/api/admin/appointments/${apt.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'confirmed', notify_patient: true })
      });
      if (res.ok) {
        toast.success("Cita confirmada");
        triggerRefresh();
      }
    } catch {
      toast.error("Error al confirmar");
    }
  };

  const handleExportCSV = () => {
    const headers = "Paciente,Telefono,Email,Motivo,Fecha,Hora,Estado\n";
    const rows = appointments.map(a => 
      `${a.patient_name},${a.patient_phone},${a.patient_email},${a.reason},${a.date},${a.time},${a.status}`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `agenda-vision-plena-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto px-6 py-10"
    >
      <StatsBar />

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Main Section — 70% */}
        <div className="flex-1 space-y-8 min-w-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <h1 className="text-4xl font-black text-text-primary dark:text-text-primary tracking-tight">Agenda Médica</h1>
              <p className="text-neutral-500 dark:text-gray-400 font-bold capitalize mt-1 italic">
                {format(new Date(), "EEEE, d 'de' MMMM", { locale: es })}
              </p>
            </div>
            <Button 
                variant="accent" 
                className="h-12 px-6 rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all"
                onClick={() => setIsManualOpen(true)}
            >
              <Plus className="w-5 h-5 mr-2" /> Nueva Cita Manual
            </Button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-10 border-b border-border overflow-x-auto no-scrollbar scroll-smooth">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setPage(1); }}
                className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${
                  activeTab === tab.id ? 'text-primary' : 'text-neutral-400 dark:text-gray-500 hover:text-neutral-600 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(20,184,166,0.4)]" />
                )}
              </button>
            ))}
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-4 bg-bg-card dark:bg-bg-card p-5 rounded-[2rem] border border-border shadow-sm">
            <div className="flex-1 min-w-[240px]">
              <Input 
                placeholder="Buscar por nombre o teléfono..." 
                icon={<Search className="w-4 h-4 text-neutral-400" />} 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="rounded-xl border-none bg-bg-secondary dark:bg-bg-secondary"
              />
            </div>
            <select 
              className="h-11 px-4 bg-bg-secondary dark:bg-bg-secondary border-none rounded-xl text-[10px] font-black uppercase tracking-widest outline-none ring-primary/20 focus:ring-2 text-[var(--text-primary)]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Status: Todos</option>
              <option value="pending">Pendientes</option>
              <option value="confirmed">Confirmadas</option>
              <option value="rescheduled">Reagendadas</option>
            </select>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => { setSearch(""); setStatusFilter(""); setPage(1); }} className="h-11 rounded-xl px-4">
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportCSV} className="h-11 rounded-xl px-4 font-bold text-xs">
                <Download className="w-4 h-4 mr-2" /> EXPORTAR
              </Button>
            </div>
          </div>

          {/* Table or Empty State */}
          {appointments.length > 0 ? (
            <AppointmentTable 
              appointments={appointments} 
              isLoading={loading} 
              activeTab={activeTab}
              onConfirm={handleConfirm}
              onView={(a) => { setSelectedAppt(a); setIsDetailOpen(true); }}
              onReschedule={(a) => { setSelectedAppt(a); setIsRescheduleOpen(true); }}
              onCancel={(a) => { setSelectedAppt(a); setIsCancelOpen(true); }}
            />
          ) : (
            <EmptyState tab={activeTab} hasFilters={!!(search || statusFilter)} onClearFilters={() => { setSearch(""); setStatusFilter(""); }} />
          )}

          {/* Pagination */}
          {total > 10 && (
            <div className="flex justify-center gap-3 mt-10">
              {Array.from({ length: Math.ceil(total / 10) }).map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-xl font-bold transition-all border ${
                    page === i + 1 
                      ? 'bg-[var(--primary)] border-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20' 
                      : 'bg-[var(--bg-card)] dark:bg-[var(--bg-card)] text-[var(--text-muted)] hover:border-[var(--primary)]/50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar — 30% */}
        <div className="lg:w-80 shrink-0">
          <DaySchedulePanel 
            selectedDate={sidebarDate}
            onDateChange={setSidebarDate}
            refreshKey={refreshKey}
            onAppointmentClick={(a) => { setSelectedAppt(a); setIsDetailOpen(true); }}
            onRefresh={triggerRefresh}
          />
        </div>
      </div>

      {/* Modals Container */}
      <AppointmentDetailModal 
        isOpen={isDetailOpen} 
        appointment={selectedAppt} 
        onClose={() => setIsDetailOpen(false)} 
        onConfirm={() => selectedAppt && handleConfirm(selectedAppt)}
        onRefresh={triggerRefresh}
        onReschedule={() => { setIsDetailOpen(false); setIsRescheduleOpen(true); }}
        onCancel={() => { setIsDetailOpen(false); setIsCancelOpen(true); }}
      />

      <RescheduleModal 
        isOpen={isRescheduleOpen} 
        appointment={selectedAppt} 
        onClose={() => setIsRescheduleOpen(false)} 
        onSuccess={triggerRefresh} 
      />

      <CancelModal 
        isOpen={isCancelOpen} 
        appointment={selectedAppt} 
        onClose={() => setIsCancelOpen(false)} 
        onSuccess={triggerRefresh} 
      />

      <ManualAppointmentModal 
        isOpen={isManualOpen} 
        onClose={() => setIsManualOpen(false)} 
        onSuccess={triggerRefresh} 
      />
    </motion.div>
  );
}

