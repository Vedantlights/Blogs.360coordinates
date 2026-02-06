import './CitiesGrid.css'

function CitiesGrid() {
  const mainSiteUrl = 'https://www.360coordinates.com/'

  const cities = [
    { name: 'MUMBAI', image: 'Mumbai.png' },
    { name: 'BENGALORE', image: 'Bangalore.png' },
    { name: 'AHMEDABAD', image: 'Ahmedabad.png' },
    { name: 'DELHI', image: 'Delhi.png' },
    { name: 'JAIPUR', image: 'Jaipur.png' },
    { name: 'HYDRABAD', image: 'Hyderabad.png' },
    { name: 'CHENNAI', image: 'Chennai.png' },
    { name: 'KOLKATA', image: 'kolkata.png' },
    { name: 'PUNE', image: 'Pune.png' },
    { name: 'SURAT', image: 'Surat.png' },
  ]

  return (
    <section className="cities-section">
      <div className="cities-container">
        <p className="cities-label">WE ARE NOW</p>
        <h2 className="cities-title">SHAPING SKYLINES ACROSS INDIA</h2>
        <div className="cities-grid">
          {cities.map((city, index) => (
            <a
              key={index}
              className="city-card"
              href={mainSiteUrl}
              aria-label={`Visit IndiaPropertys for ${city.name}`}
            >
              <div className="city-image-wrapper">
                <img 
                  src={`${process.env.PUBLIC_URL}/images/cities/${city.image}`} 
                  alt={city.name}
                  className="city-image"
                  loading="lazy"
                />
              </div>
              <h3 className="city-name">{city.name}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CitiesGrid

