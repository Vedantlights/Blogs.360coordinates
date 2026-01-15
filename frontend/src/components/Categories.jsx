import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { categoryAPI } from '../services/api'
import './Categories.css'

function Categories() {
  const location = useLocation()
  const currentPath = location.pathname
  const [categories, setCategories] = useState([
    { path: '/buy', label: 'Buy' },
    { path: '/rent', label: 'Rent' },
    { path: '/investment', label: 'Investment' },
    { path: '/legal', label: 'Legal' },
    { path: '/tips', label: 'Tips' },
  ])

  useEffect(() => {
    // Fetch categories from API
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll()
      if (response.success && response.data) {
        // Map API categories to navigation format
        const mappedCategories = response.data.map(cat => ({
          path: `/${cat.slug}`,
          label: cat.name
        }))
        setCategories(mappedCategories)
      }
    } catch (err) {
      console.error('Error fetching categories:', err)
      // Keep default categories on error
    }
  }

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

