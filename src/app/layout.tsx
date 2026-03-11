import type { Metadata } from "next";
import "./globals.css";
import NavigationWrapper from "@/components/NavigationWrapper";

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
          <NavigationWrapper>
            {children}
          </NavigationWrapper>
        </div>
      </body>
    </html>
  );
}
