import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TrovéMart | Handmade & Artisan Marketplace",
  description: "Discover and shop unique handcrafted goods from independent artisans.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NextTopLoader color="#B75D3E" showSpinner={false} />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1a1d24",
              color: "#f1f5f9",
              border: "1px solid #374151",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: { iconTheme: { primary: "#B75D3E", secondary: "#fff" } },
            error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
          }}
        />
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}