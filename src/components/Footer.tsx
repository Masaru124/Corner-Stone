'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Industries', href: '/industries' },
  { name: 'Resources', href: '/resources' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const serviceLinks = [
  { name: 'Branding', href: '/services' },
  { name: 'Social Media', href: '/services' },
  { name: 'Web Design', href: '/services' },
  { name: 'SEO', href: '/services' },
]

export default function Footer() {
  return (
    <footer className="bg-[#F8F8F6] border-t border-[#D8D3CC] py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F5144' }}>
              Corner Stone Design & Media
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              The Studio Behind Brands That Get Noticed. We help businesses build strong brand identities and digital presence.
            </p>
            <div className="text-sm text-gray-500">
              © 2025 All rights reserved.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#1F5144' }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-[#369c82] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#1F5144' }}>
              Our Services
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-[#369c82] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-[#D8D3CC] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            Designed with care in India
          </div>
          <div className="text-[#1F5144] font-serif text-lg italic">
            Vision Made Visible.
          </div>
        </div>
      </div>
    </footer>
  )
}
