"use client"

import React from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { ViewToggle } from "@/components/view-toggle"
import { CategoryCard } from "@/components/category-card"
import { AccumulatedSection } from "@/components/accumulated-section"

/**
 * Main dashboard page displaying financial metrics across multiple categories
 * Supports daily/monthly views and dark/light themes
 */
export default function DashboardPage() {
  const [view, setView] = React.useState<"daily" | "monthly">("monthly")

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header with controls */}
        <header className="flex items-center justify-between mb-8">
          <ViewToggle value={view} onChange={setView} />
          <ThemeToggle />
        </header>

        {/* Main content grid */}
        <div className="space-y-6">
          {/* Category cards grid - 2x2 layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CategoryCard
              title="Depósitos"
              accentColor="#10b981"
              usdValue="XXX"
              usdPrevious="250"
              brlValue="XXX"
              brlPrevious="1.250"
              view={view}
            />

            <CategoryCard
              title="PNL"
              accentColor="#ff6b7a"
              usdValue="XXX"
              usdPrevious="180"
              brlValue="XXX"
              brlPrevious="900"
              view={view}
            />

            <CategoryCard
              title="Infoprodutos"
              accentColor="#2563eb"
              usdValue="XXX"
              usdPrevious="320"
              brlValue="XXX"
              brlPrevious="1.600"
              view={view}
            />

            <CategoryCard
              title="Highticket"
              accentColor="#d4af37"
              usdValue="XXX"
              usdPrevious="500"
              brlValue="XXX"
              brlPrevious="2.500"
              view={view}
            />
          </div>

          {/* Accumulated totals section */}
          <AccumulatedSection usdTotal="0.00" brlTotal="0.00" />
        </div>
      </div>
    </div>
  )
}
