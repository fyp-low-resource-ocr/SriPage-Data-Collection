import type { Metadata } from "next";
import { Geist, Noto_Sans_Sinhala } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const sinhala = Noto_Sans_Sinhala({ subsets: ["sinhala"], variable: "--font-sinhala", display: "swap" });

export const metadata: Metadata = {
  title: "Sri Page",
  description: "Annotate multilingual PDF forms and generate synthetic handwriting datasets.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${sinhala.variable}`}>
      <body>{children}</body>
    </html>
  );
}
