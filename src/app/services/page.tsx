import type { Metadata } from 'next'
import Services from '@/components/Services'
import Iceberg from '@/components/Iceberg'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Our Services - Branding, Web Design, SEO & More | Corner Stone',
  description: 'Comprehensive digital marketing services including branding, social media management, web design, SEO, performance marketing, and influencer collaborations.',
  keywords: ['branding services', 'web design', 'SEO services', 'social media management', 'digital marketing India', 'brand strategy'],
  alternates: {
    canonical: 'https://cornerstonemedia.co.in/services',
  },
  openGraph: {
    title: 'Our Services - Branding, Web Design, SEO & More | Corner Stone',
    description: 'Comprehensive digital marketing services including branding, social media management, web design, SEO, performance marketing, and influencer collaborations.',
    url: 'https://cornerstonemedia.co.in/services',
    type: 'website',
  },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#F8F8F6' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#1F5144' }}>
            Our Services
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: '#666' }}>
            We offer comprehensive digital solutions to help your brand stand out and grow in the competitive market.
          </p>
        </div>
      </section>

      <Services />
      <Iceberg />
      <Footer />
    </div>
  )
}
