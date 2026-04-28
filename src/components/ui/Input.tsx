import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium mb-1.5 text-neutral-600 dark:text-neutral-300">{label}</label>}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-12 w-full rounded-xl border border-input bg-transparent px-4 py-2 text-sm transition-colors",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-10",
              error && "border-error focus-visible:ring-error/40 focus-visible:border-error",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-error mt-1.5">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

