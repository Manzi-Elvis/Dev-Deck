"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { ComponentCard } from "./component-card"
import { COMPONENTS } from "@/lib/components-data"

interface ComponentLibraryProps {
  onSelectComponent: (id: string) => void
}

export function ComponentLibrary({ onSelectComponent }: ComponentLibraryProps) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredComponents = useMemo(() => {
    return COMPONENTS.filter((comp) => {
      const matchesSearch =
        comp.title.toLowerCase().includes(search.toLowerCase()) ||
        comp.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = !selectedCategory || comp.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [search, selectedCategory])

  const categories = Array.from(new Set(COMPONENTS.map((c) => c.category)))

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12 animate-slideInDown">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2 text-balance">Component Playground</h1>
          <p className="text-base sm:text-lg text-muted-foreground">Browse, edit, and share beautiful UI components</p>
        </div>

        {/* Search bar */}
        <div className="mb-8 sm:mb-10 animate-slideInUp">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search components..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === null
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Components grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredComponents.map((component, index) => (
            <div key={component.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-slideInUp">
              <ComponentCard component={component} onSelect={() => onSelectComponent(component.id)} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredComponents.length === 0 && (
          <div className="text-center py-12 animate-fadeIn">
            <p className="text-muted-foreground text-lg">No components found</p>
            <p className="text-muted-foreground text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
