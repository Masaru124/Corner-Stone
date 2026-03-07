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
          <motion.div 
            className="relative rounded-full overflow-hidden shadow-2xl cursor-pointer" 
            style={{ width: '300px', height: '300px' }}
            whileHover={{ 
              scale: 1.05,
              rotateY: [0, 15, -15, 0],
              rotateX: [0, -10, 10, 0],
              transition: { duration: 1.2, rotateY: { duration: 0.4, repeat: 2 }, rotateX: { duration: 0.3, repeat: 2 } }
            }}
            whileTap={{ 
              scale: 0.95,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.4 }
            }}
          >
            <motion.img
              src="/founder.jpeg"
              alt="Founder of Corner Stone Design & Media"
              className="w-full h-full object-cover"
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{
                filter: "brightness(1.15) contrast(1.1) saturate(1.2)",
                transform: "translateZ(20px)",
                transition: { duration: 0.4 }
              }}
            />
            
            {/* Liquid morphing effect */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(45deg, rgba(31,81,68,0.4), rgba(54,156,130,0.4), rgba(31,81,68,0.4))',
                }}
                animate={{
                  background: [
                    'linear-gradient(45deg, rgba(31,81,68,0.4), rgba(54,156,130,0.4), rgba(31,81,68,0.4))',
                    'linear-gradient(135deg, rgba(54,156,130,0.4), rgba(31,81,68,0.4), rgba(54,156,130,0.4))',
                    'linear-gradient(225deg, rgba(31,81,68,0.4), rgba(54,156,130,0.4), rgba(31,81,68,0.4))',
                    'linear-gradient(315deg, rgba(54,156,130,0.4), rgba(31,81,68,0.4), rgba(54,156,130,0.4))',
                    'linear-gradient(45deg, rgba(31,81,68,0.4), rgba(54,156,130,0.4), rgba(31,81,68,0.4))'
                  ],
                  transition: { duration: 3, repeat: Infinity }
                }}
              />
            </motion.div>

            {/* Particle trail effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{ 
                    backgroundColor: '#369c82',
                    left: `${15 + i * 10}%`,
                    top: `${20 + (i % 4) * 20}%`
                  }}
                  initial={{ 
                    scale: 0, 
                    opacity: 0,
                    x: 0,
                    y: 0
                  }}
                  whileHover={{ 
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                    x: [0, (i % 2 === 0 ? 30 : -30), (i % 2 === 0 ? 60 : -60)],
                    y: [0, -20, -40],
                    rotate: [0, 180, 360],
                    transition: { 
                      duration: 2,
                      delay: i * 0.15,
                      repeat: Infinity,
                      repeatDelay: 0.8,
                      ease: "easeInOut"
                    }
                  }}
                />
              ))}
            </motion.div>

            {/* 3D depth shadow */}
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-8 rounded-full bg-black opacity-20 blur-xl"
              whileHover={{
                scale: 1.2,
                opacity: 0.3,
                transition: { duration: 0.4 }
              }}
            />

            {/* Magnetic border effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: '#1F5144' }}
              initial={{ 
                scale: 1,
                opacity: 0,
                pathLength: 0
              }}
              whileHover={{ 
                scale: 1.1,
                opacity: 1,
                pathLength: 1,
                transition: { 
                  duration: 1.5,
                  ease: "easeInOut"
                }
              }}
            />

            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: '#369c82' }}
              initial={{ scale: 1, opacity: 0 }}
              whileHover={{ 
                scale: [1, 1.3, 1.5],
                opacity: [0, 0.6, 0],
                transition: { 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }
              }}
            />

            {/* Glitch effect overlay */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: [0, 0.1, 0, 0.05, 0] }}
              transition={{ duration: 0.8, repeat: 2 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.div>
          </motion.div>
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
            I founded Corner Stone Design & Media to help brands become visible, trusted, and chosen.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 mt-4" style={{ lineHeight: '1.8' }}>
            My focus is simple build brands that people recognise and remember.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
