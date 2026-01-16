import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { authAPI } from '../services/api'

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await authAPI.check()
      if (response.success && response.data.authenticated) {
        setIsAuthenticated(true)
        localStorage.setItem('admin_authenticated', 'true')
      } else {
        setIsAuthenticated(false)
        localStorage.removeItem('admin_authenticated')
      }
    } catch (err) {
      setIsAuthenticated(false)
      localStorage.removeItem('admin_authenticated')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        fontSize: '18px'
      }}>
        Checking authentication...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/vedantlights/login" replace />
  }

  return children
}

export default ProtectedRoute
