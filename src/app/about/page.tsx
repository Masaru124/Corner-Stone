import type { Metadata } from 'next'
import Founder from '@/components/Founder'
import GrowthNumbers from '@/components/GrowthNumbers'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About Us - Meet the Founder | Corner Stone Design & Media',
  description: 'Learn about Corner Stone Design & Media and our founders vision for helping brands get noticed through strategic design and digital marketing.',
  keywords: ['about us', 'founder', 'company story', 'design agency India', 'brand agency', 'Wilson Corner Stone'],
  alternates: {
    canonical: 'https://cornerstonemedia.co.in/about',
  },
  openGraph: {
    title: 'About Us - Meet the Founder | Corner Stone Design & Media',
    description: 'Learn about Corner Stone Design & Media and our founders vision for helping brands get noticed through strategic design and digital marketing.',
    url: 'https://cornerstonemedia.co.in/about',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#F8F8F6' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#1F5144' }}>
            About Us
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: '#666' }}>
            The story behind Corner Stone and our mission to make brands unforgettable.
          </p>
        </div>
      </section>

      <Founder />
      <GrowthNumbers />
      <Footer />
    </div>
  )
}
