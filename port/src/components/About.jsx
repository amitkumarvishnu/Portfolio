import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiMail, FiMapPin } from 'react-icons/fi'
import { FaGraduationCap } from 'react-icons/fa'
import { education, experience, personalInfo, stats } from '../data/portfolioData'

export default function About() {
  const [hasStarted, setHasStarted] = useState(false)
  const [counts, setCounts] = useState(stats.map(() => 0))
  const sectionRef = useRef(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasStarted) return undefined

    const intervals = stats.map((stat, index) => {
      const duration = 1200
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
      }, duration / steps)
    })

    const timeoutId = setTimeout(() => {
      intervals.forEach((id) => clearInterval(id))
      setCounts(stats.map((stat) => stat.number))
    }, 1300)

    return () => {
      intervals.forEach((id) => clearInterval(id))
      clearTimeout(timeoutId)
    }
  }, [hasStarted])

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about-grid">
        <motion.div
          className="about-image-wrap"
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.3 }}
        >
          <img src="/about-profile.jpg" alt="Amit Kumar Vishnu" className="about-image" loading="lazy" />

          <div className="about-meta">
            <p>
              <FiMapPin />
              <span>{personalInfo.location}</span>
            </p>
            <p>
              <FiMail />
              <span>{personalInfo.email}</span>
            </p>
          </div>
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.3 }}
        >
          <h2>About Me</h2>
          <span className="about-underline" aria-hidden="true" />

          <p>{personalInfo.bio}</p>

          <div className="about-stats">
            {stats.map((stat, index) => (
              <div className="about-stat" key={stat.label}>
                <strong>
                  {counts[index]}
                  {stat.suffix}
                </strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="experience-block">
            <h3>Experience</h3>

            {experience.map((item, index) => (
              <motion.article
                key={`${item.company}-${index}`}
                className="exp-item"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3 }}
              >
                <div className="exp-line" aria-hidden="true">
                  <span className="exp-dot" />
                </div>

                <div className="exp-content">
                  <h4>{item.role}</h4>
                  <p className="exp-company">{item.company}</p>

                  <div className="exp-meta">
                    <span>
                      <FiCalendar />
                      {item.duration}
                    </span>
                    <span>
                      <FiMapPin />
                      {item.location}
                    </span>
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

          <div className="education-block">
            <h3>Education</h3>

            {education.map((item, index) => (
              <article className="education-card" key={`${item.institution}-${index}`}>
                <h4>{item.degree}</h4>
                <p>{item.institution}</p>
                <p>{item.college}</p>

                <div className="edu-meta">
                  <span>
                    <FiCalendar />
                    {item.duration}
                  </span>
                  <span>
                    <FaGraduationCap />
                    CGPA: {item.cgpa}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
