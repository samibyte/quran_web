import type { Metadata } from "next";
import { Inter, Amiri, Scheherazade_New } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "@/context/SettingsContext";
import SettingsSidebar from "@/components/SettingsSidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: ["400", "700"],
  subsets: ["arabic"],
});

const scheherazade = Scheherazade_New({
  variable: "--font-scheherazade",
  weight: ["400", "700"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "The Holy Quran - Simple & Beautiful",
  description: "A high-performance Quran web application with translations and search.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${amiri.variable} ${scheherazade.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
        <SettingsProvider>
          {children}
          <SettingsSidebar />
        </SettingsProvider>
      </body>
    </html>
  );
}
