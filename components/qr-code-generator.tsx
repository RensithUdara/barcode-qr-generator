"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Download, Copy, Check, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import ColorPresets from "@/components/color-presets"

export default function QRCodeGenerator() {
  const [data, setData] = useState("Hello World!")
  const [dataType, setDataType] = useState("text")
  const [size, setSize] = useState([300])
  const [errorLevel, setErrorLevel] = useState("M")
  const [foregroundColor, setForegroundColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()
  const [textColor, setTextColor] = useState("#333333")

  const generateQRCode = async () => {
    setIsGenerating(true)
    try {
      const QRCode = (await import("qrcode")).default

      let qrData = data

      // Format data based on type
      switch (dataType) {
        case "url":
          qrData = data.startsWith("http") ? data : `https://${data}`
          break
        case "email":
          qrData = `mailto:${data}`
          break
        case "phone":
          qrData = `tel:${data}`
          break
        case "sms":
          qrData = `sms:${data}`
          break
        case "wifi":
          const [ssid, password] = data.split(",")
          qrData = `WIFI:T:WPA;S:${ssid};P:${password};H:false;;`
          break
        default:
          qrData = data
      }

      const canvas = canvasRef.current
      if (canvas) {
        await QRCode.toCanvas(canvas, qrData, {
          width: size[0],
          margin: 2,
          color: {
            dark: foregroundColor,
            light: backgroundColor,
          },
          errorCorrectionLevel: errorLevel as any,
        })

        setQrCodeUrl(canvas.toDataURL())
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please check your input.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    if (data) {
      generateQRCode()
    }
  }, [data, dataType, size, errorLevel, foregroundColor, backgroundColor, textColor])

  const downloadQRCode = (format: string) => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (format === "png") {
      const link = document.createElement("a")
      link.download = "qrcode.png"
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const copyToClipboard = async () => {
    if (qrCodeUrl) {
      try {
        const response = await fetch(qrCodeUrl)
        const blob = await response.blob()
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        toast({
          title: "Copied!",
          description: "QR code copied to clipboard",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to copy to clipboard",
          variant: "destructive",
        })
      }
    }
  }

  const handlePresetSelect = (preset: any) => {
    setForegroundColor(preset.foreground)
    setBackgroundColor(preset.background)
    setTextColor(preset.text)
  }

  const getPlaceholder = () => {
    switch (dataType) {
      case "url":
        return "https://example.com"
      case "email":
        return "user@example.com"
      case "phone":
        return "+1234567890"
      case "sms":
        return "+1234567890"
      case "wifi":
        return "NetworkName,Password"
      default:
        return "Enter your text here"
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="space-y-3">
          <Label htmlFor="dataType" className="text-gray-900 text-lg font-semibold">
            Data Type
          </Label>
          <Select value={dataType} onValueChange={setDataType}>
            <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100 transition-all duration-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="text">📝 Text</SelectItem>
              <SelectItem value="url">🌐 URL</SelectItem>
              <SelectItem value="email">📧 Email</SelectItem>
              <SelectItem value="phone">📱 Phone</SelectItem>
              <SelectItem value="sms">💬 SMS</SelectItem>
              <SelectItem value="wifi">📶 WiFi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="data" className="text-gray-900 text-lg font-semibold">
            Content
          </Label>
          {dataType === "text" ? (
            <Textarea
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder={getPlaceholder()}
              rows={4}
              className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 hover:bg-gray-100 focus:bg-white transition-all duration-300 resize-none"
            />
          ) : (
            <Input
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder={getPlaceholder()}
              className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 hover:bg-gray-100 focus:bg-white transition-all duration-300"
            />
          )}
          {dataType === "wifi" && <p className="text-sm text-gray-500">Format: NetworkName,Password</p>}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-gray-900 text-lg font-semibold">Size: {size[0]}px</Label>
            <Slider value={size} onValueChange={setSize} min={150} max={600} step={10} className="slider-purple" />
          </div>

          <div className="space-y-3">
            <Label htmlFor="errorLevel" className="text-gray-900 text-lg font-semibold">
              Error Correction
            </Label>
            <Select value={errorLevel} onValueChange={setErrorLevel}>
              <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100 transition-all duration-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="L">Low (7%)</SelectItem>
                <SelectItem value="M">Medium (15%)</SelectItem>
                <SelectItem value="Q">Quartile (25%)</SelectItem>
                <SelectItem value="H">High (30%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="foreground" className="text-gray-900 text-lg font-semibold">
              Foreground
            </Label>
            <div className="flex gap-3">
              <Input
                id="foreground"
                type="color"
                value={foregroundColor}
                onChange={(e) => setForegroundColor(e.target.value)}
                className="w-16 h-12 p-1 bg-gray-50 border-gray-200 rounded-xl cursor-pointer hover:scale-105 transition-all duration-300"
              />
              <Input
                value={foregroundColor}
                onChange={(e) => setForegroundColor(e.target.value)}
                placeholder="#000000"
                className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 hover:bg-gray-100 focus:bg-white transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="background" className="text-gray-900 text-lg font-semibold">
              Background
            </Label>
            <div className="flex gap-3">
              <Input
                id="background"
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-16 h-12 p-1 bg-gray-50 border-gray-200 rounded-xl cursor-pointer hover:scale-105 transition-all duration-300"
              />
              <Input
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                placeholder="#ffffff"
                className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 hover:bg-gray-100 focus:bg-white transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <ColorPresets onPresetSelect={handlePresetSelect} type="qr" />
      </div>

      <div className="space-y-6">
        <div className="relative flex justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border border-gray-200 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
          {isGenerating && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-3xl z-10">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            </div>
          )}
          <canvas ref={canvasRef} className="max-w-full h-auto rounded-2xl shadow-lg" />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => downloadQRCode("png")}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
          >
            <Download className="h-4 w-4" />
            Download PNG
          </Button>
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="flex items-center gap-2 bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>
    </div>
  )
}
