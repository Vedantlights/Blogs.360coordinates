import { Link } from 'react-router-dom'
import './BlogCard.css'

function BlogCard({ image, tag, title, description, link = '/post' }) {
  return (
    <article className="blog-card">
      <img src={image} alt={title} loading="lazy" />
      <div>
        <span className="tag">{tag}</span>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={link}>Read More →</Link>
      </div>
    </article>
  )
}

export default BlogCard

