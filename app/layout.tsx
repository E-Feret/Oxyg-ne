import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Radio Oxygène - La Radio des Alpes",
  description: "Écoutez Radio Oxygène en direct. Actualités, musique et infos locales des Alpes.",
  icons: {
    icon: '/icon.ico',
  },
  metadataBase: new URL('https://radiooxygene.com'), // Placeholder, should be updated
  openGraph: {
    title: "Radio Oxygène",
    description: "La Radio des Alpes",
    locale: "fr_FR",
    type: "website",
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RadioPlayer from "@/components/RadioPlayer";
import { AudioProvider } from "@/context/AudioContext";

import ScrollToTop from "@/components/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen`} suppressHydrationWarning={true}>
        <AudioProvider>
          <Navbar />
          <main className="flex-grow pb-20">
            {children}
          </main>
          <Footer />
          <RadioPlayer />
          <ScrollToTop />
        </AudioProvider>
      </body>
    </html>
  );
}
