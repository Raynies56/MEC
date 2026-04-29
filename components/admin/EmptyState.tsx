// /components/admin/EmptyState.tsx

"use client";

import { Search, Calendar, Inbox } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  tab: string;
  hasFilters: boolean;
  onClearFilters?: () => void;
}

export function EmptyState({ tab, hasFilters, onClearFilters }: Props) {
  const isSearch = hasFilters;

  const content = {
    today: {
      icon: <Calendar className="w-12 h-12 text-neutral-300" />,
      title: "Sin citas para hoy",
      desc: "No hay citas programadas para el día de hoy."
    },
    upcoming: {
      icon: <Inbox className="w-12 h-12 text-neutral-300" />,
      title: "Sin citas próximas",
      desc: "No tienes citas agendadas para los próximos días."
    },
    cancelled: {
      icon: <Inbox className="w-12 h-12 text-neutral-300" />,
      title: "Sin cancelaciones",
      desc: "No hay registros de citas canceladas."
    },
    default: {
      icon: <Search className="w-12 h-12 text-neutral-300" />,
      title: "No se encontraron resultados",
      desc: "Prueba ajustando los filtros o el término de búsqueda."
    }
  };

  const current = isSearch ? content.default : (content[tab as keyof typeof content] || content.default);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="mb-6 p-6 bg-neutral-50 dark:bg-slate-800 rounded-full">
        {current.icon}
      </div>
      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{current.title}</h3>
      <p className="text-neutral-500 max-w-sm mx-auto mb-8">{current.desc}</p>
      
      {isSearch && onClearFilters && (
        <Button variant="outline" onClick={onClearFilters}>
          Limpiar todos los filtros
        </Button>
      )}
    </div>
  );
}
