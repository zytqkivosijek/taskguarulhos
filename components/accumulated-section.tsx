import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface AccumulatedSectionProps {
  usdTotal: string
  brlTotal: string
  view: "daily" | "monthly"
  loading?: boolean
}

/**
 * AccumulatedSection displays the accumulated totals for both currencies
 * Features extra-large, bold typography for prominent display of key metrics
 * Label changes based on view: "Acumulado Diário" for daily, "Acumulado do Mês" for monthly
 */
export function AccumulatedSection({ usdTotal, brlTotal, view, loading = false }: AccumulatedSectionProps) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold uppercase tracking-wide text-muted-foreground">
          {view === "daily" ? "Acumulado Diário" : "Acumulado do Mês"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* USD Total */}
          <div className="flex items-center gap-4">
            <span className="text-3xl">🇺🇸</span>
            <span className="text-base font-medium text-muted-foreground">$</span>
            {loading ? (
              <Skeleton className="h-16 w-56" />
            ) : (
              <span className="text-6xl font-black tracking-tight text-foreground">{usdTotal}</span>
            )}
          </div>

          {/* BRL Total */}
          <div className="flex items-center gap-4">
            <span className="text-3xl">🇧🇷</span>
            <span className="text-base font-medium text-muted-foreground">R$</span>
            {loading ? (
              <Skeleton className="h-16 w-56" />
            ) : (
              <span className="text-6xl font-black tracking-tight text-foreground">{brlTotal}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
