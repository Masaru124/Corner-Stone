'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Founder() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  return (
    <section id="founder" ref={ref} className="relative py-20 sm:py-24 lg:py-32 overflow-hidden bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1F5144 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light mb-4" style={{ color: '#1F5144', letterSpacing: '-0.02em' }}>
            Founder
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the visionary behind Corner Stone Design & Media
          </p>
        </motion.div>

        {/* Founder Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="relative rounded-full overflow-hidden shadow-2xl" style={{ width: '300px', height: '300px' }}>
            <img
              src="/founder.jpeg"
              alt="Founder of Corner Stone Design & Media"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Founder Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-lg leading-relaxed text-gray-700" style={{ lineHeight: '1.8' }}>
            With a passion for creativity and a deep understanding of digital marketing, our founder established Corner Stone Design & Media with a vision to help businesses build strong, memorable brands that stand out in today's competitive landscape.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
