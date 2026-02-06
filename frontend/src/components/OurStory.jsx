import './OurStory.css'

function OurStory() {
  return (
    <section className="our-story-section">
      <div className="our-story-container">
        <div className="our-story-content">
          <div className="our-story-title-wrapper">
            <h2 className="our-story-title">Our Story</h2>
            <div className="our-story-title-underline"></div>
          </div>
          <div className="our-story-text">
            <p>
              <strong>
                <a 
                  href="https://www.360coordinates.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{color:'#764be2', textDecoration: 'none', cursor: 'pointer'}}
                >www.360coordinates.com</a>
              </strong> was founded with a vision to revolutionize the real estate industry 
              by simplifying property transactions and making them accessible to everyone. We recognized 
              the challenges faced by buyers, sellers, and renters in navigating the complex real 
              estate market, and set out to create a seamless, transparent, and user-friendly solution.
            </p>
            <p>
              Since our inception, we have been committed to providing verified listings, transparent 
              pricing, and expert support to make real estate transactions simple, safe, and faster. 
              We act as a bridge, connecting property seekers with their dream homes and commercial spaces 
              across India, ensuring that every transaction is smooth and trustworthy.
            </p>
            <p>
              Today, <strong>
                <a 
                  href="https://www.360coordinates.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{color:'#764be2', textDecoration: 'none', cursor: 'pointer'}}
                >www.360coordinates.com</a>
              </strong> stands as a leading real estate platform, helping thousands of 
              people find their perfect property match. Our commitment to innovation and excellence 
              drives us to continuously expand our services and reach, meeting the evolving needs of 
              the Indian real estate market.
            </p>
          </div>
          <div className="our-story-logo">
            <img 
              src={`${process.env.PUBLIC_URL}/images/browserlogo.jpg`} 
              alt="IndiaPropertys Logo"
              className="our-story-logo-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurStory

