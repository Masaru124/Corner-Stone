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
    <section className="py-20 sm:py-24 lg:py-32" style={{backgroundColor: '#F8F8F6'}}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-none mb-4" style={{color: '#111111', fontFamily: "'Cormorant Garamond', serif", fontWeight: '300', letterSpacing: '-0.02em'}}>
            What People See vs. What Actually
            <br />
            <span className="italic" style={{color: '#369c82'}}>Drives Growth</span>
          </h2>
        </motion.div>

        {/* Iceberg Visual */}
        <div className="relative bg-white rounded-lg overflow-hidden border" style={{borderColor: '#D8D3CC'}}>
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* What People See - Above Water */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="p-8 lg:p-12 bg-white"
            >
              <div className="font-medium text-xs tracking-wider uppercase mb-6" style={{color: '#369c82', letterSpacing: '0.25em'}}>
                What People See
              </div>
              <ul className="space-y-4">
                {visibleItems.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 leading-relaxed"
                    style={{color: '#333', fontWeight: '300', fontSize: '14px', borderBottom: '1px solid #D8D3CC', paddingBottom: '8px'}}
                  >
                    <span className="text-lg mt-1" style={{color: '#369c82'}}>·</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Waterline Divider */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px" style={{backgroundColor: '#369c82'}}></div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="bg-white px-3 py-1">
                  <span className="font-medium text-xs tracking-wider uppercase" style={{color: '#369c82', letterSpacing: '0.2em'}}>Surface</span>
                </div>
                <div className="h-8"></div>
                <div className="px-3 py-1" style={{backgroundColor: '#1F5144'}}>
                  <span className="font-medium text-xs tracking-wider uppercase" style={{color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em'}}>Below</span>
                </div>
              </div>
            </div>

            {/* What Actually Drives Growth - Below Water */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="p-8 lg:p-12"
              style={{backgroundColor: '#1F5144'}}
            >
              <div className="font-medium text-xs tracking-wider uppercase mb-6" style={{color: 'rgba(255,255,255,0.5)', letterSpacing: '0.25em'}}>
                What Actually Drives Growth
              </div>
              <ul className="space-y-4">
                {growthDrivers.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 leading-relaxed"
                    style={{color: 'rgba(255,255,255,0.8)', fontWeight: '300', fontSize: '14px', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '8px'}}
                  >
                    <span className="text-lg mt-1" style={{color: 'rgba(255,255,255,0.35)'}}>·</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Mobile Waterline */}
          <div className="lg:hidden relative h-px" style={{backgroundColor: '#369c82'}}>
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-white px-2">
              <span className="font-medium text-xs tracking-wider uppercase" style={{color: '#369c82', letterSpacing: '0.2em'}}>Surface</span>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 px-2" style={{backgroundColor: '#1F5144'}}>
              <span className="font-medium text-xs tracking-wider uppercase" style={{color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em'}}>Below</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
