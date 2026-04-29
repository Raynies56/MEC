/**
 * Global loading skeleton
 * Renders while route segments are loading (Suspense boundary)
 */
export default function Loading() {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center"
      role="status"
      aria-label="Cargando contenido"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated eye icon skeleton */}
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-[var(--primary-light)] border-t-[var(--primary)] animate-spin" />
        </div>
        <p className="text-sm font-medium text-[var(--neutral-400)] animate-pulse">
          Cargando...
        </p>
      </div>
    </div>
  );
}
