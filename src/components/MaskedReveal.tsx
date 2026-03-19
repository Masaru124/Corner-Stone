'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface MaskedRevealProps {
  children: string
  className?: string
  start?: string
  end?: string
  duration?: number
}

export default function MaskedReveal({ 
  children, 
  className = "",
  start = "top 85%",
  end = "top 60%",
  duration = 0.8,
}: MaskedRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const element = containerRef.current!
      const inner = element.querySelector('.inner')

      if (!inner) return

      gsap.fromTo(
        inner,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: duration,
          ease: "power4.out",
          scrollTrigger: {
            trigger: element,
            start: start,
            end: end,
            scrub: 1,
          }
        }
      )

    }, containerRef)

    return () => ctx.revert()
  }, [start, end, duration])

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{ display: 'inline-block' }}
    >
      <div className="inner">
        {children}
      </div>
    </div>
  )
}
