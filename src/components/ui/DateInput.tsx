import React from "react";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * Componente de entrada de fecha estandarizado para el panel administrativo.
 * Utiliza el patrón .date-input-wrapper definido en globals.css para asegurar
 * que el icono de calendario sea visible y el date picker se active correctamente.
 */
export function DateInput({ label, error, className, ...props }: DateInputProps) {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block ml-1">
          {label}
        </label>
      )}
      <div className="date-input-wrapper group">
        <input
          type="date"
          className={cn(
            "w-full h-12 px-4 rounded-2xl border border-border bg-bg-primary dark:bg-bg-secondary/50 outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold transition-all dark:text-white placeholder:text-neutral-400 dark:placeholder:text-gray-600",
            error ? "border-red-500 focus:ring-red-500/20" : "hover:border-primary/50",
            className
          )}
          {...props}
        />
        <Calendar className="calendar-icon group-focus-within:text-primary" />
      </div>
      {error && (
        <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{error}</p>
      )}
    </div>
  );
}
