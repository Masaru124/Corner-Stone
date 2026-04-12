import type { Metadata } from 'next'
import { listResources } from '@/lib/resources'
import ResourcesFilter from '@/components/ResourcesFilter'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Resources & Guides - Digital Marketing Insights | Corner Stone',
  description: 'Free guides, templates, and insights on branding, social media, web design, and digital marketing. Expert resources to help your business grow.',
  keywords: ['digital marketing guide', 'branding tips', 'social media strategy', 'web design best practices', 'SEO guide', 'marketing resources'],
  alternates: {
    canonical: 'https://cornerstonemedia.in/resources',
  },
  openGraph: {
    title: 'Resources & Guides - Digital Marketing Insights | Corner Stone',
    description: 'Free guides, templates, and insights on branding, social media, web design, and digital marketing. Expert resources to help your business grow.',
    url: 'https://cornerstonemedia.in/resources',
    type: 'website',
  },
}

export default async function ResourcesPage() {
  const resources = await listResources(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#F8F8F6' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#1F5144' }}>
            Resources & Guides
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8" style={{ color: '#666' }}>
            Expert insights, templates, and guides to help you master digital marketing and grow your brand.
          </p>
        </div>
      </section>

      <ResourcesFilter resources={resources} />

      {/* Share Section */}
      <section className="py-12 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#F8F8F6' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-4" style={{ color: '#1F5144' }}>
            Found These Resources Helpful?
          </h3>
          <p className="mb-6" style={{ color: '#666' }}>
            Help others discover these free resources by sharing this page.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://twitter.com/intent/tweet?text=Free digital marketing guides and resources&url=https://cornerstonemedia.in/resources"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border transition-colors hover:shadow-md"
              style={{ borderColor: '#D8D3CC', backgroundColor: 'white' }}
            >
              Share on Twitter
            </a>
            <a
              href="https://www.linkedin.com/sharing/share-offsite/?url=https://cornerstonemedia.in/resources"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border transition-colors hover:shadow-md"
              style={{ borderColor: '#D8D3CC', backgroundColor: 'white' }}
            >
              Share on LinkedIn
            </a>
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https://cornerstonemedia.in/resources"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border transition-colors hover:shadow-md"
              style={{ borderColor: '#D8D3CC', backgroundColor: 'white' }}
            >
              Share on Facebook
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
