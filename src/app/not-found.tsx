import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="nexus-card p-8 max-w-md w-full text-center">
        <div className="text-6xl font-extrabold text-[hsl(var(--primary))] mb-2">404</div>
        <h2 className="text-xl font-bold mb-2">Page Not Found</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6">
          This knowledge card might not exist yet — or the URL took a wrong turn.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="nexus-btn">
            Go Home
          </Link>
          <Link href="/marketplace" className="px-4 py-2 rounded-lg bg-[hsl(var(--secondary))] text-sm hover:bg-[hsl(var(--border))] transition-colors">
            Browse Marketplace
          </Link>
        </div>
      </div>
    </div>
  )
}
