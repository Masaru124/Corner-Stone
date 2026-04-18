import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import CopyButton from '@/components/CopyButton'

export const metadata: Metadata = {
  title: 'Link to Us - Partner with Corner Stone Design & Media',
  description: 'Help us grow by linking to Corner Stone. Find embed codes, badges, and partnership opportunities. Build backlinks together.',
  keywords: ['link to us', 'partnership', 'backlink', 'badge', 'embed code', 'corner stone partner'],
  alternates: {
    canonical: 'https://cornerstonemedia.co.in/link-to-us',
  },
  openGraph: {
    title: 'Link to Us - Partner with Corner Stone Design & Media',
    description: 'Help us grow by linking to Corner Stone. Find embed codes, badges, and partnership opportunities.',
    url: 'https://cornerstonemedia.co.in/link-to-us',
    type: 'website',
  },
}

const badges = [
  {
    name: 'Standard Badge',
    preview: 'Designed by Corner Stone',
    code: `<a href="https://cornerstonemedia.co.in" target="_blank" rel="noopener noreferrer">
  Designed by Corner Stone
</a>`,
  },
  {
    name: 'Logo Badge',
    preview: 'Corner Stone Logo',
    code: `<a href="https://cornerstonemedia.co.in" target="_blank" rel="noopener noreferrer">
  <img src="https://cornerstonemedia.co.in/Logo%20Kit%20-%20CNRSTN/Cornerstone%20Icon%20Green.png" 
       alt="Corner Stone Design & Media" 
       width="32" height="32" />
</a>`,
  },
  {
    name: 'Text Link',
    preview: 'Digital Marketing by Corner Stone',
    code: `Digital marketing by <a href="https://cornerstonemedia.co.in" target="_blank" rel="noopener noreferrer">Corner Stone</a>`,
  },
]

const linkFormats = [
  {
    format: 'HTML Link',
    code: `<a href="https://cornerstonemedia.co.in" target="_blank" rel="noopener noreferrer">
  Corner Stone Design & Media - Vision Made Visible
</a>`,
  },
  {
    format: 'Markdown',
    code: `[Corner Stone Design & Media](https://cornerstonemedia.co.in)`,
  },
  {
    format: 'BBCode',
    code: `[url=https://cornerstonemedia.co.in]Corner Stone Design & Media[/url]`,
  },
]

export default function LinkToUsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#F8F8F6' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#1F5144' }}>
            Link to Us
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: '#666' }}>
            Help us grow by linking to Corner Stone. Choose from badges, embed codes, or partnership opportunities.
          </p>
        </div>
      </section>

      {/* Why Link Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border text-center" style={{ borderColor: '#D8D3CC' }}>
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#1F5144' }}>
                Support Local
              </h3>
              <p style={{ color: '#666' }}>
                Help promote a growing Indian design agency and support local businesses.
              </p>
            </div>
            <div className="p-6 rounded-xl border text-center" style={{ borderColor: '#D8D3CC' }}>
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#1F5144' }}>
                Build Connections
              </h3>
              <p style={{ color: '#666' }}>
                Link exchange helps both parties improve SEO and domain authority.
              </p>
            </div>
            <div className="p-6 rounded-xl border text-center" style={{ borderColor: '#D8D3CC' }}>
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#1F5144' }}>
                Get Featured
              </h3>
              <p style={{ color: '#666' }}>
                Partners get featured on our website and social media channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Badge Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#F8F8F6' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#1F5144' }}>
            Website Badges
          </h2>
          <p className="mb-8" style={{ color: '#666' }}>
            Copy and paste any of these badges to your website footer or credits page.
          </p>
          
          <div className="space-y-8">
            {badges.map((badge) => (
              <div 
                key={badge.name}
                className="p-6 rounded-xl border bg-white"
                style={{ borderColor: '#D8D3CC' }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="lg:w-1/4">
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#1F5144' }}>
                      {badge.name}
                    </h3>
                    <div 
                      className="p-4 rounded-lg border inline-block"
                      style={{ borderColor: '#E5E5E5', backgroundColor: '#FAFAFA' }}
                    >
                      <span style={{ color: '#1F5144' }}>{badge.preview}</span>
                    </div>
                  </div>
                  <div className="lg:w-3/4">
                    <div className="relative">
                      <pre 
                        className="p-4 rounded-lg text-sm overflow-x-auto"
                        style={{ backgroundColor: '#1F5144', color: '#fff' }}
                      >
                        <code>{badge.code}</code>
                      </pre>
                      <CopyButton text={badge.code} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Link Formats Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#1F5144' }}>
            Link Formats
          </h2>
          <p className="mb-8" style={{ color: '#666' }}>
            Different formats for various platforms and contexts.
          </p>
          
          <div className="space-y-6">
            {linkFormats.map((format) => (
              <div 
                key={format.format}
                className="p-6 rounded-xl border"
                style={{ borderColor: '#D8D3CC' }}
              >
                <h3 className="text-lg font-bold mb-3" style={{ color: '#1F5144' }}>
                  {format.format}
                </h3>
                <div className="relative">
                  <pre 
                    className="p-4 rounded-lg text-sm overflow-x-auto"
                    style={{ backgroundColor: '#F8F8F6', color: '#1F5144' }}
                  >
                    <code>{format.code}</code>
                  </pre>
                  <CopyButton text={format.code} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#1F5144' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
            Partnership Opportunities
          </h2>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Interested in a deeper partnership? We collaborate with complementary businesses, agencies, and influencers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <h3 className="text-lg font-bold mb-2 text-white">Agency Partners</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Web dev agencies, PR firms, and consultancies that need design support.
              </p>
            </div>
            <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <h3 className="text-lg font-bold mb-2 text-white">Content Partners</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Bloggers, podcasters, and content creators in the business space.
              </p>
            </div>
            <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <h3 className="text-lg font-bold mb-2 text-white">Influencer Partners</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Business influencers and thought leaders who recommend quality services.
              </p>
            </div>
            <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <h3 className="text-lg font-bold mb-2 text-white">Directory Listings</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                Business directories and professional associations.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <a
              href="/contact"
              className="inline-block px-8 py-4 rounded-full font-medium transition-colors hover:shadow-lg"
              style={{ backgroundColor: '#369c82', color: 'white' }}
            >
              Discuss Partnership →
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center" style={{ color: '#1F5144' }}>
            What Partners Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border" style={{ borderColor: '#D8D3CC' }}>
              <p className="mb-4 italic" style={{ color: '#666' }}>
                "Corner Stone helped elevate our clients brands with professional design work. A reliable partner we proudly recommend."
              </p>
              <div className="font-medium" style={{ color: '#1F5144' }}>
                — Partner Agency Owner
              </div>
            </div>
            <div className="p-6 rounded-xl border" style={{ borderColor: '#D8D3CC' }}>
              <p className="mb-4 italic" style={{ color: '#666' }}>
                "Their resources and guides have helped my audience grow their businesses. Happy to feature them on my platform."
              </p>
              <div className="font-medium" style={{ color: '#1F5144' }}>
                — Business Content Creator
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
