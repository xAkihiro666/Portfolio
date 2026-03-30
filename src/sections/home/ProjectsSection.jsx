import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import compilerPreview from '../../assets/Compiler.webp'
import reliefMapPreview from '../../assets/Northern_Map.webp'
import swiftServePreview from '../../assets/POS_Kiosk.webp'
import myLifePreview from '../../assets/My_Life.webp'
import movieWatchlistPreview from '../../assets/Movie_Watchlist.webp'
import DetailsPanel from '../../components/DetailsPanel.jsx'
import ImageModal from '../../components/ImageModal.jsx'
import ProjectCard from '../../components/ProjectCard.jsx'

const projects = [
  {
    title: 'Compiler',
    href: 'https://aki-compiler.vercel.app',
    image: compilerPreview,
    role: 'Independent Developer',
    date: 'February 2026',
    stack: ['React', 'TypeScript', 'Express.js'],
    summary:
      'A document utility focused on keeping PDF and DOCX processing in one cleaner web workflow, built independently with support from AI assistive tools.',
  },
  {
    title: 'Relief Map',
    href: 'https://northerncebu-reliefmap.netlify.app',
    image: reliefMapPreview,
    role: 'Frontend Developer',
    date: 'October 2025',
    stack: ['Vanilla JS', 'HTML', 'CSS', 'Firebase'],
    summary:
      'A Northern Cebu mapping project centered on location visibility, reporting, and live data support.',
  },
  {
    title: 'SwiftServe POS',
    href: 'https://swiftserve-pos-blush.vercel.app/',
    image: swiftServePreview,
    role: 'Independent Developer',
    date: 'January 2026',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    summary:
      'A point-of-sale interface concept focused on cleaner ordering and transaction handling, built as a personal project with support from AI assistive tools.',
  },
  {
    title: 'My Life',
    href: 'https://xakihiro666.github.io/A6/',
    image: myLifePreview,
    role: 'Independent Developer',
    date: 'March 2025',
    stack: ['HTML', 'CSS', 'JavaScript'],
    summary:
      'A personal storytelling page presenting a more expressive and visual snapshot of life moments.',
  },
  {
    title: 'Movie Watchlist',
    href: 'https://movie-watchlist-weld.vercel.app',
    image: movieWatchlistPreview,
    role: 'Independent Developer',
    date: 'March 2026',
    stack: ['React', 'TypeScript', 'CSS'],
    summary:
      'A simple watchlist app for tracking movies through a clean interactive interface.',
  },
]

function ProjectsSection() {
  const sectionRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isImageExpanded, setIsImageExpanded] = useState(false)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return undefined
    }

    const revealItems = section.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting)
        })
      },
      {
        threshold: 0.2,
        rootMargin: '-6% 0px -10% 0px',
      },
    )

    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!selectedProject) {
      setIsImageExpanded(false)
      return undefined
    }

    const previousOverflow = document.body.style.overflow

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        if (isImageExpanded) {
          setIsImageExpanded(false)
          return
        }

        setSelectedProject(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isImageExpanded, selectedProject])

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="section-shell second_section flex min-h-screen scroll-mt-28 items-center py-18 sm:py-20 md:scroll-mt-32 md:py-24"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="reveal-item mb-12 max-w-2xl" data-reveal>
            <p className="mb-5 text-[0.82rem] uppercase tracking-[0.28em] text-stone-400">
              Projects
            </p>
            <h2 className="text-4xl leading-tight tracking-[-0.05em] text-stone-50 sm:text-5xl md:text-6xl">
              Featuring
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-stone-400 sm:text-lg">
              Some projects that I have created and contributed to.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                transitionDelay={`${90 + index * 90}ms`}
                onSelect={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </section>

      {typeof document !== 'undefined' &&
        createPortal(
          <>
            <div
              className={`fixed inset-0 z-[70] bg-[rgba(2,6,16,0.58)] transition-opacity duration-300 ${
                selectedProject
                  ? 'pointer-events-auto opacity-100'
                  : 'pointer-events-none opacity-0'
              }`}
              onClick={() => setSelectedProject(null)}
              aria-hidden="true"
            />

            <DetailsPanel
              project={selectedProject}
              isOpen={Boolean(selectedProject)}
              onClose={() => setSelectedProject(null)}
              onExpandImage={() => setIsImageExpanded(true)}
            />

            <ImageModal
              project={selectedProject}
              isOpen={isImageExpanded}
              onClose={() => setIsImageExpanded(false)}
            />
          </>,
          document.body,
        )}
    </>
  )
}

export default ProjectsSection
