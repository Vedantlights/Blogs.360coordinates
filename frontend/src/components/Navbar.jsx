import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.getElementById('main-nav')
      const menuToggle = document.querySelector('.menu-toggle')
      if (nav && menuToggle && !nav.contains(event.target) && !menuToggle.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <Link to="/">
          <img src="/images/logoo.png" alt="Logo" loading="eager" />
        </Link>
      </div>
      <button 
        className="menu-toggle" 
        aria-label="Toggle menu" 
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav id="main-nav" className={isMenuOpen ? 'active' : ''}>
        <Link to="/" className={isActive('/') && location.pathname === '/' ? 'active' : ''}>
          Home
        </Link>
        <Link to="/blog" className={isActive('/blog') ? 'active' : ''}>
          Blogs
        </Link>
        <a href="#podcast">Podcast</a>
        <Link to="/about" className={isActive('/about') ? 'active' : ''}>
          About
        </Link>
        <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>
          Support
        </Link>
        <Link to="/privacy" className={isActive('/privacy') ? 'active' : ''}>
          Privacy Policy
        </Link>
      </nav>
    </header>
  )
}

export default Navbar

