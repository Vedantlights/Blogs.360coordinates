import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/">Blogs</Link>
          <Link to="/">Home</Link>
          <a href="#podcast">Podcast</a>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/contact">Support</Link>
        </div>
        <p className="copyright">
          Copyright © 2026 blogs.indiapropertys.com | Powered by Astra WordPress Theme
        </p>
        <button className="scroll-top" onClick={scrollToTop}>
          Scroll to Top
        </button>
      </div>
    </footer>
  )
}

export default Footer

