import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import BlogCategoryCard from '../components/BlogCategoryCard'
import FeaturedBlogCard from '../components/FeaturedBlogCard'
import BlogCard from '../components/BlogCard'
import BlogSidebar from '../components/BlogSidebar'
import CityWiseSection from '../components/CityWiseSection'
import BlogCTA from '../components/BlogCTA'
import { blogAPI, categoryAPI } from '../services/api'
import './Blog.css'

function Blog() {
  const [searchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category')
  
  const [featuredBlogs, setFeaturedBlogs] = useState([])
  const [latestBlogs, setLatestBlogs] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategoryData, setSelectedCategoryData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true)
      
      // Build query parameters
      const queryParams = { per_page: selectedCategory ? 20 : 9 }
      if (selectedCategory) {
        queryParams.category = selectedCategory
      }
      
      // Fetch featured blogs (only if no category is selected)
      if (!selectedCategory) {
        const featuredResponse = await blogAPI.getAll({ featured: true, per_page: 4 })
        if (featuredResponse.success) {
          setFeaturedBlogs(featuredResponse.data.map(blog => ({
            image: blog.image_url || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
            category: blog.category_name || 'General',
            title: blog.title,
            excerpt: blog.excerpt || '',
            link: `/post/${blog.slug}`
          })))
        }
      } else {
        setFeaturedBlogs([])
      }

      // Fetch blogs (filtered by category if selected)
      const latestResponse = await blogAPI.getAll(queryParams)
      if (latestResponse.success) {
        setLatestBlogs(latestResponse.data.map(blog => ({
          image: blog.image_url || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
          tag: blog.category_name || 'General',
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
  }, [selectedCategory])

  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoryAPI.getAll()
      if (response.success) {
        // Map API categories to component format
        const mappedCategories = response.data.map(cat => ({
          icon: cat.icon || '📋',
          title: cat.name,
          description: cat.description || '',
          slug: cat.slug,
          link: `/blog?category=${cat.slug}`
        }))
        setCategories(mappedCategories)
        
        // Set selected category data if a category is selected
        if (selectedCategory) {
          const category = mappedCategories.find(cat => cat.slug === selectedCategory)
          if (category) {
            setSelectedCategoryData(category)
          }
        }
      }
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }, [selectedCategory])

  useEffect(() => {
    // Fetch categories first, then blogs
    fetchCategories()
    fetchBlogs()
  }, [fetchCategories, fetchBlogs])

  useEffect(() => {
    // Update document title and meta description
    if (selectedCategory && selectedCategoryData) {
      document.title = `${selectedCategoryData.title} – IndiaPropertys Blog | Real Estate Insights`
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', selectedCategoryData.description || `Explore ${selectedCategoryData.title} related articles, guides, and insights on IndiaPropertys Blog.`)
      }
    } else {
      document.title = 'IndiaPropertys Blog – Property News, Guides & Tips | Real Estate Insights'
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Latest real estate trends, buying guides, legal tips & investment insights across India. Expert property advice for buyers, sellers & investors.')
      } else {
        const meta = document.createElement('meta')
        meta.name = 'description'
        meta.content = 'Latest real estate trends, buying guides, legal tips & investment insights across India. Expert property advice for buyers, sellers & investors.'
        document.getElementsByTagName('head')[0].appendChild(meta)
      }
    }
  }, [selectedCategory, selectedCategoryData])

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading blogs...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Error: {error}</p>
        <button onClick={fetchBlogs}>Retry</button>
      </div>
    )
  }

  // Get hero title and subtitle based on selected category
  const getHeroContent = () => {
    if (selectedCategory && selectedCategoryData) {
      return {
        title: `${selectedCategoryData.title} – Property Guides & Insights`,
        subtitle: selectedCategoryData.description || `Explore ${selectedCategoryData.title} related articles, guides, and expert insights on IndiaPropertys Blog.`
      }
    }
    return {
      title: "IndiaPropertys Blog – Property News, Guides & Tips",
      subtitle: "Latest real estate trends, buying guides, legal tips & investment insights across India"
    }
  }

  const heroContent = getHeroContent()

  return (
    <>
      <Hero 
        title={heroContent.title}
        subtitle={heroContent.subtitle}
      />
      <Categories />
      
      {/* Blog Categories Section */}
      <section className="blog-categories-section">
        <div className="blog-categories-container">
          <div className="blog-categories-grid">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <BlogCategoryCard
                  key={index}
                  icon={category.icon}
                  title={category.title}
                  description={category.description}
                  link={category.link}
                />
              ))
            ) : (
              <p>No categories available</p>
            )}
          </div>
        </div>
      </section>

      {/* Show "Clear Filter" button if category is selected */}
      {selectedCategory && selectedCategoryData && (
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <Link 
            to="/blog" 
            style={{ 
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              backgroundColor: 'var(--primary-color, #007bff)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            ← View All Categories
          </Link>
        </div>
      )}

      {/* Featured Blogs Section - Only show if no category is selected */}
      {!selectedCategory && (
        <section className="featured-blogs-section">
          <div className="featured-blogs-container">
            <h2 className="section-title">Featured Articles</h2>
            <div className="featured-blogs-grid">
              {featuredBlogs.length > 0 ? (
                featuredBlogs.map((blog, index) => (
                  <FeaturedBlogCard
                    key={index}
                    image={blog.image}
                    category={blog.category}
                    title={blog.title}
                    excerpt={blog.excerpt}
                    link={blog.link}
                  />
                ))
              ) : (
                <p>No featured blogs available</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Content with Sidebar */}
      <section className="blog-main-content">
        <div className="blog-main-container">
          <div className="blog-content-wrapper">
            {/* Latest Blogs / Category Blogs */}
            <div className="latest-blogs-section">
              <h2 className="section-title">
                {selectedCategory && selectedCategoryData 
                  ? `${selectedCategoryData.title} Articles` 
                  : 'Latest Articles'}
              </h2>
              <section className="blog-grid">
                {latestBlogs.length > 0 ? (
                  latestBlogs.map((blog, index) => (
                    <BlogCard
                      key={index}
                      image={blog.image}
                      tag={blog.tag}
                      title={blog.title}
                      description={blog.description}
                      link={blog.link}
                    />
                  ))
                ) : (
                  <p style={{ padding: '2rem', textAlign: 'center' }}>
                    {selectedCategory 
                      ? `No blogs found in ${selectedCategoryData?.title || 'this category'}.` 
                      : 'No blogs available'}
                  </p>
                )}
              </section>
            </div>

            {/* Sidebar */}
            <BlogSidebar />
          </div>
        </div>
      </section>

      {/* City-wise Section - Only show if no category is selected */}
      {!selectedCategory && <CityWiseSection />}

      {/* CTA Section */}
      <BlogCTA />
    </>
  )
}

export default Blog

