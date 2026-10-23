import type { Metadata } from "next";
import "./globals.css";
import { SCHOOL_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SCHOOL_INFO.name} | ${SCHOOL_INFO.motto}`,
  description:
    "A joyful, nurturing early childhood learning center for Nursery, Junior KG, and Senior KG. Little minds with big dreams begin their journey here.",
  keywords: [
    "Little Kingdom Preschool",
    "Preschool",
    "Kindergarten",
    "Nursery",
    "Junior KG",
    "Senior KG",
    "Early Childhood Education",
    "Little Mind Big Dreams",
  ],
  authors: [{ name: SCHOOL_INFO.name }],
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-ivory-100 text-brand-text antialiased selection:bg-sunshine-200 selection:text-sky-900 min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
