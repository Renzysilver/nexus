"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

interface Notification {
  id: string
  type: string
  message: string
  read: boolean
  createdAt: string
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Simulated notifications (in production, fetch from /api/notifications)
  useEffect(() => {
    const mockNotifications: Notification[] = [
      { id: "1", type: "sale", message: "Someone just purchased your 'AI Agent Architecture' card for $9.99!", read: false, createdAt: new Date(Date.now() - 300000).toISOString() },
      { id: "2", type: "like", message: "Your 'Zero-to-SaaS' card received 5 new likes", read: false, createdAt: new Date(Date.now() - 1800000).toISOString() },
      { id: "3", type: "review", message: "New 5-star review on 'Prompt Engineering Masterclass'", read: true, createdAt: new Date(Date.now() - 7200000).toISOString() },
      { id: "4", type: "milestone", message: "Congratulations! You've reached $100 in total revenue", read: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
    ]
    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((n) => !n.read).length)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  const typeIcons: Record<string, string> = {
    sale: "💰",
    like: "❤️",
    review: "⭐",
    milestone: "🏆",
    system: "🔔",
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[hsl(var(--destructive))] text-white text-[10px] font-bold flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 nexus-card p-0 z-50 max-h-96 overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-[hsl(var(--border))]">
            <span className="font-bold text-sm">Notifications</span>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs text-[hsl(var(--primary))] hover:underline">
                Mark all read
              </button>
            )}
          </div>
          <div className="overflow-y-auto max-h-72">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-[hsl(var(--muted-foreground))]">
                No notifications yet
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3 border-b border-[hsl(var(--border))] last:border-0 transition-colors ${
                    !notif.read ? "bg-[hsl(var(--primary))]/5" : ""
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-sm flex-shrink-0">{typeIcons[notif.type] || "🔔"}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs leading-relaxed">{notif.message}</p>
                      <p className="text-[10px] text-[hsl(var(--muted-foreground))] mt-1">
                        {new Date(notif.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] flex-shrink-0 mt-1" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-2 border-t border-[hsl(var(--border))]">
            <Link href="/dashboard" className="block text-center text-xs text-[hsl(var(--primary))] hover:underline">
              View Dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
