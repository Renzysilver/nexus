// Renders a constrained subset of markdown — **bold** and line breaks —
// without dumping raw asterisks on screen. Used for AI-generated card content.

export function MarkdownText({ text, className }: { text: string; className?: string }) {
  const lines = text.split("\n")

  const renderLine = (line: string, lineIdx: number) => {
    const parts = line.split(/\*\*(.+?)\*\*/g)
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={`${lineIdx}-${i}`} className="font-semibold text-[hsl(var(--foreground))]">
          {part}
        </strong>
      ) : (
        <span key={`${lineIdx}-${i}`}>{part}</span>
      )
    )
  }

  return (
    <div className={className}>
      {lines.map((line, idx) => (
        <p key={idx} className={line.trim() === "" ? "h-3" : "mb-2"}>
          {renderLine(line, idx)}
        </p>
      ))}
    </div>
  )
}
