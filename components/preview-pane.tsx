"use client"

import { useState, useEffect } from "react"
import { RefreshCw } from "lucide-react"

interface PreviewPaneProps {
  code: string
}

export function PreviewPane({ code }: PreviewPaneProps) {
  const [html, setHtml] = useState("")
  const [error, setError] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const transpileComponent = (code: string) => {
    try {
      setError("")
      setIsRefreshing(true)

      // Extract JSX return content
      let jsxContent = code

      // Remove imports and exports
      jsxContent = jsxContent
        .replace(/import\s+.*?from\s+['"][^'"]*['"]/g, "")
        .replace(/export\s+(function|const)\s+/g, "")
        .replace(/export\s+/g, "")

      // Extract what's being returned
      const returnMatch = jsxContent.match(/return\s*$$\s*([\s\S]*?)\s*$$/)
      if (returnMatch) {
        jsxContent = returnMatch[1]
      }

      // Convert className to style (simplified)
      jsxContent = jsxContent.replace(/className="([^"]*)"/g, (match, classes) => {
        // This is a simplified conversion - in production, use a proper CSS-in-JS solution
        return `style="padding: 12px; border-radius: 6px;"`
      })

      // Create preview wrapper
      const previewHtml = `
        <div style="display: flex; align-items: center; justify-content: center; min-height: 100%; padding: 16px;">
          ${jsxContent}
        </div>
      `

      setHtml(previewHtml)
      setTimeout(() => setIsRefreshing(false), 300)
    } catch (err) {
      setIsRefreshing(false)
      setError(err instanceof Error ? err.message : "Error processing component")
    }
  }

  useEffect(() => {
    transpileComponent(code)
  }, [code])

  const handleRefresh = () => {
    transpileComponent(code)
  }

  return (
    <div className="h-full flex flex-col bg-muted/30">
      <div className="px-4 sm:px-6 py-3 border-b border-border flex justify-between items-center">
        <p className="text-xs sm:text-sm font-medium text-muted-foreground">Preview</p>
        <button
          onClick={handleRefresh}
          className={`p-1.5 hover:bg-muted rounded transition-all ${isRefreshing ? "animate-spin" : ""}`}
          title="Refresh preview"
        >
          <RefreshCw className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 sm:p-6 bg-background/40">
        {error ? (
          <div className="text-destructive text-sm font-medium">
            <p className="mb-2">Error:</p>
            <pre className="text-xs bg-destructive/10 p-2 rounded border border-destructive/30">{error}</pre>
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: html }} className="w-full h-full animate-fadeIn" />
        )}
      </div>
    </div>
  )
}
