"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Copy, Download, Share2, RotateCcw, Link2, Check } from "lucide-react"
import { COMPONENTS } from "@/lib/components-data"
import { CodeEditor } from "./code-editor"
import { PreviewPane } from "./preview-pane"

interface EditorPageProps {
  componentId: string
  onBack: () => void
}

export function EditorPage({ componentId, onBack }: EditorPageProps) {
  const component = COMPONENTS.find((c) => c.id === componentId)
  const [code, setCode] = useState(component?.code || "")
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const [showShareModal, setShowShareModal] = useState(false)

  useEffect(() => {
    const savedCode = localStorage.getItem(`component-${componentId}`)
    if (savedCode) {
      setCode(savedCode)
    } else if (component?.code) {
      setCode(component.code)
    }
  }, [componentId, component])

  useEffect(() => {
    if (code && componentId) {
      localStorage.setItem(`component-${componentId}`, code)
    }
  }, [code, componentId])

  if (!component) {
    return null
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setCode(component.code)
    localStorage.removeItem(`component-${componentId}`)
  }

  const handleExport = () => {
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(code))
    element.setAttribute("download", `${component.id}.tsx`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleShare = () => {
    try {
      const encoded = btoa(JSON.stringify({ id: componentId, code }))
      const shareUrl = `${window.location.origin}?share=${encoded}`
      setShareUrl(shareUrl)
      setShowShareModal(true)
    } catch (err) {
      console.error("Error generating share URL:", err)
    }
  }

  const handleCopyShareLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Back">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <div>
                <h1 className="font-bold text-lg text-foreground">{component.title}</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">{component.category}</p>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <button
                onClick={handleCopy}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-foreground text-sm font-medium transition-colors flex items-center justify-center gap-2"
                title="Copy code"
              >
                <Copy className="w-4 h-4" />
                <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
              </button>
              <button
                onClick={handleReset}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-foreground text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <button
                onClick={handleExport}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-primary-foreground text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={handleShare}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-accent hover:bg-accent/90 rounded-lg text-accent-foreground text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col lg:flex-row">
          {/* Editor pane */}
          <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-border min-h-96 lg:min-h-0">
            <CodeEditor value={code} onChange={setCode} />
          </div>

          {/* Preview pane */}
          <div className="w-full lg:w-1/2 min-h-96 lg:min-h-0">
            <PreviewPane code={code} />
          </div>
        </div>
      </div>

      {/* Share modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full animate-slideInUp">
            <h2 className="text-lg font-semibold text-foreground mb-4">Share Component</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Share this link with others to collaborate on this component:
            </p>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground font-mono overflow-x-auto"
              />
              <button
                onClick={handleCopyShareLink}
                className="px-3 py-2 bg-primary hover:bg-primary/90 rounded-lg text-primary-foreground transition-colors flex items-center justify-center"
              >
                {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-foreground text-sm font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
