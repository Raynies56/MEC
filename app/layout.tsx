import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";
import { ToastContainer } from "@/components/ui/Toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-playfair" });

export const metadata: Metadata = {
  // Config already set in previous version 
  title: "Dra. Valentina Reyes | Oftalmóloga en Santo Domingo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen flex flex-col pt-20`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-grow">
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
