import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding NEXUS database...")

  // Create demo users
  const user1 = await prisma.user.upsert({
    where: { email: "creator@nexus.app" },
    update: {},
    create: {
      email: "creator@nexus.app",
      name: "NEXUS Creator",
      credits: 50,
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: "buyer@nexus.app" },
    update: {},
    create: {
      email: "buyer@nexus.app",
      name: "NEXUS Buyer",
      credits: 10,
    },
  })

  console.log(`✅ Created ${2} users`)

  // Create waitlist entries
  const waitlistEmails = [
    "alex@startup.io",
    "sarah@founder.co",
    "mike@ai-lab.dev",
    "emma@creator.co",
    "james@tech.io",
  ]

  for (let i = 0; i < waitlistEmails.length; i++) {
    await prisma.waitlist.upsert({
      where: { email: waitlistEmails[i] },
      update: {},
      create: {
        email: waitlistEmails[i],
        position: i + 1,
      },
    })
  }

  console.log(`✅ Created ${waitlistEmails.length} waitlist entries`)

  // Create demo ideas
  const ideas = [
    { title: "AI Sleep Coach", description: "An AI that analyzes your sleep patterns and creates personalized optimization plans", category: "AI & Machine Learning", score: 82, insight: "Strong market timing. Sleep tech is a $15B market growing 8% YoY.", userId: user1.id },
    { title: "Micro-SaaS for Freelancers", description: "A simple invoicing and project management tool built for solo freelancers", category: "Productivity & Tools", score: 75, insight: "Niche positioning in the freelancer market. Consider narrowing to a specific profession.", userId: user1.id },
    { title: "Community Marketplace for Local Chefs", description: "A platform where home chefs sell meal prep to their neighbors", category: "Social & Community", score: 68, insight: "Interesting concept but regulatory risk is high. Focus on the community angle first.", userId: user1.id },
  ]

  for (const idea of ideas) {
    const existing = await prisma.idea.findFirst({ where: { title: idea.title } })
    if (!existing) {
      await prisma.idea.create({ data: idea })
    }
  }

  console.log(`✅ Created ${ideas.length} ideas`)

  // Create analytics events
  const events = [
    { event: "page_view", data: JSON.stringify({ page: "/" }) },
    { event: "idea_evaluated", data: JSON.stringify({ score: 82 }) },
    { event: "card_generated", data: JSON.stringify({ category: "AI" }) },
    { event: "purchase", data: JSON.stringify({ cardId: "1", amount: 9.99 }) },
    { event: "waitlist_signup", data: JSON.stringify({ email: "alex@startup.io" }) },
    { event: "page_view", data: JSON.stringify({ page: "/marketplace" }) },
    { event: "card_shared", data: JSON.stringify({ cardId: "3", platform: "twitter" }) },
    { event: "review_submitted", data: JSON.stringify({ cardId: "1", rating: 5 }) },
  ]

  for (const evt of events) {
    await prisma.analyticsEvent.create({ data: evt })
  }

  console.log(`✅ Created ${events.length} analytics events`)

  // Create some notifications
  const notifications = [
    { type: "sale", message: "Someone purchased your 'AI Agent Architecture' card for $9.99!", userId: user1.id },
    { type: "like", message: "Your 'Zero-to-SaaS' card received 5 new likes", userId: user1.id },
    { type: "review", message: "New 5-star review on 'Prompt Engineering Masterclass'", userId: user1.id },
    { type: "milestone", message: "You reached $100 in total revenue!", userId: user1.id },
  ]

  for (const notif of notifications) {
    await prisma.notification.create({ data: notif })
  }

  console.log(`✅ Created ${notifications.length} notifications`)

  // Create some reviews
  const reviews = [
    { rating: 5, comment: "Incredible value. This card saved me weeks of research.", cardId: "1", userName: "Alex K." },
    { rating: 4, comment: "Solid framework, very actionable. Would love a follow-up card.", cardId: "1", userName: "Sarah M." },
    { rating: 5, comment: "Best $5.99 I ever spent. Prompt engineering is a superpower now.", cardId: "3", userName: "Mike D." },
    { rating: 4, comment: "Good overview but I wanted more advanced techniques.", cardId: "2", userName: "Emma R." },
    { rating: 5, comment: "The action steps alone are worth 10x the price.", cardId: "6", userName: "James P." },
  ]

  for (const review of reviews) {
    await prisma.review.create({ data: review })
  }

  console.log(`✅ Created ${reviews.length} reviews`)
  console.log("\n🎉 Seed complete! Your NEXUS app is loaded with demo data.")
}

main()
  .catch((e) => {
    console.error("Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
