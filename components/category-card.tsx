import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CurrencyValue } from "./currency-value"

interface CategoryCardProps {
  title: string
  accentColor: string
  usdValue: string
  usdPrevious: string
  brlValue: string
  brlPrevious: string
  view?: "daily" | "monthly"
}

/**
 * CategoryCard component displays financial category data with dual currency support
 * Features a colored accent badge and organized currency display
 */
export function CategoryCard({
  title,
  accentColor,
  usdValue,
  usdPrevious,
  brlValue,
  brlPrevious,
  view,
}: CategoryCardProps) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <div
          className="inline-flex items-center justify-center px-4 py-1.5 rounded-md text-sm font-bold tracking-wide uppercase w-fit"
          style={{ backgroundColor: accentColor, color: "white" }}
        >
          {title}
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <CurrencyValue currency="USD" value={usdValue} previousValue={usdPrevious} view={view} />
        <CurrencyValue currency="BRL" value={brlValue} previousValue={brlPrevious} view={view} />
      </CardContent>
    </Card>
  )
}
