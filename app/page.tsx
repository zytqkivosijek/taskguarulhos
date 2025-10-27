"use client"

import React from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { ViewToggle } from "@/components/view-toggle"
import { CategoryCard } from "@/components/category-card"
import { AccumulatedSection } from "@/components/accumulated-section"
import { ConversionRateInput } from "@/components/conversion-rate-input"

interface ApiResponse {
  success: boolean
  data: {
    deposits: {
      now: string
      before: string
    }
    registers: {
      now: string
      before: string
    }
    pnl: {
      now: string
      before: string
    }
    infoproducts: {
      now: string
      before: string
    }
    highticket: {
      now: string
      before: string
    }
    ads: {
      now: string
      before: string
    }
  }
}

interface CurrencyApiResponse {
  date: string
  usd: {
    brl: number
  }
}

/**
 * Formats a number to Brazilian currency format with thousand separators and 2 decimals
 */
function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/**
 * Main dashboard page displaying financial metrics across multiple categories
 * Supports daily/monthly views and dark/light themes
 * Fetches real-time data from API and applies currency conversion
 */
export default function DashboardPage() {
  const [view, setView] = React.useState<"daily" | "monthly">("monthly")
  const [conversionRate, setConversionRate] = React.useState(5.45)
  const [apiData, setApiData] = React.useState<ApiResponse["data"] | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json",
        )
        const result: CurrencyApiResponse = await response.json()

        if (result.usd?.brl) {
          setConversionRate(result.usd.brl)
        }
      } catch (error) {
        console.error("[v0] Error fetching conversion rate:", error)
        // Keep default value of 5.45 if fetch fails
      }
    }

    fetchConversionRate()
  }, [])

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const timeParam = view === "daily" ? "day" : "month"

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 20000)

        const response = await fetch(`https://n8n.broker10.com/webhook/all-info?time=${timeParam}`, {
          credentials: "include",
          signal: controller.signal,
        })

        clearTimeout(timeoutId)
        const result: ApiResponse = await response.json()

        if (result.success) {
          setApiData(result.data)
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.error("[v0] Request timeout - setting values to zero")
        } else {
          console.error("[v0] Error fetching data:", error)
        }

        setApiData({
          deposits: { now: "0", before: "0" },
          registers: { now: "0", before: "0" },
          pnl: { now: "0", before: "0" },
          infoproducts: { now: "0", before: "0" },
          highticket: { now: "0", before: "0" },
          ads: { now: "0", before: "0" },
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [view])

  const calculateValues = () => {
    if (!apiData) {
      return {
        deposits: { usd: 0, usdPrev: 0, brl: 0, brlPrev: 0 },
        pnl: { usd: 0, usdPrev: 0, brl: 0, brlPrev: 0 },
        infoproducts: { usd: 0, usdPrev: 0, brl: 0, brlPrev: 0 },
        highticket: { usd: 0, usdPrev: 0, brl: 0, brlPrev: 0 },
        ads: { usd: 0, usdPrev: 0, brl: 0, brlPrev: 0 },
        totals: { usd: 0, brl: 0 },
      }
    }

    // Deposits and PNL are in USD, convert to BRL
    const depositsUsd = Number.parseFloat(apiData.deposits.now)
    const depositsUsdPrev = Number.parseFloat(apiData.deposits.before)
    const depositsBrl = depositsUsd * conversionRate
    const depositsBrlPrev = depositsUsdPrev * conversionRate

    const pnlUsd = Number.parseFloat(apiData.pnl.now)
    const pnlUsdPrev = Number.parseFloat(apiData.pnl.before)
    const pnlBrl = pnlUsd * conversionRate
    const pnlBrlPrev = pnlUsdPrev * conversionRate

    // Infoproducts and Highticket are in BRL, convert to USD
    const infoproductsBrl = Number.parseFloat(apiData.infoproducts.now)
    const infoproductsBrlPrev = Number.parseFloat(apiData.infoproducts.before)
    const infoproductsUsd = infoproductsBrl / conversionRate
    const infoproductsUsdPrev = infoproductsBrlPrev / conversionRate

    const highticketBrl = Number.parseFloat(apiData.highticket.now)
    const highticketBrlPrev = Number.parseFloat(apiData.highticket.before)
    const highticketUsd = highticketBrl / conversionRate
    const highticketUsdPrev = highticketBrlPrev / conversionRate

    const adsUsd = Number.parseFloat(apiData.ads.now)
    const adsUsdPrev = Number.parseFloat(apiData.ads.before)
    const adsBrl = adsUsd * conversionRate
    const adsBrlPrev = adsUsdPrev * conversionRate

    // Calculate totals
    const totalUsd = pnlUsd + infoproductsUsd + highticketUsd + adsUsd
    const totalBrl = pnlBrl + infoproductsBrl + highticketBrl + adsBrl

    return {
      deposits: { usd: depositsUsd, usdPrev: depositsUsdPrev, brl: depositsBrl, brlPrev: depositsBrlPrev },
      pnl: { usd: pnlUsd, usdPrev: pnlUsdPrev, brl: pnlBrl, brlPrev: pnlBrlPrev },
      infoproducts: {
        usd: infoproductsUsd,
        usdPrev: infoproductsUsdPrev,
        brl: infoproductsBrl,
        brlPrev: infoproductsBrlPrev,
      },
      highticket: { usd: highticketUsd, usdPrev: highticketUsdPrev, brl: highticketBrl, brlPrev: highticketBrlPrev },
      ads: { usd: adsUsd, usdPrev: adsUsdPrev, brl: adsBrl, brlPrev: adsBrlPrev },
      totals: { usd: totalUsd, brl: totalBrl },
    }
  }

  const values = calculateValues()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header with controls */}
        <header className="flex items-center justify-between mb-8">
          <ViewToggle value={view} onChange={setView} />
          <div className="flex items-center gap-3">
            <ConversionRateInput value={conversionRate} onChange={setConversionRate} />
            <ThemeToggle />
          </div>
        </header>

        {/* Main content grid */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-muted-foreground">Carregando dados...</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CategoryCard
                  title="Depósitos"
                  accentColor="#10b981"
                  usdValue={formatCurrency(values.deposits.usd)}
                  usdPrevious={formatCurrency(values.deposits.usdPrev)}
                  brlValue={formatCurrency(values.deposits.brl)}
                  brlPrevious={formatCurrency(values.deposits.brlPrev)}
                  view={view}
                />

                <CategoryCard
                  title="PNL"
                  accentColor="#ff6b7a"
                  usdValue={formatCurrency(values.pnl.usd)}
                  usdPrevious={formatCurrency(values.pnl.usdPrev)}
                  brlValue={formatCurrency(values.pnl.brl)}
                  brlPrevious={formatCurrency(values.pnl.brlPrev)}
                  view={view}
                />

                <CategoryCard
                  title="ADS"
                  accentColor="#f97316"
                  usdValue={formatCurrency(values.ads.usd)}
                  usdPrevious={formatCurrency(values.ads.usdPrev)}
                  brlValue={formatCurrency(values.ads.brl)}
                  brlPrevious={formatCurrency(values.ads.brlPrev)}
                  view={view}
                />

                <CategoryCard
                  title="Infoprodutos"
                  accentColor="#2563eb"
                  usdValue={formatCurrency(values.infoproducts.usd)}
                  usdPrevious={formatCurrency(values.infoproducts.usdPrev)}
                  brlValue={formatCurrency(values.infoproducts.brl)}
                  brlPrevious={formatCurrency(values.infoproducts.brlPrev)}
                  view={view}
                />

                <CategoryCard
                  title="Highticket"
                  accentColor="#d4af37"
                  usdValue={formatCurrency(values.highticket.usd)}
                  usdPrevious={formatCurrency(values.highticket.usdPrev)}
                  brlValue={formatCurrency(values.highticket.brl)}
                  brlPrevious={formatCurrency(values.highticket.brlPrev)}
                  view={view}
                />
              </div>

              <AccumulatedSection
                usdTotal={formatCurrency(values.totals.usd)}
                brlTotal={formatCurrency(values.totals.brl)}
                view={view}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
