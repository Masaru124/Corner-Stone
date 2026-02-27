'use client'

import { motion } from 'framer-motion'

const services = [
  {
    id: '01',
    name: 'Brand Strategy',
    description: 'We define who you are, who you serve, and how you communicate. Every design and marketing decision starts here.'
  },
  {
    id: '02',
    name: 'Brand Identity Design',
    description: 'Logo, visual system, color palette, typography, and brand guidelines — everything that makes people recognise and trust you instantly.'
  },
  {
    id: '03',
    name: 'Content & Media Design',
    description: 'Creative content built to keep your brand active, attractive, and relevant across every digital platform.'
  },
  {
    id: '04',
    name: 'Social Media Management',
    description: 'Planning, publishing, engagement, and analysis — we manage your presence so you can focus on your business.'
  },
  {
    id: '05',
    name: 'Influencer Marketing',
    description: 'We connect your brand with the right voices. Full collaboration management — research, coordination, and execution.'
  },
  {
    id: '06',
    name: 'Web Development',
    description: 'Brand-focused websites that look premium, work on every device, and are built to convert visitors into customers.'
  }
]

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="text-teal font-medium text-sm tracking-wider uppercase mb-4">
            What We Do
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-primary leading-none">
            Everything Your Brand Needs.
            <br />
            One Studio.
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 sm:p-8 rounded-lg border border-cream/30 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-teal font-medium text-xs tracking-wider uppercase mb-3">
                {service.id}
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4 leading-tight">
                {service.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
