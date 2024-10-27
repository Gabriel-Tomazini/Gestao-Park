import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ResponsiveAppBar } from "../components/_ui/Header/page";
import { SideMenu } from "../components/_ui/SideBar/page";
import React from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Gestão Park",
  description: "Controle de estacionamento",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <ResponsiveAppBar />
          <div style={{ display: "flex", width: "100%", height: "100vh" }}>
            <aside style={{ width: "15%" }}>
              <SideMenu />
            </aside>
            <main
              style={{
                width: "85%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
