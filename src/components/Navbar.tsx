'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/portfolio' },
  { name: 'Resources', href: '/resources' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
      <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="flex justify-end p-4 sm:p-6">
          {/* Desktop Navigation */}
          <motion.div 
            className="hidden lg:flex flex-col items-end gap-5 p-6 rounded-xl"
            style={{backgroundColor: 'transparent', borderColor: 'transparent'}}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navLinks.map((item, i) => (
              <motion.div
                key={item.name}
                custom={i}
                variants={desktopLinkVariants}
              >
                <Link
                  href={item.href}
                  className="text-xl font-medium tracking-wider relative overflow-hidden group text-left py-1 block"
                  style={{color: '#1F5144', letterSpacing: '0.05em'}}
                  onClick={() => setIsMenuOpen(false)}
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
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen((current) => !current)}
            className="lg:hidden px-4 py-3 rounded-xl font-medium tracking-wider relative"
            style={{color: '#1F5144', letterSpacing: '0.05em', backgroundColor: 'transparent'}}
            whileHover={{ 
              scale: 1.03,
              color: '#369c82'
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <motion.div className="flex flex-col gap-1">
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
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            className="fixed inset-x-4 top-20 z-40 lg:hidden rounded-2xl border p-5 bg-[#F8F8F6]"
            style={{ borderColor: '#D8D3CC' }}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((item, index) => (
                <motion.div
                  key={item.name}
                  custom={index}
                  variants={mobileMenuItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={item.href}
                    className="text-left rounded-lg px-3 py-2 text-base font-medium block w-full"
                    style={{ color: '#1F5144' }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
