import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { AnimatePresence, motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { personalInfo } from '../data/portfolioData'

const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

const initialErrors = {
  from_name: '',
  from_email: '',
  message: '',
}

export default function Contact() {
  const formRef = useRef(null)
  const [errors, setErrors] = useState(initialErrors)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = (formData) => {
    const nextErrors = { ...initialErrors }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.from_name.trim()) nextErrors.from_name = 'Name is required.'
    if (!formData.from_email.trim()) {
      nextErrors.from_email = 'Email is required.'
    } else if (!emailPattern.test(formData.from_email)) {
      nextErrors.from_email = 'Enter a valid email address.'
    }
    if (!formData.message.trim()) nextErrors.message = 'Message is required.'

    return nextErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      from_name: formRef.current.from_name.value,
      from_email: formRef.current.from_email.value,
      message: formRef.current.message.value,
    }

    const nextErrors = validate(formData)
    setErrors(nextErrors)
    setStatus({ type: '', message: '' })

    const hasErrors = Object.values(nextErrors).some(Boolean)
    if (hasErrors) return

    setIsSubmitting(true)

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      )
      setStatus({ type: 'success', message: 'Thanks Amit will get back to you soon! 🚀' })
      formRef.current.reset()
    } catch {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="contact-grid">
        <motion.div
          className="contact-left"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2>Let&apos;s Work Together</h2>
          <p>
            I&apos;m open to freelance, contract, and product-focused collaborations. If you have a
            project in mind, let&apos;s connect and build something sharp.
          </p>

          <div className="contact-links">
            <a href={`mailto:${personalInfo.email}`}>
              <FiMail />
              <span>{personalInfo.email}</span>
            </a>
            <a href={`tel:${personalInfo.phone}`}>
              <FiPhone />
              <span>{personalInfo.phone}</span>
            </a>
            <div className="contact-static-row">
              <FiMapPin />
              <span>{personalInfo.location}</span>
            </div>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
              <FiLinkedin />
              <span>linkedin.com/in/amitk...</span>
            </a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer">
              <FiGithub />
              <span>github.com/amit...</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="contact-right"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <form ref={formRef} onSubmit={handleSubmit} noValidate className="contact-form-modern">
            <div className="field">
              <input id="from_name" name="from_name" type="text" placeholder=" " required />
              <label htmlFor="from_name">Name</label>
              {errors.from_name && <p className="field-error">{errors.from_name}</p>}
            </div>

            <div className="field">
              <input id="from_email" name="from_email" type="email" placeholder=" " required />
              <label htmlFor="from_email">Email</label>
              {errors.from_email && <p className="field-error">{errors.from_email}</p>}
            </div>

            <div className="field">
              <textarea id="message" name="message" placeholder=" " rows="4" required />
              <label htmlFor="message">Message</label>
              {errors.message && <p className="field-error">{errors.message}</p>}
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="submit-loading">
                  <span className="spinner" aria-hidden="true" /> Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>

            <AnimatePresence mode="wait">
              {status.message && (
                <motion.p
                  key={status.type}
                  className={`submit-status ${status.type}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {status.message}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
