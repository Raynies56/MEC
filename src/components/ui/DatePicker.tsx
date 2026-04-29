"use client";

import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
  disabledDates?: Date[];
  disabledDaysOfWeek?: number[];
  className?: string;
}

export function DatePicker({ selected, onSelect, disabledDates, disabledDaysOfWeek = [0], className }: DatePickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);


  
  return (
    <div className={cn("p-3 rounded-2xl border border-neutral-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50", className)}>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        locale={es}
        disabled={[
          { before: today },
          (date) => disabledDaysOfWeek.includes(date.getDay()),
          ...(disabledDates || []),
        ]}
        className="rdp"
        modifiers={{
          today: today,
        }}
        modifiersClassNames={{
          today: "font-bold text-accent",
        }}
      />
    </div>
  );
}

