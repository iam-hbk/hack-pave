import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Providers } from "@/providers";
import { getUser } from "@/lib/dal";
import { UserProvider } from "@/providers/user-provider";
import { Toaster } from "sonner";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <html lang="en">
      <body className={`${urbanist.variable} font-sans antialiased`}>
        <Providers>
          <UserProvider initialUser={user}>
            <div className="min-h-screen bg-gray-50">
              {/* Main content */}
              <main>{children}</main>
            </div>
          </UserProvider>
        </Providers>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
