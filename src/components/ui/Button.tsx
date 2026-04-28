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
    
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform active:scale-95";
    
    const variants = {
      primary: "bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20",
      secondary: "bg-primary-light text-primary hover:bg-primary/10",
      accent: "bg-accent text-white hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20",
      ghost: "hover:bg-neutral-100 dark:hover:bg-neutral-900",
      outline: "border border-border bg-transparent hover:bg-neutral-100 dark:hover:bg-slate-800",
      danger: "bg-error text-white hover:bg-error/90",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm rounded-md",
      md: "h-11 px-6 text-base rounded-full",
      lg: "h-14 px-8 text-lg rounded-full",
      icon: "h-10 w-10 rounded-full",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

