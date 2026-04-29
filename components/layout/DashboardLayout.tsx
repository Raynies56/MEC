"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LayoutDashboard, Calendar, CalendarDays, Clock, User, LogOut, Menu, X, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/Spinner";

const NAV_ITEMS = [
  { label: "Resumen", href: "/dashboard", icon: LayoutDashboard },
  { label: "Citas", href: "/dashboard/citas", icon: CalendarDays },
  { label: "Calendario", href: "/dashboard/calendario", icon: Calendar },
  { label: "Horarios", href: "/dashboard/horarios", icon: Clock },
  { label: "Perfil", href: "/dashboard/perfil", icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-screen w-screen flex items-center justify-center"><Spinner size="xl" /></div>;
  }

  // Double check basic client side protection
  if (status === "unauthenticated") {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-slate-950 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-neutral-900/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-slate-900 border-r border-border z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-border justify-between lg:justify-center">
          <Link href="/" className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Visión Plena</span>
          </Link>
          <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1 px-3">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-neutral-400")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              {session?.user?.name?.charAt(0) || "D"}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold truncate">{session?.user?.name || "Doctor"}</span>
              <span className="text-xs text-neutral-500 truncate">{session?.user?.email}</span>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-error hover:bg-error/10 transition-colors w-full"
          >
            <LogOut className="h-5 w-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-white dark:bg-slate-900 lg:hidden">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-neutral-600">
            <Menu className="h-6 w-6" />
          </button>
          <div className="font-bold">Dashboard</div>
          <div className="w-10"></div> {/* Spacer balance */}
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
