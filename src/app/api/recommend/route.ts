import { NextResponse } from "next/server"

// AI Recommendations Engine
// Returns personalized card suggestions based on category affinity

const allCards = [
  { id: "1", title: "AI Agent Architecture: Building Autonomous Systems", category: "AI & Machine Learning", price: 9.99, likes: 234, purchases: 189 },
  { id: "2", title: "Zero-to-SaaS in 30 Days: The Solo Founder Playbook", category: "Productivity & Tools", price: 7.99, likes: 189, purchases: 156 },
  { id: "3", title: "Prompt Engineering Masterclass: From Zero to Expert", category: "AI & Machine Learning", price: 5.99, likes: 312, purchases: 247 },
  { id: "4", title: "Biohacking for Founders: Optimize Your Brain", category: "Health & Biotech", price: 4.99, likes: 167, purchases: 134 },
  { id: "5", title: "Crypto DeFi Yield Strategies That Actually Work", category: "FinTech & Crypto", price: 14.99, likes: 98, purchases: 76 },
  { id: "6", title: "The Community-Led Growth Handbook", category: "Social & Community", price: 6.99, likes: 145, purchases: 112 },
  { id: "7", title: "Building Micro-SaaS with AI in a Weekend", category: "Productivity & Tools", price: 6.99, likes: 201, purchases: 178 },
  { id: "8", title: "The Creator Economy Toolkit: Monetize Everything", category: "Social & Community", price: 4.99, likes: 156, purchases: 123 },
]

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const excludeId = searchParams.get("excludeId")
    const limit = parseInt(searchParams.get("limit") || "4")

    let recommendations = [...allCards]

    // Exclude the current card
    if (excludeId) {
      recommendations = recommendations.filter((c) => c.id !== excludeId)
    }

    // If category specified, prioritize same-category cards first
    if (category) {
      const sameCategory = recommendations.filter((c) => c.category === category)
      const otherCategory = recommendations.filter((c) => c.category !== category)
      recommendations = [...sameCategory, ...otherCategory]
    } else {
      // Default: sort by popularity (purchases)
      recommendations.sort((a, b) => b.purchases - a.purchases)
    }

    return NextResponse.json({
      recommendations: recommendations.slice(0, limit),
      basedOn: category ? `category: ${category}` : "popularity",
    })
  } catch {
    return NextResponse.json({ recommendations: [], basedOn: "none" })
  }
}
