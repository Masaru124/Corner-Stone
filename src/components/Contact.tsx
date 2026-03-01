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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      name: formData.name,
      brand: formData.brand,
      whatsapp: formData.whatsapp,
      email: formData.email,
      services: formData.services.join(', '),
      message: formData.message
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = await res.json()
      console.log('Submission result:', result)

      if (result.success) {
        setIsSubmitted(true)
      } else {
        alert('Error submitting form: ' + result.error)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Failed to submit form. Please try again later.')
    }
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
            <div className="flex gap-6">
              <a 
                href="https://wa.me/917019090277"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{backgroundColor: '#25D366'}}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 9.89-5.335 9.89-11.892a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              <a 
                href="mailto:info@cornerstonemedia.co.in"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{backgroundColor: '#1F5144'}}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/cornerstone-design-media/?viewAsMember=true"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{backgroundColor: '#0077B5'}}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
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
                  style={{borderColor: '#D8D3CC', fontFamily: "'Cormorant Garamond', serif", fontWeight: '300'}}
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
                  style={{borderColor: '#D8D3CC', fontFamily: "'Cormorant Garamond', serif", fontWeight: '300'}}
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
                  style={{borderColor: '#D8D3CC', fontFamily: "'Cormorant Garamond', serif", fontWeight: '300'}}
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
                  style={{borderColor: '#D8D3CC', fontFamily: "'Cormorant Garamond', serif", fontWeight: '300'}}
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
                  style={{borderColor: '#D8D3CC', fontFamily: "'Cormorant Garamond', serif", fontWeight: '300'}}
                />
              </div>

              {/* Submit Button */}
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
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
