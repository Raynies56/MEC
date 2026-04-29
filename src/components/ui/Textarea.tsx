import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium mb-1.5 text-neutral-600 dark:text-neutral-300">{label}</label>}
        <textarea
          className={cn(
            "flex min-h-[100px] w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm transition-colors",
            "placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 resize-y",
            error && "border-error focus-visible:ring-error/40 focus-visible:border-error",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm text-error mt-1.5">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

