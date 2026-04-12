'use client'

export default function CopyButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="absolute top-2 right-2 px-3 py-1 rounded text-xs font-medium transition-colors"
      style={{ backgroundColor: '#1F5144', color: 'white' }}
    >
      Copy
    </button>
  )
}
