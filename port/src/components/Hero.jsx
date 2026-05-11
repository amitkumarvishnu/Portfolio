import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiArrowDown, FiGithub, FiLinkedin } from 'react-icons/fi'
import { personalInfo } from '../data/portfolioData'

/* ── stagger container ── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ── split h1 chars for stagger ── */
function SplitText({ text, className }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="char"
          aria-hidden="true"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.03 }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const heroRef = useRef(null)

  /* ── magnetic cursor orb ── */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 18 })

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  /* ── typewriter with delete ── */
  useEffect(() => {
    const roles = personalInfo.role
    const current = roles[roleIndex]
    let timeout

    if (!isDeleting) {
      if (typedText.length < current.length) {
        timeout = setTimeout(() => setTypedText(current.slice(0, typedText.length + 1)), 72)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1600)
      }
    } else {
      if (typedText.length > 0) {
        timeout = setTimeout(() => setTypedText(typedText.slice(0, -1)), 38)
      } else {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }
    }
    return () => clearTimeout(timeout)
  }, [typedText, isDeleting, roleIndex])

  const cvHref = useMemo(() => {
    if (personalInfo.cvUrl.startsWith('http')) return personalInfo.cvUrl
    return `${import.meta.env.BASE_URL}${personalInfo.cvUrl.replace(/^\//, '')}`
  }, [])

  return (
    <section id="hero" className="hero" ref={heroRef}>

      {/* ── ambient moving orb (parallax mouse) ── */}
      <motion.div
        className="hero-orb"
        style={{ x: springX, y: springY }}
        aria-hidden="true"
      />

      {/* ── static accent orb top-right ── */}
      <div className="hero-orb-static" aria-hidden="true" />

      {/* ── grain overlay ── */}
      <div className="hero-grain" aria-hidden="true" />

      {/* ── decorative grid lines ── */}
      <div className="hero-grid" aria-hidden="true" />

      {/* ── main content ── */}
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
            <span className="avail-divider" />
            <span className="avail-location">Remote / On-site</span>
          </motion.div>
        )}

        <motion.h1 variants={itemVariants} className="hero-name">
          <SplitText text={`Hi, I'm ${personalInfo.name}`} className="name-split" />
        </motion.h1>

        <motion.div className="hero-role-wrap" variants={itemVariants}>
          <span className="role-bracket" aria-hidden="true">&lt;</span>
          <span className="hero-role" aria-live="polite">
            {typedText}
            <span className="caret" aria-hidden="true" />
          </span>
          <span className="role-bracket" aria-hidden="true">/&gt;</span>
        </motion.div>

        <motion.p className="hero-bio" variants={itemVariants}>
          {personalInfo.shortBio}
        </motion.p>

        {/* ── experience badge ── */}
        <motion.div className="hero-meta" variants={itemVariants}>
          <div className="meta-badge">
            <span className="meta-num">2+</span>
            <span className="meta-label">Years Exp.</span>
          </div>
          <div className="meta-divider" />
          <div className="meta-badge">
            <span className="meta-num">4+</span>
            <span className="meta-label">Projects</span>
          </div>
          <div className="meta-divider" />
          <div className="meta-badge">
            <span className="meta-num">4+</span>
            <span className="meta-label">Clients</span>
          </div>
        </motion.div>

        <motion.div className="hero-actions" variants={itemVariants}>
          <Link
            to="projects"
            smooth={true}
            offset={-70}
            duration={500}
            className="btn btn-primary hero-btn-primary"
          >
            <span>View Projects</span>
            <span className="btn-arrow">→</span>
          </Link>
          <a href={cvHref} className="btn btn-outline hero-btn-outline" download>
            Download CV
          </a>
        </motion.div>

        <motion.div className="hero-socials" variants={itemVariants}>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-link">
            <FiLinkedin />
          </a>
          <span className="social-line" aria-hidden="true" />
          <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="social-link">
            <FiGithub />
          </a>
        </motion.div>
      </motion.div>

      {/* ── scroll indicator ── */}
      <Link
        to="about"
        smooth={true}
        offset={-70}
        duration={500}
        className="scroll-indicator"
        aria-label="Scroll down"
      >
        <div className="scroll-pill">
          <FiArrowDown className="scroll-arrow" />
        </div>
        <span className="scroll-label">SCROLL</span>
      </Link>
    </section>
  )
}
