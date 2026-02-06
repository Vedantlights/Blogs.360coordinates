import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminAPI, categoryAPI, authAPI } from '../services/api'
import { API_BASE_URL } from '../config/api'
import './Admin.css'

function Admin() {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState([])
  const [editingBlog, setEditingBlog] = useState(null)
  const [editingCategory, setEditingCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submittingCategory, setSubmittingCategory] = useState(false)
  const [uploading, setUploading] = useState({ image: false, featured: false })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [username, setUsername] = useState('')
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    slug: '',
    icon: '',
    description: '',
    display_order: 0,
    is_active: true
  })
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category_id: '',
    image_url: '',
    featured_image: '',
    is_featured: false,
    is_published: false,
    meta_title: '',
    meta_description: '',
    meta_keywords: ''
  })
  const [imagePreview, setImagePreview] = useState({ image: null, featured: null })

  useEffect(() => {
    document.title = 'Admin Panel - Blog Management'
    const storedUsername = localStorage.getItem('admin_username')
    if (storedUsername) {
      setUsername(storedUsername)
    }
    fetchBlogs()
    fetchCategories()
  }, [])

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        await authAPI.logout()
        navigate('/vedantlights/login')
      } catch (err) {
        // Even if logout fails, clear local storage and redirect
        localStorage.removeItem('admin_authenticated')
        localStorage.removeItem('admin_username')
        navigate('/vedantlights/login')
      }
    }
  }


  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.blogs.getAll()
      if (response.success) {
        setBlogs(response.data || [])
      }
    } catch (err) {
      console.error('Error fetching blogs:', err)
      setError(err.message || 'Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await adminAPI.categories.getAll()
      if (response.success) {
        setCategories(response.data || [])
      }
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    
    // Auto-generate slug from title
    if (name === 'title' && !editingBlog) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }))
    }
    
    // Clear messages
    if (error) setError(null)
    if (success) setSuccess(null)
  }

  const handleImageUpload = async (e, type = 'image') => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.match('image.*')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    try {
      setUploading(prev => ({ ...prev, [type]: true }))
      setError(null)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(prev => ({ ...prev, [type]: reader.result }))
      }
      reader.readAsDataURL(file)

      // Upload file
      const response = await adminAPI.upload.image(file)
      
      if (response.success && response.data && response.data.url) {
        const fieldName = type === 'image' ? 'image_url' : 'featured_image'
        setFormData(prev => ({
          ...prev,
          [fieldName]: response.data.url
        }))
        setSuccess(`${type === 'image' ? 'Image' : 'Featured image'} uploaded successfully!`)
        setTimeout(() => setSuccess(null), 3000)
      } else {
        // Clear preview on failure
        setImagePreview(prev => ({ ...prev, [type]: null }))
        setError(response.message || 'Failed to upload image. Please try again or enter a URL manually.')
      }
    } catch (err) {
      console.error('Error uploading image:', err)
      // Clear preview on error
      setImagePreview(prev => ({ ...prev, [type]: null }))
      setError(err.message || 'Failed to upload image. Please try again or enter a URL manually.')
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }))
    }
  }

  const getImageUrl = (url) => {
    if (!url) return null
    // If it's already a full URL, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
    // If it's a relative path starting with /backend, construct full URL
    if (url.startsWith('/backend/')) {
      // Extract base URL from API_BASE_URL (e.g., https://blogs.360coordinates.com)
      const baseUrl = API_BASE_URL.replace('/backend/api', '')
      return baseUrl + url
    }
    // If it's a relative path starting with /, prepend base URL
    if (url.startsWith('/')) {
      const baseUrl = API_BASE_URL.replace('/api', '')
      return baseUrl + url
    }
    // If it's a relative path without leading slash, add it
    if (url.includes('uploads/')) {
      const baseUrl = API_BASE_URL.replace('/api', '')
      return baseUrl + '/' + url
    }
    return url
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      let response
      if (editingBlog) {
        // Update existing blog
        response = await adminAPI.blogs.update(editingBlog.id, formData)
      } else {
        // Create new blog
        response = await adminAPI.blogs.create(formData)
      }

      if (response.success) {
        setSuccess(editingBlog ? 'Blog updated successfully!' : 'Blog created successfully!')
        resetForm()
        fetchBlogs() // Refresh list
        setTimeout(() => setSuccess(null), 3000)
      } else {
        setError(response.message || 'Operation failed')
      }
    } catch (err) {
      console.error('Error saving blog:', err)
      setError(err.message || 'Failed to save blog')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (blog) => {
    setEditingBlog(blog)
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      content: blog.content || '',
      excerpt: blog.excerpt || '',
      category_id: blog.category_id || '',
      image_url: blog.image_url || '',
      featured_image: blog.featured_image || '',
      is_featured: blog.is_featured || false,
      is_published: blog.is_published || false,
      meta_title: blog.meta_title || '',
      meta_description: blog.meta_description || '',
      meta_keywords: blog.meta_keywords || ''
    })
    // Set preview images - ensure URLs are properly formatted
    const imageUrl = blog.image_url ? getImageUrl(blog.image_url) : null
    const featuredUrl = blog.featured_image ? getImageUrl(blog.featured_image) : null
    
    // Set preview immediately
    setImagePreview({
      image: imageUrl,
      featured: featuredUrl
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return
    }

    try {
      const response = await adminAPI.blogs.delete(id)
      if (response.success) {
        setSuccess('Blog deleted successfully!')
        if (editingBlog && editingBlog.id === id) {
          resetForm()
        }
        fetchBlogs() // Refresh list
        setTimeout(() => setSuccess(null), 3000)
      } else {
        setError(response.message || 'Failed to delete blog')
      }
    } catch (err) {
      console.error('Error deleting blog:', err)
      setError(err.message || 'Failed to delete blog')
    }
  }

  const resetForm = () => {
    setEditingBlog(null)
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      category_id: '',
      image_url: '',
      featured_image: '',
      is_featured: false,
      is_published: false,
      meta_title: '',
      meta_description: '',
      meta_keywords: ''
    })
    setImagePreview({ image: null, featured: null })
  }

  const handleCategoryInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setCategoryFormData({
      ...categoryFormData,
      [name]: type === 'checkbox' ? checked : value
    })
    
    // Auto-generate slug from name
    if (name === 'name' && !editingCategory) {
      setCategoryFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }))
    }
    
    // Clear messages
    if (error) setError(null)
    if (success) setSuccess(null)
  }

  const handleCategorySubmit = async (e) => {
    e.preventDefault()
    setSubmittingCategory(true)
    setError(null)
    setSuccess(null)

    try {
      let response
      if (editingCategory) {
        response = await adminAPI.categories.update(editingCategory.id, categoryFormData)
      } else {
        response = await adminAPI.categories.create(categoryFormData)
      }

      if (response.success) {
        setSuccess(editingCategory ? 'Category updated successfully!' : 'Category created successfully!')
        resetCategoryForm()
        fetchCategories() // Refresh list
        setTimeout(() => setSuccess(null), 3000)
      } else {
        setError(response.message || 'Operation failed')
      }
    } catch (err) {
      console.error('Error saving category:', err)
      setError(err.message || 'Failed to save category')
    } finally {
      setSubmittingCategory(false)
    }
  }

  const handleCategoryEdit = (category) => {
    setEditingCategory(category)
    setCategoryFormData({
      name: category.name || '',
      slug: category.slug || '',
      icon: category.icon || '',
      description: category.description || '',
      display_order: category.display_order || 0,
      is_active: category.is_active !== undefined ? category.is_active : true
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategoryDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return
    }

    try {
      const response = await adminAPI.categories.delete(id)
      if (response.success) {
        setSuccess('Category deleted successfully!')
        if (editingCategory && editingCategory.id === id) {
          resetCategoryForm()
        }
        fetchCategories() // Refresh list
        setTimeout(() => setSuccess(null), 3000)
      } else {
        setError(response.message || 'Failed to delete category')
      }
    } catch (err) {
      console.error('Error deleting category:', err)
      setError(err.message || 'Failed to delete category')
    }
  }

  const resetCategoryForm = () => {
    setEditingCategory(null)
    setCategoryFormData({
      name: '',
      slug: '',
      icon: '',
      description: '',
      display_order: 0,
      is_active: true
    })
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Blog Management Panel</h1>
          <p className="admin-subtitle">Create, edit, and manage your blog posts</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {username && (
            <span style={{ color: '#6B7280', fontSize: '0.9rem' }}>
              Welcome, <strong>{username}</strong>
            </span>
          )}
          <button 
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              background: '#CC0000',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="admin-content">
        {/* Blog Form Section */}
        <section className="admin-form-section">
          <div className="admin-form-panel">
            <h2 className="admin-form-title">
              {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>
            
            {success && (
              <div style={{ padding: '0.75rem', marginBottom: '1rem', backgroundColor: '#C7EEFF', color: '#0077C0', borderRadius: '4px' }}>
                {success}
              </div>
            )}
            
            {error && (
              <div style={{ padding: '0.75rem', marginBottom: '1rem', backgroundColor: '#FFE5E5', color: '#CC0000', borderRadius: '4px' }}>
                {error}
              </div>
            )}
            
            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title" className="form-label">Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter blog title"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="slug" className="form-label">Slug *</label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="blog-slug-url"
                  required
                />
                <small style={{ color: '#6B7280', fontSize: '0.875rem' }}>URL-friendly version of title</small>
              </div>

              <div className="form-group">
                <label htmlFor="content" className="form-label">Content *</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Enter blog content"
                  rows="8"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="excerpt" className="form-label">Excerpt</label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Short description (used in listings)"
                  rows="3"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_id" className="form-label">Category</label>
                <select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="image_upload" className="form-label">Blog Image</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input
                    type="file"
                    id="image_upload"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'image')}
                    disabled={uploading.image}
                    style={{ marginBottom: '0.5rem' }}
                  />
                  {uploading.image && <small>Uploading...</small>}
                  {(() => {
                    const previewUrl = imagePreview.image || (formData.image_url ? getImageUrl(formData.image_url) : null)
                    return previewUrl && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          style={{ maxWidth: '300px', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #E5E7EB' }}
                          onError={(e) => {
                            console.error('Image failed to load:', e.target.src)
                            e.target.style.display = 'none'
                          }}
                        />
                      </div>
                    )
                  })()}
                  <input
                    type="text"
                    id="image_url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Or enter image URL (optional)"
                    style={{ marginTop: '0.5rem' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="featured_image_upload" className="form-label">Featured Image</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input
                    type="file"
                    id="featured_image_upload"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'featured')}
                    disabled={uploading.featured}
                    style={{ marginBottom: '0.5rem' }}
                  />
                  {uploading.featured && <small>Uploading...</small>}
                  {(() => {
                    const previewUrl = imagePreview.featured || (formData.featured_image ? getImageUrl(formData.featured_image) : null)
                    return previewUrl && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          style={{ maxWidth: '300px', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #E5E7EB' }}
                          onError={(e) => {
                            console.error('Featured image failed to load:', e.target.src)
                            e.target.style.display = 'none'
                          }}
                        />
                      </div>
                    )
                  })()}
                  <input
                    type="text"
                    id="featured_image"
                    name="featured_image"
                    value={formData.featured_image}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Or enter featured image URL (optional)"
                    style={{ marginTop: '0.5rem' }}
                  />
                </div>
              </div>

              <div className="form-group" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleInputChange}
                  />
                  Featured
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleInputChange}
                  />
                  Published
                </label>
              </div>

              <div className="form-group">
                <label htmlFor="meta_title" className="form-label">SEO Title</label>
                <input
                  type="text"
                  id="meta_title"
                  name="meta_title"
                  value={formData.meta_title}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="SEO meta title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="meta_description" className="form-label">SEO Description</label>
                <textarea
                  id="meta_description"
                  name="meta_description"
                  value={formData.meta_description}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="SEO meta description"
                  rows="2"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="meta_keywords" className="form-label">SEO Keywords</label>
                <input
                  type="text"
                  id="meta_keywords"
                  name="meta_keywords"
                  value={formData.meta_keywords}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Saving...' : (editingBlog ? 'Update Blog' : 'Create Blog')}
                </button>
                {editingBlog && (
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={resetForm}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* Category Management Section */}
        <section className="admin-form-section">
          <div className="admin-form-panel">
            <h2 className="admin-form-title">
              {editingCategory ? 'Edit Category' : 'Create New Category'}
            </h2>
            
            <form className="admin-form" onSubmit={handleCategorySubmit}>
              <div className="form-group">
                <label htmlFor="category_name" className="form-label">Category Name *</label>
                <input
                  type="text"
                  id="category_name"
                  name="name"
                  value={categoryFormData.name}
                  onChange={handleCategoryInputChange}
                  className="form-input"
                  placeholder="e.g., Sell"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category_slug" className="form-label">Slug *</label>
                <input
                  type="text"
                  id="category_slug"
                  name="slug"
                  value={categoryFormData.slug}
                  onChange={handleCategoryInputChange}
                  className="form-input"
                  placeholder="sell"
                  required
                />
                <small style={{ color: '#6B7280', fontSize: '0.875rem' }}>URL-friendly version</small>
              </div>

              <div className="form-group">
                <label htmlFor="category_icon" className="form-label">Icon (Emoji)</label>
                <input
                  type="text"
                  id="category_icon"
                  name="icon"
                  value={categoryFormData.icon}
                  onChange={handleCategoryInputChange}
                  className="form-input"
                  placeholder="💰"
                  maxLength="10"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category_description" className="form-label">Description</label>
                <textarea
                  id="category_description"
                  name="description"
                  value={categoryFormData.description}
                  onChange={handleCategoryInputChange}
                  className="form-textarea"
                  placeholder="Complete guides for property sellers"
                  rows="2"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_display_order" className="form-label">Display Order</label>
                <input
                  type="number"
                  id="category_display_order"
                  name="display_order"
                  value={categoryFormData.display_order}
                  onChange={handleCategoryInputChange}
                  className="form-input"
                  placeholder="3"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={categoryFormData.is_active}
                    onChange={handleCategoryInputChange}
                  />
                  Active
                </label>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={submittingCategory}>
                  {submittingCategory ? 'Saving...' : (editingCategory ? 'Update Category' : 'Create Category')}
                </button>
                {editingCategory && (
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={resetCategoryForm}
                    disabled={submittingCategory}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* Category List Section */}
        <section className="admin-list-section">
          <div className="admin-list-header">
            <h2 className="admin-list-title">All Categories ({categories.length})</h2>
          </div>

          {categories.length === 0 ? (
            <div className="empty-state">
              <p>No categories found. Create your first category!</p>
            </div>
          ) : (
            <div className="admin-blog-list">
              {categories.map(category => (
                <div key={category.id} className="admin-blog-card">
                  <div className="admin-blog-content">
                    <div className="admin-blog-header">
                      <span className="admin-blog-category">
                        {category.icon && <span style={{ marginRight: '0.5rem' }}>{category.icon}</span>}
                        {category.name}
                      </span>
                      <span className="admin-blog-date">
                        Order: {category.display_order} • {category.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <h3 className="admin-blog-title">Slug: {category.slug}</h3>
                    {category.description && (
                      <p className="admin-blog-excerpt">{category.description}</p>
                    )}
                    <div className="admin-blog-actions">
                      <button 
                        className="btn btn-edit"
                        onClick={() => handleCategoryEdit(category)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-delete"
                        onClick={() => handleCategoryDelete(category.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Blog List Section */}
        <section className="admin-list-section">
          <div className="admin-list-header">
            <h2 className="admin-list-title">All Blog Posts ({blogs.length})</h2>
          </div>

          {loading ? (
            <div className="empty-state">
              <p>Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="empty-state">
              <p>No blogs found. Create your first blog post!</p>
            </div>
          ) : (
            <div className="admin-blog-list">
              {blogs.map(blog => (
                <div key={blog.id} className="admin-blog-card">
                  <div className="admin-blog-image">
                    <img src={blog.image_url || 'https://via.placeholder.com/300x200'} alt={blog.title} />
                  </div>
                  <div className="admin-blog-content">
                    <div className="admin-blog-header">
                      <span className="admin-blog-category">{blog.category_name || 'Uncategorized'}</span>
                      <span className="admin-blog-date">
                        {new Date(blog.created_at).toLocaleDateString()}
                        {blog.is_published ? ' • Published' : ' • Draft'}
                        {blog.is_featured && ' • Featured'}
                      </span>
                    </div>
                    <h3 className="admin-blog-title">{blog.title}</h3>
                    <p className="admin-blog-excerpt">{blog.excerpt || blog.content?.substring(0, 150)}...</p>
                    <div className="admin-blog-actions">
                      <button 
                        className="btn btn-edit"
                        onClick={() => handleEdit(blog)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-delete"
                        onClick={() => handleDelete(blog.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Admin
