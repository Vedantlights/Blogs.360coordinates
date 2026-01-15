import './MissionVision.css'

function MissionVision() {
  return (
    <section className="mission-vision-section">
      <div className="mission-vision-container">
        <div className="mission-card">
          <div className="mission-icon">
            <div className="icon-circle">
              <div className="mission-vision-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
            </div>
          </div>
          <h3 className="mission-title">Our Mission</h3>
          <p className="mission-description">
            To empower every Indian with seamless access to verified properties, transparent 
            transactions, and expert guidance, making real estate dreams achievable for everyone.
          </p>
        </div>
        <div className="vision-card">
          <div className="vision-icon">
            <div className="icon-circle">
              <div className="mission-vision-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
            </div>
          </div>
          <h3 className="vision-title">Our Vision</h3>
          <p className="vision-description">
            To become India's most trusted and innovative real estate platform, transforming 
            how people buy, sell, and rent properties through technology, transparency, and exceptional service.
          </p>
        </div>
      </div>
    </section>
  )
}

export default MissionVision

