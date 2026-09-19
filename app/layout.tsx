import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sora = Sora({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700", "800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Anime Azərbaycan — Azərbaycandilli anime icması",
  description:
    "Anime kataloqu, reytinq, şərhlər, favorilər və watchlist ilə Azərbaycandilli anime fanlarının bir araya gəldiyi platforma.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-body min-h-screen bg-bg text-text-primary antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
