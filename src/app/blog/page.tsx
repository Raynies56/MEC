"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Search, Clock, ArrowRight } from "lucide-react";

const ARTICLES = [
  {
    id: 1,
    title: "Mitos y realidades sobre la cirugía láser (LASIK)",
    category: "Cirugía",
    readTime: "6 min read",
    description: "¿Es dolorosa? ¿Cuáles son los riesgos? Respondemos a las dudas más frecuentes sobre la corrección visual por láser.",
    image: "/blog/laser.png" 
  },
  {
    id: 2,
    title: "¿Cómo afecta la luz azul de las pantallas a tus ojos?",
    category: "Salud Digital",
    readTime: "4 min read",
    description: "Pasamos horas frente a dispositivos. Aprende técnicas sencillas como la regla 20-20-20 para evitar la fatiga visual.",
    image: "/blog/luz-azul.png"
  },
  {
    id: 3,
    title: "Glaucoma: El ladrón silencioso de la visión",
    category: "Prevención",
    readTime: "7 min read",
    description: "El glaucoma no presenta síntomas hasta que es muy tarde. Conoce por qué la detección temprana es vital para salvar tu vista.",
    image: "/blog/glaucoma.png"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-20 bg-background transition-colors duration-300">
      {/* Header Section - Using CSS Variables for 100% Reliability */}
      <div className="bg-card py-24 border-b border-border text-center relative overflow-hidden">
        {/* Aesthetic background overlays */}
        <div className="absolute inset-0 bg-primary/5 opacity-40 dark:opacity-20" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/5 dark:to-white/5" />
        
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-foreground">Blog y Consejos de </span>
            <span className="text-primary">Salud Visual</span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Información experta sobre el cuidado de tus ojos, prevención y los últimos avances médicos.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* Search Bar - Theme Integrated via CSS Variables */}
        <div className="flex justify-center mb-20">
          <div className="relative w-full max-w-lg group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5 transition-colors group-focus-within:text-primary" />
            <input 
              type="text" 
              placeholder="Buscar artículos..." 
              className="w-full h-16 pl-14 pr-6 rounded-2xl border border-border bg-card text-foreground focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-lg text-lg"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {ARTICLES.map((post) => (
             <Card key={post.id} hoverEffect className="overflow-hidden border-none shadow-2xl group bg-card transition-all duration-300">
               {/* Image Container */}
               <div className="h-64 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center overflow-hidden relative">
                 <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                 <img 
                    src={post.image} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt={post.title} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop";
                    }}
                 />
                 <div className="absolute top-5 left-5 z-20">
                    <span className="px-4 py-1.5 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                        {post.category}
                    </span>
                 </div>
               </div>

               {/* Content Area */}
               <CardContent className="p-10">
                 <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-bold uppercase tracking-widest mb-5">
                   <Clock className="w-3.5 h-3.5 text-primary" />
                   <span>{post.readTime}</span>
                 </div>
                 
                 <h2 className="text-2xl font-bold mb-5 leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
                    {post.title}
                 </h2>
                 
                 <p className="text-neutral-500 dark:text-neutral-400 text-base leading-relaxed mb-8 line-clamp-3">
                   {post.description}
                 </p>
                 
                 <button className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.25em] group/btn transition-all">
                   Leer Más <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-3" />
                 </button>
               </CardContent>
             </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
