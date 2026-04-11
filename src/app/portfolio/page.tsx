import type { Metadata } from 'next'
import Portfolio from '@/components/Portfolio'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Our Work - Brand Portfolio & Case Studies | Corner Stone',
  description: 'Explore our portfolio of brand identity, web design, and digital marketing projects that helped businesses grow and succeed.',
  keywords: ['portfolio', 'brand design', 'case studies', 'web design projects', 'branding examples', 'digital marketing portfolio'],
  alternates: {
    canonical: 'https://cornerstonemedia.in/portfolio',
  },
  openGraph: {
    title: 'Our Work - Brand Portfolio & Case Studies | Corner Stone',
    description: 'Explore our portfolio of brand identity, web design, and digital marketing projects that helped businesses grow and succeed.',
    url: 'https://cornerstonemedia.in/portfolio',
    type: 'website',
  },
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#F8F8F6' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#1F5144' }}>
            Our Work
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: '#666' }}>
            Discover how we have helped brands transform their identity and achieve remarkable growth through strategic design and marketing.
          </p>
        </div>
      </section>

      <Portfolio />
      <FAQ />
      <Footer />
    </div>
  )
}
