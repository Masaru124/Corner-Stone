'use client'

import { motion } from 'framer-motion'

const visibleItems = [
  'Logo & Visual Identity',
  'Social Media Posts & Reels',
  'Advertisements',
  'Website',
  'Influencer Content',
  'Campaign Creatives'
]

const growthDrivers = [
  'Brand Positioning',
  'Marketing Strategy',
  'Campaign Planning',
  'Audience Targeting',
  'Paid Ad Execution',
  'Content Direction',
  'Funnel Development',
  'Performance Tracking & Optimization'
]

export default function Iceberg() {
  return (
    <section className="relative min-h-screen py-20 sm:py-24 lg:py-32 overflow-hidden" style={{backgroundColor: '#1F5144'}}>
      {/* Visible Label - Top Left */}
      <motion.div 
        className="absolute top-20 left-8 z-20"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <span className="text-white text-2xl sm:text-3xl lg:text-4xl font-serif italic">Visible</span>
      </motion.div>

      {/* Invisible Label - Bottom Left */}
      <motion.div 
        className="absolute bottom-20 left-8 z-20"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <span className="text-white text-2xl sm:text-3xl lg:text-4xl font-serif italic">Invisible</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Iceberg Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center"
          >
            {/* Iceberg Image */}
            <div className="relative w-full max-w-md">
              <img 
                src="/brand%20ice%20berg_.png" 
                alt="Brand Iceberg - What People See vs What Actually Drives Growth"
                className="w-full h-auto"
              />
              
              {/* Water Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30"></div>
              
              {/* Labels on Iceberg */}
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center">
                <span className="text-white/80 text-xs sm:text-sm font-medium tracking-wider uppercase">What People See</span>
              </div>
              <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 text-center">
                <span className="text-white/60 text-xs sm:text-sm font-medium tracking-wider uppercase">What Actually Drives Growth</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Lists */}
          <div className="space-y-12">
            {/* Visible Items - Above Water */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <ul className="space-y-3">
                {visibleItems.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-white text-base sm:text-lg leading-relaxed"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Growth Drivers - Below Water */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative top-8"
            >
              <ul className="space-y-3">
                {growthDrivers.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-white text-base sm:text-lg leading-relaxed"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
