"use client"

import { useEffect, useRef, useState } from "react"
import { Copy, Check } from "lucide-react"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
}

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [lineCount, setLineCount] = useState(1)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    // Update line count
    const lines = textarea.value.split("\n").length
    setLineCount(lines)

    // Sync scroll between textarea and highlights
    const handleScroll = () => {
      const highlightLayer = textarea.nextElementSibling as HTMLElement
      if (highlightLayer) {
        highlightLayer.scrollLeft = textarea.scrollLeft
        highlightLayer.scrollTop = textarea.scrollTop
      }
    }

    textarea.addEventListener("scroll", handleScroll)
    return () => textarea.removeEventListener("scroll", handleScroll)
  }, [value])

  const highlightCode = (code: string): string => {
    return code
      .replace(
        /\b(export|function|const|return|import|from|interface|type|class)\b/g,
        '<span class="keyword">$1</span>',
      )
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="literal">$1</span>')
      .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
      .replace(/'([^']*)'/g, "<span class=\"string\">'$1'</span>")
      .replace(/\/\/.*/g, '<span class="comment">$&</span>')
      .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="px-4 sm:px-6 py-3 border-b border-border flex justify-between items-center">
        <p className="text-xs sm:text-sm font-medium text-muted-foreground">Component Code</p>
        <button onClick={handleCopy} className="p-1.5 hover:bg-muted rounded transition-colors" title="Copy code">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Line numbers */}
        <div className="bg-muted/30 border-r border-border px-3 py-4 text-right select-none overflow-hidden">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} className="h-6 text-xs text-muted-foreground font-mono">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Editor and highlight layer */}
        <div className="flex-1 relative overflow-hidden">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full p-4 sm:p-6 bg-transparent text-foreground font-mono text-sm resize-none outline-none focus:ring-0 overflow-auto"
            spellCheck="false"
          />
          <pre
            className="absolute inset-0 p-4 sm:p-6 font-mono text-sm text-muted-foreground pointer-events-none overflow-auto whitespace-pre-wrap wrap-break-word"
            dangerouslySetInnerHTML={{
              __html: `<code>${highlightCode(value)}</code>`,
            }}
          />
          <style>{`
            .keyword { color: #c678dd; }
            .literal { color: #56b6f2; }
            .string { color: #98c379; }
            .comment { color: #5c6370; }
          `}</style>
        </div>
      </div>
    </div>
  )
}
