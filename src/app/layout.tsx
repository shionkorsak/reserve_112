import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reserve 112 Lounge",
  description: "Lounge reservetion website managed by IBPSA :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" id="favicon-dark" href="favicon.ico" media="(prefers-color-scheme: light)" />
      <link rel="icon" id="favicon-light" href="favicon_light.ico" media="(prefers-color-scheme: dark)" />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <Header/>
        {children}
      </body>
    </html>
  );
}
