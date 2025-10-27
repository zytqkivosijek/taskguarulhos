import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const time = searchParams.get("time") || "month"

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 20000)

    const response = await fetch(`https://n8n.broker10.com/webhook/all-info?time=${time}`, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("[API] Error fetching financial data:", error)

    // Return zero values on error or timeout
    return NextResponse.json(
      {
        success: true,
        data: {
          deposits: { now: "0", before: "0" },
          registers: { now: "0", before: "0" },
          pnl: { now: "0", before: "0" },
          infoproducts: { now: "0", before: "0" },
          highticket: { now: "0", before: "0" },
          ads: { now: "0", before: "0" },
        },
      },
      { status: 200 },
    )
  }
}
