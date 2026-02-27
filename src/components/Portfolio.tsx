'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const projects = [
  {
    id: 'climate',
    title: 'Climate',
    type: 'Brand Identity + Packaging',
    description: 'A premium non-alcoholic beverage brand inspired by exotic flavors from around the world. We built the complete visual identity — logo, color system, product packaging, and social media presence.',
    images: [
      { src: '/placeholder-climate-1.jpg', alt: 'Blue Mirage can - navy blue version' },
      { src: '/placeholder-climate-2.jpg', alt: 'Blue Mirage can - green version' },
      { src: '/placeholder-climate-3.jpg', alt: 'Lifestyle shot - person with drink' },
      { src: '/placeholder-climate-4.jpg', alt: 'Color palette swatch' }
    ],
    tags: ['Brand Identity', 'Packaging Design', 'Visual Direction', 'Content Design']
  },
  {
    id: 'gowaves',
    title: 'GoWaves',
    type: 'Brand Redesign',
    description: 'A full brand redesign for an Indian alkaline water brand and e-commerce platform. New logo, typography system, brand messaging, and digital presence — rebuilt from scratch.',
    images: [
      { src: '/placeholder-gowaves-1.jpg', alt: 'GoWaves logo on dark background' },
      { src: '/placeholder-gowaves-2.jpg', alt: 'App icon on phone screen mockup' },
      { src: '/placeholder-gowaves-3.jpg', alt: 'Social media creative' },
      { src: '/placeholder-gowaves-4.jpg', alt: 'New logo final version' }
    ],
    tags: ['Brand Redesign', 'Logo Design', 'App Identity', 'Brand Guidelines']
  },
  {
    id: 'ommarble',
    title: 'OM Marble & Granites',
    type: 'Social Media Design',
    description: 'A luxury stone brand that needed content to match the quality of its products. We created a series of premium social media creatives — each post designed to stop the scroll and communicate luxury.',
    images: [
      { src: '/placeholder-om-1.jpg', alt: 'Epitome of Luxury post - Jewel Onyx' },
      { src: '/placeholder-om-2.jpg', alt: 'Crafted by Earth post' },
      { src: '/placeholder-om-3.jpg', alt: 'Labradorite Blue product grid post' },
      { src: '/placeholder-om-4.jpg', alt: 'Bold Blue Beautiful full bleed post' }
    ],
    tags: ['Social Media Design', 'Content Strategy', 'Brand Creatives']
  },
  {
    id: 'thumbnails',
    title: 'YouTube Thumbnails',
    type: 'Content & Media Design',
    description: 'High-converting thumbnail designs built on psychology, not guesswork. Bold compositions and visual hooks designed to increase click-through rate for content creators across niches.',
    images: [
      { src: '/placeholder-thumbnails-1.jpg', alt: 'UFC/sports thumbnails' },
      { src: '/placeholder-thumbnails-2.jpg', alt: 'Crypto thumbnails' },
      { src: '/placeholder-thumbnails-3.jpg', alt: 'Peaky Blinders style thumbnails' },
      { src: '/placeholder-thumbnails-4.jpg', alt: 'General content creator thumbnails' }
    ],
    tags: ['Thumbnail Design', 'Media Design', 'Content Creatives']
  }
]

export default function Portfolio() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="portfolio" className="py-20 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="text-teal font-medium text-sm tracking-wider uppercase mb-4">
            Our Work
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-primary leading-none mb-4">
            Work That Speaks
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real brands. Real results. Every project built with purpose.
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="space-y-12 sm:space-y-16">
          {projects.map((project, projectIndex) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: projectIndex * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden border border-cream/30"
            >
              {/* Project Header */}
              <div className="bg-primary p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h3 className="text-3xl sm:text-4xl font-serif font-light text-white">
                  {project.title}
                </h3>
                <span className="text-white/60 text-sm font-medium tracking-wider uppercase">
                  {project.type}
                </span>
              </div>

              {/* Project Body */}
              <div className="p-6 sm:p-8">
                <p className="text-gray-600 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Image Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {project.images.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm text-center p-4">
                        {image.alt}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-cream/50 text-gray-600 text-xs font-medium tracking-wider uppercase rounded-full border border-cream/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 sm:mt-20"
        >
          <button
            onClick={() => scrollToSection('contact')}
            className="text-primary font-medium text-lg hover:text-teal transition-colors inline-flex items-center gap-2"
          >
            Want results like these? Let's talk →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
