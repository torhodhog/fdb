// layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import StripeComponent from "@/components/StripeComponent"; // Importer stripe komponenten
import WeglotSwitcher from "@/components/WeglotSwitcher"; // Importer WeglotSwitcher-komponenten

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fotballdraktbutikken AS",
  description: "Fdb.343",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          "relative h-full font-sans antialiased dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2]",
          inter.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <main className="relative flex flex-col h-screen">
            <Providers>
              <Navbar />
              <WeglotSwitcher /> {/* Legg til WeglotSwitcher-komponenten her */}
              <StripeComponent /> {/* Legg til stripe komponenten her */}
              <div className="flex-grow flex-1">{children}</div>
              <Footer />
            </Providers>
          </main>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}