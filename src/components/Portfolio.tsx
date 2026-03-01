'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type PortfolioPost = {
  id: number
  title: string
  type: string
  description: string
  images: string[]
  tags: string[]
  hidden: boolean
  image_fit: 'contain' | 'cover'
  image_size: 'small' | 'medium' | 'large'
  image_columns: number | null
}

function getImageGridClass(imageCount: number, imageColumns: number | null) {
  if (imageColumns === 1) {
    return 'grid-cols-1'
  }

  if (imageColumns === 2) {
    return 'grid-cols-1 sm:grid-cols-2'
  }

  if (imageColumns === 3) {
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  }

  if (imageCount <= 1) {
    return 'grid-cols-1'
  }

  if (imageCount === 2) {
    return 'grid-cols-1 sm:grid-cols-2'
  }

  return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
}

function getImageHeightClass(imageSize: 'small' | 'medium' | 'large') {
  if (imageSize === 'small') {
    return 'h-52'
  }

  if (imageSize === 'large') {
    return 'h-80 sm:h-[26rem]'
  }

  return 'h-56'
}

export default function Portfolio() {
  const [posts, setPosts] = useState<PortfolioPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch('/api/portfolio')
        const result = await response.json()

        if (response.ok && result.success) {
          setPosts(result.posts)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [])

  return (
    <section id="portfolio" className="py-20 sm:py-24 lg:py-32" style={{ backgroundColor: '#F8F8F6' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <div
            className="font-medium text-sm tracking-wider uppercase mb-4"
            style={{ color: '#369c82', letterSpacing: '0.35em' }}
          >
            Our Work
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-none mb-4"
            style={{ color: '#111111', fontFamily: "'Cormorant Garamond', serif", fontWeight: '300', letterSpacing: '-0.02em' }}
          >
            Work That Speaks
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#444', fontWeight: '300', fontSize: '16px', lineHeight: '1.7' }}>
            Real brands. Real results. Every project built with purpose.
          </p>
        </motion.div>

        <div className="space-y-12 sm:space-y-16">
          {isLoading ? (
            <p className="text-center" style={{ color: '#555' }}>
              Loading portfolio...
            </p>
          ) : posts.length === 0 ? (
            <p className="text-center" style={{ color: '#555' }}>
              No portfolio posts yet.
            </p>
          ) : (
            posts.map((project, projectIndex) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: projectIndex * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg overflow-hidden border"
                style={{ borderColor: '#D8D3CC' }}
              >
                <div
                  className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  style={{ backgroundColor: '#1F5144' }}
                >
                  <h3 className="text-3xl sm:text-4xl font-serif font-light text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: '300' }}>
                    {project.title}
                  </h3>
                  <span className="text-sm font-medium tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {project.type}
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  <p className="leading-relaxed mb-6" style={{ color: '#444', fontWeight: '300', fontSize: '15px' }}>
                    {project.description}
                  </p>

                  {project.images.length > 0 ? (
                    <div className={`grid gap-4 mb-6 ${getImageGridClass(project.images.length, project.image_columns ?? null)}`}>
                      {project.images.map((imageUrl, imageIndex) => (
                        <div
                          key={`${project.id}-${imageIndex}`}
                          className={`relative ${getImageHeightClass(project.image_size || 'medium')} bg-gray-100 rounded-lg overflow-hidden border`}
                          style={{ borderColor: '#D8D3CC' }}
                        >
                          <img
                            src={imageUrl}
                            alt={`${project.title} image ${imageIndex + 1}`}
                            className={`w-full h-full ${project.image_fit === 'cover' ? 'object-cover' : 'object-contain'}`}
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {project.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={`${project.id}-${tag}`}
                          className="px-4 py-2 text-xs font-medium tracking-wider uppercase rounded-full border"
                          style={{
                            color: '#555',
                            borderColor: '#D8D3CC',
                            backgroundColor: '#F5F2EE',
                            fontWeight: '500',
                            letterSpacing: '0.12em',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </motion.div>
            ))
          )}
        </div>

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
            style={{ color: '#111111' }}
          >
            Want results like these? Let&apos;s talk →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
