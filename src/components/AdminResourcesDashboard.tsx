'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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

type EditDraft = {
  title: string
  slug: string
  description: string
  content: string
  category: string
  readTime: string
  imageUrl: string
  featured: boolean
}

const categories = ['Branding', 'Social Media', 'Web Design', 'SEO', 'Templates', 'General']

export default function AdminResourcesDashboard() {
  const router = useRouter()

  const [resources, setResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('General')
  const [readTime, setReadTime] = useState('5 min read')
  const [imageUrl, setImageUrl] = useState('')
  const [featured, setFeatured] = useState(false)

  const [editingResourceId, setEditingResourceId] = useState<number | null>(null)
  const [editDraft, setEditDraft] = useState<EditDraft | null>(null)

  async function loadResources() {
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/resources')
      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to load resources')
      }

      setResources(result.resources)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to load resources')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadResources()
  }, [])

  function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(value))
    }
  }

  async function handleCreateResource(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim() || !description.trim() || !content.trim() || !category.trim()) {
      setMessage('Title, description, content, and category are required')
      return
    }

    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim() || generateSlug(title),
          description: description.trim(),
          content: content.trim(),
          category: category.trim(),
          readTime: readTime.trim() || '5 min read',
          imageUrl: imageUrl.trim() || null,
          featured,
        }),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to create resource')
      }

      setTitle('')
      setSlug('')
      setDescription('')
      setContent('')
      setCategory('General')
      setReadTime('5 min read')
      setImageUrl('')
      setFeatured(false)

      setMessage('Resource created successfully')
      await loadResources()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to create resource')
    } finally {
      setIsSubmitting(false)
    }
  }

  function beginEdit(resource: Resource) {
    setEditingResourceId(resource.id)
    setEditDraft({
      title: resource.title,
      slug: resource.slug,
      description: resource.description,
      content: resource.content,
      category: resource.category,
      readTime: resource.read_time,
      imageUrl: resource.image_url || '',
      featured: resource.featured,
    })
  }

  function cancelEdit() {
    setEditingResourceId(null)
    setEditDraft(null)
  }

  async function saveEdit(resource: Resource) {
    if (!editDraft) {
      return
    }

    if (!editDraft.title.trim() || !editDraft.description.trim() || !editDraft.content.trim() || !editDraft.category.trim()) {
      setMessage('Title, description, content, and category are required')
      return
    }

    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch(`/api/admin/resources/${resource.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editDraft.title.trim(),
          slug: editDraft.slug.trim(),
          description: editDraft.description.trim(),
          content: editDraft.content.trim(),
          category: editDraft.category.trim(),
          readTime: editDraft.readTime.trim(),
          imageUrl: editDraft.imageUrl.trim() || null,
          featured: editDraft.featured,
        }),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to update resource')
      }

      setResources((current) => current.map((item) => (item.id === resource.id ? result.resource : item)))
      cancelEdit()
      setMessage('Resource updated successfully')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to update resource')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleToggleVisibility(resource: Resource) {
    setMessage('')

    try {
      const response = await fetch(`/api/admin/resources/${resource.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hidden: !resource.hidden }),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to update resource visibility')
      }

      setResources((current) => current.map((item) => (item.id === resource.id ? result.resource : item)))
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to update resource visibility')
    }
  }

  async function handleDeleteResource(resourceId: number) {
    setMessage('')

    try {
      const response = await fetch(`/api/admin/resources/${resourceId}`, {
        method: 'DELETE',
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to delete resource')
      }

      setResources((current) => current.filter((item) => item.id !== resourceId))
      if (editingResourceId === resourceId) {
        cancelEdit()
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to delete resource')
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
    router.refresh()
  }

  return (
    <main className="min-h-screen px-4 sm:px-6 py-6 sm:py-12" style={{ backgroundColor: '#F8F8F6' }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif" style={{ color: '#1F5144' }}>
              Admin Dashboard - Resources
            </h1>
            <p className="text-sm" style={{ color: '#4A4A4A' }}>
              Manage resources and guides.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard')}
              className="w-full sm:w-auto rounded-lg px-4 py-2 text-white"
              style={{ backgroundColor: '#375A7F' }}
            >
              Portfolio
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full sm:w-auto rounded-lg px-4 py-2 text-white"
              style={{ backgroundColor: '#1F5144' }}
            >
              Logout
            </button>
          </div>
        </div>

        <section className="bg-white rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-xl font-serif mb-4" style={{ color: '#1F5144' }}>
            Add Resource
          </h2>

          <form className="space-y-4" onSubmit={handleCreateResource}>
            <input 
              type="text" 
              value={title} 
              onChange={(event) => handleTitleChange(event.target.value)} 
              className="w-full border rounded-lg px-3 py-2" 
              style={{ borderColor: '#D0D0D0' }} 
              placeholder="Title" 
              required 
            />
            <input 
              type="text" 
              value={slug} 
              onChange={(event) => setSlug(event.target.value)} 
              className="w-full border rounded-lg px-3 py-2" 
              style={{ borderColor: '#D0D0D0' }} 
              placeholder="Slug (URL-friendly name, auto-generated from title)" 
            />
            <textarea 
              value={description} 
              onChange={(event) => setDescription(event.target.value)} 
              className="w-full border rounded-lg px-3 py-2 min-h-20" 
              style={{ borderColor: '#D0D0D0' }} 
              placeholder="Short description for listings" 
              required 
            />
            <textarea 
              value={content} 
              onChange={(event) => setContent(event.target.value)} 
              className="w-full border rounded-lg px-3 py-2 min-h-40 font-mono text-sm" 
              style={{ borderColor: '#D0D0D0' }} 
              placeholder="Full content (supports HTML/markdown)" 
              required 
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select 
                value={category} 
                onChange={(event) => setCategory(event.target.value)} 
                className="w-full border rounded-lg px-3 py-2" 
                style={{ borderColor: '#D0D0D0' }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input 
                type="text" 
                value={readTime} 
                onChange={(event) => setReadTime(event.target.value)} 
                className="w-full border rounded-lg px-3 py-2" 
                style={{ borderColor: '#D0D0D0' }} 
                placeholder="Read time (e.g., 5 min read)" 
              />
            </div>
            <input 
              type="text" 
              value={imageUrl} 
              onChange={(event) => setImageUrl(event.target.value)} 
              className="w-full border rounded-lg px-3 py-2" 
              style={{ borderColor: '#D0D0D0' }} 
              placeholder="Image URL (optional)" 
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(event) => setFeatured(event.target.checked)}
                className="rounded"
              />
              <label htmlFor="featured" className="text-sm" style={{ color: '#4A4A4A' }}>
                Featured resource (shown prominently)
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full sm:w-auto rounded-lg px-5 py-2.5 text-white disabled:opacity-60" 
              style={{ backgroundColor: '#1F5144' }}
            >
              {isSubmitting ? 'Saving...' : 'Add Resource'}
            </button>
          </form>

          {message ? <p className="text-sm mt-3" style={{ color: '#4A4A4A' }}>{message}</p> : null}
        </section>

        <section className="bg-white rounded-2xl p-4 sm:p-6">
          <h2 className="text-xl font-serif mb-4" style={{ color: '#1F5144' }}>
            Resources
          </h2>

          {isLoading ? (
            <p className="text-sm" style={{ color: '#4A4A4A' }}>Loading resources...</p>
          ) : resources.length === 0 ? (
            <p className="text-sm" style={{ color: '#4A4A4A' }}>No resources yet.</p>
          ) : (
            <div className="space-y-4">
              {resources.map((resource) => {
                const isEditing = editingResourceId === resource.id && editDraft

                return (
                  <article key={resource.id} className="border rounded-xl p-3 sm:p-4" style={{ borderColor: '#E7E7E7' }}>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-serif" style={{ color: '#1F5144' }}>{resource.title}</h3>
                          <p className="text-sm" style={{ color: '#4A4A4A' }}>
                            /resources/{resource.slug} • {resource.category}
                          </p>
                        </div>

                        <div className="flex w-full sm:w-auto flex-wrap items-center gap-2">
                          <button 
                            type="button" 
                            onClick={() => handleToggleVisibility(resource)} 
                            className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-sm text-white" 
                            style={{ backgroundColor: resource.hidden ? '#8D6E63' : '#1F5144' }}
                          >
                            {resource.hidden ? 'Unhide' : 'Hide'}
                          </button>
                          <button 
                            type="button" 
                            onClick={() => (isEditing ? cancelEdit() : beginEdit(resource))} 
                            className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-sm text-white" 
                            style={{ backgroundColor: '#375A7F' }}
                          >
                            {isEditing ? 'Cancel Edit' : 'Edit'}
                          </button>
                          <button 
                            type="button" 
                            onClick={() => handleDeleteResource(resource.id)} 
                            className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-sm text-white" 
                            style={{ backgroundColor: '#7A2323' }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      {isEditing ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={editDraft.title}
                            onChange={(event) => setEditDraft({ ...editDraft, title: event.target.value })}
                            className="w-full border rounded-lg px-3 py-2"
                            style={{ borderColor: '#D0D0D0' }}
                            placeholder="Title"
                          />
                          <input
                            type="text"
                            value={editDraft.slug}
                            onChange={(event) => setEditDraft({ ...editDraft, slug: event.target.value })}
                            className="w-full border rounded-lg px-3 py-2"
                            style={{ borderColor: '#D0D0D0' }}
                            placeholder="Slug"
                          />
                          <textarea
                            value={editDraft.description}
                            onChange={(event) => setEditDraft({ ...editDraft, description: event.target.value })}
                            className="w-full border rounded-lg px-3 py-2 min-h-20"
                            style={{ borderColor: '#D0D0D0' }}
                            placeholder="Description"
                          />
                          <textarea
                            value={editDraft.content}
                            onChange={(event) => setEditDraft({ ...editDraft, content: event.target.value })}
                            className="w-full border rounded-lg px-3 py-2 min-h-40 font-mono text-sm"
                            style={{ borderColor: '#D0D0D0' }}
                            placeholder="Content"
                          />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <select
                              value={editDraft.category}
                              onChange={(event) => setEditDraft({ ...editDraft, category: event.target.value })}
                              className="w-full border rounded-lg px-3 py-2"
                              style={{ borderColor: '#D0D0D0' }}
                            >
                              {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                            <input
                              type="text"
                              value={editDraft.readTime}
                              onChange={(event) => setEditDraft({ ...editDraft, readTime: event.target.value })}
                              className="w-full border rounded-lg px-3 py-2"
                              style={{ borderColor: '#D0D0D0' }}
                              placeholder="Read time"
                            />
                          </div>
                          <input
                            type="text"
                            value={editDraft.imageUrl}
                            onChange={(event) => setEditDraft({ ...editDraft, imageUrl: event.target.value })}
                            className="w-full border rounded-lg px-3 py-2"
                            style={{ borderColor: '#D0D0D0' }}
                            placeholder="Image URL"
                          />
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`featured-${resource.id}`}
                              checked={editDraft.featured}
                              onChange={(event) => setEditDraft({ ...editDraft, featured: event.target.checked })}
                              className="rounded"
                            />
                            <label htmlFor={`featured-${resource.id}`} className="text-sm" style={{ color: '#4A4A4A' }}>
                              Featured
                            </label>
                          </div>
                          <button
                            type="button"
                            onClick={() => saveEdit(resource)}
                            disabled={isSubmitting}
                            className="w-full sm:w-auto px-4 py-2 rounded-lg text-white disabled:opacity-60"
                            style={{ backgroundColor: '#1F5144' }}
                          >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm" style={{ color: '#4A4A4A' }}>{resource.description}</p>
                          {resource.featured && (
                            <span className="inline-block px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                          <p className="text-xs wrap-break-word" style={{ color: '#777' }}>
                            Status: {resource.hidden ? 'Hidden' : 'Visible'} • Created {new Date(resource.created_at).toLocaleString()}
                          </p>
                        </>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
