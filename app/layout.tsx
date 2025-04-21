import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import "./globals.css";
// import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";
// import { Analytics } from "@vercel/analytics/react";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "PAVE Learning Platform",
  description: "An engaging learning platform for students and educators",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
