import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SriDoc Studio",
  description: "Annotate multilingual PDF forms and generate synthetic handwriting datasets.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
