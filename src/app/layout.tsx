import type { Metadata } from "next";
import "./globals.css";
import { SCHOOL_PLACEHOLDERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `A Journey Into Learning | ${SCHOOL_PLACEHOLDERS.institutionName}`,
  description:
    "An immersive, cinematic introduction to academic rigour, world-class facilities, holistic development, and admissions at our institution.",
  keywords: [
    "School Website",
    "Admissions 2026",
    "Academics",
    "Campus Tour",
    "STEM Education",
    "Arts & Athletics",
  ],
  authors: [{ name: SCHOOL_PLACEHOLDERS.institutionName }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-navy-900 text-ivory antialiased selection:bg-gold-500 selection:text-navy-950 min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
