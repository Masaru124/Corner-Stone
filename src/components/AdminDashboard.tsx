'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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
  created_at: string
}

type SignatureResponse = {
  success: boolean
  cloudName?: string
  apiKey?: string
  timestamp?: number
  signature?: string
  folder?: string
  error?: string
}

type EditDraft = {
  title: string
  type: string
  description: string
  tagsInput: string
  imageFit: 'contain' | 'cover'
  imageSize: 'small' | 'medium' | 'large'
  imageColumns: 'auto' | '1' | '2' | '3'
  existingImages: string[]
  newImages: File[]
}

function tagsToInput(tags: string[]) {
  return tags.join(', ')
}

function inputToTags(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function getColumnsClass(imageCount: number, overrideColumns: number | null) {
  if (overrideColumns === 1) {
    return 'grid-cols-1'
  }

  if (overrideColumns === 2) {
    return 'grid-cols-1 sm:grid-cols-2'
  }

  if (overrideColumns === 3) {
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

function getSizeHeightClass(size: 'small' | 'medium' | 'large') {
  if (size === 'small') {
    return 'h-40'
  }

  if (size === 'large') {
    return 'h-80'
  }

  return 'h-56'
}

export default function AdminDashboard() {
  const router = useRouter()

  const [posts, setPosts] = useState<PortfolioPost[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const [title, setTitle] = useState('')
  const [postType, setPostType] = useState('')
  const [description, setDescription] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [imageFit, setImageFit] = useState<'contain' | 'cover'>('contain')
  const [imageSize, setImageSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [imageColumns, setImageColumns] = useState<'auto' | '1' | '2' | '3'>('auto')
  const createImageInputRef = useRef<HTMLInputElement | null>(null)

  const [editingPostId, setEditingPostId] = useState<number | null>(null)
  const [editDraft, setEditDraft] = useState<EditDraft | null>(null)
  const editImageInputRef = useRef<HTMLInputElement | null>(null)

  async function loadPosts() {
    setIsLoadingPosts(true)

    try {
      const response = await fetch('/api/admin/posts')
      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to load posts')
      }

      setPosts(result.posts)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to load posts')
    } finally {
      setIsLoadingPosts(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  async function uploadImagesToCloudinary(files: File[]): Promise<string[]> {
    if (files.length === 0) {
      return []
    }

    const signatureResponse = await fetch('/api/admin/cloudinary-signature', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ folder: 'corner-stone/posts' }),
    })

    const signatureResult = (await signatureResponse.json()) as SignatureResponse
    if (
      !signatureResponse.ok ||
      !signatureResult.success ||
      !signatureResult.cloudName ||
      !signatureResult.apiKey ||
      !signatureResult.timestamp ||
      !signatureResult.signature ||
      !signatureResult.folder
    ) {
      throw new Error(signatureResult.error || 'Failed to generate upload signature')
    }

    const uploadedUrls: string[] = []

    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('api_key', signatureResult.apiKey)
      formData.append('timestamp', String(signatureResult.timestamp))
      formData.append('signature', signatureResult.signature)
      formData.append('folder', signatureResult.folder)

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${signatureResult.cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      const uploadResult = (await uploadResponse.json()) as {
        secure_url?: string
        error?: { message?: string }
      }

      if (!uploadResponse.ok) {
        throw new Error(uploadResult.error?.message || `Image upload failed (${uploadResponse.status})`)
      }

      if (uploadResult.secure_url) {
        uploadedUrls.push(uploadResult.secure_url)
      }
    }

    return uploadedUrls
  }

  async function handleCreatePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim() || !postType.trim() || !description.trim()) {
      setMessage('Title, type, and description are required')
      return
    }

    setIsSubmitting(true)
    setMessage('')

    try {
      const uploadedImageUrls = await uploadImagesToCloudinary(selectedImages)
      const tags = inputToTags(tagsInput)

      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          type: postType.trim(),
          description: description.trim(),
          tags,
          images: uploadedImageUrls,
          imageFit,
          imageSize,
          imageColumns: imageColumns === 'auto' ? null : Number(imageColumns),
        }),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to create post')
      }

      setTitle('')
      setPostType('')
      setDescription('')
      setTagsInput('')
      setSelectedImages([])
      setImageFit('contain')
      setImageSize('medium')
      setImageColumns('auto')
      if (createImageInputRef.current) {
        createImageInputRef.current.value = ''
      }

      setMessage('Post created successfully')
      await loadPosts()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to create post')
    } finally {
      setIsSubmitting(false)
    }
  }

  function beginEdit(post: PortfolioPost) {
    setEditingPostId(post.id)
    setEditDraft({
      title: post.title,
      type: post.type,
      description: post.description,
      tagsInput: tagsToInput(post.tags),
      imageFit: post.image_fit,
      imageSize: post.image_size,
      imageColumns: post.image_columns ? String(post.image_columns) as '1' | '2' | '3' : 'auto',
      existingImages: [...post.images],
      newImages: [],
    })
  }

  function cancelEdit() {
    setEditingPostId(null)
    setEditDraft(null)
    if (editImageInputRef.current) {
      editImageInputRef.current.value = ''
    }
  }

  async function saveEdit(post: PortfolioPost) {
    if (!editDraft) {
      return
    }

    if (!editDraft.title.trim() || !editDraft.type.trim() || !editDraft.description.trim()) {
      setMessage('Title, type, and description are required')
      return
    }

    setIsSubmitting(true)
    setMessage('')

    try {
      const newUploadedImages = await uploadImagesToCloudinary(editDraft.newImages)
      const mergedImages = [...editDraft.existingImages, ...newUploadedImages]

      const response = await fetch(`/api/admin/posts/${post.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editDraft.title.trim(),
          type: editDraft.type.trim(),
          description: editDraft.description.trim(),
          tags: inputToTags(editDraft.tagsInput),
          images: mergedImages,
          imageFit: editDraft.imageFit,
          imageSize: editDraft.imageSize,
          imageColumns: editDraft.imageColumns === 'auto' ? null : Number(editDraft.imageColumns),
        }),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to update post')
      }

      setPosts((current) => current.map((item) => (item.id === post.id ? result.post : item)))
      cancelEdit()
      setMessage('Post updated successfully')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to update post')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleTogglePostVisibility(post: PortfolioPost) {
    setMessage('')

    try {
      const response = await fetch(`/api/admin/posts/${post.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hidden: !post.hidden }),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to update post visibility')
      }

      setPosts((current) => current.map((item) => (item.id === post.id ? result.post : item)))
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to update post visibility')
    }
  }

  async function handleDeletePost(postId: number) {
    setMessage('')

    try {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: 'DELETE',
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to delete post')
      }

      setPosts((current) => current.filter((item) => item.id !== postId))
      if (editingPostId === postId) {
        cancelEdit()
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to delete post')
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
              Admin Dashboard
            </h1>
            <p className="text-sm" style={{ color: '#4A4A4A' }}>
              Add, edit, hide, and delete portfolio posts.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full sm:w-auto rounded-lg px-4 py-2 text-white"
            style={{ backgroundColor: '#1F5144' }}
          >
            Logout
          </button>
        </div>

        <section className="bg-white rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-xl font-serif mb-4" style={{ color: '#1F5144' }}>
            Add Post
          </h2>

          <form className="space-y-4" onSubmit={handleCreatePost}>
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} className="w-full border rounded-lg px-3 py-2" style={{ borderColor: '#D0D0D0' }} placeholder="Title" required />
            <input type="text" value={postType} onChange={(event) => setPostType(event.target.value)} className="w-full border rounded-lg px-3 py-2" style={{ borderColor: '#D0D0D0' }} placeholder="Type" required />
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} className="w-full border rounded-lg px-3 py-2 min-h-28" style={{ borderColor: '#D0D0D0' }} placeholder="Description" required />
            <input type="text" value={tagsInput} onChange={(event) => setTagsInput(event.target.value)} className="w-full border rounded-lg px-3 py-2" style={{ borderColor: '#D0D0D0' }} placeholder="Tags: comma separated" />

            <input ref={createImageInputRef} type="file" accept="image/*" multiple onChange={(event) => setSelectedImages(Array.from(event.target.files || []))} className="block w-full text-sm" />
            {selectedImages.length > 0 ? (
              <p className="text-sm wrap-break-word" style={{ color: '#4A4A4A' }}>
                Selected: {selectedImages.map((file) => file.name).join(', ')}
              </p>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select value={imageFit} onChange={(event) => setImageFit(event.target.value as 'contain' | 'cover')} className="w-full border rounded-lg px-3 py-2" style={{ borderColor: '#D0D0D0' }}>
                <option value="contain">Image Fit: Contain</option>
                <option value="cover">Image Fit: Cover</option>
              </select>
              <select value={imageSize} onChange={(event) => setImageSize(event.target.value as 'small' | 'medium' | 'large')} className="w-full border rounded-lg px-3 py-2" style={{ borderColor: '#D0D0D0' }}>
                <option value="small">Image Size: Small</option>
                <option value="medium">Image Size: Medium</option>
                <option value="large">Image Size: Large</option>
              </select>
              <select value={imageColumns} onChange={(event) => setImageColumns(event.target.value as 'auto' | '1' | '2' | '3')} className="w-full border rounded-lg px-3 py-2" style={{ borderColor: '#D0D0D0' }}>
                <option value="auto">Columns: Auto</option>
                <option value="1">Columns: 1</option>
                <option value="2">Columns: 2</option>
                <option value="3">Columns: 3</option>
              </select>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto rounded-lg px-5 py-2.5 text-white disabled:opacity-60" style={{ backgroundColor: '#1F5144' }}>
              {isSubmitting ? 'Saving...' : 'Add Post'}
            </button>
          </form>

          {message ? <p className="text-sm mt-3" style={{ color: '#4A4A4A' }}>{message}</p> : null}
        </section>

        <section className="bg-white rounded-2xl p-4 sm:p-6">
          <h2 className="text-xl font-serif mb-4" style={{ color: '#1F5144' }}>
            Posts
          </h2>

          {isLoadingPosts ? (
            <p className="text-sm" style={{ color: '#4A4A4A' }}>Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-sm" style={{ color: '#4A4A4A' }}>No posts yet.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => {
                const isEditing = editingPostId === post.id && editDraft

                return (
                  <article key={post.id} className="border rounded-xl p-3 sm:p-4" style={{ borderColor: '#E7E7E7' }}>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-serif" style={{ color: '#1F5144' }}>{post.title}</h3>
                          <p className="text-sm" style={{ color: '#4A4A4A' }}>{post.type}</p>
                        </div>

                        <div className="flex w-full sm:w-auto flex-wrap items-center gap-2">
                          <button type="button" onClick={() => handleTogglePostVisibility(post)} className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-sm text-white" style={{ backgroundColor: post.hidden ? '#8D6E63' : '#1F5144' }}>
                            {post.hidden ? 'Unhide' : 'Hide'}
                          </button>
                          <button type="button" onClick={() => (isEditing ? cancelEdit() : beginEdit(post))} className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-sm text-white" style={{ backgroundColor: '#375A7F' }}>
                            {isEditing ? 'Cancel Edit' : 'Edit'}
                          </button>
                          <button type="button" onClick={() => handleDeletePost(post.id)} className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-sm text-white" style={{ backgroundColor: '#7A2323' }}>
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
                            value={editDraft.type}
                            onChange={(event) => setEditDraft({ ...editDraft, type: event.target.value })}
                            className="w-full border rounded-lg px-3 py-2"
                            style={{ borderColor: '#D0D0D0' }}
                            placeholder="Type"
                          />
                          <textarea
                            value={editDraft.description}
                            onChange={(event) => setEditDraft({ ...editDraft, description: event.target.value })}
                            className="w-full border rounded-lg px-3 py-2 min-h-28"
                            style={{ borderColor: '#D0D0D0' }}
                            placeholder="Description"
                          />
                          <input
                            type="text"
                            value={editDraft.tagsInput}
                            onChange={(event) => setEditDraft({ ...editDraft, tagsInput: event.target.value })}
                            className="w-full border rounded-lg px-3 py-2"
                            style={{ borderColor: '#D0D0D0' }}
                            placeholder="Tags: comma separated"
                          />

                          {editDraft.existingImages.length > 0 ? (
                            <div className="space-y-2">
                              <p className="text-sm" style={{ color: '#4A4A4A' }}>Current Images</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {editDraft.existingImages.map((url, index) => (
                                  <div key={`${post.id}-edit-image-${index}`} className="relative h-40 rounded-lg overflow-hidden border" style={{ borderColor: '#D8D3CC' }}>
                                    <Image src={url} alt={`Existing image ${index + 1}`} fill className="object-contain" sizes="(max-width: 640px) 100vw, 50vw" />
                                    <button
                                      type="button"
                                      onClick={() => setEditDraft({
                                        ...editDraft,
                                        existingImages: editDraft.existingImages.filter((_, imageIndex) => imageIndex !== index),
                                      })}
                                      className="absolute top-2 right-2 text-xs px-2 py-1 rounded text-white"
                                      style={{ backgroundColor: '#7A2323' }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}

                          <div>
                            <input
                              ref={editImageInputRef}
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(event) =>
                                setEditDraft({
                                  ...editDraft,
                                  newImages: Array.from(event.target.files || []),
                                })
                              }
                              className="block w-full text-sm"
                            />
                            {editDraft.newImages.length > 0 ? (
                              <p className="text-sm mt-2 wrap-break-word" style={{ color: '#4A4A4A' }}>
                                New images to add: {editDraft.newImages.map((file) => file.name).join(', ')}
                              </p>
                            ) : null}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <select value={editDraft.imageFit} onChange={(event) => setEditDraft({ ...editDraft, imageFit: event.target.value as 'contain' | 'cover' })} className="w-full border rounded-lg px-3 py-2" style={{ borderColor: '#D0D0D0' }}>
                              <option value="contain">Image Fit: Contain</option>
                              <option value="cover">Image Fit: Cover</option>
                            </select>
                            <select value={editDraft.imageSize} onChange={(event) => setEditDraft({ ...editDraft, imageSize: event.target.value as 'small' | 'medium' | 'large' })} className="w-full border rounded-lg px-3 py-2" style={{ borderColor: '#D0D0D0' }}>
                              <option value="small">Image Size: Small</option>
                              <option value="medium">Image Size: Medium</option>
                              <option value="large">Image Size: Large</option>
                            </select>
                            <select value={editDraft.imageColumns} onChange={(event) => setEditDraft({ ...editDraft, imageColumns: event.target.value as 'auto' | '1' | '2' | '3' })} className="w-full border rounded-lg px-3 py-2" style={{ borderColor: '#D0D0D0' }}>
                              <option value="auto">Columns: Auto</option>
                              <option value="1">Columns: 1</option>
                              <option value="2">Columns: 2</option>
                              <option value="3">Columns: 3</option>
                            </select>
                          </div>

                          <button
                            type="button"
                            onClick={() => saveEdit(post)}
                            disabled={isSubmitting}
                            className="w-full sm:w-auto px-4 py-2 rounded-lg text-white disabled:opacity-60"
                            style={{ backgroundColor: '#1F5144' }}
                          >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm" style={{ color: '#4A4A4A' }}>{post.description}</p>

                          {post.images.length > 0 ? (
                            <div className={`grid gap-3 ${getColumnsClass(post.images.length, post.image_columns ?? null)}`}>
                              {post.images.map((url, index) => (
                                <div key={`${post.id}-${index}`} className={`relative w-full ${getSizeHeightClass(post.image_size)} bg-gray-100 rounded-lg overflow-hidden`}>
                                  <Image
                                    src={url}
                                    alt={`${post.title} image ${index + 1}`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className={post.image_fit === 'cover' ? 'object-cover' : 'object-contain'}
                                  />
                                </div>
                              ))}
                            </div>
                          ) : null}

                          {post.tags.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {post.tags.map((tag) => (
                                <span key={`${post.id}-${tag}`} className="px-3 py-1 text-xs rounded-full border" style={{ borderColor: '#D8D3CC', color: '#555', backgroundColor: '#F5F2EE' }}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          ) : null}

                          <p className="text-xs wrap-break-word" style={{ color: '#777' }}>
                            Status: {post.hidden ? 'Hidden' : 'Visible'} • Created {new Date(post.created_at).toLocaleString()}
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
