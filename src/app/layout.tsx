import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Amaya | Propiedades de Lujo",
  description: "Encuentra tu próximo hogar con la mejor experiencia inmobiliaria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="overflow-x-hidden">
      <body className="antialiased font-sans selection:bg-slate-900 selection:text-white w-full overflow-x-hidden relative">
        <div className="relative w-full overflow-x-hidden min-h-screen flex flex-col">
          <div className="luxe-bg" />
          <div className="mesh-glow -top-48 -left-48 bg-slate-200" />
          <div className="mesh-glow top-1/2 -right-48 bg-slate-100" />
          
          <Navbar />
          <main className="pt-20 flex-grow w-full">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
