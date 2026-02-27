'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const services = [
  'Brand Identity',
  'Social Media',
  'Website',
  'Content Design',
  'Campaigns',
  'All of the Above'
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    whatsapp: '',
    email: '',
    services: [] as string[],
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 sm:py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-primary mb-8">
              We'll be in touch soon.
              <br />
              <span className="italic text-teal">— Wilson</span>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-20 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-teal font-medium text-sm tracking-wider uppercase mb-4">
              Let's Talk
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-primary leading-none mb-6">
              Ready to Be
              <br />
              <span className="italic text-teal">Chosen?</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We don't just take on projects. We take on brands we believe in. Tell us about yours and let's build something worth remembering.
            </p>
            <div className="text-primary font-semibold text-lg mb-12">
              Clarity. Visibility. Growth.
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div>
                <div className="text-teal font-medium text-sm tracking-wider uppercase mb-2">
                  WhatsApp
                </div>
                <a 
                  href="https://wa.me/916360414393"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-teal transition-colors"
                >
                  (+91) 636 0414 393
                </a>
              </div>
              <div>
                <div className="text-teal font-medium text-sm tracking-wider uppercase mb-2">
                  Email
                </div>
                <a 
                  href="mailto:cornerstone@gmail.com"
                  className="text-primary hover:text-teal transition-colors"
                >
                  cornerstone@gmail.com
                </a>
              </div>
              <div>
                <div className="text-teal font-medium text-sm tracking-wider uppercase mb-2">
                  LinkedIn
                </div>
                <a 
                  href="#"
                  className="text-primary hover:text-teal transition-colors"
                >
                  Wilson Tom — Founder, Corner Stone
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block font-medium text-sm tracking-wider uppercase mb-2" style={{color: '#369c82'}}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="What do people call you?"
                  className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white"
                  required
                />
              </div>

              {/* Brand */}
              <div>
                <label className="block font-medium text-sm tracking-wider uppercase mb-2" style={{color: '#369c82'}}>
                  Brand / Company
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="The name behind the work"
                  className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white"
                  required
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block font-medium text-sm tracking-wider uppercase mb-2" style={{color: '#369c82'}}>
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="We'll reach out directly"
                  className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium text-sm tracking-wider uppercase mb-2" style={{color: '#369c82'}}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Where should we send the proposal?"
                  className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white"
                  required
                />
              </div>

              {/* Services */}
              <div>
                <label className="block font-medium text-sm tracking-wider uppercase mb-4" style={{color: '#369c82'}}>
                  What Do You Need?
                </label>
                <div className="flex flex-wrap gap-2">
                  {services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleServiceToggle(service)}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                      style={{
                        backgroundColor: formData.services.includes(service) ? '#1F5144' : '#F5F2EE',
                        color: formData.services.includes(service) ? 'white' : '#666'
                      }}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block font-medium text-sm tracking-wider uppercase mb-2" style={{color: '#369c82'}}>
                  Tell Us About Your Brand
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="What does your brand do, and where do you want to take it?"
                  rows={4}
                  className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent bg-white resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full px-8 py-4 text-white font-medium rounded-lg transition-colors duration-300 text-lg"
                  style={{backgroundColor: '#1F5144'}}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#369c82'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1F5144'}
                >
                  Let's Build Something →
                </button>
                <p className="text-center text-gray-500 italic text-sm mt-3">
                  "We respond within 24 hours. Usually much faster."
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
