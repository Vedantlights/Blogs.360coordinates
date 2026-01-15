import './ContactInfo.css'

function ContactInfo() {
  return (
    <div className="contact-info-panel">
      <h2 className="contact-info-title">Contact Information</h2>
      <div className="contact-info-content">
        <div className="contact-info-item">
          <label className="contact-info-label">Phone</label>
          <a href="tel:+917276381482" className="contact-info-value">
            +917276381482
          </a>
        </div>
        <div className="contact-info-item">
          <label className="contact-info-label">Email</label>
          <a href="mailto:info@indiapropertys.com" className="contact-info-value">
            info@indiapropertys.com
          </a>
        </div>
        <div className="contact-info-item">
          <label className="contact-info-label">Address</label>
          <a 
                href="https://www.google.com/maps/search/?api=1&query=Office+No.21+%26+22,+3rd+Floor,+S%2FNo.+56,+Aston+Plaza,+Ambegaon+Bk.,+Pune,+Maharashtra+411046"
                target="_blank"
                rel="noopener noreferrer"
                className="buyer-contact-info-address"
              >
                Office No.21 & 22, 3rd Floor, S/No. 56<br />
                Aston Plaza, Ambegaon Bk.<br />
                Pune, Maharashtra– 411046
              </a>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo

