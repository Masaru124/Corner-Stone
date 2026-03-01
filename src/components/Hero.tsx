'use client'

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import Navbar from '@/components/Navbar'

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const { scrollYProgress } = useScroll()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  // Smooth scroll value for parallax
  const smoothScrollY = useSpring(scrollY, { stiffness: 400, damping: 30 })
  
  // Parallax effects - more dramatic
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85])
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 15])
  const blur = useTransform(scrollYProgress, [0, 0.3], [0, 8])

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

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  }

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      rotateX: -15,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.5,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  }

  const glowVariants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  }

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-15, 15, -15],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  }

  return (
    <section id="hero" ref={ref} className="relative min-h-screen pb-16 pt-24 sm:pt-28 lg:pt-12" style={{backgroundColor: '#F8F8F6'}}>
      <Navbar />

      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {/* Animated gradient overlay */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              `radial-gradient(circle at 20% 50%, rgba(31, 81, 68, 0.3) 0%, transparent 50%)`,
              `radial-gradient(circle at 80% 50%, rgba(54, 156, 130, 0.3) 0%, transparent 50%)`,
              `radial-gradient(circle at 20% 50%, rgba(31, 81, 68, 0.3) 0%, transparent 50%)`
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{ 
              backgroundColor: i % 2 === 0 ? '#1F5144' : '#369c82',
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Glowing orbs */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`glow-${i}`}
            className="absolute w-32 h-32 rounded-full blur-3xl"
            style={{ 
              backgroundColor: '#1F5144',
              left: `${20 + i * 30}%`,
              top: `${30 + i * 15}%`
            }}
            variants={glowVariants}
            initial="initial"
            animate="animate"
          />
        ))}
      </motion.div>
      
      {/* Main content with enhanced animations */}
      <motion.div 
        className="relative z-10 text-left px-4 sm:px-8 lg:px-12 max-w-full w-full"
        style={{ 
          y: textY, 
          opacity, 
          scale,
          rotateX,
          filter: `blur(${blur}px)`
        }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex justify-between gap-8">
          {/* Text Content */}
          <div className="flex-1">
            {/* Main Headline with staggered animation */}
            <motion.h1 
              className="text-5xl sm:text-7xl lg:text-9xl xl:text-10xl font-serif font-bold leading-none mb-6 sm:mb-8 text-left" 
              style={{color: '#1F5144', letterSpacing: '-0.02em'}}
            >
              <motion.div variants={textVariants}>Vision</motion.div>
              <motion.div variants={textVariants}>Made</motion.div>
              <motion.div variants={textVariants}>Visible</motion.div>
            </motion.h1>
            
            {/* Enhanced subtext */}
            <motion.p 
              variants={textVariants}
              className="text-lg sm:text-2xl lg:text-3xl font-light text-left pr-2 sm:pr-0" 
              style={{color: '#111111', letterSpacing: '-0.01em'}}
            >
              The Studio Behind Brands That Get Noticed.
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div
              variants={textVariants}
              id="hero-button-container"
              className="mt-8 sm:mt-12 flex w-full flex-col sm:flex-row items-start sm:items-center gap-5"
            >
              {/* Left buttons */}
              <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-start">
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-white font-medium rounded-full text-base sm:text-lg relative overflow-hidden group"
                  style={{backgroundColor: '#1F5144'}}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: '#369c82',
                    boxShadow: "0 20px 40px rgba(31, 81, 68, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {/* Button ripple effect */}
                  <motion.span
                    className="absolute inset-0 bg-white opacity-0"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                  <motion.span
                    className="relative z-10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    Book a Discovery Call
                  </motion.span>
                </motion.button>
                
                <motion.button
                  onClick={() => scrollToSection('portfolio')}
                  className="px-2 sm:px-6 py-2 sm:py-4 text-base sm:text-lg font-medium relative overflow-hidden group text-left"
                  style={{color: '#1F5144'}}
                  whileHover={{ 
                    scale: 1.05,
                    color: '#369c82'
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  See Our Work ↓
                </motion.button>
              </div>

              <motion.div className="ml-0 sm:ml-auto shrink-0 self-start sm:self-center">
                <img
                  src="/Logo Kit - CNRSTN/Cornerstone Secondary Logo Green.png"
                  alt="Corner Stone Design & Media"
                  className="h-7 sm:h-10 lg:h-12 xl:h-20 w-auto"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        className="absolute bottom-10 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div className="flex flex-col items-center gap-2">
          <motion.span 
            className="text-sm font-light tracking-wider" 
            style={{color: '#1F5144', opacity: 0.7}}
            animate={{ 
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore
          </motion.span>
          <motion.div 
            className="w-0.5 h-12 bg-gradient-to-b from-primary to-transparent"
            animate={{ 
              height: [48, 64, 48],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Scrolling Marquee Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 overflow-hidden z-20"
        style={{borderColor: '#D8D3CC'}}
      >
        <motion.div
          animate={{
            x: [0, -1000]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex whitespace-nowrap py-3 text-sm font-medium tracking-wider"
          style={{color: '#333', letterSpacing: '0.15em'}}
        >
          BRAND STRATEGY • VISUAL IDENTITY • SOCIAL MEDIA • CONTENT DESIGN • WEB DEVELOPMENT • INFLUENCER MARKETING • CAMPAIGNS • BRAND STRATEGY • VISUAL IDENTITY • SOCIAL MEDIA • CONTENT DESIGN • WEB DEVELOPMENT • INFLUENCER MARKETING • CAMPAIGNS
        </motion.div>
      </motion.div>
    </section>
  )
}
