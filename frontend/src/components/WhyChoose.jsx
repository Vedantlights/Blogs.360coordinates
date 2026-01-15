import './WhyChoose.css'

function WhyChoose() {
  const features = [
    {
      number: '01',
      title: 'Verified Listings',
      description: 'Every property on our platform is verified for authenticity, ensuring you get accurate information and genuine listings.'
    },
    {
      number: '02',
      title: 'Transparent Pricing',
      description: 'No hidden costs or surprises. We provide clear, upfront pricing information for all properties and services.'
    },
    {
      number: '03',
      title: 'Expert Support',
      description: 'Our team of real estate experts is always ready to assist you with property search, negotiations, and transaction support.'
    },
    {
      number: '04',
      title: 'Wide Selection',
      description: 'Browse through thousands of properties across India - from apartments and villas to commercial spaces and plots.'
    },
    {
      number: '05',
      title: 'Advanced Search',
      description: 'Use our powerful search filters to find properties that match your exact requirements - location, price, size, and more.'
    },
    {
      number: '06',
      title: 'Secure Transactions',
      description: 'We prioritize your security and privacy, ensuring safe and secure property transactions with proper documentation support.'
    }
  ]

  return (
    <section className="why-choose-section">
      <div className="why-choose-container">
        <h2 className="why-choose-title">Why Choose IndiaPropertys?</h2>
        <div className="why-choose-grid">
          {features.map((feature, index) => (
            <div key={index} className="why-choose-card">
              <div className="why-choose-number">{feature.number}</div>
              <h3 className="why-choose-card-title">{feature.title}</h3>
              <p className="why-choose-card-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChoose

