import './AboutHero.css'

function AboutHero() {
  return (
    <div className="about-hero">
      <div className="about-hero-container">
        <img 
          src={`${process.env.PUBLIC_URL}/images/Abouthero.jpg`} 
          alt="About IndiaPropertys"
          className="about-hero-image"
          loading="eager"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa'
          }}
        />
    
      </div>
    </div>
  )
}

export default AboutHero

