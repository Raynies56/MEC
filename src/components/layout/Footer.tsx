"use client";

import React from "react";
import Link from "next/link";
import { Eye, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Eye className="h-8 w-8 text-primary-light" strokeWidth={2} />
              <div className="flex flex-col text-white">
                <span className="font-bold text-xl leading-tight">Visión Plena</span>
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  Dra. Valentina Reyes
                </span>
              </div>
            </Link>
            <p className="text-sm text-neutral-400 mt-4 max-w-sm">
              Tu salud visual en manos expertas. Especialista en oftalmología clínica y quirúrgica con más de 12 años de experiencia.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Navegación</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-primary-light transition-colors">Inicio</Link></li>
              <li><Link href="/sobre-mi" className="hover:text-primary-light transition-colors">Sobre Mí</Link></li>
              <li><Link href="/servicios" className="hover:text-primary-light transition-colors">Servicios</Link></li>
              <li><Link href="/citas" className="hover:text-primary-light transition-colors">Agendar Cita</Link></li>
              <li><Link href="/blog" className="hover:text-primary-light transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Servicios</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/servicios#consulta" className="hover:text-primary-light transition-colors">Consulta General</Link></li>
              <li><Link href="/servicios#glaucoma" className="hover:text-primary-light transition-colors">Glaucoma</Link></li>
              <li><Link href="/servicios#cataratas" className="hover:text-primary-light transition-colors">Cataratas</Link></li>
              <li><Link href="/servicios#lentes" className="hover:text-primary-light transition-colors">Receta de Lentes</Link></li>
              <li><Link href="/servicios#urgencias" className="hover:text-primary-light transition-colors">Urgencias 24/7</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Av. Abraham Lincoln 452,<br />Torre Médica Naco, Suite 8B,<br />Santo Domingo, RD</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+1 (809) 555-0192</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>contacto@visionplena.com.do</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} Centro Oftalmológico Visión Plena. Todos los derechos reservados.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link>
            <Link href="/terminos" className="hover:text-white transition-colors">Términos de Servicio</Link>
            <Link href="/admin/login" className="hover:text-white transition-colors flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
              <span className="text-[10px] grayscale brightness-200">🔒</span>
              <span className="text-[11px] font-medium border-l border-neutral-700 pl-2">Acceso médico</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

