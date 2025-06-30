"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, BarChart3, Settings, Sparkles, Zap } from "lucide-react"
import { CustomTabs, CustomTabsList, CustomTabsTrigger, CustomTabsContent } from "@/components/custom-tabs"
import QRCodeGenerator from "@/components/qr-code-generator"
import BarcodeGenerator from "@/components/barcode-generator"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      <AnimatedBackground />

      <Header />

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-full px-6 py-2 mb-6 animate-pulse-glow">
            <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-300 text-sm font-medium">
              Professional Code Generation
            </span>
          </div>

          <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-700 to-pink-700 dark:from-gray-100 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6 animate-gradient">
            Premium Code Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Create stunning QR codes and barcodes with our advanced generator. Professional quality, infinite
            customization, and lightning-fast generation.
          </p>
        </div>

        <CustomTabs defaultValue="qr" className="max-w-6xl mx-auto">
          <CustomTabsList className="mb-12">
            <CustomTabsTrigger value="qr">
              <QrCode className="h-5 w-5" />
              <span>QR Code Generator</span>
            </CustomTabsTrigger>
            <CustomTabsTrigger value="barcode">
              <BarChart3 className="h-5 w-5" />
              <span>Barcode Generator</span>
            </CustomTabsTrigger>
          </CustomTabsList>

          <CustomTabsContent value="qr">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-3xl overflow-hidden hover:shadow-purple-500/20 dark:hover:shadow-purple-500/10 transition-all duration-500 hover:scale-[1.02]">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="flex items-center gap-3 text-2xl text-gray-900 dark:text-gray-100">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                    <QrCode className="h-6 w-6 text-white" />
                  </div>
                  QR Code Generator
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 text-lg">
                  Create beautiful QR codes with advanced customization options
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <QRCodeGenerator />
              </CardContent>
            </Card>
          </CustomTabsContent>

          <CustomTabsContent value="barcode">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-3xl overflow-hidden hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10 transition-all duration-500 hover:scale-[1.02]">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="flex items-center gap-3 text-2xl text-gray-900 dark:text-gray-100">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  Barcode Generator
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 text-lg">
                  Generate professional barcodes in multiple formats
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <BarcodeGenerator />
              </CardContent>
            </Card>
          </CustomTabsContent>
        </CustomTabs>

        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto">
          <Card className="group bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 shadow-2xl rounded-2xl overflow-hidden hover:shadow-purple-500/40 dark:hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
            <CardHeader className="text-center p-8">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-gray-900 dark:text-gray-100 mb-2">Multiple Formats</CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                Support for QR codes, Code 128, Code 39, EAN-13, UPC-A, and more barcode formats with premium quality
              </p>
            </CardContent>
          </Card>

          <Card className="group bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 shadow-2xl rounded-2xl overflow-hidden hover:shadow-blue-500/40 dark:hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
            <CardHeader className="text-center p-8">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-gray-900 dark:text-gray-100 mb-2">Advanced Customization</CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                Unlimited customization with colors, sizes, gradients, and professional presets for every use case
              </p>
            </CardContent>
          </Card>

          <Card className="group bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 shadow-2xl rounded-2xl overflow-hidden hover:shadow-emerald-500/40 dark:hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
            <CardHeader className="text-center p-8">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-110">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-gray-900 dark:text-gray-100 mb-2">Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                Instant generation with real-time preview, multiple export formats, and professional print quality
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
