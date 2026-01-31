"use client"

import { ArrowRight } from "lucide-react"
import type { Component } from "@/lib/components-data"

interface ComponentCardProps {
  component: Component
  onSelect: () => void
}

export function ComponentCard({ component, onSelect }: ComponentCardProps) {
  return (
    <button
      onClick={onSelect}
      className="group h-full rounded-lg border border-border bg-card hover:bg-card/80 hover:border-primary transition-all duration-300 overflow-hidden text-left shadow-sm hover:shadow-md"
    >
      <div className="w-full h-40 sm:h-48 bg-muted border-b border-border flex items-center justify-center p-4 overflow-hidden group-hover:bg-muted/80 transition-colors">
        <div
          dangerouslySetInnerHTML={{ __html: component.preview }}
          className="w-full h-full flex items-center justify-center"
        />
      </div>

      <div className="p-4 sm:p-6">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{component.title}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-2">{component.category}</p>
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{component.description}</p>

        <div className="flex items-center gap-2 text-primary group-hover:translate-x-1 transition-transform">
          <span className="text-sm font-medium">Edit</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </button>
  )
}
