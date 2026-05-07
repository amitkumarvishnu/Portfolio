import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Skills from './components/Skills'
import './styles/about.css'
import './styles/app.css'
import './styles/contact.css'
import './styles/footer.css'
import './styles/hero.css'
import './styles/navbar.css'
import './styles/polish.css'
import './styles/projects.css'
import './styles/skills.css'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const cursorRef = useRef(null)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    const supportsHover = !window.matchMedia('(hover: none)').matches
    const cursor = cursorRef.current
    if (!cursor || !supportsHover) {
      if (cursor) cursor.style.display = 'none'
      return undefined
    }

    const hoverables = document.querySelectorAll('a, button')
    hoverables.forEach((el) => el.classList.add('hoverable'))

    let rafId = null
    const moveCursor = (x, y) => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${x - 6}px, ${y - 6}px, 0)`
      })
    }

    const handleMouseMove = (event) => moveCursor(event.clientX, event.clientY)
    const handleMouseOver = (event) => {
      if (event.target.closest('.hoverable')) {
        cursor.classList.add('cursor-expanded')
      }
    }
    const handleMouseOut = (event) => {
      if (event.target.closest('.hoverable')) {
        cursor.classList.remove('cursor-expanded')
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="page-loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              AK
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="custom-cursor" ref={cursorRef} aria-hidden="true" />

      <div id="smooth-wrapper">
        <Navbar />

        <div className="app">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  )
}
