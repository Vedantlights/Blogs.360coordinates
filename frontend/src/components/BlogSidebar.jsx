import { useState } from 'react'
import { Link } from 'react-router-dom'
import './BlogSidebar.css'

function BlogSidebar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [email, setEmail] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  const handleNewsletter = (e) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  const popularPosts = [
    { title: 'Top 7 Mistakes First-Time Home Buyers Make', link: '/post' },
    { title: 'RERA Act: Complete Guide for Buyers', link: '/post' },
    { title: 'Home Loan EMI Calculator Explained', link: '/post' },
    { title: 'Property Investment Tips for 2026', link: '/post' },
  ]

  const categories = [
    { name: 'Buy Property', link: '/buy' },
    { name: 'Rent / Lease', link: '/rent' },
    { name: 'Investment Tips', link: '/investment' },
    { name: 'Legal & Documentation', link: '/legal' },
    { name: 'Property News', link: '/post' },
    { name: 'City-wise Guides', link: '/post' },
    { name: 'Builder Projects', link: '/post' },
    { name: 'Home Loans & EMI', link: '/post' },
  ]

  const cities = [
    { name: 'Mumbai', link: '/blog/city/mumbai' },
    { name: 'Pune', link: '/blog/city/pune' },
    { name: 'Bangalore', link: '/blog/city/bangalore' },
    { name: 'Hyderabad', link: '/blog/city/hyderabad' },
    { name: 'Delhi NCR', link: '/blog/city/delhi-ncr' },
  ]

  return (
    <aside className="blog-sidebar">
      {/* Search */}
      <div className="sidebar-widget">
        <h3 className="sidebar-widget-title">Search Blog</h3>
        <form onSubmit={handleSearch} className="sidebar-search-form">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="sidebar-search-input"
          />
          <button type="submit" className="sidebar-search-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>

      {/* Popular Posts */}
      <div className="sidebar-widget">
        <h3 className="sidebar-widget-title">Popular Posts</h3>
        <ul className="popular-posts-list">
          {popularPosts.map((post, index) => (
            <li key={index}>
              <Link to={post.link} className="popular-post-link">
                <span className="popular-post-number">{index + 1}</span>
                <span className="popular-post-title">{post.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div className="sidebar-widget">
        <h3 className="sidebar-widget-title">Categories</h3>
        <ul className="sidebar-categories-list">
          {categories.map((category, index) => (
            <li key={index}>
              <Link to={category.link} className="sidebar-category-link">
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* City-wise Links */}
      <div className="sidebar-widget">
        <h3 className="sidebar-widget-title">📍 City Guides</h3>
        <div className="city-links-grid">
          {cities.map((city, index) => (
            <Link key={index} to={city.link} className="city-link">
              {city.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="sidebar-widget sidebar-newsletter">
        <h3 className="sidebar-widget-title">Newsletter</h3>
        <p className="newsletter-text">Get the latest property insights delivered to your inbox</p>
        <form onSubmit={handleNewsletter} className="newsletter-form">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="newsletter-input"
            required
          />
          <button type="submit" className="newsletter-button">
            Subscribe
          </button>
        </form>
      </div>

      {/* CTAs */}
      <div className="sidebar-widget sidebar-ctas">
        <Link to="/post" className="sidebar-cta-button sidebar-cta-primary">
          Post Property
        </Link>
        <Link to="/contact" className="sidebar-cta-button sidebar-cta-secondary">
          Contact Agent
        </Link>
      </div>
    </aside>
  )
}

export default BlogSidebar

