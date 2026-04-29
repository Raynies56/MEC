import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";
import { ToastContainer } from "@/components/ui/Toast";

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
  openGraph: {
    title: "Dra. Valentina Reyes | Oftalmóloga en Santo Domingo",
    description:
      "Especialista en oftalmología clínica y quirúrgica. Diagnóstico preciso con tecnología de última generación.",
    type: "website",
    locale: "es_DO",
    siteName: "Visión Plena",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        className={`${inter.variable} ${playfair.variable} font-sans min-h-screen flex flex-col pt-20 antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-grow" id="main-content">
            {children}
          </main>
          <Footer />
          <WhatsAppFAB />
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
