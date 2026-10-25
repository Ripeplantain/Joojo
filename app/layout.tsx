import type { Metadata } from "next";
import { Epilogue, Gloock } from "next/font/google";
import "./globals.css";

const display = Gloock({ subsets: ["latin"], weight: "400", display: "swap", variable: "--eg-display" });
const sans = Epilogue({ subsets: ["latin"], display: "swap", variable: "--eg-sans" });

export const metadata: Metadata = {
  title: "Emmanuel Gyang — Full-Stack Software Engineer",
  description:
    "Emmanuel Gyang builds production systems for Ghana's financial infrastructure: credit bureau data, lending portals, digital payments and merchant checkout.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <div className={`${display.variable} ${sans.variable} eg`}>{children}</div>
      </body>
    </html>
  );
}
