import type { Metadata } from "next"
import localFont from "next/font/local"
import { ThemeProvider } from "next-themes"

import { Toaster } from "@/components/ui/toaster"

import "./globals.css"

import AppNavigationBar from "@/components/complex/AppNavigationBar"
import { Navbar } from "@/components/poikus/navbar"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen min-w-screen container mx-auto relative`}
      >
        <ThemeProvider attribute="class">
          <AppNavigationBar />
          <main className="w-full container mt-[80px] flex flex-col items-start px-8">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
