import { useState, useEffect } from 'react'
import './Admin.css'

// Dummy initial blogs data
const initialBlogs = [
  {
    id: 1,
    title: 'Is 2026 the Right Time to Invest in Indian Real Estate?',
    content: 'Explore market trends, government policies, and expert predictions to make informed investment decisions.',
    category: 'Investment',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Top 7 Mistakes First-Time Home Buyers Make in India',
    content: 'Avoid common pitfalls and make your first property purchase smooth and successful with these expert tips.',
    category: 'Buy',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
    createdAt: '2024-01-10'
  },
  {
    id: 3,
    title: 'RERA Act: Complete Guide for Property Buyers',
    content: 'Understand how RERA protects your interests and what you need to know before buying property.',
    category: 'Legal',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    createdAt: '2024-01-05'
  }
]

const categories = ['Buy', 'Rent', 'Investment', 'Legal', 'Tips', 'News']

function Admin() {
  const [blogs, setBlogs] = useState(initialBlogs)
  const [editingBlog, setEditingBlog] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Buy',
    image: ''
  })

  useEffect(() => {
    document.title = 'Admin Panel - Blog Management'
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Create a local URL for preview (in real app, this would upload to server)
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingBlog) {
      // Update existing blog
      setBlogs(blogs.map(blog => 
        blog.id === editingBlog.id 
          ? { ...formData, id: editingBlog.id, createdAt: editingBlog.createdAt }
          : blog
      ))
      alert('Blog updated successfully!')
    } else {
      // Create new blog
      const newBlog = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setBlogs([...blogs, newBlog])
      alert('Blog created successfully!')
    }

    // Reset form
    setFormData({
      title: '',
      content: '',
      category: 'Buy',
      image: ''
    })
    setEditingBlog(null)
  }

  const handleEdit = (blog) => {
    setEditingBlog(blog)
    setFormData({
      title: blog.title,
      content: blog.content,
      category: blog.category,
      image: blog.image
    })
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(blogs.filter(blog => blog.id !== id))
      if (editingBlog && editingBlog.id === id) {
        setEditingBlog(null)
        setFormData({
          title: '',
          content: '',
          category: 'Buy',
          image: ''
        })
      }
      alert('Blog deleted successfully!')
    }
  }

  const handleCancel = () => {
    setEditingBlog(null)
    setFormData({
      title: '',
      content: '',
      category: 'Buy',
      image: ''
    })
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Blog Management Panel</h1>
        <p className="admin-subtitle">Create, edit, and manage your blog posts</p>
      </div>

      <div className="admin-content">
        {/* Blog Form Section */}
        <section className="admin-form-section">
          <div className="admin-form-panel">
            <h2 className="admin-form-title">
              {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>
            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title" className="form-label">Title</label>
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
                <label htmlFor="content" className="form-label">Content</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Enter blog content"
                  rows="6"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category" className="form-label">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="image" className="form-label">Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-file-input"
                />
                {formData.image && (
                  <div className="image-preview">
                    <img src={formData.image} alt="Preview" />
                  </div>
                )}
                {!formData.image && (
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Or enter image URL"
                  />
                )}
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingBlog ? 'Update Blog' : 'Create Blog'}
                </button>
                {editingBlog && (
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* Blog List Section */}
        <section className="admin-list-section">
          <div className="admin-list-header">
            <h2 className="admin-list-title">All Blog Posts ({blogs.length})</h2>
          </div>

          {blogs.length === 0 ? (
            <div className="empty-state">
              <p>No blogs found. Create your first blog post!</p>
            </div>
          ) : (
            <div className="admin-blog-list">
              {blogs.map(blog => (
                <div key={blog.id} className="admin-blog-card">
                  <div className="admin-blog-image">
                    <img src={blog.image || 'https://via.placeholder.com/300x200'} alt={blog.title} />
                  </div>
                  <div className="admin-blog-content">
                    <div className="admin-blog-header">
                      <span className="admin-blog-category">{blog.category}</span>
                      <span className="admin-blog-date">{blog.createdAt}</span>
                    </div>
                    <h3 className="admin-blog-title">{blog.title}</h3>
                    <p className="admin-blog-excerpt">{blog.content}</p>
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
