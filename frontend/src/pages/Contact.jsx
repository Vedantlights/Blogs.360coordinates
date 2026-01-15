import ContactHeader from '../components/ContactHeader'
import ContactInfo from '../components/ContactInfo'
import ContactForm from '../components/ContactForm'
import './Contact.css'

function Contact() {
  return (
    <>
      <ContactHeader />
      <section className="contact-content">
        <div className="contact-container">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    </>
  )
}

export default Contact

