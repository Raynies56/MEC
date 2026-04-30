// /app/admin/login/page.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Activity, Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Ingresa tus credenciales");

    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("¡Bienvenida, Dra. Valentina!");
        router.push("/admin/citas");
        router.refresh();
      } else {
        toast.error(data.error || "Error al iniciar sesión");
      }
    } catch (error) {
      toast.error("Error de conexión, intenta de nuevo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-[var(--bg-card)] rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-[var(--border-color)] p-8 md:p-10">
          {/* Logo & Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 mx-auto mb-6">
              <Activity className="text-white w-10 h-10" />
            </div>
            <h1 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">Acceso Médico</h1>
            <p className="text-neutral-500 dark:text-gray-400 font-medium mt-2">Visión Plena — Dra. Valentina Reyes</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input 
                label="Correo Electrónico" 
                type="email" 
                placeholder="ejemplo@visionplena.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="pl-12 h-14 rounded-2xl"
                disabled={isLoading}
                required
              />
              <Mail className="absolute left-4 top-[48px] w-5 h-5 text-neutral-300 dark:text-gray-500" />
            </div>

            <div className="relative">
              <Input 
                label="Contraseña" 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="pl-12 pr-12 h-14 rounded-2xl"
                disabled={isLoading}
                required
              />
              <Lock className="absolute left-4 top-[48px] w-5 h-5 text-neutral-300 dark:text-gray-500" />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[48px] text-neutral-400 dark:text-gray-500 hover:text-primary transition-colors"
                suppressHydrationWarning
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20"
              isLoading={isLoading}
            >
              Ingresar al Panel
            </Button>
          </form>

          <div className="mt-10 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-neutral-400 dark:text-gray-500 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al sitio público
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

