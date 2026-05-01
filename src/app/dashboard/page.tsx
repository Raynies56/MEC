"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Users, CalendarCheck, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function DashboardOverview() {
  // In a real app we would fetch this via a useDashboardStats hook
  const stats = [
    { name: "Citas Hoy", value: "8", icon: Users, color: "text-primary" },
    { name: "Confirmadas", value: "24", icon: CalendarCheck, color: "text-success" },
    { name: "Pendientes", value: "5", icon: Clock, color: "text-warning" },
    { name: "Canceladas", value: "1", icon: AlertCircle, color: "text-error" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Resumen de Actividad</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-soft mb-1">{stat.name}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 bg-bg-secondary rounded-xl ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Citas Recientes</CardTitle>
            <Link href="/dashboard/citas">
              <span className="text-sm text-primary hover:underline font-medium">Ver todas</span>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border bg-bg-secondary">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {["MJ", "RC", "AL"][i]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{["María Jiménez", "Roberto Castro", "Ana López"][i]}</p>
                      <p className="text-xs text-text-soft">Consulta General Oftalmológica</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Hoy, {["09:00 AM", "11:30 AM", "02:00 PM"][i]}</p>
                    <span className="inline-flex text-[10px] font-semibold px-2 py-1 rounded-full bg-success/10 text-success mt-1">
                      Confirmada
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/dashboard/horarios" className="block">
              <Button variant="outline" className="w-full justify-start h-auto py-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-text-muted" />
                  <div className="text-left">
                    <p className="font-semibold text-sm">Configurar Horarios</p>
                    <p className="text-xs text-text-soft font-normal mt-0.5">Ajusta tu disponibilidad</p>
                  </div>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/calendario" className="block">
              <Button variant="outline" className="w-full justify-start h-auto py-4">
                <div className="flex items-center gap-3">
                  <CalendarCheck className="w-5 h-5 text-text-muted" />
                  <div className="text-left">
                    <p className="font-semibold text-sm">Ver Calendario Mensual</p>
                    <p className="text-xs text-text-soft font-normal mt-0.5">Planifica tus semanas</p>
                  </div>
                </div>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

