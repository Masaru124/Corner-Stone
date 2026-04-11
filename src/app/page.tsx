import Link from 'next/link'
import Hero from '@/components/Hero'
import GrowthNumbers from '@/components/GrowthNumbers'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      {/* Quick Links Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: '#F8F8F6' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1F5144' }}>
              Explore Our World
            </h2>
            <p className="text-lg" style={{ color: '#666' }}>
              Discover how we can help transform your brand
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              href="/services"
              className="group p-6 rounded-xl border transition-all duration-300 hover:shadow-lg"
              style={{ borderColor: '#D8D3CC', backgroundColor: 'white' }}
            >
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[#369c82] transition-colors" style={{ color: '#1F5144' }}>
                Our Services
              </h3>
              <p className="text-sm" style={{ color: '#666' }}>
                Branding, web design, SEO, social media management, and more.
              </p>
            </Link>
            
            <Link 
              href="/portfolio"
              className="group p-6 rounded-xl border transition-all duration-300 hover:shadow-lg"
              style={{ borderColor: '#D8D3CC', backgroundColor: 'white' }}
            >
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[#369c82] transition-colors" style={{ color: '#1F5144' }}>
                Our Work
              </h3>
              <p className="text-sm" style={{ color: '#666' }}>
                See our portfolio of brand transformations and success stories.
              </p>
            </Link>
            
            <Link 
              href="/about"
              className="group p-6 rounded-xl border transition-all duration-300 hover:shadow-lg"
              style={{ borderColor: '#D8D3CC', backgroundColor: 'white' }}
            >
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[#369c82] transition-colors" style={{ color: '#1F5144' }}>
                About Us
              </h3>
              <p className="text-sm" style={{ color: '#666' }}>
                Meet the founder and learn about our vision and mission.
              </p>
            </Link>
            
            <Link 
              href="/contact"
              className="group p-6 rounded-xl border transition-all duration-300 hover:shadow-lg"
              style={{ borderColor: '#D8D3CC', backgroundColor: 'white' }}
            >
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[#369c82] transition-colors" style={{ color: '#1F5144' }}>
                Contact Us
              </h3>
              <p className="text-sm" style={{ color: '#666' }}>
                Ready to start? Get in touch and let us discuss your project.
              </p>
            </Link>
          </div>
        </div>
      </section>
      
      <GrowthNumbers />
      <Footer />
    </div>
  )
}
