'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  
  // Scroll-based animations
  const navbarBackground = useTransform(scrollY, [0, 100], ['rgba(248, 248, 246, 0.95)', 'rgba(248, 248, 246, 0.98)'])
  const navbarScale = useTransform(scrollY, [0, 100], [1.02, 1])
  const navbarY = useTransform(scrollY, [0, 50], [0, 0])
  const shadowIntensity = useTransform(scrollY, [0, 100], [0, 0.3])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

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

  const desktopLinkVariants = {
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

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      y: -16,
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      filter: "blur(8px)",
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  }

  const mobileMenuItemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: i * 0.06,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    })
  }

  return (
    <>
      <motion.nav 
        className="absolute top-4 right-4 z-50 sm:top-6 sm:right-6"
        style={{ 
          backgroundColor: navbarBackground,
          scale: navbarScale,
          y: navbarY,
          boxShadow: `0 10px 30px rgba(31, 81, 68, ${shadowIntensity})`,
          borderColor: useTransform(scrollY, [0, 100], ['transparent', 'rgba(31, 81, 68, 0.15)'])
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex flex-col items-end gap-3 sm:gap-4">
          <motion.div 
            className="hidden lg:flex flex-col items-end gap-5 p-6 rounded-xl"
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
                    variants={desktopLinkVariants}
                    onClick={() => scrollToSection(item.section)}
                    className="text-xl font-medium tracking-wider relative overflow-hidden group text-left py-1"
                    style={{color: '#1F5144', letterSpacing: '0.05em'}}
                    whileHover={{ 
                      x: 6,
                      color: '#369c82',
                      scale: 1.05
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-500 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
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

              <motion.button
                onClick={() => setIsMenuOpen((current) => !current)}
                className="lg:hidden px-4 py-3 rounded-xl font-medium tracking-wider relative"
                style={{color: '#1F5144', letterSpacing: '0.05em'}}
                whileHover={{ 
                  scale: 1.03,
                  color: '#369c82'
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <motion.div
                  className="flex flex-col gap-1"
                >
                  <motion.div 
                    className="w-6 h-0.5 bg-current"
                    animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div 
                    className="w-6 h-0.5 bg-current"
                    animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div 
                    className="w-6 h-0.5 bg-current"
                    animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </motion.button>
            </div>
          </motion.nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            className="absolute inset-x-4 top-20 z-40 lg:hidden rounded-2xl border p-5"
            style={{ backgroundColor: '#F8F8F6', borderColor: '#D8D3CC' }}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col gap-3">
              {[
                { name: 'Work', section: 'portfolio' },
                { name: 'What We Do', section: 'services' },
                { name: 'Contact', section: 'contact' },
              ].map((item, index) => (
                <motion.button
                  key={item.name}
                  custom={index}
                  variants={mobileMenuItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-left rounded-lg px-3 py-2 text-base font-medium"
                  style={{ color: '#1F5144' }}
                  onClick={() => scrollToSection(item.section)}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
