"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Idea {
  id: string
  title: string
  description: string
  category?: string
  score?: number
  insight?: string
}

interface KnowledgeCard {
  id: string
  title: string
  summary: string
  keyInsights: string
  frameworks: string
  actionSteps: string
  price: number
  category: string
  likes: number
  purchases: number
  published?: boolean
  authorName?: string
}

interface NexusState {
  // Ideas
  ideas: Idea[]
  addIdea: (idea: Idea) => void
  setIdeas: (ideas: Idea[]) => void

  // Knowledge Cards
  knowledgeCards: KnowledgeCard[]
  addKnowledgeCard: (card: KnowledgeCard) => void
  setKnowledgeCards: (cards: KnowledgeCard[]) => void
  updateKnowledgeCard: (id: string, updates: Partial<KnowledgeCard>) => void

  // Evaluation
  currentEvaluation: { score: number; category: string; insight: string } | null
  setCurrentEvaluation: (evaluation: { score: number; category: string; insight: string } | null) => void

  // User
  userEmail: string | null
  setUserEmail: (email: string | null) => void

  // UI
  isEvaluating: boolean
  setIsEvaluating: (val: boolean) => void
  isGenerating: boolean
  setIsGenerating: (val: boolean) => void
}

export const useNexusStore = create<NexusState>()(
  persist(
    (set) => ({
      // Ideas
      ideas: [],
      addIdea: (idea) => set((state) => ({ ideas: [idea, ...state.ideas] })),
      setIdeas: (ideas) => set({ ideas }),

      // Knowledge Cards
      knowledgeCards: [],
      addKnowledgeCard: (card) =>
        set((state) => ({ knowledgeCards: [card, ...state.knowledgeCards] })),
      setKnowledgeCards: (cards) => set({ knowledgeCards: cards }),
      updateKnowledgeCard: (id, updates) =>
        set((state) => ({
          knowledgeCards: state.knowledgeCards.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        })),

      // Evaluation
      currentEvaluation: null,
      setCurrentEvaluation: (evaluation) => set({ currentEvaluation: evaluation }),

      // User
      userEmail: null,
      setUserEmail: (email) => set({ userEmail: email }),

      // UI
      isEvaluating: false,
      setIsEvaluating: (val) => set({ isEvaluating: val }),
      isGenerating: false,
      setIsGenerating: (val) => set({ isGenerating: val }),
    }),
    {
      name: "nexus-store",
      // Only persist the user's session across reloads — ideas/cards are
      // re-hydrated from the database via /api/cards on dashboard load.
      partialize: (state) => ({ userEmail: state.userEmail }),
    }
  )
)
