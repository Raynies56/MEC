"use client";

import React from "react";
import Link from "next/link";
import { Eye, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Sobre Mí", href: "/sobre-mi" },
  { label: "Servicios", href: "/servicios" },
  { label: "Agendar Cita", href: "/citas" },
  { label: "Blog", href: "/blog" },
];

const SERVICE_LINKS = [
  { label: "Consulta General", href: "/servicios#consulta" },
  { label: "Glaucoma", href: "/servicios#glaucoma" },
  { label: "Cataratas", href: "/servicios#cataratas" },
  { label: "Receta de Lentes", href: "/servicios#lentes" },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin")) return null;

  return (
    <footer
      role="contentinfo"
      className="bg-bg-card border-t border-border text-text-soft pt-16 pb-8"
    >
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-14">

          {/* ── Brand column ── */}
          <div className="space-y-5 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="Visión Plena — Inicio">
              <Eye className="h-7 w-7 text-primary" strokeWidth={2} />
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight text-text">
                  Visión Plena
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-text-muted font-medium">
                  Dra. Valentina Reyes
                </span>
              </div>
            </Link>
            <p className="text-sm text-text-soft leading-relaxed max-w-xs">
              Tu salud visual en manos expertas. Especialista en oftalmología clínica y quirúrgica con más de 12 años de experiencia.
            </p>
            <div className="flex gap-3 pt-1">
              {[
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Facebook, label: "Facebook", href: "#" },
                { icon: Twitter, label: "Twitter", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-bg-secondary hover:bg-bg-secondary/80 text-text-soft hover:text-text transition-colors duration-200"
                  aria-label={`Síguenos en ${label}`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Navigation column ── */}
          <div>
            <h4 className="text-text font-bold mb-5 text-sm tracking-wide">
              Navegación
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-soft hover:text-text transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services column ── */}
          <div>
            <h4 className="text-text font-bold mb-5 text-sm tracking-wide">
              Servicios
            </h4>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-soft hover:text-text transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact column ── */}
          <div>
            <h4 className="text-text font-bold mb-5 text-sm tracking-wide">
              Contacto
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="h-4.5 w-4.5 text-primary mt-0.5 shrink-0" />
                <span className="text-text-soft">
                  Av. Abraham Lincoln 452,<br />
                  Torre Médica Naco, Suite 8B
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="h-4.5 w-4.5 text-primary shrink-0" />
                <a href="tel:+18095550192" className="text-text-soft hover:text-text transition-colors">
                  +1 (809) 555-0192
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="h-4.5 w-4.5 text-primary shrink-0" />
                <a href="mailto:contacto@visionplena.com.do" className="text-text-soft hover:text-text transition-colors">
                  contacto@visionplena.com.do
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} Centro Oftalmológico Visión Plena. Todos los derechos reservados.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacidad" className="hover:text-text transition-colors">
              Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-text transition-colors">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
