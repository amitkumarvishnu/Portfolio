import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiArrowDown, FiGithub, FiLinkedin } from 'react-icons/fi'
import { personalInfo } from '../data/portfolioData'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    const currentRole = personalInfo.role[roleIndex]
    let charIndex = 0

    const typingInterval = setInterval(() => {
      charIndex += 1
      setTypedText(currentRole.slice(0, charIndex))

      if (charIndex >= currentRole.length) {
        clearInterval(typingInterval)
        setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % personalInfo.role.length)
          setTypedText('')
        }, 1200)
      }
    }, 70)

    return () => clearInterval(typingInterval)
  }, [roleIndex])

  return (
    <section id="hero" className="hero">
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {personalInfo.available && (
          <motion.div className="availability" variants={itemVariants}>
            <span className="pulse-dot" aria-hidden="true" />
            Available for work
          </motion.div>
        )}

        <motion.h1 variants={itemVariants}>Hi, I&apos;m {personalInfo.name}</motion.h1>

        <motion.h2 variants={itemVariants}>
          {typedText}
          <span className="caret" aria-hidden="true">|</span>
        </motion.h2>

        <motion.p variants={itemVariants}>{personalInfo.shortBio}</motion.p>

        <motion.div className="hero-actions" variants={itemVariants}>
          <Link to="projects" smooth={true} offset={-70} duration={500} className="btn btn-primary">
            View Projects
          </Link>
          <a href={personalInfo.cvUrl} className="btn btn-outline" download>
            Download CV
          </a>
        </motion.div>

        <motion.div className="hero-socials" variants={itemVariants}>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
          <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FiGithub />
          </a>
        </motion.div>
      </motion.div>

      <Link to="about" smooth={true} offset={-70} duration={500} className="scroll-indicator" aria-label="Scroll down">
        <FiArrowDown />
      </Link>
    </section>
  )
}
