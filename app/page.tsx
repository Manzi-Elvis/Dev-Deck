"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { ComponentLibrary } from "@/components/component-library"
import { EditorPage } from "@/components/editor-page"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (selectedComponent) {
    return <EditorPage componentId={selectedComponent} onBack={() => setSelectedComponent(null)} />
  }

  return (
    <ThemeProvider>
      <main className="min-h-screen bg-background">
        <Navbar />
        <ComponentLibrary onSelectComponent={setSelectedComponent} />
      </main>
    </ThemeProvider>
  )
}
