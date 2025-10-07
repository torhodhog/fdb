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
import StripeComponent from "@/components/StripeComponent";
import WeglotSwitcher from "@/components/WeglotSwitcher";
import Assistant from "@/components/Assistant";
import ErrorBoundary from "@/components/ErrorBoundary";
import "@/lib/error-handler";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Fotballdraktbutikken AS - Norges beste fotballdrakter",
    template: "%s | Fotballdraktbutikken AS",
  },
  description:
    "Norges største utvalg av fotballdrakter fra Premier League, Bundesliga, Serie A og mer. Kvalitetsdrakter til konkurransedyktige priser med gratis frakt over 1500kr.",
  keywords: [
    "fotballdrakter",
    "fotball",
    "drakt",
    "Premier League",
    "Norge",
    "Liverpool",
    "Manchester United",
    "Real Madrid",
  ],
  authors: [{ name: "Fotballdraktbutikken AS" }],
  creator: "Fotballdraktbutikken AS",
  publisher: "Fotballdraktbutikken AS",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "no_NO",
    url: "https://fotballdb.no",
    title: "Fotballdraktbutikken AS - Norges beste fotballdrakter",
    description:
      "Norges største utvalg av fotballdrakter fra Premier League, Bundesliga, Serie A og mer.",
    siteName: "Fotballdraktbutikken AS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fotballdraktbutikken AS",
    description: "Norges største utvalg av fotballdrakter",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "relative h-full font-sans antialiased dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2]",
          inter.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <main className="relative flex flex-col h-screen">
            <ErrorBoundary>
              <Providers>
                <Navbar />
                {/* <WeglotSwitcher />  */}
                <StripeComponent />
                <Assistant />
                <div className="flex-grow flex-1">{children}</div>
                <Footer />
              </Providers>
            </ErrorBoundary>
          </main>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
