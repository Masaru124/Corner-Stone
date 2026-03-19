'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const faqs = [
  {
    question: "Is digital marketing necessary for businesses today?",
    answer: "Today, most people search online before choosing a service or brand. Having a strong digital presence helps businesses build visibility, trust, and credibility. Digital marketing ensures your brand appears where your audience is already looking."
  },
  {
    question: "How can a digital marketing agency help our business?",
    answer: "A digital marketing agency helps businesses grow online through strategies like branding, social media, websites, SEO, and advertising. These efforts help attract the right audience, improve visibility, and generate leads or enquiries for your business."
  },
  {
    question: "Are digital marketing services useful for already established businesses?",
    answer: "Yes. Even established businesses need continuous online visibility to stay competitive. Digital marketing helps maintain brand awareness, reach new customers, and keep your business ahead of competitors."
  },
  {
    question: "Do you provide customized services for different businesses?",
    answer: "Yes. Every business is different, so we design strategies based on your goals, industry, and target audience. Our services are tailored to ensure the marketing efforts align with your business objectives and growth plans."
  },
  {
    question: "How do you measure the success of marketing campaigns?",
    answer: "We track performance through analytics, engagement metrics, lead generation, and campaign data. This helps us understand what works best and continuously optimize strategies to achieve better results."
  },
  {
    question: "How is Corner Stone Design & Media different from other agencies?",
    answer: "We combine branding, design, and marketing strategy to build brands that not only look professional but also grow consistently. Our focus is on clarity, visibility, and measurable results."
  },
  {
    question: "What is the cost of working with your agency?",
    answer: "The cost depends on project scope, deliverables, and duration. After understanding your requirements, we provide a clear proposal outlining strategy, deliverables, and pricing."
  },
  {
    question: "How can we get started with Corner Stone Design & Media?",
    answer: "The process begins with a discovery call where we understand your goals and challenges. Based on that, we share a customized strategy and project proposal to move forward."
  }
]

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="faq" ref={ref} className="relative py-20 sm:py-24 lg:py-32 overflow-hidden bg-white">
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
            FAQ's
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Frequently asked questions about our digital marketing services
          </p>
        </motion.div>

        {/* FAQ Items - Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Question with larger text */}
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: '600' }}>
                {faq.question}
              </h3>
              
              {/* Answer */}
              <p className="text-gray-700 leading-relaxed text-base" style={{ lineHeight: '1.7' }}>
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 rounded-full font-medium text-lg transition-all duration-300"
            style={{ backgroundColor: '#1F5144', color: 'white' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#369c82'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1F5144'}
          >
            Ready to Discuss Your Project?
          </button>
        </motion.div>
      </div>
    </section>
  )
}
