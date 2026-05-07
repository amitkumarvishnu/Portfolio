import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { projects } from '../data/portfolioData'

const filters = ['All', 'Full Stack', 'Frontend', 'UI/UX']

const detailsVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    overflow: 'hidden',
    transition: { duration: 0.22, ease: 'easeOut' },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    overflow: 'hidden',
    transition: { duration: 0.22, ease: 'easeOut' },
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
          {filteredProjects.map((project) => {
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
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <div
                  className="project-banner"
                  style={{
                    background: `linear-gradient(140deg, ${project.color}33 0%, transparent 70%)`,
                  }}
                >
                  <h3>{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <span className="project-duration">{project.duration}</span>
                </div>

                <div className="project-body">
                  <p>{project.description}</p>

                  <div className="project-tags">
                    {project.stack.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: `${project.color}26`,
                          color: project.color,
                          borderColor: `${project.color}66`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="details-toggle"
                    onClick={() => toggleDetails(project.id)}
                    aria-expanded={showDetails}
                  >
                    Details {showDetails ? '▲' : '▼'}
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
                        data-tooltip="Main Site"
                      >
                        <FiExternalLink />
                      </a>
                    ) : (
                      <button type="button" disabled aria-label="Coming Soon" data-tooltip="Coming Soon">
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
                      >
                        <FiGithub />
                      </a>
                    ) : (
                      <button type="button" disabled aria-label="Coming Soon" data-tooltip="Coming Soon">
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
