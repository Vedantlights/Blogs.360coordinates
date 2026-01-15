import { Link } from 'react-router-dom'
import './CityWiseSection.css'

function CityWiseSection() {
  const cities = [
    { name: 'Mumbai', image: `${process.env.PUBLIC_URL}/images/cities/Mumbai.png`, link: '/blog/city/mumbai' },
    { name: 'Pune', image: `${process.env.PUBLIC_URL}/images/cities/Pune.png`, link: '/blog/city/pune' },
    { name: 'Bangalore', image: `${process.env.PUBLIC_URL}/images/cities/Bangalore.png`, link: '/blog/city/bangalore' },
    { name: 'Hyderabad', image: `${process.env.PUBLIC_URL}/images/cities/Hyderabad.png`, link: '/blog/city/hyderabad' },
    { name: 'Delhi NCR', image: `${process.env.PUBLIC_URL}/images/cities/Delhi.png`, link: '/blog/city/delhi-ncr' },
    { name: 'Chennai', image: `${process.env.PUBLIC_URL}/images/cities/Chennai.png`, link: '/blog/city/chennai' },
  ]

  return (
    <section className="city-wise-section">
      <div className="city-wise-container">
        <h2 className="city-wise-title">📍 Real Estate Guides by City</h2>
        <p className="city-wise-subtitle">Explore property insights, trends, and guides for major Indian cities</p>
        <div className="city-wise-grid">
          {cities.map((city, index) => (
            <Link key={index} to={city.link} className="city-wise-card">
              <div className="city-wise-image-wrapper">
                <img src={city.image} alt={`${city.name} real estate guide`} loading="lazy" />
              </div>
              <h3 className="city-wise-card-title">{city.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CityWiseSection

