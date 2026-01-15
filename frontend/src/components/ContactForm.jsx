import { useState } from 'react'
import { contactAPI } from '../services/api'
import './ContactForm.css'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (error) setError(null)
    if (success) setSuccess(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await contactAPI.submit(formData)
      
      if (response.success) {
        setSuccess(true)
        setFormData({
          name: '',
          email: '',
          mobile: '',
          message: ''
        })
        // Clear success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000)
      } else {
        setError(response.message || 'Failed to send message')
      }
    } catch (err) {
      console.error('Error submitting contact form:', err)
      setError(err.message || 'Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-form-panel">
      <h2 className="contact-form-title">Send Us a Message</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            name="mobile"
            placeholder="Phone Number"
            value={formData.mobile}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="form-textarea"
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit" className="form-submit-btn" disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
        
        {success && (
          <div className="form-message success" style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#d4edda', color: '#155724', borderRadius: '4px' }}>
            Thank you for your message! We will get back to you soon.
          </div>
        )}
        
        {error && (
          <div className="form-message error" style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '4px' }}>
            {error}
          </div>
        )}
      </form>
    </div>
  )
}

export default ContactForm

