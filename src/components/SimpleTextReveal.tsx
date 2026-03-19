'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

interface SimpleTextRevealProps {
  children: string
  className?: string
  delay?: number
  duration?: number
  staggerDelay?: number
  start?: string
  as?: 'span' | 'div'
}

export default function SimpleTextReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  staggerDelay = 0.05,
  start = "top 85%",
  as = 'span',
}: SimpleTextRevealProps) {

  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const element = containerRef.current!

      // Split text into letters
      const letters = children.split('')

      element.innerHTML = ''
      element.style.overflow = 'hidden'
      element.style.display = 'inline-block'

      letters.forEach((letter) => {
        const span = document.createElement('span')
        span.textContent = letter === ' ' ? '\u00A0' : letter
        span.style.display = 'inline-block'
        span.style.transform = 'translateY(100%)'
        span.style.opacity = '0'
        element.appendChild(span)
      })

      const chars = element.children

      // Timeline for clean control
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: start,
          toggleActions: "play none none reverse",
        }
      })

      tl.to(chars, {
        y: 0,
        opacity: 1,
        duration,
        stagger: staggerDelay,
        ease: "power3.out",
        delay
      })

    }, containerRef)

    return () => ctx.revert()
  }, [children, delay, duration, staggerDelay, start])

  const Element = as === 'span' ? 'span' : 'div'
  return <Element ref={containerRef as any} className={className}>{children}</Element>
}
