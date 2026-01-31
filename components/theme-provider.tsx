"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export type Theme = "dark" | "light" | "auto"
export type ColorScheme = "default" | "ocean" | "forest" | "sunset"

interface ThemeContextType {
  theme: Theme
  colorScheme: ColorScheme
  setTheme: (theme: Theme) => void
  setColorScheme: (scheme: ColorScheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const colorSchemes: Record<ColorScheme, Record<string, string>> = {
  default: {
    "--primary": "oklch(0.55 0.2 280)",
    "--accent": "oklch(0.6 0.15 240)",
  },
  ocean: {
    "--primary": "oklch(0.55 0.2 220)",
    "--accent": "oklch(0.6 0.15 200)",
  },
  forest: {
    "--primary": "oklch(0.50 0.2 140)",
    "--accent": "oklch(0.55 0.15 120)",
  },
  sunset: {
    "--primary": "oklch(0.60 0.2 30)",
    "--accent": "oklch(0.65 0.15 10)",
  },
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("auto")
  const [colorScheme, setColorScheme] = useState<ColorScheme>("default")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = (localStorage.getItem("theme") as Theme) || "auto"
    const savedScheme = (localStorage.getItem("colorScheme") as ColorScheme) || "default"
    setTheme(savedTheme)
    setColorScheme(savedScheme)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement

    // Apply theme
    if (theme === "auto") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      root.classList.toggle("dark", prefersDark)
    } else {
      root.classList.toggle("dark", theme === "dark")
    }

    // Apply color scheme
    const colors = colorSchemes[colorScheme]
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    localStorage.setItem("theme", theme)
    localStorage.setItem("colorScheme", colorScheme)
  }, [theme, colorScheme, mounted])

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
  }

  const handleSetColorScheme = (newScheme: ColorScheme) => {
    setColorScheme(newScheme)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorScheme,
        setTheme: handleSetTheme,
        setColorScheme: handleSetColorScheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
