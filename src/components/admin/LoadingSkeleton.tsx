// /components/admin/LoadingSkeleton.tsx

"use client";

interface Props {
  variant: "table" | "card" | "slots";
  rows?: number;
  count?: number;
}

export function LoadingSkeleton({ variant, rows = 5, count = 16 }: Props) {
  if (variant === "table") {
    return (
      <div className="w-full space-y-4 animate-pulse">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-16 bg-neutral-100 dark:bg-slate-800 rounded-2xl w-full" />
        ))}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 bg-neutral-100 dark:bg-slate-800 rounded-3xl w-full" />
        ))}
      </div>
    );
  }

  if (variant === "slots") {
    return (
      <div className="grid grid-cols-1 gap-3 animate-pulse">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-14 bg-neutral-100 dark:bg-slate-800 rounded-2xl w-full" />
        ))}
      </div>
    );
  }

  return null;
}

