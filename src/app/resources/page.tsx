import type { Metadata } from 'next'
import Link from 'next/link'
import { listResources } from '@/lib/resources'
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

const allCategories = ['All', 'Branding', 'Social Media', 'Web Design', 'SEO', 'Templates', 'General']

export default async function ResourcesPage() {
  const resources = await listResources(false)
  const featuredResources = resources.filter(r => r.featured)
  const regularResources = resources.filter(r => !r.featured)
  const categories = [...new Set(resources.map(r => r.category))]
  
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
          <div className="flex flex-wrap justify-center gap-3">
            {allCategories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors border hover:shadow-md"
                style={{
                  borderColor: '#D8D3CC',
                  backgroundColor: category === 'All' ? '#1F5144' : 'white',
                  color: category === 'All' ? 'white' : '#1F5144',
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#1F5144' }}>
            Featured Resources
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredResources.map((resource) => (
              <Link
                key={resource.id}
                href={`/resources/${resource.slug}`}
                className="group block p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl"
                style={{ borderColor: '#D8D3CC', backgroundColor: 'white' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: '#E8F5F0', color: '#1F5144' }}
                  >
                    {resource.category}
                  </span>
                  <span className="text-sm" style={{ color: '#999' }}>{resource.read_time}</span>
                </div>
                <h3 
                  className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-[#369c82] transition-colors"
                  style={{ color: '#1F5144' }}
                >
                  {resource.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: '#666' }}>
                  {resource.description}
                </p>
                <div className="mt-6 flex items-center gap-2 font-medium" style={{ color: '#369c82' }}>
                  Read Guide 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* All Resources */}
      <section className="py-16 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#F8F8F6' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#1F5144' }}>
            All Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularResources.map((resource) => (
              <Link
                key={resource.id}
                href={`/resources/${resource.slug}`}
                className="group block p-6 rounded-xl border transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: '#D8D3CC', backgroundColor: 'white' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: '#E8F5F0', color: '#1F5144' }}
                  >
                    {resource.category}
                  </span>
                </div>
                <h3 
                  className="text-lg font-bold mb-2 group-hover:text-[#369c82] transition-colors"
                  style={{ color: '#1F5144' }}
                >
                  {resource.title}
                </h3>
                <p className="text-sm mb-4 line-clamp-2" style={{ color: '#666' }}>
                  {resource.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: '#999' }}>{resource.read_time}</span>
                  <span className="text-sm font-medium group-hover:translate-x-1 transition-transform" style={{ color: '#369c82' }}>
                    Read →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {resources.length === 0 && (
            <p className="text-center" style={{ color: '#666' }}>
              No resources available yet. Check back soon!
            </p>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="p-8 sm:p-12 rounded-2xl"
            style={{ backgroundColor: '#1F5144' }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
              Get Weekly Marketing Insights
            </h2>
            <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Join 5,000+ marketers and business owners receiving our best strategies and tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-[#369c82]"
                style={{ border: 'none' }}
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-full font-medium transition-colors hover:shadow-lg"
                style={{ backgroundColor: '#369c82', color: 'white' }}
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm mt-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-12 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#F8F8F6' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-4" style={{ color: '#1F5144' }}>
            Found These Resources Helpful?
          </h3>
          <p className="mb-6" style={{ color: '#666' }}>
            Help others discover these free resources by sharing this page.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=Free digital marketing guides and resources&url=https://cornerstonemedia.in/resources`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border transition-colors hover:shadow-md"
              style={{ borderColor: '#D8D3CC', backgroundColor: 'white' }}
            >
              Share on Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=https://cornerstonemedia.in/resources`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border transition-colors hover:shadow-md"
              style={{ borderColor: '#D8D3CC', backgroundColor: 'white' }}
            >
              Share on LinkedIn
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://cornerstonemedia.in/resources`}
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
