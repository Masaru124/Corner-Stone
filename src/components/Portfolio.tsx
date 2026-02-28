'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const projects = [
  {
    id: 'climate',
    title: 'Climate',
    type: 'Brand Identity + Packaging',
    description: 'A premium non-alcoholic beverage brand inspired by exotic flavors from around the world. We built complete visual identity — logo, color system, product packaging, and social media presence.',
    images: [
      { src: '/Portfolio - CNRSTN/Climate/Drink Can Mockup (1).png', alt: 'Blue Mirage can - navy blue version' },
      { src: '/Portfolio - CNRSTN/Climate/Drink Can Mockup.png', alt: 'Blue Mirage can - green version' },
      { src: '/Portfolio - CNRSTN/Climate/Soda Can Mock-Up 1 (Free) by MassDream.png', alt: 'Lifestyle shot - person with drink' },
      { src: '/Portfolio - CNRSTN/Climate/Screenshot 2026-02-27 at 10.55.04 PM.png', alt: 'Color palette swatch' }
    ],
    tags: ['Brand Identity', 'Packaging Design', 'Visual Direction', 'Content Design']
  },
  {
    id: 'gowaves',
    title: 'GoWaves',
    type: 'Brand Redesign',
    description: 'A full brand redesign for an Indian alkaline water brand and e-commerce platform. New logo, typography system, brand messaging, and digital presence — rebuilt from scratch.',
    images: [
      { src: '/Portfolio - CNRSTN/Gowaves/Corner Stone - Service Guide (3).png', alt: 'GoWaves brand guide and logo presentation' },
      { src: '/Portfolio - CNRSTN/Gowaves/Corner Stone - Service Guide (3).png', alt: 'GoWaves brand guidelines' },
      { src: '/Portfolio - CNRSTN/Gowaves/Corner Stone - Service Guide (3).png', alt: 'GoWaves logo variations' },
      { src: '/Portfolio - CNRSTN/Gowaves/Corner Stone - Service Guide (3).png', alt: 'GoWaves brand applications' }
    ],
    tags: ['Brand Redesign', 'Logo Design', 'App Identity', 'Brand Guidelines']
  },
  {
    id: 'socialmedia',
    title: 'Social Media Design',
    type: 'Content & Media Design',
    description: 'A luxury stone brand that needed content to match the quality of its products. We created a series of premium social media creatives — each post designed to stop the scroll and communicate luxury.',
    images: [
      { src: '/Portfolio - CNRSTN/Social Media Posts /Copy of 01 (1).png', alt: 'Premium social media post design' },
      { src: '/Portfolio - CNRSTN/Social Media Posts /Copy of 01 (2).png', alt: 'Elegant brand creative' },
      { src: '/Portfolio - CNRSTN/Social Media Posts /Copy of BTC Price.png', alt: 'Cryptocurrency price chart design' },
      { src: '/Portfolio - CNRSTN/Social Media Posts /Copy of Believe in cry.png', alt: 'Crypto belief campaign creative' }
    ],
    tags: ['Social Media Design', 'Content Strategy', 'Brand Creatives']
  },
  {
    id: 'thumbnails',
    title: 'YouTube Thumbnails',
    type: 'Content & Media Design',
    description: 'High-converting thumbnail designs built on psychology, not guesswork. Bold compositions and visual hooks designed to increase click-through rate for content creators across niches.',
    images: [
      { src: '/Portfolio - CNRSTN/Youtube Thumbnails/Copy of MMA Thumb 002.png', alt: 'MMA sports thumbnail design' },
      { src: '/Portfolio - CNRSTN/Youtube Thumbnails/Copy of MMA Thumb 005.png', alt: 'Combat sports thumbnail' },
      { src: '/Portfolio - CNRSTN/Youtube Thumbnails/Copy of Motiv Thumb 001.png', alt: 'Motivational content thumbnail' },
      { src: '/Portfolio - CNRSTN/Youtube Thumbnails/Copy of Podcast Thumb 001.png', alt: 'Podcast episode thumbnail' }
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
    <section id="portfolio" className="py-20 sm:py-24 lg:py-32" style={{backgroundColor: '#F8F8F6'}}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="font-medium text-sm tracking-wider uppercase mb-4" style={{color: '#369c82', letterSpacing: '0.35em'}}>
            Our Work
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-none mb-4" style={{color: '#111111', fontFamily: "'Cormorant Garamond', serif", fontWeight: '300', letterSpacing: '-0.02em'}}>
            Work That Speaks
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{color: '#444', fontWeight: '300', fontSize: '16px', lineHeight: '1.7'}}>
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
              className="bg-white rounded-lg overflow-hidden border"
              style={{borderColor: '#D8D3CC'}}
            >
              {/* Project Header */}
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{backgroundColor: '#1F5144'}}>
                <h3 className="text-3xl sm:text-4xl font-serif font-light text-white" style={{fontFamily: "'Cormorant Garamond', serif", fontWeight: '300'}}>
                  {project.title}
                </h3>
                <span className="text-sm font-medium tracking-wider uppercase" style={{color: 'rgba(255,255,255,0.45)'}}>
                  {project.type}
                </span>
              </div>

              {/* Project Body */}
              <div className="p-6 sm:p-8">
                <p className="leading-relaxed mb-6" style={{color: '#444', fontWeight: '300', fontSize: '15px'}}>
                  {project.description}
                </p>

                {/* Image Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {project.images.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border"
                      style={{borderColor: '#D8D3CC'}}
                    >
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 text-xs font-medium tracking-wider uppercase rounded-full border"
                      style={{
                        color: '#555',
                        borderColor: '#D8D3CC',
                        backgroundColor: '#F5F2EE',
                        fontWeight: '500',
                        letterSpacing: '0.12em'
                      }}
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
            className="text-lg font-medium hover:underline inline-flex items-center gap-2"
            style={{color: '#111111'}}
          >
            Want results like these? Let's talk →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
