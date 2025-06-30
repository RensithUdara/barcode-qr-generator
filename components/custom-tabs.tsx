"use client"

import { useState, createContext, useContext, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface TabsContextType {
  activeTab: string
  setActiveTab: (value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

interface CustomTabsProps {
  defaultValue: string
  children: ReactNode
  className?: string
}

export function CustomTabs({ defaultValue, children, className }: CustomTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  )
}

interface CustomTabsListProps {
  children: ReactNode
  className?: string
}

export function CustomTabsList({ children, className }: CustomTabsListProps) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-2 shadow-xl",
        className,
      )}
    >
      {children}
    </div>
  )
}

interface CustomTabsTriggerProps {
  value: string
  children: ReactNode
  className?: string
}

export function CustomTabsTrigger({ value, children, className }: CustomTabsTriggerProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error("CustomTabsTrigger must be used within CustomTabs")

  const { activeTab, setActiveTab } = context
  const isActive = activeTab === value

  const getActiveStyles = () => {
    if (value === "qr") {
      return "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
    } else if (value === "barcode") {
      return "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
    }
    return ""
  }

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        "flex items-center justify-center gap-3 rounded-xl transition-all duration-300 py-4 font-semibold",
        "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
        isActive
          ? getActiveStyles()
          : "text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105",
        className,
      )}
    >
      {children}
    </button>
  )
}

interface CustomTabsContentProps {
  value: string
  children: ReactNode
  className?: string
}

export function CustomTabsContent({ value, children, className }: CustomTabsContentProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error("CustomTabsContent must be used within CustomTabs")

  const { activeTab } = context
  const isActive = activeTab === value

  if (!isActive) return null

  return <div className={cn("animate-slide-in", className)}>{children}</div>
}
