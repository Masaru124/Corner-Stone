'use client'

import { motion } from 'framer-motion'

const stats = [
  {
    number: '30–60%',
    label: 'Increase in brand visibility within the first 90 days'
  },
  {
    number: '20–40%',
    label: 'Improvement in engagement rates through content & audience optimization'
  },
  {
    number: '15–35%',
    label: 'Increase in qualified leads via targeted marketing campaigns'
  },
  {
    number: '2X–4X',
    label: 'Expansion in digital reach through strategic distribution and paid media'
  }
]

export default function GrowthNumbers() {
  return (
    <section id="growth" className="py-20 sm:py-24 lg:py-32" style={{backgroundColor: '#1F5144'}}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="font-medium text-sm tracking-wider uppercase mb-4" style={{color: '#369c82', letterSpacing: '0.35em'}}>
            What You Can Expect
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-none mb-6" style={{color: 'white', fontFamily: "'Cormorant Garamond', serif", fontWeight: '300', letterSpacing: '-0.02em'}}>
            Numbers Don't Lie
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{color: 'rgba(255,255,255,0.8)', fontWeight: '300'}}>
            Our campaigns are strategically designed to deliver measurable, scalable brand growth. 
            Based on structured campaign execution and industry benchmarks, brands working with us can expect:
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0" style={{gap: '2px'}}>
          <div className="bg-white p-8 sm:p-8 text-center border" style={{borderColor: '#D8D3CC'}}>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-none mb-4" style={{color: '#1F5144', fontFamily: "'Cormorant Garamond', serif", fontWeight: '300', lineHeight: '1'}}>
              {stats[0].number}
            </div>
            <div className="text-sm leading-relaxed" style={{color: '#666', fontWeight: '300', lineHeight: '1.5'}}>
              {stats[0].label}
            </div>
          </div>
          <div className="bg-white p-8 sm:p-8 text-center border" style={{borderColor: '#D8D3CC'}}>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-none mb-4" style={{color: '#1F5144', fontFamily: "'Cormorant Garamond', serif", fontWeight: '300', lineHeight: '1'}}>
              {stats[1].number}
            </div>
            <div className="text-sm leading-relaxed" style={{color: '#666', fontWeight: '300', lineHeight: '1.5'}}>
              {stats[1].label}
            </div>
          </div>
          <div className="bg-white p-8 sm:p-8 text-center border" style={{borderColor: '#D8D3CC'}}>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-none mb-4" style={{color: '#1F5144', fontFamily: "'Cormorant Garamond', serif", fontWeight: '300', lineHeight: '1'}}>
              {stats[2].number}
            </div>
            <div className="text-sm leading-relaxed" style={{color: '#666', fontWeight: '300', lineHeight: '1.5'}}>
              {stats[2].label}
            </div>
          </div>
          <div className="bg-white p-8 sm:p-8 text-center border" style={{borderColor: '#D8D3CC'}}>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-none mb-4" style={{color: '#1F5144', fontFamily: "'Cormorant Garamond', serif", fontWeight: '300', lineHeight: '1'}}>
              {stats[3].number}
            </div>
            <div className="text-sm leading-relaxed" style={{color: '#666', fontWeight: '300', lineHeight: '1.5'}}>
              {stats[3].label}
            </div>
          </div>
        </div>

        {/* Footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="italic text-sm max-w-2xl mx-auto" style={{color: 'rgba(255,255,255,0.5)'}}>
            Projections based on structured campaign execution and industry performance benchmarks. 
            Results vary by industry and investment.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
