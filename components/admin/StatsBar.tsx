// /components/admin/StatsBar.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Clock, UserCheck, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

interface Stats {
  today: number;
  pending: number;
  week: number;
  month: number;
}

export function StatsBar() {
  const [stats, setStats] = useState<Stats>({ today: 0, pending: 0, week: 0, month: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos carga o fetch real
    const fetchStats = async () => {
      // En un caso real haríamos: const res = await fetch('/api/admin/stats')
      setTimeout(() => {
        setStats({ today: 8, pending: 3, week: 42, month: 156 });
        setLoading(false);
      }, 800);
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Citas Hoy", value: stats.today, icon: <Clock className="w-5 h-5" />, color: "text-primary bg-primary/10" },
    { label: "Pendientes", value: stats.pending, icon: <UserCheck className="w-5 h-5" />, color: "text-amber-500 bg-amber-500/10" },
    { label: "Esta Semana", value: stats.week, icon: <Calendar className="w-5 h-5" />, color: "text-blue-500 bg-blue-500/10" },
    { label: "Este Mes", value: stats.month, icon: <BarChart3 className="w-5 h-5" />, color: "text-purple-500 bg-purple-500/10" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-border flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
        >
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2">{card.label}</p>
            <h3 className="text-3xl font-black text-neutral-900 dark:text-white">
              {loading ? "..." : card.value}
            </h3>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.color}`}>
            {card.icon}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
