import type { Metadata } from 'next'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Contact Us - Get In Touch | Corner Stone Design & Media',
  description: 'Ready to elevate your brand? Contact us for branding, web design, and digital marketing services. Let us discuss how we can help your business grow.',
  keywords: ['contact us', 'get in touch', 'branding inquiry', 'web design quote', 'digital marketing consultation', 'hire design agency'],
  alternates: {
    canonical: 'https://cornerstonemedia.in/contact',
  },
  openGraph: {
    title: 'Contact Us - Get In Touch | Corner Stone Design & Media',
    description: 'Ready to elevate your brand? Contact us for branding, web design, and digital marketing services. Let us discuss how we can help your business grow.',
    url: 'https://cornerstonemedia.in/contact',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#F8F8F6' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#1F5144' }}>
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: '#666' }}>
            Ready to elevate your brand? Let us discuss how we can help your business grow.
          </p>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  )
}
