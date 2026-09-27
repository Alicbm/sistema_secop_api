import type { Metadata } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Radar de Contratación Pública del Magdalena · SECOP II",
  description:
    "Análisis de la contratación pública del departamento del Magdalena a partir de datos abiertos de SECOP II: montos, entidades, red entidad-proveedor, fuga de contratación local y ciclo electoral. Proyecto de Alic Barandica.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="lg:flex">
          <Sidebar />
          <div className="flex min-h-screen min-w-0 flex-1 flex-col">
            <main className="mx-auto w-full max-w-[1320px] flex-1 px-4 pb-8 pt-4 sm:px-6 lg:px-8 lg:pt-7">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
