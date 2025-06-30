"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Copy, Check, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import ColorPresets from "@/components/color-presets"

export default function BarcodeGenerator() {
  const [data, setData] = useState("123456789012")
  const [format, setFormat] = useState("CODE128")
  const [width, setWidth] = useState([2])
  const [height, setHeight] = useState([100])
  const [displayValue, setDisplayValue] = useState(true)
  const [fontSize, setFontSize] = useState([20])
  const [textMargin, setTextMargin] = useState([2])
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [lineColor, setLineColor] = useState("#000000")
  const [textColor, setTextColor] = useState("#000000")
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  const generateBarcode = async () => {
    setIsGenerating(true)
    try {
      const JsBarcode = (await import("jsbarcode")).default
      const canvas = canvasRef.current

      if (canvas && data) {
        JsBarcode(canvas, data, {
          format: format,
          width: width[0],
          height: height[0],
          displayValue: displayValue,
          fontSize: fontSize[0],
          textMargin: textMargin[0],
          background: backgroundColor,
          lineColor: lineColor,
          textColor: textColor,
          margin: 10,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate barcode. Please check your input and format.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    if (data) {
      generateBarcode()
    }
  }, [data, format, width, height, displayValue, fontSize, textMargin, backgroundColor, lineColor, textColor])

  const downloadBarcode = (format: string) => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (format === "png") {
      const link = document.createElement("a")
      link.download = "barcode.png"
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const copyToClipboard = async () => {
    const canvas = canvasRef.current
    if (canvas) {
      try {
        const dataUrl = canvas.toDataURL()
        const response = await fetch(dataUrl)
        const blob = await response.blob()
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        toast({
          title: "Copied!",
          description: "Barcode copied to clipboard",
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
    setLineColor(preset.foreground)
    setBackgroundColor(preset.background)
    setTextColor(preset.text)
  }

  const getFormatInfo = (format: string) => {
    const formats: Record<string, { name: string; description: string; example: string; icon: string }> = {
      CODE128: {
        name: "Code 128",
        description: "High-density barcode, supports all ASCII characters",
        example: "ABC123",
        icon: "📊",
      },
      CODE39: { name: "Code 39", description: "Alphanumeric barcode, widely used", example: "ABC123", icon: "📋" },
      EAN13: {
        name: "EAN-13",
        description: "European Article Number, 13 digits",
        example: "1234567890123",
        icon: "🛒",
      },
      EAN8: { name: "EAN-8", description: "European Article Number, 8 digits", example: "12345678", icon: "🏪" },
      UPC: { name: "UPC-A", description: "Universal Product Code, 12 digits", example: "123456789012", icon: "🏷️" },
      ITF14: { name: "ITF-14", description: "Interleaved 2 of 5, 14 digits", example: "12345678901234", icon: "📦" },
      MSI: { name: "MSI", description: "Modified Plessey, numeric only", example: "1234567890", icon: "🔢" },
      pharmacode: { name: "Pharmacode", description: "Pharmaceutical barcode, 3-131070", example: "1234", icon: "💊" },
    }
    return formats[format] || { name: format, description: "", example: "", icon: "📊" }
  }

  const formatInfo = getFormatInfo(format)

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="space-y-3">
          <Label htmlFor="format" className="text-gray-900 text-lg font-semibold">
            Barcode Format
          </Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100 transition-all duration-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="CODE128">{formatInfo.icon} Code 128</SelectItem>
              <SelectItem value="CODE39">📋 Code 39</SelectItem>
              <SelectItem value="EAN13">🛒 EAN-13</SelectItem>
              <SelectItem value="EAN8">🏪 EAN-8</SelectItem>
              <SelectItem value="UPC">🏷️ UPC-A</SelectItem>
              <SelectItem value="ITF14">📦 ITF-14</SelectItem>
              <SelectItem value="MSI">🔢 MSI</SelectItem>
              <SelectItem value="pharmacode">💊 Pharmacode</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-200">
            {formatInfo.description}
          </p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="data" className="text-gray-900 text-lg font-semibold">
            Barcode Data
          </Label>
          <Input
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder={formatInfo.example}
            className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 hover:bg-gray-100 focus:bg-white transition-all duration-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-gray-900 text-lg font-semibold">Width: {width[0]}px</Label>
            <Slider value={width} onValueChange={setWidth} min={1} max={5} step={0.5} className="slider-blue" />
          </div>

          <div className="space-y-3">
            <Label className="text-gray-900 text-lg font-semibold">Height: {height[0]}px</Label>
            <Slider value={height} onValueChange={setHeight} min={50} max={200} step={10} className="slider-blue" />
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <Checkbox
            id="displayValue"
            checked={displayValue}
            onCheckedChange={setDisplayValue}
            className="border-gray-300 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-cyan-500"
          />
          <Label htmlFor="displayValue" className="text-gray-900 font-medium cursor-pointer">
            Display text below barcode
          </Label>
        </div>

        {displayValue && (
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-gray-900 text-lg font-semibold">Font Size: {fontSize[0]}px</Label>
              <Slider value={fontSize} onValueChange={setFontSize} min={10} max={30} step={2} className="slider-blue" />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-900 text-lg font-semibold">Text Margin: {textMargin[0]}px</Label>
              <Slider
                value={textMargin}
                onValueChange={setTextMargin}
                min={0}
                max={10}
                step={1}
                className="slider-blue"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-3">
            <Label htmlFor="lineColor" className="text-gray-900 text-lg font-semibold">
              Line Color
            </Label>
            <div className="flex gap-2">
              <Input
                id="lineColor"
                type="color"
                value={lineColor}
                onChange={(e) => setLineColor(e.target.value)}
                className="w-16 h-12 p-1 bg-gray-50 border-gray-200 rounded-xl cursor-pointer hover:scale-105 transition-all duration-300"
              />
              <Input
                value={lineColor}
                onChange={(e) => setLineColor(e.target.value)}
                placeholder="#000000"
                className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 hover:bg-gray-100 focus:bg-white transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="backgroundColor" className="text-gray-900 text-lg font-semibold">
              Background
            </Label>
            <div className="flex gap-2">
              <Input
                id="backgroundColor"
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

          <div className="space-y-3">
            <Label htmlFor="textColor" className="text-gray-900 text-lg font-semibold">
              Text Color
            </Label>
            <div className="flex gap-2">
              <Input
                id="textColor"
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-16 h-12 p-1 bg-gray-50 border-gray-200 rounded-xl cursor-pointer hover:scale-105 transition-all duration-300"
              />
              <Input
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                placeholder="#000000"
                className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 hover:bg-gray-100 focus:bg-white transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <ColorPresets onPresetSelect={handlePresetSelect} type="barcode" />
      </div>

      <div className="space-y-6">
        <div className="relative flex justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border border-gray-200 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
          {isGenerating && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-3xl z-10">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          )}
          <canvas ref={canvasRef} className="max-w-full h-auto rounded-2xl shadow-lg" />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => downloadBarcode("png")}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
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
