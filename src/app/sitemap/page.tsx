import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sitemap - All Pages | Corner Stone Design & Media',
  description: 'Complete sitemap of Corner Stone Design & Media. Find all our pages including services, portfolio, resources, and more.',
  keywords: ['sitemap', 'site map', 'all pages', 'corner stone pages', 'website navigation'],
  alternates: {
    canonical: 'https://www.cornerstonemedia.co.in/sitemap/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const siteStructure = [
  {
    category: 'Main Pages',
    links: [
      { name: 'Home', href: '/', description: 'Welcome to Corner Stone - Vision Made Visible' },
      { name: 'About Us', href: '/about', description: 'Meet our founder and learn our story' },
      { name: 'Contact', href: '/contact', description: 'Get in touch for your project' },
    ],
  },
  {
    category: 'Services',
    links: [
      { name: 'Our Services', href: '/services', description: 'Complete list of digital marketing services' },
      { name: 'Branding', href: '/services', description: 'Brand strategy and visual identity design' },
      { name: 'Social Media', href: '/services', description: 'Social media management and marketing' },
      { name: 'Web Design', href: '/services', description: 'Website design and development' },
      { name: 'SEO', href: '/services', description: 'Search engine optimization services' },
    ],
  },
  {
    category: 'Portfolio & Industries',
    links: [
      { name: 'Our Work', href: '/portfolio', description: 'Brand portfolio and case studies' },
      { name: 'Industries', href: '/industries', description: 'Industries we serve and specialize in' },
    ],
  },
  {
    category: 'Resources',
    links: [
      { name: 'Resources & Guides', href: '/resources', description: 'Free guides, templates, and marketing insights' },
      { name: 'Brand Strategy Guide', href: '/resources', description: 'Complete guide to building your brand' },
      { name: 'Social Media Playbook', href: '/resources', description: '2025 social media marketing strategies' },
      { name: 'SEO Guide', href: '/resources', description: 'SEO fundamentals for small businesses' },
    ],
  },
  {
    category: 'Partnership',
    links: [
      { name: 'Link to Us', href: '/link-to-us', description: 'Badges, embed codes, and partnership info' },
      { name: 'Partnership Opportunities', href: '/link-to-us', description: 'Collaborate with Corner Stone' },
    ],
  },
]

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#F8F8F6' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#1F5144' }}>
            Sitemap
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: '#666' }}>
            Complete directory of all pages on Corner Stone Design & Media.
          </p>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {siteStructure.map((section) => (
              <div 
                key={section.category}
                className="p-6 rounded-xl border"
                style={{ borderColor: '#D8D3CC' }}
              >
                <h2 
                  className="text-xl font-bold mb-4 pb-2 border-b"
                  style={{ color: '#1F5144', borderColor: '#E5E5E5' }}
                >
                  {section.category}
                </h2>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group block"
                      >
                        <span 
                          className="font-medium group-hover:text-[#369c82] transition-colors"
                          style={{ color: '#1F5144' }}
                        >
                          {link.name}
                        </span>
                        <p className="text-sm mt-1" style={{ color: '#999' }}>
                          {link.description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#F8F8F6' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold" style={{ color: '#1F5144' }}>6</div>
              <div className="text-sm" style={{ color: '#666' }}>Main Pages</div>
            </div>
            <div>
              <div className="text-3xl font-bold" style={{ color: '#1F5144' }}>5+</div>
              <div className="text-sm" style={{ color: '#666' }}>Service Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold" style={{ color: '#1F5144' }}>10+</div>
              <div className="text-sm" style={{ color: '#666' }}>Free Resources</div>
            </div>
            <div>
              <div className="text-3xl font-bold" style={{ color: '#1F5144' }}>4</div>
              <div className="text-sm" style={{ color: '#666' }}>Industries</div>
            </div>
          </div>
        </div>
      </section>

      {/* XML Sitemap Link */}
      <section className="py-12 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-4" style={{ color: '#666' }}>
            Looking for the XML sitemap for search engines?
          </p>
          <a
            href="/sitemap.xml"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border font-medium transition-colors hover:shadow-md"
            style={{ borderColor: '#1F5144', color: '#1F5144' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            View XML Sitemap
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
