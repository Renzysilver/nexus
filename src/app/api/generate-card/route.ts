import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { generateCardContent } from "@/lib/groq"

export async function POST(req: Request) {
  try {
    const { ideaId, title, description, category, score, userEmail } = await req.json()

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      )
    }

    // AI Knowledge Card Generator — structures raw ideas into sellable knowledge
    const cardTitle = `${title}: The Complete Knowledge Card`

    const summaryTemplates = [
      `A comprehensive breakdown of "${title}" — covering the core problem, the ${category || "innovation"} landscape, and actionable strategies to move from concept to execution. This card distills the essential knowledge you need to validate, build, and monetize this idea.`,
      `Everything you need to know about "${title}" in one structured card. From market opportunity in ${category || "this space"} to step-by-step execution frameworks, this is your shortcut from idea to income.`,
      `The definitive knowledge card for "${title}". We've analyzed the ${category || "market"} landscape, identified the key leverage points, and packaged the insights into an actionable framework you can execute today.`,
    ]

    const keyInsights = [
      `• Market timing: ${score && score > 70 ? "Peak" : "Favorable"} — ${category || "This category"} is trending upward with growing demand\n• The #1 mistake creators make: building before validating demand\n• Your unfair advantage: domain knowledge + AI-powered execution speed\n• Price sensitivity: $4.99 is the sweet spot for impulse knowledge purchases\n• Network effects kick in at 100+ purchases — focus on distribution first`,
      `• The ${category || "market"} is consolidating — niche positioning beats broad plays\n• Early adopters pay premium for structured, actionable knowledge\n• Content moats are built through unique data, not just information\n• ${score && score > 60 ? "High" : "Moderate"} willingness-to-pay detected in target segment\n• Community-driven distribution can reduce CAC by 70%`,
    ]

    const frameworks = [
      `1. VALIDATE: Test the idea with 10 potential buyers before building anything\n2. STRUCTURE: Package your knowledge into the 5-chapter NEXUS format\n3. PRICE: Start at $4.99, increase based on demand signals\n4. LAUNCH: Share on 3 platforms simultaneously (Twitter, Reddit, Discord)\n5. ITERATE: Use purchase data and feedback to refine the card weekly`,
      `1. PROBLEM-SOLUTION FIT: Confirm the pain point exists (3 customer interviews minimum)\n2. KNOWLEDGE EXTRACTION: Document everything you know about this space\n3. CARD ARCHITECTURE: Structure insights using the NEXUS framework\n4. PRICING STRATEGY: Value-based pricing anchored to outcome, not time\n5. GROWTH LOOP: Every buyer becomes a potential referrer (10% commission)`,
    ]

    const actionSteps = [
      `→ Week 1: Validate with 10 target users. Collect pain points.\n→ Week 2: Write the knowledge card. Use the NEXUS template.\n→ Week 3: Set up your marketplace listing. Price at $4.99.\n→ Week 4: Launch to your network. Aim for 10 first sales.\n→ Month 2: Optimize based on reviews. Consider premium tier at $14.99.`,
      `→ Day 1-3: Research top 5 competitors in ${category || "this space"}. Note gaps.\n→ Day 4-7: Create your knowledge card draft. Focus on unique insights.\n→ Day 8-10: Get 3 beta readers. Incorporate feedback.\n→ Day 11-14: Publish on NEXUS marketplace. Set competitive price.\n→ Day 15-30: Promote daily. Track conversion rates. Iterate.`,
    ]

    const pickRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

    const price = score && score > 70 ? 7.99 : score && score > 50 ? 4.99 : 2.99
    const cardCategory = category || "General Innovation"

    // Try real AI generation via Groq first; fall back to templates if unavailable
    const aiContent = await generateCardContent(title, description, cardCategory)
    const summary = aiContent?.summary ?? pickRandom(summaryTemplates)
    const keyInsightsContent = aiContent?.keyInsights ?? pickRandom(keyInsights)
    const frameworksContent = aiContent?.frameworks ?? pickRandom(frameworks)
    const actionStepsContent = aiContent?.actionSteps ?? pickRandom(actionSteps)

    // Resolve the user (create one if we only have an email)
    let resolvedUserId: string | undefined
    if (userEmail) {
      const user = await prisma.user.upsert({
        where: { email: userEmail },
        update: {},
        create: { email: userEmail },
      })
      resolvedUserId = user.id
    }

    // Reuse an existing idea record (created during /api/evaluate on the client),
    // otherwise create a fresh one so the card has something to attach to.
    let idea = ideaId ? await prisma.idea.findUnique({ where: { id: ideaId } }) : null
    if (!idea) {
      idea = await prisma.idea.create({
        data: {
          title,
          description,
          category: cardCategory,
          score: score ?? null,
          userId: resolvedUserId,
        },
      })
    }

    // An idea can only have one card (1:1 relation) — if one already exists, return it
    const existingCard = await prisma.knowledgeCard.findUnique({ where: { ideaId: idea.id } })
    if (existingCard) {
      return NextResponse.json(existingCard)
    }

    const authorName = userEmail ? userEmail.split("@")[0] : "nexus_creator"

    const card = await prisma.knowledgeCard.create({
      data: {
        title: cardTitle,
        summary,
        keyInsights: keyInsightsContent,
        frameworks: frameworksContent,
        actionSteps: actionStepsContent,
        price,
        category: cardCategory,
        likes: 0,
        purchases: 0,
        published: false,
        authorName,
        ideaId: idea.id,
        creatorId: resolvedUserId,
      },
    })

    return NextResponse.json(card)
  } catch (err) {
    console.error("[generate-card] error:", err)
    return NextResponse.json(
      { error: "Card generation failed" },
      { status: 500 }
    )
  }
}
