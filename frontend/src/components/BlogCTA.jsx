import { Link } from 'react-router-dom'
import './BlogCTA.css'

function BlogCTA() {
  return (
    <section className="blog-cta">
      <div className="blog-cta-container">
        <h2 className="blog-cta-title">Looking to Buy or Sell Property?</h2>
        <p className="blog-cta-subtitle">Post Your Property for Free or Get Expert Help from Verified Agents</p>
        <div className="blog-cta-buttons">
          <Link to="/post" className="blog-cta-button blog-cta-primary">
            Post Property
          </Link>
          <Link to="/contact" className="blog-cta-button blog-cta-secondary">
            Contact Us
          </Link>
          <Link to="/buy" className="blog-cta-button blog-cta-tertiary">
            Browse Properties
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BlogCTA

