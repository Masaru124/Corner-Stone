'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

type Resource = {
  id: number
  title: string
  slug: string
  description: string
  content: string
  category: string
  read_time: string
  image_url: string | null
  featured: boolean
  hidden: boolean
  created_at: string
  updated_at: string
}

export default function ResourcesFilter({ resources }: { resources: Resource[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = useMemo(() => {
    const cats = [...new Set(resources.map((r) => r.category))]
    return ['All', ...cats]
  }, [resources])

  const filteredResources = useMemo(() => {
    if (selectedCategory === 'All') return resources
    return resources.filter((r) => r.category === selectedCategory)
  }, [resources, selectedCategory])

  const featuredResources = filteredResources.filter((r) => r.featured)
  const regularResources = filteredResources.filter((r) => !r.featured)

  return (
    <div>
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-colors border hover:shadow-md"
            style={{
              borderColor: '#D8D3CC',
              backgroundColor: category === selectedCategory ? '#1F5144' : 'white',
              color: category === selectedCategory ? 'white' : '#1F5144',
            }}
          >
            {category}
          </button>
        ))}
      </div>

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
            {selectedCategory === 'All' ? 'All Resources' : `${selectedCategory} Resources`}
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
          {filteredResources.length === 0 && (
            <p className="text-center" style={{ color: '#666' }}>
              No resources available in this category.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
