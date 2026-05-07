import { memo, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-scroll'
import { AnimatePresence, motion } from 'framer-motion'
import { HiMenuAlt3 } from 'react-icons/hi'
import { personalInfo } from '../data/portfolioData'

const navItems = ['about', 'skills', 'projects', 'contact']

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const logoParts = useMemo(() => {
    const parts = personalInfo.name.trim().split(/\s+/)
    return {
      first: parts[0] || 'Amit',
      second: parts[1] || 'Kumar',
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setIsOpen(false)

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="hero" smooth={true} offset={-70} duration={500} className="navbar-logo" aria-label="Go to top" onClick={closeMenu}>
          <span className="logo-first">{logoParts.first}</span>
          <span className="logo-second">{logoParts.second}</span>
        </Link>

        <nav className="navbar-links" aria-label="Desktop Navigation">
          {navItems.map((item) => (
            <Link
              key={item}
              to={item}
              smooth={true}
              offset={-70}
              duration={500}
              className="navbar-link"
              onClick={closeMenu}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <HiMenuAlt3 />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            aria-label="Mobile Navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item}
                to={item}
                smooth={true}
                offset={-70}
                duration={500}
                className="mobile-link"
                onClick={closeMenu}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default memo(Navbar)
