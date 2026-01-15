import './WelcomeSection.css'

function WelcomeSection() {
  return (
    <section className="welcome-section">
      <div className="welcome-container">
        <h2 className="welcome-title">Welcome to Indiaproperty's</h2>
        <div className="welcome-content">
          <p>
            <strong>IndiaPropertys</strong> is your trusted real estate platform, 
            dedicated to simplifying property transactions and helping you find your perfect home or investment. 
            Our vision is to make real estate accessible, transparent, and hassle-free for everyone.
          </p>
          <p>
            We offer verified listings, clear pricing, and expert guidance to connect you with properties 
            that match your needs. Whether you're buying, selling, or investing, we're here to help you 
            navigate the real estate landscape with confidence. Join us as we continue to evolve and shape 
            the future of real estate across India.
          </p>
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection

