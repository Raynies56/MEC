"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { usePathname } from "next/navigation";

export function ConditionalThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Determinar configuración basada en la ruta
  const isAdmin = pathname?.startsWith("/admin");
  const storageKey = isAdmin ? "adminTheme" : "publicTheme";
  const defaultTheme = isAdmin ? "dark" : "light";

  return (
    <NextThemesProvider
      attribute="class"
      storageKey={storageKey}
      defaultTheme={defaultTheme}
      enableSystem={!isAdmin} // Para admin preferimos persistencia manual
    >
      {children}
    </NextThemesProvider>
  );
}
