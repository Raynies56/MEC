"use client";

import React, { useState, useEffect } from "react";
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Don't show public navbar in dashboard or admin
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin")) return null;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-slate-950/80 py-3" : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Eye className="h-6 w-6 text-primary" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight text-neutral-900 dark:text-white">Visión Plena</span>
              <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">
                Dra. Valentina Reyes
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === link.href ? "text-primary font-semibold" : "text-neutral-600 dark:text-neutral-300"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 border-l border-border pl-6">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              )}
              <Link href="/citas">
                <Button variant="accent" size="sm" className="hidden lg:inline-flex">
                  Agendar Cita
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full p-2 text-neutral-500 transition-colors"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-neutral-900 dark:text-white p-2"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-white dark:bg-slate-950 flex flex-col"
          >
            <div className="p-4 flex justify-end pb-8">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-neutral-100 dark:bg-slate-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 px-8 flex flex-col gap-6">
              {LINKS.map((link) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "text-3xl font-bold transition-colors",
                      pathname === link.href ? "text-primary" : "text-neutral-900 dark:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8"
              >
                <Link href="/citas" className="block w-full">
                  <Button variant="accent" size="lg" className="w-full text-lg">
                    Agendar Cita Ahora
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

