'use client'

import { useLetterReveal } from '@/hooks/useLetterReveal'

interface LetterRevealProps {
  children: string
  className?: string
  scrub?: number | boolean
  start?: string
  end?: string
}

export default function LetterReveal({
  children,
  className = "",
  scrub = 1,
  start = "top 80%",
  end = "top 20%",
}: LetterRevealProps) {
  const ref = useLetterReveal({ scrub, start, end })

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  )
}
