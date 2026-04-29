"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Global error boundary
 * Catches unhandled errors and prevents the entire app from crashing
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service in production
    console.error("[Error Boundary]", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-[var(--error)]/10 flex items-center justify-center mb-6">
          <AlertTriangle className="h-8 w-8 text-[var(--error)]" />
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-[var(--neutral-900)] mb-3">
          Algo salió mal
        </h1>
        <p className="text-[var(--neutral-500)] mb-8 leading-relaxed">
          Ha ocurrido un error inesperado. Puedes intentar recargar la página o
          volver al inicio.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button onClick={reset} variant="primary" className="w-full sm:w-auto">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reintentar
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Ir al Inicio
            </Button>
          </Link>
        </div>

        {/* Error digest for debugging */}
        {error.digest && (
          <p className="mt-6 text-xs text-[var(--neutral-400)] font-mono">
            Código: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
