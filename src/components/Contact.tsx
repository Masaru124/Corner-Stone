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
      <section id="contact" className="py-20 sm:py-24 lg:py-32" style={{backgroundColor: '#F8F8F6'}}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-none mb-8" style={{color: '#111111', fontFamily: "'Cormorant Garamond', serif", fontWeight: '300'}}>
              We'll be in touch soon.
              <br />
              <span className="italic" style={{color: '#369c82'}}>— Wilson</span>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-20 sm:py-24 lg:py-32" style={{backgroundColor: '#F8F8F6'}}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="font-medium text-sm tracking-wider uppercase mb-4" style={{color: '#369c82', letterSpacing: '0.35em'}}>
              Let's Talk
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-none mb-6" style={{color: '#111111', fontFamily: "'Cormorant Garamond', serif", fontWeight: '300', letterSpacing: '-0.02em'}}>
              Ready to Be
              <br />
              <span className="italic" style={{color: '#369c82'}}>Chosen?</span>
            </h2>
            <p className="text-lg mb-8 leading-relaxed" style={{color: '#444', fontWeight: '300', lineHeight: '1.7'}}>
              We don't just take on projects. We take on brands we believe in. Tell us about yours and let's build something worth remembering.
            </p>
            <div className="font-semibold text-lg mb-12" style={{color: '#111111'}}>
              Clarity. Visibility. Growth.
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div>
                <div className="font-medium text-sm tracking-wider uppercase mb-2" style={{color: '#369c82', letterSpacing: '0.25em'}}>
                  WhatsApp
                </div>
                <a 
                  href="https://wa.me/916360414393"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{color: '#111111'}}
                >
                  (+91) 636 0414 393
                </a>
              </div>
              <div>
                <div className="font-medium text-sm tracking-wider uppercase mb-2" style={{color: '#369c82', letterSpacing: '0.25em'}}>
                  Email
                </div>
                <a 
                  href="mailto:cornerstone@gmail.com"
                  className="hover:underline"
                  style={{color: '#111111'}}
                >
                  cornerstone@gmail.com
                </a>
              </div>
              <div>
                <div className="font-medium text-sm tracking-wider uppercase mb-2" style={{color: '#369c82', letterSpacing: '0.25em'}}>
                  LinkedIn
                </div>
                <a 
                  href="#"
                  className="hover:underline"
                  style={{color: '#111111'}}
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
                <label className="block font-medium text-sm tracking-wider uppercase mb-2" style={{color: '#369c82', letterSpacing: '0.25em'}}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="What do people call you?"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white"
                  style={{borderColor: '#D8D3CC'}}
                  required
                />
              </div>

              {/* Brand */}
              <div>
                <label className="block font-medium text-sm tracking-wider uppercase mb-2" style={{color: '#369c82', letterSpacing: '0.25em'}}>
                  Brand / Company
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="The name behind the work"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white"
                  style={{borderColor: '#D8D3CC'}}
                  required
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block font-medium text-sm tracking-wider uppercase mb-2" style={{color: '#369c82', letterSpacing: '0.25em'}}>
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="We'll reach out directly"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white"
                  style={{borderColor: '#D8D3CC'}}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium text-sm tracking-wider uppercase mb-2" style={{color: '#369c82', letterSpacing: '0.25em'}}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Where should we send the proposal?"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white"
                  style={{borderColor: '#D8D3CC'}}
                  required
                />
              </div>

              {/* Services */}
              <div>
                <label className="block font-medium text-sm tracking-wider uppercase mb-4" style={{color: '#369c82', letterSpacing: '0.25em'}}>
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
                        color: formData.services.includes(service) ? 'white' : '#555'
                      }}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block font-medium text-sm tracking-wider uppercase mb-2" style={{color: '#369c82', letterSpacing: '0.25em'}}>
                  Tell Us About Your Brand
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="What does your brand do, and where do you want to take it?"
                  rows={4}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white resize-none"
                  style={{borderColor: '#D8D3CC'}}
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
                <p className="text-center italic text-sm mt-3" style={{color: '#888'}}>
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
