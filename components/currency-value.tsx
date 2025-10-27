import { Skeleton } from "@/components/ui/skeleton"

interface CurrencyValueProps {
  currency: "USD" | "BRL"
  value: string
  previousValue: string
  size?: "default" | "large"
  view?: "daily" | "monthly"
  loading?: boolean
}

/**
 * CurrencyValue component displays a currency amount with its flag and previous period comparison
 * Uses bold, prominent typography for financial data display
 * Shows skeleton loaders when data is being fetched
 */
export function CurrencyValue({
  currency,
  value,
  previousValue,
  size = "default",
  view = "monthly",
  loading = false,
}: CurrencyValueProps) {
  const flag = currency === "USD" ? "🇺🇸" : "🇧🇷"
  const symbol = currency === "USD" ? "$" : "R$"
  const label = view === "daily" ? "ONTEM" : "Mês Passado"

  if (loading) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className={size === "large" ? "text-2xl" : "text-xl"}>{flag}</span>
          <span className={`${size === "large" ? "text-base" : "text-sm"} font-medium text-muted-foreground`}>
            {symbol}
          </span>
          <Skeleton className={`${size === "large" ? "h-14 w-48" : "h-12 w-40"}`} />
        </div>
        <div className="pl-12">
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <span className={size === "large" ? "text-2xl" : "text-xl"}>{flag}</span>
        <span className={`${size === "large" ? "text-base" : "text-sm"} font-medium text-muted-foreground`}>
          {symbol}
        </span>
        <span className={`${size === "large" ? "text-5xl" : "text-4xl"} font-black tracking-tight text-foreground`}>
          {value}
        </span>
      </div>
      <p className="text-sm text-muted-foreground pl-12">
        {label}: {symbol} {previousValue}
      </p>
    </div>
  )
}
