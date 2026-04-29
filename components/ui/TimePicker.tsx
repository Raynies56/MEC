"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface TimePickerProps {
  slots: (string | TimeSlot)[];
  selected?: string;
  onSelect: (time: string) => void;
  className?: string;
}

export function TimePicker({ slots, selected, onSelect, className }: TimePickerProps) {
  if (!slots || slots.length === 0) {
    return (
      <div className="p-8 text-center text-neutral-500 rounded-xl border border-dashed border-neutral-300 dark:border-slate-700">
        No hay horarios disponibles para esta fecha.
      </div>
    );
  }

  const normalizedSlots: TimeSlot[] = slots.map(s => 
    typeof s === 'string' ? { time: s, available: true } : s
  );

  // Helper to format "08:00" -> "08:00 AM"
  const formatTimeStr = (t: string) => {
    const [hStr, mStr] = t.split(":");
    let h = parseInt(hStr, 10);
    const suffix = h >= 12 ? "PM" : "AM";
    if (h > 12) h -= 12;
    if (h === 0) h = 12;
    return `${h}:${mStr} ${suffix}`;
  };

  return (
    <div className={cn("grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3", className)}>
      {normalizedSlots.map(({ time, available }) => {
        const isSelected = selected === time;
        return (
          <button
            key={time}
            disabled={!available}
            onClick={() => onSelect(time)}
            className={cn(
              "py-3 px-2 rounded-xl text-sm font-medium transition-all border",
              !available && "opacity-50 cursor-not-allowed bg-neutral-100 border-transparent text-neutral-400 dark:bg-slate-800",
              available && !isSelected && "bg-white border-border hover:border-accent hover:text-accent shadow-sm dark:bg-slate-900",
              isSelected && "bg-accent border-accent text-white shadow-md shadow-accent/20"
            )}
          >
            {formatTimeStr(time)}
          </button>
        );
      })}
    </div>
  );
}
