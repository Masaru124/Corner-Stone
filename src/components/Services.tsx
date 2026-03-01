'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import LetterReveal from './LetterReveal'
import WordReveal from './WordReveal'
import MaskedReveal from './MaskedReveal'

const services = [
  { id: '01', name: 'Brand Strategy' },
  { id: '02', name: 'Digital Design' },
  { id: '03', name: 'Development' },
  { id: '04', name: 'Marketing' },
  { id: '05', name: 'Content Creation' },
  { id: '06', name: 'Analytics' }
]

export default function BraveServices() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="services" ref={ref} className="relative min-h-screen flex items-center justify-start bg-white">
      {/* Background with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, #F8F8F6 0%, #E8E8E8 100%)`,
          y: useTransform(scrollYProgress, [0, 1], [0, -100])
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl px-6 sm:px-8 lg:px-12 py-20">
        {/* Section Header - Letter Reveal (Scrub Animation) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-left mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light" style={{ color: '#1F5144', letterSpacing: '-0.02em' }}>
            <LetterReveal 
              scrub={1.5}
              start="top 85%"
              end="bottom 50%"
            >
              What We Do
            </LetterReveal>
          </h2>
          
          {/* Subtitle - Word Reveal */}
          <div className="mt-8 text-lg sm:text-xl" style={{ color: '#666' }}>
            <WordReveal 
              scrub={1}
              start="top 75%"
              end="bottom 45%"
            >
              We combine strategy, design, and technology to create experiences
            </WordReveal>
          </div>
        </motion.div>

        {/* Services Grid - Masked Reveal */}
        <div className="space-y-16 md:space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="group relative flex items-center gap-8 md:gap-16"
            >
              {/* Service Number */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="text-6xl md:text-8xl font-serif font-light shrink-0 w-20 md:w-32"
                style={{ color: '#1F5144' }}
              >
                {service.id}
              </motion.div>

              {/* Service Name - Masked Reveal */}
              <div className="grow">
                <h3 className="text-4xl md:text-6xl font-serif font-light" style={{ color: '#1F5144', letterSpacing: '-0.01em' }}>
                  <MaskedReveal 
                    start={`top ${85 - index * 3}%`}
                    end={`top ${60 - index * 3}%`}
                    duration={0.9}
                  >
                    {service.name}
                  </MaskedReveal>
                </h3>
              </div>

              {/* Hover Underline */}
              <motion.div
                className="absolute bottom-0 left-20 md:left-32 right-0 h-0.5"
                style={{ color: '#1F5144', backgroundColor: '#1F5144' }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
