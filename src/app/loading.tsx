export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl nexus-gradient flex items-center justify-center font-bold text-white text-lg mx-auto mb-4 animate-pulse-glow">
          N
        </div>
        <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm">Loading NEXUS...</span>
        </div>
      </div>
    </div>
  )
}
