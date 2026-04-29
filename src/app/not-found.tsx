import Link from "next/link";
import { Eye, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Custom 404 page
 * Branded and user-friendly — guides users back instead of dead-ending
 */
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Branded 404 graphic */}
        <div className="mx-auto w-24 h-24 rounded-3xl bg-[var(--primary-light)] flex items-center justify-center mb-8">
          <Eye className="h-12 w-12 text-[var(--primary)] opacity-60" />
        </div>

        <p className="text-7xl font-bold text-[var(--primary)]/20 font-accent mb-4">
          404
        </p>
        <h1 className="text-2xl font-bold text-[var(--neutral-900)] mb-3">
          Página no encontrada
        </h1>
        <p className="text-[var(--neutral-500)] mb-8 leading-relaxed">
          Lo sentimos, la página que buscas no existe o ha sido movida.
          Te invitamos a explorar nuestros servicios o agendar una cita.
        </p>

        {/* Navigation options */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="primary" className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Ir al Inicio
            </Button>
          </Link>
          <Link href="/citas" className="w-full sm:w-auto">
            <Button variant="accent" className="w-full">
              Agendar Cita
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
