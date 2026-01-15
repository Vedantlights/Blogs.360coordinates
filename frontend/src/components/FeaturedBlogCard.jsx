import { Link } from 'react-router-dom'
import './FeaturedBlogCard.css'

function FeaturedBlogCard({ image, category, title, excerpt, link = '/post' }) {
  return (
    <article className="featured-blog-card">
      <div className="featured-blog-image-wrapper">
        <img src={image} alt={title} loading="lazy" />
        <span className="featured-blog-category">{category}</span>
      </div>
      <div className="featured-blog-content">
        <h3 className="featured-blog-title">{title}</h3>
        <p className="featured-blog-excerpt">{excerpt}</p>
        <Link to={link} className="featured-blog-link">
          Read More →
        </Link>
      </div>
    </article>
  )
}

export default FeaturedBlogCard

