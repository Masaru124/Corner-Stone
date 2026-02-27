'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-background border-t border-cream/30 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-8"
        >
          {/* Left */}
          <div className="text-gray-600 text-sm">
            Corner Stone Design & Media · © 2025
          </div>

          {/* Center */}
          <div className="text-primary font-serif text-lg italic">
            Vision Made Visible.
          </div>

          {/* Right */}
          <div className="flex gap-6">
            <a 
              href="https://wa.me/916360414393"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors text-sm"
            >
              WhatsApp
            </a>
            <a 
              href="#"
              className="text-gray-600 hover:text-primary transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a 
              href="#"
              className="text-gray-600 hover:text-primary transition-colors text-sm"
            >
              Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
