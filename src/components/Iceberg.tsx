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

const icebergLabelStyle = {
  fontFamily: '"Courier New", Courier, monospace',
  fontWeight: '700',
  letterSpacing: '0.18em',
}

export default function Iceberg() {
  return (
    <section
      className="relative min-h-screen py-10 sm:py-20 lg:py-32 overflow-hidden"
      style={{ backgroundColor: '#1F5144' }}
    >
      {/* Visible Label - Top Left */}
      <motion.div
        className="absolute top-3 sm:top-14 left-2 sm:left-8 z-20"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <span className="text-white text-base sm:text-2xl lg:text-4xl font-serif italic">Visible</span>
      </motion.div>

      {/* Invisible Label - Bottom Left */}
      <motion.div
        className="absolute bottom-3 sm:bottom-14 left-2 sm:left-8 z-20"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <span className="text-white text-base sm:text-2xl lg:text-4xl font-serif italic">Invisible</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-12 relative">
        <div className="flex flex-row gap-3 sm:gap-8 lg:gap-12 items-start justify-center">

          {/* Left Side - Iceberg Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative flex-shrink-0"
            style={{ width: '40%', maxWidth: '400px' }}
          >
            <div className="relative w-full">
              <img
                src="/brand%20ice%20berg_.png"
                alt="Brand Iceberg"
                className="w-full h-auto"
              />

              {/* Water Line */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/30" />

              {/* Label: WHAT PEOPLE SEE */}
              <div className="absolute top-[30%] left-0 right-0 flex justify-center px-2">
                <span
                  className="text-white/80 uppercase text-center leading-tight"
                  style={{ ...icebergLabelStyle, fontSize: 'clamp(3px, 1.5vw, 18px)' }}
                >
                  WHAT PEOPLE SEE
                </span>
              </div>

              {/* Label: WHAT ACTUALLY DRIVES GROWTH */}
              <div className="absolute top-[67%] left-0 right-0 flex flex-col items-center px-2">
                <span
                  className="text-white/80 uppercase text-center leading-tight"
                  style={{ ...icebergLabelStyle, fontSize: 'clamp(3px, 1.5vw, 18px)' }}
                >
                  WHAT ACTUALLY
                </span>
                <span
                  className="text-white/80 uppercase text-center leading-tight"
                  style={{ ...icebergLabelStyle, fontSize: 'clamp(3px, 1.5vw, 18px)' }}
                >
                  DRIVES GROWTH
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - split 50/50 to mirror iceberg halves */}
          <div className="flex-1 min-w-0 flex flex-col" style={{ alignSelf: 'stretch' }}>

            {/* TOP HALF — mirrors upper iceberg */}
            <motion.div
              className="flex flex-col justify-start"
              style={{ flex: '0 0 50%', paddingTop: '4%' }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3
                className="text-white font-bold mb-1 sm:mb-3 leading-tight"
                style={{ fontSize: 'clamp(9px, 2.2vw, 22px)' }}
              >
                What People See
              </h3>
              <ul className="space-y-[2px] sm:space-y-[6px] lg:space-y-2">
                {visibleItems.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="text-white leading-snug"
                    style={{ fontSize: 'clamp(8px, 1.9vw, 18px)' }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* BOTTOM HALF — mirrors lower iceberg */}
            <motion.div
              className="flex flex-col justify-start"
              style={{ flex: '0 0 50%', paddingTop: '4%' }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3
                className="text-white font-bold mb-1 sm:mb-3 leading-tight"
                style={{ fontSize: 'clamp(9px, 2.2vw, 22px)' }}
              >
                What Actually Drives Growth
              </h3>
              <ul className="space-y-[2px] sm:space-y-[6px] lg:space-y-2">
                {growthDrivers.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.08 }}
                    viewport={{ once: true }}
                    className="text-white leading-snug"
                    style={{ fontSize: 'clamp(8px, 1.9vw, 18px)' }}
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