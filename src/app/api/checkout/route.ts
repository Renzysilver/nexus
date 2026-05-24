import { NextResponse } from "next/server"

// Stripe Checkout Session Creator
// In production, replace with real Stripe keys in .env
// For now, this simulates the full checkout flow

export async function POST(req: Request) {
  try {
    const { cardId, cardTitle, price, buyerEmail } = await req.json()

    if (!cardId || !cardTitle || !price) {
      return NextResponse.json(
        { error: "Card ID, title, and price are required" },
        { status: 400 }
      )
    }

    // Check if Stripe keys are configured
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY

    if (stripeSecretKey && stripeSecretKey.startsWith("sk_")) {
      // Real Stripe integration
      const Stripe = (await import("stripe")).default
      const stripe = new Stripe(stripeSecretKey)

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: cardTitle,
                description: `Knowledge Card by NEXUS`,
              },
              unit_amount: Math.round(price * 100), // Stripe uses cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.NEXTAUTH_URL}/marketplace?purchase=success&card=${cardId}`,
        cancel_url: `${process.env.NEXTAUTH_URL}/marketplace?purchase=cancelled`,
        metadata: {
          cardId,
          buyerEmail: buyerEmail || "guest",
        },
      })

      return NextResponse.json({ url: session.url, sessionId: session.id })
    } else {
      // Demo mode — simulate a successful checkout
      return NextResponse.json({
        url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/marketplace?purchase=success&card=${cardId}`,
        sessionId: `demo_session_${Date.now()}`,
        demoMode: true,
        message: "Stripe not configured — running in demo mode. Add STRIPE_SECRET_KEY to .env for real payments.",
      })
    }
  } catch {
    return NextResponse.json(
      { error: "Checkout session creation failed" },
      { status: 500 }
    )
  }
}
