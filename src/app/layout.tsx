import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ConditionalThemeProvider } from "@/components/theme/ConditionalThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";
import { ToastContainer } from "@/components/ui/Toast";
import { JsonLd } from "@/components/layout/JsonLd";

/* ── Fonts: Inter for body, Playfair Display for accents ── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "700"],
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700"],
});

/* ── SEO Metadata ── */
export const metadata: Metadata = {
  title: {
    default: "Dra. Valentina Reyes | Oftalmóloga en Santo Domingo",
    template: "%s | Visión Plena",
  },
  description:
    "Centro oftalmológico especializado en glaucoma, cataratas y salud visual. Más de 12 años de experiencia. Agenda tu cita online.",
  keywords: [
    "oftalmólogo Santo Domingo",
    "glaucoma",
    "cataratas",
    "examen visual",
    "oftalmología pediátrica",
    "Dra. Valentina Reyes",
  ],
  metadataBase: new URL("https://visionplena.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dra. Valentina Reyes | Oftalmóloga en Santo Domingo",
    description:
      "Especialista en oftalmología clínica y quirúrgica. Diagnóstico preciso con tecnología de última generación.",
    type: "website",
    locale: "es_DO",
    siteName: "Visión Plena",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Visión Plena — Dra. Valentina Reyes, Oftalmóloga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dra. Valentina Reyes | Oftalmóloga en Santo Domingo",
    description:
      "Centro oftalmológico especializado en glaucoma, cataratas y salud visual.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans min-h-screen flex flex-col antialiased`}
        suppressHydrationWarning
      >
        {/* Skip-to-content link for keyboard/screen-reader users (WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[var(--primary)] focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-xl focus:outline-none"
        >
          Saltar al contenido principal
        </a>

        <ConditionalThemeProvider>
          {children}
          <ToastContainer />
        </ConditionalThemeProvider>
      </body>
    </html>
  );
}
