"use client"

import { Moon, Sun, Palette } from "lucide-react"
import { useTheme, type Theme, type ColorScheme } from "./theme-provider"
import { useState } from "react"

export function ThemeSwitcher() {
  const { theme, colorScheme, setTheme, setColorScheme } = useTheme()
  const [showColorPicker, setShowColorPicker] = useState(false)

  const themes: Theme[] = ["light", "dark", "auto"]
  const colorSchemes: ColorScheme[] = ["default", "ocean", "forest", "sunset"]

  const themeLabels: Record<Theme, string> = {
    light: "Light",
    dark: "Dark",
    auto: "Auto",
  }

  const schemeLabels: Record<ColorScheme, string> = {
    default: "Default",
    ocean: "Ocean",
    forest: "Forest",
    sunset: "Sunset",
  }

  const schemeColors: Record<ColorScheme, string> = {
    default: "from-purple-500 to-blue-500",
    ocean: "from-blue-500 to-cyan-500",
    forest: "from-green-600 to-emerald-500",
    sunset: "from-orange-500 to-red-500",
  }

  return (
    <div className="flex items-center gap-2">
      {/* Theme selector dropdown */}
      <div className="relative group">
        <button
          className="p-2 hover:bg-muted rounded-lg transition-colors flex items-center gap-1"
          title="Toggle theme"
        >
          {theme === "dark" ? (
            <Moon className="w-5 h-5 text-foreground" />
          ) : theme === "light" ? (
            <Sun className="w-5 h-5 text-foreground" />
          ) : (
            <Sun className="w-5 h-5 text-foreground opacity-50" />
          )}
        </button>

        <div className="absolute right-0 mt-1 w-32 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`w-full text-left px-4 py-2 text-sm ${
                theme === t ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              } transition-colors ${t === themes[0] ? "rounded-t-lg" : ""} ${
                t === themes[themes.length - 1] ? "rounded-b-lg" : ""
              }`}
            >
              {themeLabels[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Color scheme selector */}
      <button
        onClick={() => setShowColorPicker(!showColorPicker)}
        className="p-2 hover:bg-muted rounded-lg transition-colors"
        title="Change color scheme"
      >
        <Palette className="w-5 h-5 text-foreground" />
      </button>

      {showColorPicker && (
        <div className="absolute top-16 right-4 bg-card border border-border rounded-lg shadow-lg p-4 z-50 min-w-max">
          <p className="text-xs font-semibold text-muted-foreground mb-3">Color Scheme</p>
          <div className="grid grid-cols-2 gap-2">
            {colorSchemes.map((scheme) => (
              <button
                key={scheme}
                onClick={() => {
                  setColorScheme(scheme)
                  setShowColorPicker(false)
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  colorScheme === scheme ? "ring-2 ring-primary" : "hover:bg-muted"
                }`}
              >
                <div className={`flex items-center gap-2`}>
                  <div className={`w-4 h-4 rounded bg-gradient-to-br ${schemeColors[scheme]}`} />
                  <span className="text-foreground">{schemeLabels[scheme]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
