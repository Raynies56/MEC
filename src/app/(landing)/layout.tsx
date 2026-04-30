import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";
import { JsonLd } from "@/components/layout/JsonLd";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col pt-20 min-h-screen">
      <JsonLd />
      <Navbar />
      <main className="flex-grow" id="main-content">
        {children}
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
