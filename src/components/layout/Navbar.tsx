"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Eye, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Sobre Mí", href: "/sobre-mi" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ── Optimized scroll handler with passive listener ── */
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ── Close mobile menu on route change ── */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Don't show public navbar in dashboard or admin
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin")) return null;

  return (
    <>
      <header
        role="banner"
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out border-b border-border bg-bg/95 backdrop-blur-md",
          isScrolled
            ? "py-3 shadow-sm"
            : "py-5"
        )}
      >
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Visión Plena — Inicio">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors duration-200">
              <Eye className="h-6 w-6 text-primary" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight text-text">
                Visión Plena
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-text-muted font-medium">
                Dra. Valentina Reyes
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            <ul className="flex items-center gap-1">
              {LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-text-soft hover:text-text hover:bg-bg-secondary"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3 border-l border-border pl-6">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-lg p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-text-soft hover:bg-bg-secondary hover:text-text transition-colors duration-200"
                  aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                >
                  {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
                </button>
              )}
              <Link href="/citas">
                <Button variant="accent" size="sm" className="hidden lg:inline-flex font-medium">
                  Agendar Cita
                </Button>
              </Link>
            </div>
            </nav>
  
            {/* ── Mobile Controls ── */}
            <div className="flex items-center gap-2 md:hidden">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-lg p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-text-soft hover:bg-bg-secondary transition-colors"
                  aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-text p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-bg-secondary transition-colors"
                aria-label="Abrir menú de navegación"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>
  
        {/* ── Mobile Menu Overlay ── */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-black/40 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
              />
  
              {/* Panel */}
              <motion.nav
                id="mobile-nav"
                role="dialog"
                aria-modal="true"
                aria-label="Menú de navegación móvil"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 220 }}
                className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-sm bg-bg shadow-2xl flex flex-col"
              >
                {/* Close button */}
                <div className="p-5 flex justify-end">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-bg-secondary hover:bg-border transition-colors"
                    aria-label="Cerrar menú"
                  >
                    <X className="h-5 w-5 text-text-soft" />
                  </button>
                </div>
  
                {/* Links */}
                <div className="flex-1 px-6 flex flex-col gap-2 overflow-y-auto">
                  {LINKS.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "block text-2xl font-bold py-3 px-4 rounded-xl transition-colors duration-200",
                          pathname === link.href
                            ? "text-primary bg-primary/10"
                            : "text-text hover:bg-bg-secondary"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="p-6 border-t border-border"
              >
                <Link href="/citas" className="block w-full">
                  <Button variant="accent" size="lg" className="w-full text-base font-semibold">
                    Agendar Cita Ahora
                  </Button>
                </Link>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
