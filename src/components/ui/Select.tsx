"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface SelectProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  error?: string;
}

export const Select = ({
  options,
  value,
  onChange,
  placeholder = "Selecciona una opción",
  className,
  label,
  error
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full" ref={containerRef}>
      {label && (
        <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-1.5 ml-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex h-11 w-full items-center justify-between rounded-xl border border-transparent bg-bg-secondary dark:bg-bg-secondary px-4 py-2 text-xs font-black uppercase tracking-widest transition-all",
            "hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary/20",
            isOpen && "ring-2 ring-primary/20 border-primary/20",
            error && "border-error/50 ring-error/10",
            className
          )}
        >
          <span className={cn(
            "truncate",
            !selectedOption && "text-neutral-400"
          )}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={cn(
            "h-4 w-4 text-neutral-500 transition-transform duration-200",
            isOpen && "rotate-180"
          )} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl"
            >
              <div className="py-1">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors",
                      "hover:bg-primary/10 hover:text-primary",
                      value === opt.value ? "bg-primary/5 text-primary" : "text-neutral-600 dark:text-neutral-300"
                    )}
                  >
                    {opt.label}
                    {value === opt.value && <Check className="h-3.5 w-3.5" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {error && (
        <p className="mt-1.5 ml-1 text-[10px] font-bold text-error uppercase tracking-tight italic">
          {error}
        </p>
      )}
    </div>
  );
};

