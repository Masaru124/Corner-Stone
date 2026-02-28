'use client'

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

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
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{backgroundColor: '#F8F8F6'}}>
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
        className="relative z-10 text-left px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto w-full"
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
        {/* Main Headline with staggered animation */}
        <motion.h1 
          className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-serif font-light leading-none mb-8" 
          style={{color: '#1F5144', letterSpacing: '-0.02em'}}
        >
          <motion.div variants={textVariants}>Hello!</motion.div>
          <motion.div variants={textVariants}>We are a</motion.div>
          <motion.div variants={textVariants}>boutique creative</motion.div>
          <motion.div variants={textVariants}>agency.</motion.div>
        </motion.h1>
        
        {/* Enhanced subtext */}
        <motion.p 
          variants={textVariants}
          className="text-xl sm:text-2xl lg:text-3xl font-light max-w-2xl" 
          style={{color: '#111111', letterSpacing: '-0.01em'}}
        >
          Vision Made Visible.
        </motion.p>

        {/* Enhanced CTA Button */}
        <motion.div
          variants={textVariants}
          className="mt-12"
        >
          <motion.button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 text-white font-medium rounded-full text-lg relative overflow-hidden group"
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
              Get Started
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
    </section>
  )
}
