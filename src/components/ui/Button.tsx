import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {

    const baseStyles = [
      "inline-flex items-center justify-center font-medium",
      "transition-all duration-200 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
      "disabled:opacity-50 disabled:pointer-events-none",
      "active:scale-[0.97]",
      "select-none",
    ].join(" ");

    const variants = {
      primary: [
        "bg-[var(--primary)] text-white",
        "hover:bg-[var(--primary-hover)] hover:shadow-lg hover:shadow-[var(--primary)]/20",
        "active:bg-[var(--primary-hover)]",
      ].join(" "),
      secondary: [
        "bg-[var(--primary-light)] text-[var(--primary)]",
        "hover:bg-[var(--primary)]/15",
      ].join(" "),
      accent: [
        "bg-[var(--accent)] text-white",
        "hover:bg-[var(--accent-hover)] hover:shadow-lg hover:shadow-[var(--accent)]/20",
        "active:bg-[var(--accent-hover)]",
      ].join(" "),
      ghost: [
        "text-[var(--neutral-600)]",
        "hover:bg-[var(--neutral-100)] hover:text-[var(--neutral-900)]",
      ].join(" "),
      outline: [
        "border border-[var(--border)] bg-transparent text-[var(--neutral-700)]",
        "hover:bg-[var(--neutral-100)] hover:border-[var(--neutral-300)]",
        "dark:text-[var(--neutral-300)] dark:hover:bg-[var(--neutral-200)]",
      ].join(" "),
      danger: [
        "bg-[var(--error)] text-white",
        "hover:bg-[var(--error)]/90 hover:shadow-lg hover:shadow-[var(--error)]/20",
      ].join(" "),
    };

    const sizes = {
      sm: "h-11 px-4 text-sm rounded-lg gap-1.5 min-h-[44px] min-w-[44px]", // Increased from h-9 to h-11 for accessibility
      md: "h-11 px-6 text-sm md:text-base rounded-full gap-2 min-h-[44px] min-w-[44px]",
      lg: "h-14 px-8 text-base md:text-lg rounded-full gap-2 min-h-[44px] min-w-[44px]", // Changed h-13 to h-14
      icon: "h-11 w-11 rounded-full min-h-[44px] min-w-[44px]", // Increased from h-10 to h-11
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
