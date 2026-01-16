import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home'))
const Post = lazy(() => import('./pages/Post'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Buy = lazy(() => import('./pages/Buy'))
const Rent = lazy(() => import('./pages/Rent'))
const Investment = lazy(() => import('./pages/Investment'))
const Legal = lazy(() => import('./pages/Legal'))
const Tips = lazy(() => import('./pages/Tips'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Blog = lazy(() => import('./pages/Blog'))
const Admin = lazy(() => import('./pages/Admin'))
const Login = lazy(() => import('./pages/Login'))

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '50vh',
    fontSize: '18px',
    color: 'var(--text-light)'
  }}>
    Loading...
  </div>
)

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:slug" element={<Post />} />
              <Route path="/post" element={<Post />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/buy" element={<Buy />} />
              <Route path="/rent" element={<Rent />} />
              <Route path="/investment" element={<Investment />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/tips" element={<Tips />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/vedantlights/login" element={<Login />} />
              <Route 
                path="/vedantlights" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

