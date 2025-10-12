"use client"
import { Button } from "@/components/ui/button"

type View = "daily" | "monthly"

interface ViewToggleProps {
  value: View
  onChange: (value: View) => void
}

/**
 * ViewToggle component switches between daily and monthly financial views
 * Uses a segmented control pattern for clear visual feedback
 */
export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex rounded-lg bg-muted p-1 gap-1">
      <Button
        variant={value === "daily" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("daily")}
        className={`font-semibold uppercase tracking-wide text-xs px-6 ${
          value === "daily" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Diário
      </Button>
      <Button
        variant={value === "monthly" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("monthly")}
        className={`font-semibold uppercase tracking-wide text-xs px-6 ${
          value === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Mensal
      </Button>
    </div>
  )
}
