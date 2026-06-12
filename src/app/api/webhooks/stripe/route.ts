import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Stripe Webhook Handler
// Verifies the event signature (when STRIPE_WEBHOOK_SECRET is set), then
// records the purchase against the KnowledgeCard and logs an analytics event.
// Configure this endpoint in the Stripe Dashboard as:
//   https://yourdomain.com/api/webhooks/stripe

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const sig = req.headers.get("stripe-signature")
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY

    let event: { type: string; data: { object: Record<string, unknown> } }

    if (webhookSecret && stripeSecretKey && sig) {
      const Stripe = (await import("stripe")).default
      const stripe = new Stripe(stripeSecretKey)
      try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret) as unknown as typeof event
      } catch (err) {
        console.error("[stripe webhook] signature verification failed:", err)
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
      }
    } else {
      // No webhook secret configured (e.g. local/demo) — trust the payload as-is
      event = JSON.parse(body)
    }

    const eventType = event.type || "payment_completed"
    const obj = event.data?.object || {}
    const metadata = (obj.metadata as Record<string, string>) || {}

    if (eventType === "checkout.session.completed" || eventType === "payment_completed") {
      const cardId = metadata.cardId
      const buyerEmail = metadata.buyerEmail

      if (cardId) {
        try {
          await prisma.knowledgeCard.update({
            where: { id: cardId },
            data: { purchases: { increment: 1 } },
          })
        } catch (err) {
          console.error(`[stripe webhook] failed to update card ${cardId}:`, err)
        }

        await prisma.analyticsEvent.create({
          data: {
            event: "purchase_completed",
            data: JSON.stringify({ cardId, buyerEmail }),
          },
        })

        console.log(`[NEXUS] Purchase completed: Card ${cardId} by ${buyerEmail}`)
      }

      return NextResponse.json({ received: true, event: eventType, cardId, buyerEmail })
    }

    return NextResponse.json({ received: true, event: eventType })
  } catch (err) {
    console.error("[stripe webhook] error:", err)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
