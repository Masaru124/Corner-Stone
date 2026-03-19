import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Industries from '@/components/Industries'
import Portfolio from '@/components/Portfolio'
import GrowthNumbers from '@/components/GrowthNumbers'
import Iceberg from '@/components/Iceberg'
import FAQ from '@/components/FAQ'
import Founder from '@/components/Founder'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Services />
      <Industries />
      <Iceberg />
      <Portfolio />
      <GrowthNumbers />
      <FAQ />
      <Founder />
      <Contact />
      <Footer />
    </div>
  )
}
