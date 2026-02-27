'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{backgroundColor: '#1F5144'}}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0" style={{background: 'linear-gradient(to bottom right, #1F5144, #1F5144, rgba(31, 81, 68, 0.9)'}} />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-light text-white leading-none mb-8">
            Vision Made
            <span className="italic text-white/70"> Visible.</span>
          </h1>
          
          {/* Subtext */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-light mb-12 max-w-3xl mx-auto">
            The Studio Behind Brands That Get Noticed.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 text-white font-medium rounded-full transition-all duration-300 text-lg hover:bg-white hover:text-primary"
            style={{backgroundColor: '#369c82'}}
          >
            Book a Discovery Call
          </button>
          
          <button
            onClick={() => scrollToSection('portfolio')}
            className="px-8 py-4 text-white font-medium border rounded-full transition-all duration-300 text-lg hover:bg-white hover:text-primary"
            style={{borderColor: 'rgba(255, 255, 255, 0.3)'}}
          >
            See Our Work ↓
          </button>
        </motion.div>
      </div>

      {/* Bottom Marquee */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm">
        <div className="overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-50%' }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex whitespace-nowrap py-4"
          >
            <span className="text-white/60 text-sm sm:text-base font-light tracking-wider mx-4">
              BRAND STRATEGY · VISUAL IDENTITY · SOCIAL MEDIA · CONTENT DESIGN · WEB DEVELOPMENT · INFLUENCER MARKETING · CAMPAIGNS
            </span>
            <span className="text-white/60 text-sm sm:text-base font-light tracking-wider mx-4">
              BRAND STRATEGY · VISUAL IDENTITY · SOCIAL MEDIA · CONTENT DESIGN · WEB DEVELOPMENT · INFLUENCER MARKETING · CAMPAIGNS
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
