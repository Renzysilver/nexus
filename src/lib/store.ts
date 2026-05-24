"use client"

import { create } from "zustand"

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

export const useNexusStore = create<NexusState>((set) => ({
  // Ideas
  ideas: [],
  addIdea: (idea) => set((state) => ({ ideas: [idea, ...state.ideas] })),
  setIdeas: (ideas) => set({ ideas }),

  // Knowledge Cards
  knowledgeCards: [],
  addKnowledgeCard: (card) =>
    set((state) => ({ knowledgeCards: [card, ...state.knowledgeCards] })),
  setKnowledgeCards: (cards) => set({ knowledgeCards: cards }),

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
}))
