'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const services = [
  {
    id: '01',
    name: 'Branding',
    description: 'Branding is foundation of how people see and remember your business. We help brands build clear identity through logo design, visual style, color systems, messaging, and brand positioning. Our goal is to make your brand look professional, consistent, and trustworthy across every platform so that customers instantly recognise and connect with you.'
  },
  {
    id: '02',
    name: 'Social Media Management',
    description: "Social media is one of most powerful platforms for building awareness and trust. We manage your brand's social media presence by planning content, designing creative posts and reels, writing captions, and maintaining consistent visual identity. Our focus is to keep your brand active, engaging, and visible so that your audience stays connected and your brand grows online."
  },
  {
    id: '03',
    name: 'Web Design & Development',
    description: "A website is digital home of your brand. We design and develop modern, responsive, and user-friendly websites that clearly communicate your brand and services. Our websites are built not just to look good but also to guide visitors toward action — whether it's contacting you, making an enquiry, or learning more about your business."
  },
  {
    id: '04',
    name: 'SEO',
    description: 'SEO helps your business appear when people search for your services online. We optimise your website structure, content, and technical elements so that search engines like Google can easily understand and rank your website. The goal is to increase organic visibility, bring consistent traffic to your website, and help potential customers discover your brand naturally.'
  },
  {
    id: '05',
    name: 'Performance Marketing',
    description: 'Performance marketing focuses on generating measurable business results through paid advertising. We create and manage advertising campaigns on platforms like Google, Instagram, and Facebook to reach the right audience at the right time. By analysing data and continuously optimising campaigns, we help businesses generate leads, increase conversions, and maximise return on marketing investment.'
  },
  {
    id: '06',
    name: 'Influencer Marketing & Collaborations',
    description: 'Influencer marketing helps brands reach new audiences through trusted voices. We identify and collaborate with influencers who align with your brand values and target audience. From outreach and coordination to campaign management, we handle the entire collaboration process to ensure authentic promotions that increase brand awareness, credibility, and engagement.'
  }
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="services" ref={ref} className="relative min-h-screen flex items-center justify-center bg-white">
      {/* Background */}
      <div className="absolute inset-0 z-0" style={{ background: `linear-gradient(135deg, #F8F8F6 0%, #E8E8E8 100%)` }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-20">

        {/* Section Header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold" style={{ color: '#1F5144', letterSpacing: '-0.02em', fontFamily: '"DM Sans", sans-serif' }}>
            Our Services
          </h2>
          <div className="mt-8 text-lg sm:text-xl max-w-2xl mx-auto" style={{ color: '#666' }}>
            <p>Together, these services help brands build strong foundations, grow their online presence, and turn visibility into real business results.</p>
          </div>
        </motion.div>

        {/* Services Grid — centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative w-full bg-white border border-gray-200 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              {/* Service Number */}
              <div className="absolute top-4 left-4 opacity-20">
                <span className="text-2xl md:text-3xl font-serif font-light" style={{ color: '#1F5144' }}>
                  {service.id}
                </span>
              </div>

              {/* Service Name */}
              <h3 className="text-xl md:text-2xl font-semibold mb-4 pr-12" style={{ color: '#1F5144' }}>
                {service.name}
              </h3>

              {/* Description — expands on hover */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: hoveredService === service.id ? "auto" : 0,
                  opacity: hoveredService === service.id ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="text-gray-600 leading-relaxed" style={{ fontSize: '14px' }}>
                  {service.description}
                </p>
              </motion.div>

              {/* Bottom border indicator */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: '#1F5144' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredService === service.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA — centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button
            onClick={() => scrollToSection('portfolio')}
            className="px-8 py-4 rounded-full border-2 font-medium text-lg transition-all duration-300"
            style={{ borderColor: '#1F5144', color: '#1F5144' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1F5144'
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#1F5144'
            }}
          >
            View Our Work
          </button>
        </motion.div>
      </div>
    </section>
  )
}