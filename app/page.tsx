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
              usdValue="103.895,90"
              usdPrevious="98.420,50"
              brlValue="545.432,00"
              brlPrevious="516.806,00"
              view={view}
            />

            <CategoryCard
              title="PNL"
              accentColor="#ff6b7a"
              usdValue="87.240,75"
              usdPrevious="82.150,30"
              brlValue="458.053,94"
              brlPrevious="431.389,58"
              view={view}
            />

            <CategoryCard
              title="Infoprodutos"
              accentColor="#2563eb"
              usdValue="64.580,40"
              usdPrevious="59.320,80"
              brlValue="339.072,10"
              brlPrevious="311.483,20"
              view={view}
            />

            <CategoryCard
              title="Highticket"
              accentColor="#d4af37"
              usdValue="48.920,25"
              usdPrevious="45.680,00"
              brlValue="256.830,31"
              brlPrevious="239.868,00"
              view={view}
            />
          </div>

          <AccumulatedSection usdTotal="304.637,30" brlTotal="1.599.388,35" />
        </div>
      </div>
    </div>
  )
}
