import { useState, useEffect } from 'react'
import './HomeHero.css'

function HomeHero() {
  const banners = [
    'Banner1.jpg',
    'Banner2.jpg',
    'Banner3.jpg',
    'Banner4.jpg'
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [loadedImages, setLoadedImages] = useState(new Set([0])) // Preload first image

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % banners.length
        // Preload next image
        setLoadedImages((prevLoaded) => {
          const newLoaded = new Set(prevLoaded)
          newLoaded.add(next)
          return newLoaded
        })
        return next
      })
    }, 5000) // Auto-slide every 5 seconds

    return () => clearInterval(interval)
  }, [banners.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    // Preload adjacent images
    setLoadedImages((prevLoaded) => {
      const newLoaded = new Set(prevLoaded)
      newLoaded.add(index)
      if (index > 0) newLoaded.add(index - 1)
      if (index < banners.length - 1) newLoaded.add(index + 1)
      return newLoaded
    })
  }

  return (
    <section className="home-hero">
      <div className="hero-image-container">
        <div className="hero-carousel">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            >
              {loadedImages.has(index) && (
                <img 
                  src={`${process.env.PUBLIC_URL}/images/${banner}`} 
                  alt={`Banner ${index + 1}`} 
                  className="hero-image"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1501183638710-841dd1904471'
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="hero-overlay">
          <div className="hero-dots">
            {banners.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHero

