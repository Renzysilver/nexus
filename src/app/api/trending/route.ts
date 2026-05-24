import { NextResponse } from "next/server"

// Trending Topics Engine
// Discovers hot topics across AI, tech, business, and more
// Returns trending ideas that creators can turn into knowledge cards

const trendingTopics = [
  {
    id: "trend_1",
    title: "AI Agents That Manage Your Entire Workflow",
    category: "AI & Machine Learning",
    heat: 97,
    description: "Autonomous AI agents are replacing SaaS tools. Build knowledge around agent orchestration, tool use patterns, and multi-agent systems.",
    suggestedPrice: 9.99,
  },
  {
    id: "trend_2",
    title: "The No-Code AI App Builder Playbook",
    category: "Productivity & Tools",
    heat: 92,
    description: "Non-technical founders are building AI-powered apps without code. Document the exact stack, prompts, and launch strategy.",
    suggestedPrice: 7.99,
  },
  {
    id: "trend_3",
    title: "Selling Digital Products on X (Twitter) in 2025",
    category: "Social & Community",
    heat: 89,
    description: "The Gumroad-to-X pipeline is minting solo founders. Create the definitive guide on audience → product → launch.",
    suggestedPrice: 5.99,
  },
  {
    id: "trend_4",
    title: "Longevity Science for High Performers",
    category: "Health & Biotech",
    heat: 86,
    description: "Bryan Johnson's Blueprint went viral. People want structured longevity protocols — supplements, tests, routines, all evidence-based.",
    suggestedPrice: 12.99,
  },
  {
    id: "trend_5",
    title: "DeFi Yield Farming 2.0: Post-Crash Strategies",
    category: "FinTech & Crypto",
    heat: 83,
    description: "After the crypto winter, DeFi is rebuilding with better risk management. Document the new yield strategies that survived.",
    suggestedPrice: 14.99,
  },
  {
    id: "trend_6",
    title: "Building Micro-SaaS with AI in a Weekend",
    category: "Productivity & Tools",
    heat: 95,
    description: "AI coding tools make it possible to build and ship a SaaS product in 48 hours. Create a step-by-step guide with real examples.",
    suggestedPrice: 6.99,
  },
  {
    id: "trend_7",
    title: "Climate Tech Investing for Retail Investors",
    category: "Sustainability & Green Tech",
    heat: 78,
    description: "Green energy stocks and carbon credit markets are opening up. Package the research into actionable investment knowledge.",
    suggestedPrice: 8.99,
  },
  {
    id: "trend_8",
    title: "The Creator Economy Toolkit: Monetize Everything",
    category: "Social & Community",
    heat: 91,
    description: "From newsletters to communities to digital products — the full monetization stack for creators. Include revenue benchmarks.",
    suggestedPrice: 4.99,
  },
]

export async function GET() {
  // Sort by heat (trending score)
  const sorted = [...trendingTopics].sort((a, b) => b.heat - a.heat)

  return NextResponse.json({
    trends: sorted,
    generatedAt: new Date().toISOString(),
    count: sorted.length,
  })
}
