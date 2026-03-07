'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const industries = [
  'Schools & Educational Institutes',
  'D2C Brands & E-commerce Brands',
  'Hospitals & Clinics',
  'Real Estate Builders & Developers'
]

export default function Industries() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  return (
    <section id="industries" ref={ref} className="relative py-20 sm:py-24 lg:py-32 overflow-hidden bg-white">
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
            Industries
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Industries we've worked with
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-xl sm:text-2xl font-semibold leading-tight" style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: '600', color: '#1F5144' }}>
                {industry}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16 max-w-3xl mx-auto"
        >
          <p className="text-lg leading-relaxed text-gray-700" style={{ lineHeight: '1.8' }}>
            We've had the privilege of partnering with diverse industries, helping each one build their unique digital presence and achieve their marketing goals.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
