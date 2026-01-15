import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { blogAPI } from '../services/api'
import './Post.css'

function Post() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (slug) {
      fetchBlog(slug)
    } else {
      // If no slug, show default content or redirect
      setLoading(false)
    }
  }, [slug])

  const fetchBlog = async (blogSlug) => {
    try {
      setLoading(true)
      setError(null)
      const response = await blogAPI.getBySlug(blogSlug)
      
      if (response.success && response.data) {
        setBlog(response.data)
        
        // Update page title and meta
        document.title = `${response.data.title} | IndiaPropertys Blog`
        const metaDescription = document.querySelector('meta[name="description"]')
        if (metaDescription) {
          metaDescription.setAttribute('content', response.data.meta_description || response.data.excerpt || '')
        } else {
          const meta = document.createElement('meta')
          meta.name = 'description'
          meta.content = response.data.meta_description || response.data.excerpt || ''
          document.getElementsByTagName('head')[0].appendChild(meta)
        }
      } else {
        setError('Blog not found')
      }
    } catch (err) {
      console.error('Error fetching blog:', err)
      setError(err.message || 'Failed to load blog')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading blog post...</p>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>{error || 'Blog not found'}</p>
        <button onClick={() => navigate('/blog')}>Back to Blog</button>
      </div>
    )
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <article className="post">
      <h1>{blog.title}</h1>
      <p className="meta">
        Category: {blog.category_name || 'General'} • {formatDate(blog.published_at)}
        {blog.views_count > 0 && ` • ${blog.views_count} views`}
      </p>

      {blog.image_url && (
        <img src={blog.image_url} alt={blog.title} />
      )}

      {blog.content && (
        <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }} />
      )}

      {!blog.content && blog.excerpt && (
        <p>{blog.excerpt}</p>
      )}
    </article>
  )
}

export default Post

