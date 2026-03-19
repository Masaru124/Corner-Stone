'use client'

import { useWordReveal } from '@/hooks/useWordReveal'

interface WordRevealProps {
  children: string
  className?: string
  scrub?: number | boolean
  start?: string
  end?: string
}

export default function WordReveal({
  children,
  className = "",
  scrub = 1,
  start = "top 80%",
  end = "top 20%",
}: WordRevealProps) {
  const ref = useWordReveal({ scrub, start, end })

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  )
}
