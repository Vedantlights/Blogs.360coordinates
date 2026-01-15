import { useState } from 'react'
import './BlogHero.css'

function BlogHero() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    // Search functionality can be implemented here
    console.log('Searching for:', searchQuery)
  }

  return (
    <section className="blog-hero">
      <div className="blog-hero-container">
        <h1>IndiaPropertys Blog – Property News, Guides & Tips</h1>
        <p>Latest real estate trends, buying guides, legal tips & investment insights across India</p>
        <form className="blog-search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search blogs, guides, tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="blog-search-input"
          />
          <button type="submit" className="blog-search-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>
    </section>
  )
}

export default BlogHero

