import { Link, useLocation } from 'react-router-dom'
import './Categories.css'

function Categories() {
  const location = useLocation()
  const currentPath = location.pathname

  const categories = [
    { path: '/buy', label: 'Buy' },
    { path: '/rent', label: 'Rent' },
    { path: '/investment', label: 'Investment' },
    { path: '/legal', label: 'Legal' },
    { path: '/tips', label: 'Tips' },
  ]

  return (
    <section className="categories">
      {categories.map((category) => (
        <Link
          key={category.path}
          to={category.path}
          className={`category-link ${currentPath === category.path ? 'active' : ''}`}
        >
          <span>{category.label}</span>
        </Link>
      ))}
    </section>
  )
}

export default Categories

