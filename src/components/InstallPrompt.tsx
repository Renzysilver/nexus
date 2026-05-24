"use client"

import { useState, useEffect } from "react"

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  if (!showPrompt) return null

  const handleInstall = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === "accepted") {
      setShowPrompt(false)
    }
    setDeferredPrompt(null)
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 nexus-card p-4 z-50 animate-float">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg nexus-gradient flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
          N
        </div>
        <div className="flex-1">
          <div className="font-bold text-sm mb-1">Install NEXUS</div>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3">
            Add to your home screen for instant access. Works offline.
          </p>
          <div className="flex gap-2">
            <button onClick={handleInstall} className="nexus-btn text-xs !py-1.5 !px-3">
              Install App
            </button>
            <button
              onClick={() => setShowPrompt(false)}
              className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
