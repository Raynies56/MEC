"use client";

import React, { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Plus, Search, Filter, Download, Trash2, Calendar, LayoutGrid, List } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/Toast";
import { Appointment } from "@/types";

import { AppointmentTable } from "@/components/dashboard/AppointmentTable";
import { AppointmentDetailModal } from "@/components/dashboard/AppointmentDetailModal";
import { RescheduleModal } from "@/components/dashboard/RescheduleModal";
import { CancelModal } from "@/components/dashboard/CancelModal";
import { DaySchedulePanel } from "@/components/dashboard/DaySchedulePanel";

const TABS = [
  { id: 'today', label: 'Hoy' },
  { id: 'upcoming', label: 'Próximas' },
  { id: 'all', label: 'Todas' },
  { id: 'cancelled', label: 'Canceladas' }
];

export default function DashboardCitas() {
  // State
  const [activeTab, setActiveTab] = useState('today');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  
  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  
  // Modals state
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        tab: activeTab,
        page: page.toString(),
        limit: '10',
        search: search,
        status: statusFilter
      });
      const res = await fetch(`/api/appointments?${params.toString()}`);
      const data = await res.json();
      setAppointments(data.data || []);
      setTotal(data.total || 0);
    } catch {
      toast.error("Error al cargar citas");
    } finally {
      setLoading(false);
    }
  }, [activeTab, page, search, statusFilter]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Handlers
  const handleViewDetail = (appt: Appointment) => {
    setSelectedAppt(appt);
    setIsDetailOpen(true);
  };

  const handleOpenReschedule = (appt: Appointment) => {
    setSelectedAppt(appt);
    setIsRescheduleOpen(true);
  };

  const handleOpenCancel = (appt: Appointment) => {
    setSelectedAppt(appt);
    setIsCancelOpen(true);
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        toast.success(`Cita ${status === 'confirmed' ? 'confirmada' : 'actualizada'}`);
        fetchAppointments();
        setIsDetailOpen(false);
      }
    } catch {
      toast.error("Error al actualizar estado");
    }
  };

  const handleExportCSV = () => {
    // Basic CSV logic
    const headers = "Paciente,Telefono,Email,Motivo,Fecha,Hora,Estado\n";
    const rows = appointments.map(a => `${a.patient_name},${a.patient_phone},${a.patient_email},${a.reason},${a.date},${a.time},${a.status}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `citas-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setPage(1);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text mb-1">Gestión de Citas</h1>
          <p className="text-text-soft font-medium capitalize">
            {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
          </p>
        </div>
        <Button variant="accent" className="shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5 mr-2" /> Nueva Cita Manual
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
        
        {/* Main Column */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Tabs */}
          <div className="flex items-center gap-8 border-b border-border overflow-x-auto no-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setPage(1); }}
                className={`
                  pb-4 text-sm font-bold transition-all relative
                  ${activeTab === tab.id ? 'text-primary' : 'text-text-muted hover:text-text-soft'}
                `}
              >
                {tab.label} {activeTab === tab.id && `(${total})`}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-4 bg-bg-card p-4 rounded-2xl border border-border">
            <div className="flex-1 min-w-[200px]">
              <Input 
                placeholder="Nombre o teléfono..." 
                icon={<Search className="w-4 h-4 text-text-muted" />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select 
              className="h-11 px-4 bg-bg-secondary border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="pending">Pendientes</option>
              <option value="confirmed">Confirmadas</option>
              <option value="rescheduled">Reagendadas</option>
            </select>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={clearFilters} className="h-11">
                <Trash2 className="w-4 h-4 mr-2" /> Limpiar
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportCSV} className="h-11">
                <Download className="w-4 h-4 mr-2" /> Exportar
              </Button>
            </div>
          </div>

          {/* Table */}
          <AppointmentTable 
            appointments={appointments} 
            loading={loading}
            onView={handleViewDetail}
            onReschedule={handleOpenReschedule}
            onCancel={handleOpenCancel}
          />

          {/* Pagination */}
          {total > 10 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(total / 10) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-xl font-bold transition-all ${
                    page === i + 1 ? 'bg-primary text-white' : 'bg-bg-card border border-border text-text-soft hover:bg-bg-secondary'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Panel */}
        <div className="hidden lg:block">
           <DaySchedulePanel 
            date={new Date()} 
            onSlotClick={(id) => {
              const appt = appointments.find(a => a.id === id);
              if (appt) handleViewDetail(appt);
            }} 
          />
        </div>

      </div>

      {/* Modals */}
      <AppointmentDetailModal 
        isOpen={isDetailOpen} 
        appt={selectedAppt} 
        onClose={() => setIsDetailOpen(false)}
        onStatusChange={updateStatus}
        onReschedule={handleOpenReschedule}
        onCancel={handleOpenCancel}
      />
      
      <RescheduleModal 
        isOpen={isRescheduleOpen} 
        appt={selectedAppt} 
        onClose={() => setIsRescheduleOpen(false)}
        onSuccess={fetchAppointments}
      />

      <CancelModal 
        isOpen={isCancelOpen} 
        appt={selectedAppt} 
        onClose={() => setIsCancelOpen(false)}
        onSuccess={fetchAppointments}
      />

    </div>
  );
}

