import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/src/components/Header.jsx";
import { Footer } from "@/src/components/Footer.jsx";
import SessionWrapper from "@/src/components/SessionWrapper.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "propadvisors.homes/amodha",
  description: "A modern e-commerce platform for jewelry and accessories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <Header />
          <main className="min-h-screen bg-background text-foreground">
            {children}
          </main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
