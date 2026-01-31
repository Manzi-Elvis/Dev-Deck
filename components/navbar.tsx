"use client"

import { Code2, Moon, Sun, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

interface NavbarProps {
  currentComponent?: string
}

export function Navbar({ currentComponent }: NavbarProps) {
  const [isDark, setIsDark] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    html.classList.toggle("dark")
    setIsDark(!isDark)
    localStorage.setItem("theme", isDark ? "light" : "dark")
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground hidden sm:inline">DevDeck</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a
                href="#components"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                Components
              </a>
              <a
                href="#docs"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                Documentation
              </a>
              <a
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                About
              </a>
            </div>

            {/* Theme toggle and menu */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden pb-4 border-t border-border">
              <a
                href="#components"
                className="block py-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                Components
              </a>
              <a
                href="#docs"
                className="block py-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                Documentation
              </a>
              <a
                href="#about"
                className="block py-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                About
              </a>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
