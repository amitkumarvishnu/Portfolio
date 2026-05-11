import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { projects } from '../data/portfolioData'

const filters = ['All', 'Full Stack', 'Frontend', 'Backend']

const detailsVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    overflow: 'hidden',
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    overflow: 'hidden',
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [openDetails, setOpenDetails] = useState({})

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((project) => project.category === activeFilter)
  }, [activeFilter])

  const toggleDetails = (id) => {
    setOpenDetails((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section id="projects" className="projects">
      <div className="about-section-label" aria-hidden="true">
        <span className="label-line" />
        <span className="label-text">PROJECTS</span>
        <span className="label-line" />
      </div>
      <div className="projects-head">
        <h2>Selected Work</h2>
        <span className="projects-count">{projects.length}</span>
      </div>

      <div className="projects-filters" role="tablist" aria-label="Project filters">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`filter-btn ${activeFilter === filter ? 'is-active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <motion.div layout className="projects-grid">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const showDetails = !!openDetails[project.id]
            const mainUrl = project.mainSiteUrl || project.liveUrl
            const promoUrl = project.promoSiteUrl || project.githubUrl
            const hasMainUrl = Boolean(mainUrl)
            const hasPromoUrl = Boolean(promoUrl)

            return (
              <motion.article
                layout
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1], delay: index * 0.04 }}
                style={{ '--project-color': project.color }}
              >
                {/* Glow orb on hover */}
                <div className="card-glow" />

                <div
                  className="project-banner"
                  style={{
                    background: `linear-gradient(140deg, ${project.color}22 0%, transparent 65%)`,
                  }}
                >
                  {/* Index number */}
                  <span className="project-index">0{index + 1}</span>

                  <div className="project-banner-content">
                    <h3>{project.title}</h3>
                    <p className="project-subtitle">{project.subtitle}</p>
                  </div>

                  <div className="project-banner-footer">
                    <span className="project-category">{project.category}</span>
                    <span className="project-duration">{project.duration}</span>
                  </div>
                </div>

                <div className="project-body">
                  <p>{project.description}</p>

                  <div className="project-tags">
                    {project.stack.map((tag) => (
                      <span
                        key={tag}
                        className="project-tag"
                        style={{
                          '--tag-bg': `${project.color}18`,
                          '--tag-color': project.color,
                          '--tag-border': `${project.color}55`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className={`details-toggle ${showDetails ? 'is-open' : ''}`}
                    onClick={() => toggleDetails(project.id)}
                    aria-expanded={showDetails}
                  >
                    <span>Details</span>
                    <span className="toggle-icon">{showDetails ? '▲' : '▼'}</span>
                  </button>

                  <AnimatePresence initial={false}>
                    {showDetails && (
                      <motion.div
                        key="details"
                        className="project-details"
                        variants={detailsVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                      >
                        <ul>
                          {project.longDescription.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="project-actions">
                    {hasMainUrl ? (
                      <a
                        href={mainUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Main Site"
                        data-tooltip="Live Site"
                        className="action-btn"
                      >
                        <FiExternalLink />
                      </a>
                    ) : (
                      <button type="button" disabled aria-label="Coming Soon" data-tooltip="Coming Soon" className="action-btn">
                        <FiExternalLink />
                      </button>
                    )}

                    {hasPromoUrl ? (
                      <a
                        href={promoUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Promo Site"
                        data-tooltip="Promo Site"
                        className="action-btn"
                      >
                        <FiGithub />
                      </a>
                    ) : (
                      <button type="button" disabled aria-label="Coming Soon" data-tooltip="Coming Soon" className="action-btn">
                        <FiGithub />
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
