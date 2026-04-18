import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getResourceBySlug, listResources } from '@/lib/resources'
import Footer from '@/components/Footer'

export async function generateStaticParams() {
  const resources = await listResources(false)
  return resources.map((resource) => ({
    slug: resource.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const resource = await getResourceBySlug(slug)

  if (!resource) {
    return {
      title: 'Resource Not Found | Corner Stone',
    }
  }

  return {
    title: `${resource.title} | Corner Stone Resources`,
    description: resource.description,
    keywords: [resource.category, 'guide', 'resource', 'corner stone', resource.title.toLowerCase()],
    alternates: {
      canonical: `https://cornerstonemedia.co.in/resources/${resource.slug}`,
    },
    openGraph: {
      title: resource.title,
      description: resource.description,
      url: `https://cornerstonemedia.co.in/resources/${resource.slug}`,
      type: 'article',
    },
  }
}

export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const resource = await getResourceBySlug(slug)

  if (!resource) {
    notFound()
  }

  const allResources = await listResources(false)
  const relatedResources = allResources
    .filter((r) => r.id !== resource.id && r.category === resource.category)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#F8F8F6' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Link 
              href="/resources" 
              className="text-sm hover:text-[#369c82] transition-colors"
              style={{ color: '#666' }}
            >
              ← Back to Resources
            </Link>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <span 
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: '#E8F5F0', color: '#1F5144' }}
            >
              {resource.category}
            </span>
            <span className="text-sm" style={{ color: '#999' }}>{resource.read_time}</span>
            {resource.featured && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                Featured
              </span>
            )}
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#1F5144' }}>
            {resource.title}
          </h1>
          <p className="text-lg sm:text-xl" style={{ color: '#666' }}>
            {resource.description}
          </p>
        </div>
      </section>

      {/* Resource Content */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {resource.image_url && (
            <div className="mb-8 rounded-2xl overflow-hidden">
              <img 
                src={resource.image_url} 
                alt={resource.title}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
            </div>
          )}
          
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: '#333' }}
              dangerouslySetInnerHTML={{ __html: resource.content }}
            />
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t" style={{ borderColor: '#E5E5E5' }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#1F5144' }}>
              Share this resource
            </h3>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(resource.title)}&url=https://cornerstonemedia.co.in/resources/${resource.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border text-sm transition-colors hover:shadow-md"
                style={{ borderColor: '#D8D3CC' }}
              >
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://cornerstonemedia.co.in/resources/${resource.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border text-sm transition-colors hover:shadow-md"
                style={{ borderColor: '#D8D3CC' }}
              >
                LinkedIn
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=https://cornerstonemedia.co.in/resources/${resource.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border text-sm transition-colors hover:shadow-md"
                style={{ borderColor: '#D8D3CC' }}
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      {relatedResources.length > 0 && (
        <section className="py-16 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#F8F8F6' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8" style={{ color: '#1F5144' }}>
              Related Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedResources.map((related) => (
                <Link
                  key={related.id}
                  href={`/resources/${related.slug}`}
                  className="group block p-6 rounded-xl border bg-white transition-all duration-300 hover:shadow-lg"
                  style={{ borderColor: '#D8D3CC' }}
                >
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: '#E8F5F0', color: '#1F5144' }}
                  >
                    {related.category}
                  </span>
                  <h3 
                    className="text-lg font-bold mt-3 mb-2 group-hover:text-[#369c82] transition-colors"
                    style={{ color: '#1F5144' }}
                  >
                    {related.title}
                  </h3>
                  <p className="text-sm line-clamp-2" style={{ color: '#666' }}>
                    {related.description}
                  </p>
                  <span className="text-xs mt-3 inline-block" style={{ color: '#999' }}>
                    {related.read_time}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="p-8 sm:p-12 rounded-2xl"
            style={{ backgroundColor: '#1F5144' }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
              Need Help With Your Project?
            </h2>
            <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Let&apos;s discuss how we can help you achieve your goals.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-full font-medium transition-colors hover:shadow-lg"
              style={{ backgroundColor: '#369c82', color: 'white' }}
            >
              Get In Touch →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
