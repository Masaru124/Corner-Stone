'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-cream/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-2xl font-serif font-light tracking-wide transition-colors"
              style={{color: '#1F5144'}}
              onMouseEnter={(e) => e.currentTarget.style.color = '#369c82'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#1F5144'}
            >
              Corner Stone
            </button>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Book a Call Button */}
              <button
                onClick={() => scrollToSection('contact')}
                className="hidden sm:block px-6 py-2 text-white text-sm font-medium rounded-full transition-colors"
                style={{backgroundColor: '#1F5144'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#369c82'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1F5144'}
              >
                Book a Call
              </button>

              {/* Menu Trigger */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="font-medium tracking-wider transition-colors"
                style={{color: '#1F5144'}}
                onMouseEnter={(e) => e.currentTarget.style.color = '#369c82'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#1F5144'}
              >
                MENU
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
          style={{backgroundColor: '#1F5144'}}
        >
          <div className="h-full flex flex-col">
            {/* Close Button */}
            <div className="flex justify-end p-6 sm:p-8 lg:p-12">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white/70 hover:text-white text-2xl font-light transition-colors"
              >
                ×
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 flex items-center justify-center">
              <nav className="text-center">
                <ul className="space-y-8">
                  <li>
                    <button
                      onClick={() => scrollToSection('portfolio')}
                      className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light text-white transition-colors block"
                      onMouseEnter={(e) => e.currentTarget.style.color = '#369c82'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                    >
                      01 Work
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('services')}
                      className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light text-white transition-colors block"
                      onMouseEnter={(e) => e.currentTarget.style.color = '#369c82'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                    >
                      02 What We Do
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('growth')}
                      className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light text-white transition-colors block"
                      onMouseEnter={(e) => e.currentTarget.style.color = '#369c82'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                    >
                      03 Results
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light text-white transition-colors block"
                      onMouseEnter={(e) => e.currentTarget.style.color = '#369c82'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                    >
                      04 Let's Talk
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Bottom Contact Strip */}
            <div className="border-t border-white/20 p-6 sm:p-8 lg:p-12">
              <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex flex-col sm:flex-row gap-6 text-white/70 text-sm">
                  <a 
                    href="https://wa.me/916360414393"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp: +91 636 0414 393
                  </a>
                  <a 
                    href="mailto:cornerstone@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    Email: cornerstone@gmail.com
                  </a>
                </div>
                <div className="text-white/50 italic font-serif text-lg">
                  Vision Made Visible.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
