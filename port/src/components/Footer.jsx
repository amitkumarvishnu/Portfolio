import { memo } from 'react'
import { Link } from 'react-scroll'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { personalInfo } from '../data/portfolioData'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-icons">
        <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <FiGithub />
        </a>
        <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <FiLinkedin />
        </a>
        <a href={`mailto:${personalInfo.email}`} aria-label="Email">
          <FiMail />
        </a>
      </div>

      <p className="footer-copy">© 2026 Amit Kumar Vishnu. <br /> Made with ❤️</p>
      <p className="footer-tagline">Open to full-time opportunities</p>

      <Link to="hero" smooth={true} offset={-70} duration={500} className="back-to-top">
        Back to top
      </Link>
    </footer>
  )
}

export default memo(Footer)
