import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emmanuel Gyang | Software Engineer",
  description: "The portfolio and career journey of Emmanuel Gyang, a Ghana-based full-stack software engineer building financial platforms, cloud systems, and AI-powered products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
