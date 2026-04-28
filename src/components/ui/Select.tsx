import React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  options: { label: string; value: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium mb-1.5 text-neutral-600 dark:text-neutral-300">{label}</label>}
        <select
          className={cn(
            "flex h-12 w-full appearance-none rounded-xl border border-input bg-transparent px-4 py-2 text-sm transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-error focus-visible:ring-error/40 focus-visible:border-error",
            className
          )}
          ref={ref}
          {...props}
        >
          <option value="" disabled hidden>Selecciona una opción</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-error mt-1.5">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";

