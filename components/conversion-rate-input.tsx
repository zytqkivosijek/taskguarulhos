"use client"

import * as React from "react"
import { DollarSign } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ConversionRateInputProps {
  value: number
  onChange: (value: number) => void
}

/**
 * ConversionRateInput component for USD to BRL conversion rate
 * Allows users to adjust the exchange rate used for currency conversions
 */
export function ConversionRateInput({ value, onChange }: ConversionRateInputProps) {
  const [inputValue, setInputValue] = React.useState(value.toString())

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)

    // Parse and validate the input
    const parsed = Number.parseFloat(newValue)
    if (!isNaN(parsed) && parsed > 0) {
      onChange(parsed)
    }
  }

  const handleBlur = () => {
    // Reset to current value if invalid
    const parsed = Number.parseFloat(inputValue)
    if (isNaN(parsed) || parsed <= 0) {
      setInputValue(value.toString())
    }
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card">
      <DollarSign className="h-4 w-4 text-muted-foreground" />
      <Input
        type="number"
        step="0.01"
        min="0"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-20 h-8 px-2 text-sm font-semibold border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        aria-label="Taxa de conversão USD para BRL"
      />
      <span className="text-xs text-muted-foreground font-medium">USD/BRL</span>
    </div>
  )
}
