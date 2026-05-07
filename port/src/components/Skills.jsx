import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  SiBootstrap,
  SiCloudinary,
  SiCss,
  SiExpress,
  SiFirebase,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiSocketdotio,
  SiTypescript,
} from 'react-icons/si'
import { skills } from '../data/portfolioData'

const tabs = ['All', 'Frontend', 'Backend', 'Database', 'Cloud']

const iconMap = {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiRedux,
  SiHtml5,
  SiCss3: SiCss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiSocketdotio,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiAmazonaws: SiCloudinary,
  SiCloudinary,
  SiGit,
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: 'easeOut',
    },
  },
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('All')

  const filteredSkills = useMemo(() => {
    if (activeTab === 'All') return skills
    return skills.filter((skill) => skill.category === activeTab)
  }, [activeTab])

  return (
    <section id="skills" className="skills">
      <div className="skills-inner">
        <h2>Tech Stack</h2>

        <div className="skills-tabs" role="tablist" aria-label="Skill categories">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`skills-tab ${activeTab === tab ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {filteredSkills.map((skill) => {
            const Icon = iconMap[skill.icon] || SiGit

            return (
              <motion.article key={`${skill.name}-${skill.category}`} className="skill-card" variants={cardVariants}>
                <Icon className="skill-icon" aria-hidden="true" />
                <p>{skill.name}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
