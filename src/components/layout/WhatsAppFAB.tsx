"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function WhatsAppFAB() {
  const pathname = usePathname();
  
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin")) return null;

  const phone = "18095550192";
  const message = "Hola Dra. Valentina, me gustaría hacer una consulta.";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-success text-white rounded-full shadow-lg hover:shadow-xl hover:bg-success/90 transition-all z-10"
        aria-label="Contactar por WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.125-.39-.176-1.545-.588-3.085-1.956-1.196-1.066-1.989-2.39-2.215-2.776-.228-.387-.024-.593.167-.783.175-.175.385-.45.578-.675.145-.168.192-.288.289-.481.096-.192.048-.385-.024-.529-.072-.144-.816-1.988-1.116-2.712-.295-.717-.589-.607-.816-.619l-.689-.009c-.24 0-.629.089-.958.441-.33.351-1.258 1.229-1.258 2.997s1.288 3.473 1.467 3.713c.18.24 2.518 3.864 6.136 5.438 2.193.953 3.013 1.055 4.148.887 1.255-.187 2.684-1.1 3.053-2.158.371-1.066.371-1.977.265-2.158-.108-.192-.387-.288-.772-.481z"/>
        </svg>

        {/* Pulse ring animation */}
        <div className="absolute inset-0 rounded-full animate-pulse-ring pointer-events-none" />
      </motion.a>

      {/* Tooltip */}
      <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 bg-neutral-900 text-white text-sm whitespace-nowrap px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Escríbenos por WhatsApp
        <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 transform rotate-45 w-2 h-2 bg-neutral-900" />
      </div>
    </div>
  );
}

