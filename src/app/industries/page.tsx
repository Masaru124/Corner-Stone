import type { Metadata } from 'next'
import Industries from '@/components/Industries'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Industries We Serve | Corner Stone Design & Media',
  description: 'We work with businesses across various industries including education, healthcare, real estate, and D2C brands to create impactful brand experiences.',
  keywords: ['industries served', 'education marketing', 'healthcare branding', 'real estate marketing', 'D2C brands', 'e-commerce branding'],
  alternates: {
    canonical: 'https://cornerstonemedia.in/industries',
  },
  openGraph: {
    title: 'Industries We Serve | Corner Stone Design & Media',
    description: 'We work with businesses across various industries including education, healthcare, real estate, and D2C brands to create impactful brand experiences.',
    url: 'https://cornerstonemedia.in/industries',
    type: 'website',
  },
}

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#F8F8F6' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#1F5144' }}>
            Industries We Serve
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: '#666' }}>
            We bring industry-specific expertise to help businesses across diverse sectors build powerful brands.
          </p>
        </div>
      </section>

      <Industries />
      <Footer />
    </div>
  )
}
