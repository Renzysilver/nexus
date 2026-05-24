"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { toast } from "sonner"

interface AdminStats {
  totalUsers: number
  totalIdeas: number
  totalCards: number
  totalWaitlist: number
  totalRevenue: string
  totalEvents: number
}

interface AdminCard {
  id: string
  title: string
  category: string
  price: number
  likes: number
  purchases: number
  revenue: number
}

export default function AdminPanel() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [cards, setCards] = useState<AdminCard[]>([])
  const [activeTab, setActiveTab] = useState<"overview" | "cards" | "users" | "settings">("overview")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch analytics
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        setStats(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Demo cards data for admin
  useEffect(() => {
    setCards([
      { id: "1", title: "AI Agent Architecture: Building Autonomous Systems", category: "AI & Machine Learning", price: 9.99, likes: 234, purchases: 189, revenue: 1888.11 },
      { id: "2", title: "Zero-to-SaaS in 30 Days: The Solo Founder Playbook", category: "Productivity & Tools", price: 7.99, likes: 189, purchases: 156, revenue: 1246.44 },
      { id: "3", title: "Prompt Engineering Masterclass", category: "AI & Machine Learning", price: 5.99, likes: 312, purchases: 247, revenue: 1479.53 },
      { id: "4", title: "Biohacking for Founders", category: "Health & Biotech", price: 4.99, likes: 167, purchases: 134, revenue: 668.66 },
      { id: "5", title: "Crypto DeFi Yield Strategies", category: "FinTech & Crypto", price: 14.99, likes: 98, purchases: 76, revenue: 1139.24 },
      { id: "6", title: "The Community-Led Growth Handbook", category: "Social & Community", price: 6.99, likes: 145, purchases: 112, revenue: 782.88 },
    ])
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[hsl(var(--muted-foreground))]">Loading admin panel...</div>
      </div>
    )
  }

  const totalCardRevenue = cards.reduce((a, c) => a + c.revenue, 0)
  const totalSales = cards.reduce((a, c) => a + c.purchases, 0)

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-[hsl(var(--border))] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[hsl(var(--destructive))] flex items-center justify-center font-bold text-white text-sm">
            A
          </div>
          <span className="text-xl font-bold">NEXUS <span className="text-[hsl(var(--destructive))]">Admin</span></span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Home</Link>
          <Link href="/dashboard" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Dashboard</Link>
          <Link href="/marketplace" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Marketplace</Link>
        </div>
      </nav>

      {/* Tabs */}
      <div className="px-6 pt-4 flex gap-1 border-b border-[hsl(var(--border))]">
        {(["overview", "cards", "users", "settings"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg capitalize transition-colors ${
              activeTab === tab
                ? "bg-[hsl(var(--card))] text-[hsl(var(--destructive))] border-b-2 border-[hsl(var(--destructive))]"
                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === "overview" && (
          <div>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Revenue", value: `$${totalCardRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, color: "text-[hsl(var(--primary))]", icon: "💰" },
                { label: "Total Sales", value: totalSales.toLocaleString(), color: "text-[hsl(var(--foreground))]", icon: "📊" },
                { label: "Total Cards", value: stats?.totalCards ?? cards.length, color: "text-[hsl(var(--foreground))]", icon: "🃏" },
                { label: "Waitlist", value: stats?.totalWaitlist ?? 0, color: "text-[hsl(var(--foreground))]", icon: "📋" },
              ].map((metric) => (
                <div key={metric.label} className="nexus-card p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">{metric.label}</span>
                    <span className="text-lg">{metric.icon}</span>
                  </div>
                  <div className={`text-2xl font-extrabold ${metric.color}`}>{metric.value}</div>
                </div>
              ))}
            </div>

            {/* Revenue Chart */}
            <div className="nexus-card p-6 mb-6">
              <h3 className="font-bold mb-4">Revenue by Card</h3>
              <div className="space-y-3">
                {cards.map((card) => {
                  const maxRevenue = Math.max(...cards.map((c) => c.revenue))
                  const widthPercent = (card.revenue / maxRevenue) * 100
                  return (
                    <div key={card.id}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="truncate max-w-[50%]">{card.title.substring(0, 35)}...</span>
                        <span className="font-medium text-[hsl(var(--primary))]">${card.revenue.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-[hsl(var(--secondary))] rounded-full h-3">
                        <div className="h-3 rounded-full nexus-gradient transition-all duration-700" style={{ width: `${widthPercent}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button onClick={() => { toast.success("Seeding database...") }} className="nexus-card p-4 text-center hover:border-[hsl(var(--primary))] transition-colors">
                <div className="text-xl mb-1">🌱</div>
                <div className="text-xs font-medium">Seed Demo Data</div>
              </button>
              <button onClick={() => { toast.success("Trending topics refreshed") }} className="nexus-card p-4 text-center hover:border-[hsl(var(--primary))] transition-colors">
                <div className="text-xl mb-1">🔥</div>
                <div className="text-xs font-medium">Refresh Trends</div>
              </button>
              <button onClick={() => { toast.info("Export coming in Phase 6") }} className="nexus-card p-4 text-center hover:border-[hsl(var(--primary))] transition-colors">
                <div className="text-xl mb-1">📤</div>
                <div className="text-xs font-medium">Export Data</div>
              </button>
              <button onClick={() => { toast.info("Deployment guide below") }} className="nexus-card p-4 text-center hover:border-[hsl(var(--primary))] transition-colors">
                <div className="text-xl mb-1">🚀</div>
                <div className="text-xs font-medium">Deploy to Vercel</div>
              </button>
            </div>
          </div>
        )}

        {activeTab === "cards" && (
          <div>
            <h2 className="text-xl font-bold mb-4">All Knowledge Cards</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[hsl(var(--border))]">
                    <th className="text-left py-3 px-2 text-[hsl(var(--muted-foreground))] font-medium">Card</th>
                    <th className="text-left py-3 px-2 text-[hsl(var(--muted-foreground))] font-medium">Category</th>
                    <th className="text-right py-3 px-2 text-[hsl(var(--muted-foreground))] font-medium">Price</th>
                    <th className="text-right py-3 px-2 text-[hsl(var(--muted-foreground))] font-medium">Sales</th>
                    <th className="text-right py-3 px-2 text-[hsl(var(--muted-foreground))] font-medium">Revenue</th>
                    <th className="text-right py-3 px-2 text-[hsl(var(--muted-foreground))] font-medium">Likes</th>
                  </tr>
                </thead>
                <tbody>
                  {cards.map((card) => (
                    <tr key={card.id} className="border-b border-[hsl(var(--border))] hover:bg-[hsl(var(--secondary))]/50 transition-colors">
                      <td className="py-3 px-2">
                        <Link href={`/card/${card.id}`} className="font-medium hover:text-[hsl(var(--primary))]">
                          {card.title.substring(0, 40)}...
                        </Link>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">{card.category}</span>
                      </td>
                      <td className="py-3 px-2 text-right">${card.price}</td>
                      <td className="py-3 px-2 text-right">{card.purchases}</td>
                      <td className="py-3 px-2 text-right text-[hsl(var(--primary))] font-medium">${card.revenue.toFixed(2)}</td>
                      <td className="py-3 px-2 text-right">{card.likes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-[hsl(var(--secondary))] text-sm text-[hsl(var(--muted-foreground))]">
              Total: {cards.length} cards • ${totalCardRevenue.toFixed(2)} revenue • {totalSales} sales
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Users</h2>
            <div className="nexus-card p-8 text-center">
              <div className="text-4xl mb-3">👤</div>
              <p className="text-[hsl(var(--muted-foreground))] mb-2">{stats?.totalUsers ?? 0} registered users</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">User management with roles, bans, and credits coming in the next update.</p>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Admin Settings</h2>
            <div className="space-y-4">
              <div className="nexus-card p-5">
                <h3 className="font-bold text-sm mb-3">Stripe Configuration</h3>
                <div className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                  <div className="flex items-center justify-between py-2 border-b border-[hsl(var(--border))]">
                    <span>Public Key</span>
                    <span className="text-[hsl(var(--muted-foreground))]">Not configured</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[hsl(var(--border))]">
                    <span>Secret Key</span>
                    <span className="text-[hsl(var(--muted-foreground))]">Not configured</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span>Webhook Secret</span>
                    <span className="text-[hsl(var(--muted-foreground))]">Not configured</span>
                  </div>
                </div>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-3">Add Stripe keys to .env to enable real payments</p>
              </div>

              <div className="nexus-card p-5">
                <h3 className="font-bold text-sm mb-3">Deployment Checklist</h3>
                <div className="space-y-2">
                  {[
                    { label: "Push to GitHub", done: false },
                    { label: "Connect to Vercel", done: false },
                    { label: "Set environment variables on Vercel", done: false },
                    { label: "Configure Stripe webhook URL", done: false },
                    { label: "Set custom domain (optional)", done: false },
                    { label: "Enable Vercel Analytics", done: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-sm">
                      <div className={`w-4 h-4 rounded border ${item.done ? "bg-[hsl(var(--primary))] border-[hsl(var(--primary))]" : "border-[hsl(var(--border))]"}`} />
                      <span className={item.done ? "line-through text-[hsl(var(--muted-foreground))]" : ""}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
