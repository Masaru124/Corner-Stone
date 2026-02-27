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
          <div className="font-medium text-sm tracking-wider uppercase mb-4" style={{color: '#369c82'}}>
            What You Can Expect
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-white leading-none mb-6">
            Numbers Don't Lie
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Our campaigns are strategically designed to deliver measurable, scalable brand growth. 
            Based on structured campaign execution and industry benchmarks, brands working with us can expect:
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 text-center"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-white mb-4 leading-none">
                {stat.number}
              </div>
              <div className="text-white/70 text-sm leading-relaxed">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-white/50 italic text-sm max-w-2xl mx-auto">
            Projections based on structured campaign execution and industry performance benchmarks. 
            Results vary by industry and investment.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
