// Shared Groq AI helper for NEXUS knowledge card generation.
// Uses llama-3.3-70b-versatile via Groq's OpenAI-compatible API.
// If GROQ_API_KEY is not set, or the call fails, callers should fall
// back to the static templates.

interface GeneratedCardContent {
  summary: string
  keyInsights: string
  frameworks: string
  actionSteps: string
}

const SYSTEM_PROMPT = `You are the content engine for NEXUS, a marketplace where creators sell short, dense "knowledge cards" — structured packets of actionable insight on a topic.

For the given idea, produce a knowledge card with exactly four sections. Respond ONLY with valid JSON (no markdown fences, no preamble) matching this schema:

{
  "summary": "2-4 sentences pitching the card and what the buyer will get",
  "keyInsights": "4-6 numbered insights, each with a bolded one-line title using **double asterisks**, followed by 1-3 sentences of specific, non-obvious explanation. Separate insights with \\n\\n",
  "frameworks": "1-2 named frameworks, each with a **bolded title** and one-line description, followed by numbered steps. Separate with \\n\\n",
  "actionSteps": "5-6 concrete numbered action steps the buyer can do this week, specific enough to act on immediately, separated by \\n"
}

Write with the confident, specific, slightly contrarian tone of a sharp indie-hacker newsletter — concrete numbers, no vague platitudes, no filler.`

export async function generateCardContent(
  title: string,
  description: string,
  category: string
): Promise<GeneratedCardContent | null> {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) return null

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Idea title: ${title}\nCategory: ${category}\nDescription: ${description}\n\nGenerate the knowledge card JSON.`,
          },
        ],
      }),
    })

    if (!res.ok) {
      console.error("[groq] request failed:", res.status, await res.text())
      return null
    }

    const data = await res.json()
    const raw = data?.choices?.[0]?.message?.content
    if (!raw) return null

    const parsed = JSON.parse(raw)
    if (!parsed.summary || !parsed.keyInsights || !parsed.frameworks || !parsed.actionSteps) {
      return null
    }

    return {
      summary: String(parsed.summary),
      keyInsights: String(parsed.keyInsights),
      frameworks: String(parsed.frameworks),
      actionSteps: String(parsed.actionSteps),
    }
  } catch (err) {
    console.error("[groq] generation error:", err)
    return null
  }
}
