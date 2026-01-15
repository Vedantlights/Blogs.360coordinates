import { Link } from 'react-router-dom'
import './BlogCategoryCard.css'

function BlogCategoryCard({ icon, title, description, link }) {
  return (
    <Link to={link} className="blog-category-card">
      <div className="blog-category-icon">{icon}</div>
      <h3 className="blog-category-title">{title}</h3>
      <p className="blog-category-description">{description}</p>
    </Link>
  )
}

export default BlogCategoryCard

