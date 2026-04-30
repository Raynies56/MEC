// /components/admin/AdminNavbar.tsx

"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import { ThemeToggle } from "./ThemeToggle";

interface Props {
  adminName: string;
}

export function AdminNavbar({ adminName }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/auth/logout", { method: "POST" });
      if (res.ok) {
        toast.success("Sesión cerrada");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error("Error al cerrar sesión");
    }
  };

  const initials = adminName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <nav className="sticky top-0 z-50 bg-bg-primary dark:bg-bg-primary border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Left: Branding */}
        <Link href="/admin/citas" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Activity className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tight leading-none text-text-primary">Visión Plena</span>
            <span className="text-[10px] uppercase font-black tracking-widest text-primary">Panel Médico</span>
          </div>
        </Link>

        {/* Right: User & Logout */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-3 pr-6 border-r border-border">
            <div className="w-10 h-10 rounded-full bg-bg-secondary dark:bg-bg-secondary flex items-center justify-center text-xs font-bold text-primary border border-primary/20">
              {initials}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-neutral-900 dark:text-white leading-none">{adminName}</span>
              <span className="text-[10px] text-neutral-400 dark:text-gray-500 font-bold uppercase tracking-widest mt-1">Especialista</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="rounded-xl text-xs font-black uppercase tracking-widest hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

