'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UseLetterRevealProps {
  scrub?: number | boolean
  start?: string
  end?: string
  markers?: boolean
}

export function useLetterReveal({
  scrub = 1,
  start = "top 80%",
  end = "top 20%",
  markers = false,
}: UseLetterRevealProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const element = containerRef.current!
      const text = element.textContent || ''

      // Split into letters
      const letters = text.split('')

      element.innerHTML = ''
      element.style.overflow = 'hidden'
      element.style.display = 'inline'

      letters.forEach((letter) => {
        const span = document.createElement('span')
        span.textContent = letter === ' ' ? '\u00A0' : letter
        span.style.display = 'inline'
        span.style.opacity = '0.2'
        element.appendChild(span)
      })

      const chars = element.querySelectorAll('span')

      gsap.to(chars, {
        opacity: 1,
        scrollTrigger: {
          trigger: element,
          start: start,
          end: end,
          scrub: scrub,
          markers: markers,
        },
        stagger: {
          each: 0.03,
        },
        ease: "none",
      })
    }, containerRef)

    return () => ctx.revert()
  }, [scrub, start, end, markers])

  return containerRef
}
