import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Search } from "lucide-react";

export const metadata = {
  title: "Blog de Salud Visual | Dra. Valentina Reyes",
  description: "Consejos, noticias y artículos sobre cómo cuidar tus ojos y salud visual.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-20 bg-neutral-50 dark:bg-slate-950">
      <div className="bg-white dark:bg-slate-900 py-16 border-b border-border text-center">
        <h1 className="text-4xl font-bold mb-4">Blog y Consejos</h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">Información sobre salud visual, prevención y adelantos médicos.</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Buscar artículos..." 
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-input focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all dark:bg-slate-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3].map((post) => (
             <Card key={post} hoverEffect className="overflow-hidden">
               <div className="h-48 bg-neutral-200 dark:bg-slate-800 flex items-center justify-center text-neutral-400 text-sm">
                 <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Blog post cover" />
               </div>
               <CardContent className="p-6">
                 <div className="flex items-center gap-2 text-xs text-primary font-bold uppercase tracking-wider mb-3">
                   <span>Prevención</span>
                   <span>·</span>
                   <span className="text-neutral-500 font-medium normal-case tracking-normal">5 min read</span>
                 </div>
                 <h2 className="text-xl font-bold mb-3">¿5 razones por las cuales deberías revisar tu vista anualmente?</h2>
                 <p className="text-neutral-600 dark:text-neutral-400">
                   Descubre la importancia de la prevención y las afecciones más comunes que se detectan en exámenes tempranos.
                 </p>
                 <button className="mt-4 text-primary font-semibold text-sm hover:underline">
                   Leer más →
                 </button>
               </CardContent>
             </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
