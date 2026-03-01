'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  
  // Scroll-based animations - more dramatic
  const navbarBackground = useTransform(scrollY, [0, 100], ['rgba(248, 248, 246, 0.95)', 'rgba(248, 248, 246, 0.98)'])
  const navbarScale = useTransform(scrollY, [0, 100], [1.05, 1])
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85])
  const navbarY = useTransform(scrollY, [0, 50], [0, 0])
  const shadowIntensity = useTransform(scrollY, [0, 100], [0, 0.3])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  }

  const linkVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      rotateX: -90,
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  }

  const menuVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotateX: -25,
      filter: "blur(20px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateX: 25,
      filter: "blur(20px)",
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  }

  const menuItemVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      rotateY: -45
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    })
  }

  return (
    <>
      <motion.nav 
        className="absolute top-32 right-8 z-50"
        style={{ 
          backgroundColor: navbarBackground,
          scale: navbarScale,
          y: navbarY,
          boxShadow: `0 10px 30px rgba(31, 81, 68, ${shadowIntensity})`,
          borderColor: useTransform(scrollY, [0, 100], ['transparent', 'rgba(31, 81, 68, 0.15)'])
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex flex-col items-end gap-6">
          {/* Enhanced Navigation Links with stagger - Vertical Layout */}
          <motion.div 
            className="flex flex-col items-end gap-6 p-8 rounded-xl"
            style={{backgroundColor: '#F8F8F6', borderColor: '#D8D3CC'}}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
                {[
                  { name: 'Work', section: 'portfolio' },
                  { name: 'What We Do', section: 'services' },
                  { name: 'Contact', section: 'contact' }
                ].map((item, i) => (
                  <motion.button
                    key={item.name}
                    custom={i}
                    variants={linkVariants}
                    onClick={() => scrollToSection(item.section)}
                    className="text-2xl font-medium tracking-wider relative overflow-hidden group text-left py-2"
                    style={{color: '#1F5144', letterSpacing: '0.05em'}}
                    whileHover={{ 
                      x: 8,
                      color: '#369c82',
                      scale: 1.1
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Link underline animation */}
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-500 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Link glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-teal-500 opacity-0 group-hover:opacity-10 blur-md"
                      initial={false}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    />
                    {item.name}
                  </motion.button>
                ))}
              </motion.div>

              {/* Enhanced Menu Trigger */}
              <motion.button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden font-medium tracking-wider relative"
                style={{color: '#1F5144', letterSpacing: '0.05em'}}
                whileHover={{ 
                  scale: 1.1,
                  color: '#369c82',
                  rotate: [0, 5, 0, -5, 0]
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="flex flex-col gap-1"
                  animate={{
                    rotate: [0, 180]
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div 
                    className="w-6 h-0.5 bg-current"
                    animate={{ width: [24, 20, 24] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="w-6 h-0.5 bg-current"
                    animate={{ width: [24, 28, 24] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div 
                    className="w-6 h-0.5 bg-current"
                    animate={{ width: [24, 16, 24] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  />
                </motion.div>
              </motion.button>
            </div>
          </motion.nav>
    </>
  )
}
