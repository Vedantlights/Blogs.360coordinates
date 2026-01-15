import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import BlogCard from '../components/BlogCard'
import { blogAPI } from '../services/api'
import './Buy.css'

function Buy() {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await blogAPI.getAll({ category: 'buy', per_page: 20 })
      if (response.success) {
        setBlogPosts(response.data.map(blog => ({
          image: blog.image_url || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
          tag: blog.category_name || "Buy",
          title: blog.title,
          description: blog.excerpt || '',
          link: `/post/${blog.slug}`
        })))
      }
    } catch (err) {
      console.error('Error fetching blogs:', err)
      setError(err.message || 'Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Hero 
        title="Buy Property in India"
        subtitle="Complete guides and expert advice for property buyers"
      />
      <Categories />
      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Loading blogs...</p>
        </div>
      ) : error ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Error: {error}</p>
        </div>
      ) : (
        <section className="blog-grid">
          {blogPosts.length > 0 ? (
            blogPosts.map((post, index) => (
              <BlogCard
                key={index}
                image={post.image}
                tag={post.tag}
                title={post.title}
                description={post.description}
                link={post.link}
              />
            ))
          ) : (
            <p style={{ padding: '2rem', textAlign: 'center' }}>No blogs found in this category.</p>
          )}
        </section>
      )}
    </>
  )
}

export default Buy

