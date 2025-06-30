"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Palette } from "lucide-react"

interface ColorPreset {
  name: string
  foreground: string
  background: string
  text: string
}

interface ColorPresetsProps {
  onPresetSelect: (preset: ColorPreset) => void
  type: "qr" | "barcode"
}

export default function ColorPresets({ onPresetSelect, type }: ColorPresetsProps) {
  const presets: ColorPreset[] = [
    { name: "Classic", foreground: "#000000", background: "#ffffff", text: "#333333" },
    { name: "Ocean", foreground: "#0ea5e9", background: "#f0f9ff", text: "#0ea5e9" },
    { name: "Forest", foreground: "#059669", background: "#ecfdf5", text: "#059669" },
    { name: "Sunset", foreground: "#dc2626", background: "#fef2f2", text: "#dc2626" },
    { name: "Royal", foreground: "#7c3aed", background: "#faf5ff", text: "#7c3aed" },
    { name: "Gold", foreground: "#d97706", background: "#fffbeb", text: "#d97706" },
    { name: "Midnight", foreground: "#ffffff", background: "#111827", text: "#f9fafb" },
    { name: "Rose", foreground: "#e11d48", background: "#fff1f2", text: "#e11d48" },
  ]

  return (
    <div className="space-y-4">
      <Label className="text-gray-900 text-lg font-semibold flex items-center gap-2">
        <Palette className="h-5 w-5" />
        Color Presets
      </Label>
      <div className="grid grid-cols-4 gap-3">
        {presets.map((preset) => (
          <Button
            key={preset.name}
            variant="outline"
            size="sm"
            onClick={() => onPresetSelect(preset)}
            className="relative overflow-hidden border-gray-200 hover:border-gray-300 transition-all duration-300 hover:scale-105 group"
            style={{
              backgroundColor: `${preset.background}`,
              borderColor: preset.foreground,
            }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r opacity-20 group-hover:opacity-30 transition-opacity duration-300"
              style={{
                background: `linear-gradient(45deg, ${preset.foreground}, ${preset.text})`,
              }}
            />
            <span className="relative z-10 text-gray-900 font-medium text-xs">{preset.name}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
