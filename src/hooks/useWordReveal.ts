'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UseWordRevealProps {
  scrub?: number | boolean
  start?: string
  end?: string
  markers?: boolean
}

export function useWordReveal({
  scrub = 1,
  start = "top 80%",
  end = "top 20%",
  markers = false,
}: UseWordRevealProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const element = containerRef.current!
      const text = element.textContent || ''

      // Split into words
      const words = text.split(' ')

      element.innerHTML = ''
      element.style.overflow = 'hidden'
      element.style.display = 'inline'

      words.forEach((word, idx) => {
        const span = document.createElement('span')
        span.textContent = word
        span.style.display = 'inline-block'
        span.style.opacity = '0.2'
        span.style.marginRight = '0.25em'
        element.appendChild(span)

        // Add space after word (except last)
        if (idx < words.length - 1) {
          const space = document.createElement('span')
          space.textContent = ' '
          space.style.display = 'inline'
          element.appendChild(space)
        }
      })

      const wordElements = element.querySelectorAll('span:not(:last-child)')

      gsap.to(wordElements, {
        opacity: 1,
        scrollTrigger: {
          trigger: element,
          start: start,
          end: end,
          scrub: scrub,
          markers: markers,
        },
        stagger: {
          each: 0.05,
        },
        ease: "none",
      })
    }, containerRef)

    return () => ctx.revert()
  }, [scrub, start, end, markers])

  return containerRef
}
