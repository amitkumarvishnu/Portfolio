import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiMail, FiMapPin } from 'react-icons/fi'
import { FaGraduationCap } from 'react-icons/fa'
import { education, experience, personalInfo, stats } from '../data/portfolioData'

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export default function About() {
  const [hasStarted, setHasStarted] = useState(false)
  const [counts, setCounts] = useState(stats.map(() => 0))
  const sectionRef = useRef(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHasStarted(true); observer.disconnect() } },
      { threshold: 0.25 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasStarted) return undefined
    const intervals = stats.map((stat, index) => {
      const steps = 40
      const increment = stat.number / steps
      let currentValue = 0
      let ticks = 0
      return setInterval(() => {
        ticks += 1
        currentValue += increment
        setCounts((prev) => {
          const next = [...prev]
          next[index] = ticks >= steps ? stat.number : Math.min(stat.number, Math.floor(currentValue))
          return next
        })
      }, 1200 / steps)
    })
    const timeoutId = setTimeout(() => {
      intervals.forEach(clearInterval)
      setCounts(stats.map((s) => s.number))
    }, 1300)
    return () => { intervals.forEach(clearInterval); clearTimeout(timeoutId) }
  }, [hasStarted])

  return (
    <section id="about" className="about" ref={sectionRef}>

      {/* section label */}
      <div className="about-section-label" aria-hidden="true">
        <span className="label-line" />
        <span className="label-text">ABOUT</span>
        <span className="label-line" />
      </div>

      <div className="about-grid">

        {/* ── LEFT COL: image + meta ── */}
        <motion.div
          className="about-left"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
        >
          <motion.div className="about-image-wrap" variants={fadeUp}>
            <div className="image-frame">
              <img
                src={`${import.meta.env.BASE_URL}about-profile.jpg`}
                alt="Amit Kumar Vishnu"
                className="about-image"
                loading="lazy"
              />
              {/* corner accents */}
              <span className="frame-corner tl" aria-hidden="true" />
              <span className="frame-corner tr" aria-hidden="true" />
              <span className="frame-corner bl" aria-hidden="true" />
              <span className="frame-corner br" aria-hidden="true" />
            </div>

            {/* floating badge */}
            <div className="image-badge" aria-hidden="true">
              <span className="badge-dot" />
              <span>Open to work</span>
            </div>
          </motion.div>

          <motion.div className="about-meta-card" variants={fadeUp}>
            <div className="meta-row">
              <span className="meta-icon"><FiMapPin /></span>
              <span>{personalInfo.location}</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-row">
              <span className="meta-icon"><FiMail /></span>
              <span>{personalInfo.email}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT COL: content ── */}
        <motion.div
          className="about-content"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <h2 className="about-heading">About Me</h2>
            <div className="about-underline" aria-hidden="true">
              <span className="underline-bar" />
              <span className="underline-dot" />
            </div>
          </motion.div>

          <motion.p className="about-bio" variants={fadeUp}>{personalInfo.bio}</motion.p>

          {/* stats */}
          <motion.div className="about-stats" variants={stagger}>
            {stats.map((stat, index) => (
              <motion.div className="about-stat" key={stat.label} variants={fadeUp}>
                <div className="stat-inner">
                  <strong>
                    {counts[index]}{stat.suffix}
                  </strong>
                  <span>{stat.label}</span>
                </div>
                <div className="stat-glow" aria-hidden="true" />
              </motion.div>
            ))}
          </motion.div>

          {/* experience */}
          <motion.div className="experience-block" variants={fadeUp}>
            <div className="block-header">
              <h3>Experience</h3>
              <span className="block-count">{experience.length}</span>
            </div>

            <div className="timeline">
              {experience.map((item, index) => (
                <motion.article
                  key={`${item.company}-${index}`}
                  className="exp-item"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
                >
                  <div className="exp-track" aria-hidden="true">
                    <span className="exp-dot" />
                    {index < experience.length - 1 && <span className="exp-connector" />}
                  </div>

                  <div className="exp-card">
                    <div className="exp-card-header">
                      <div>
                        <h4>{item.role}</h4>
                        <p className="exp-company">{item.company}</p>
                      </div>
                      <span className="exp-type">{item.type || 'Full-time'}</span>
                    </div>

                    <div className="exp-meta">
                      <span><FiCalendar />{item.duration}</span>
                      <span><FiMapPin />{item.location}</span>
                    </div>

                    <ul>
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* education */}
          <motion.div className="education-block" variants={fadeUp}>
            <div className="block-header">
              <h3>Education</h3>
              <span className="block-count">{education.length}</span>
            </div>

            <div className="edu-cards">
              {education.map((item, index) => (
                <motion.article
                  className="education-card"
                  key={`${item.institution}-${index}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
                >
                  <div className="edu-card-accent" aria-hidden="true" />
                  <FaGraduationCap className="edu-icon" />
                  <h4>{item.degree}</h4>
                  <p className="edu-institution">{item.institution}</p>
                  {item.college && <p className="edu-college">{item.college}</p>}

                  <div className="edu-meta">
                    <span><FiCalendar />{item.duration}</span>
                    <span><FaGraduationCap />CGPA: {item.cgpa}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
