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
    const fetchStats = async () => {
      // Simulación de carga
      setTimeout(() => {
        setStats({ today: 8, pending: 3, week: 42, month: 156 });
        setLoading(false);
      }, 800);
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Citas Hoy", value: stats.today, icon: Clock, color: "text-primary bg-primary/10" },
    { label: "Pendientes", value: stats.pending, icon: UserCheck, color: "text-amber-500 bg-amber-500/10" },
    { label: "Esta Semana", value: stats.week, icon: Calendar, color: "text-blue-500 bg-blue-500/10" },
    { label: "Este Mes", value: stats.month, icon: BarChart3, color: "text-purple-500 bg-purple-500/10" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[var(--bg-card)] p-6 rounded-[2.5rem] border border-[var(--border-color)] flex items-center justify-between shadow-sm hover:shadow-md transition-all group"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 group-hover:text-primary transition-colors">
                {card.label}
              </p>
              <h3 className="text-3xl font-black text-[var(--text-primary)]">
                {loading ? "..." : card.value}
              </h3>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${card.color}`}>
              <Icon className="w-6 h-6" strokeWidth={2.5} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

