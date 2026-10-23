import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const display = Outfit({ subsets: ["latin"], display: "swap", variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Emmanuel Gyang | Software Engineer",
  description: "The portfolio and career journey of Emmanuel Gyang, a Ghana-based full-stack software engineer building financial platforms, cloud systems, and AI-powered products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
