import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Iceberg from '@/components/Iceberg'
import Portfolio from '@/components/Portfolio'
import GrowthNumbers from '@/components/GrowthNumbers'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <Iceberg />
      <Portfolio />
      <GrowthNumbers />
      <Contact />
      <Footer />
    </div>
  )
}
