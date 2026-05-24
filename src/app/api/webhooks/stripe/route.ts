import { NextResponse } from "next/server"

// Stripe Webhook Handler
// Processes payment confirmations and updates purchase counts
// In production: configure Stripe webhook endpoint to point here

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const payload = JSON.parse(body)

    // In production, verify the Stripe signature:
    // const sig = req.headers.get("stripe-signature")
    // const event = stripe.webhooks.constructEvent(body, sig, endpointSecret)

    const eventType = payload.type || payload.event || "payment_completed"
    const metadata = payload.data?.object?.metadata || payload.metadata || {}

    if (eventType === "checkout.session.completed" || eventType === "payment_completed") {
      const cardId = metadata.cardId
      const buyerEmail = metadata.buyerEmail

      if (cardId) {
        // In production, update the database:
        // await prisma.knowledgeCard.update({
        //   where: { id: cardId },
        //   data: { purchases: { increment: 1 } },
        // })

        // Log the analytics event
        console.log(`[NEXUS] Purchase completed: Card ${cardId} by ${buyerEmail}`)
      }

      return NextResponse.json({
        received: true,
        event: eventType,
        cardId,
        buyerEmail,
      })
    }

    return NextResponse.json({ received: true, event: eventType })
  } catch {
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}
