import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CodeGen Pro - Premium QR Code & Barcode Generator",
  description: "Create stunning QR codes and barcodes with advanced customization options",
    
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem storageKey="codegen-pro-theme">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
