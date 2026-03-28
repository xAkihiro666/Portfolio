import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { LuExpand, LuLink, LuX } from 'react-icons/lu'
import compilerPreview from '../assets/Compiler.webp'
import reliefMapPreview from '../assets/Northern_Map.webp'
import swiftServePreview from '../assets/POS_Kiosk.webp'
import myLifePreview from '../assets/My_Life.webp'
import movieWatchlistPreview from '../assets/Movie_Watchlist.webp'

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

function SecondSection() {
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
              <article
                key={project.title}
                className="project-card reveal-item rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
                data-reveal
                style={{ transitionDelay: `${90 + index * 90}ms` }}
              >
                <div className="group block">
                  <div className="project-media relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-dashed border-white/12 bg-[#060914] transition-colors duration-300 group-hover:border-white/25">
                    <div className="absolute inset-x-0 top-0 z-20 flex h-10 items-center gap-2 border-b border-white/10 bg-[rgba(5,8,18,0.82)] px-4">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]" />
                      {project.href ? (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 truncate text-[0.68rem] uppercase tracking-[0.24em] text-stone-400 transition-colors duration-200 hover:text-stone-100"
                        >
                          {project.href.replace(/^https?:\/\//, '')}
                        </a>
                      ) : (
                        <p className="ml-2 truncate text-[0.68rem] uppercase tracking-[0.24em] text-stone-400">
                          {''}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="absolute inset-x-0 top-10 bottom-0 cursor-pointer overflow-hidden text-left"
                      aria-label={`Open ${project.title} details`}
                    >
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,9,20,0)_40%,rgba(6,9,20,0.82)_100%)]" />
                      <div className="absolute inset-0 bg-[rgba(4,7,16,0.82)] opacity-100 transition-opacity duration-300 ease-out md:opacity-0 md:group-hover:opacity-100" />
                      <div className="absolute inset-x-0 bottom-0 z-10 hidden p-5 opacity-0 transition-opacity duration-300 ease-out md:block md:group-hover:opacity-100">
                        <p className="text-[0.68rem] uppercase tracking-[0.24em] text-stone-400">
                          Tech Stack
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.stack.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-white/12 bg-white/[0.08] px-3 py-1 text-[0.72rem] uppercase tracking-[0.14em] text-stone-200"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                        <h3 className="mt-5 text-2xl tracking-[-0.04em] text-stone-100">
                          {project.title}
                        </h3>
                      </div>
                    </button>

                    <div className="absolute inset-x-0 bottom-0 z-20 p-5">
                      <div className="mb-4 flex flex-wrap gap-2 md:hidden">
                        {project.stack.map((item) => (
                          <span
                            key={`${project.title}-${item}`}
                            className="rounded-full border border-white/12 bg-white/[0.08] px-3 py-1 text-[0.72rem] uppercase tracking-[0.14em] text-stone-200"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-2xl tracking-[-0.04em] text-stone-100 transition-opacity duration-300 ease-out md:group-hover:opacity-0">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </article>
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

            <aside
              className={`fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col border-l border-white/10 bg-[#050914] shadow-[0_24px_80px_rgba(0,0,0,0.42)] transition-transform duration-300 ease-out sm:w-[28rem] ${
                selectedProject ? 'translate-x-0' : 'translate-x-full'
              }`}
              aria-hidden={!selectedProject}
            >
              {selectedProject && (
                <div className="flex h-full flex-col overflow-y-auto">
                  <div className="flex items-start justify-between gap-4 px-6 pt-6">
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.24em] text-stone-500">
                        Project Details
                      </p>
                      <h3 className="mt-3 text-3xl tracking-[-0.05em] text-stone-50">
                        {selectedProject.title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-stone-100 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.06]"
                      aria-label="Close project details"
                    >
                      <LuX className="text-lg" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="mt-6 px-6">
                    <div className="relative overflow-hidden rounded-[1.35rem] border border-white/8 bg-[#060914]">
                      <img
                        src={selectedProject.image}
                        alt={`${selectedProject.title} preview`}
                        className="h-48 w-full object-cover object-top"
                      />
                      <button
                        type="button"
                        onClick={() => setIsImageExpanded(true)}
                        className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-[rgba(5,8,18,0.76)] text-stone-100 transition-colors duration-200 hover:border-white/20 hover:bg-[rgba(5,8,18,0.9)]"
                        aria-label={`Expand ${selectedProject.title} preview`}
                      >
                        <LuExpand className="text-base" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <p className="mt-6 px-6 text-sm leading-7 text-stone-300">
                    {selectedProject.summary}
                  </p>

                  <div className="mt-6 grid gap-3 px-6 sm:grid-cols-2">
                    <div className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                      <p className="text-[0.68rem] uppercase tracking-[0.2em] text-stone-500">
                        Role
                      </p>
                      <p className="mt-2 text-sm leading-7 text-stone-200">
                        {selectedProject.role}
                      </p>
                    </div>
                    <div className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                      <p className="text-[0.68rem] uppercase tracking-[0.2em] text-stone-500">
                        Date
                      </p>
                      <p className="mt-2 text-sm leading-7 text-stone-200">
                        {selectedProject.date}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 px-6">
                    <p className="text-[0.72rem] uppercase tracking-[0.22em] text-stone-500">
                      Tech Stack
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedProject.stack.map((item) => (
                        <span
                          key={`${selectedProject.title}-panel-${item}`}
                          className="rounded-full border border-white/12 bg-white/[0.08] px-3 py-1 text-[0.72rem] uppercase tracking-[0.14em] text-stone-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto border-t border-white/8 px-6 py-6">
                    <p className="text-[0.72rem] uppercase tracking-[0.22em] text-stone-500">
                      Live Site
                    </p>
                    <a
                      href={selectedProject.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-stone-200 transition-colors duration-200 hover:text-stone-50"
                    >
                      <LuLink className="text-base" aria-hidden="true" />
                      {selectedProject.href.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                </div>
              )}
            </aside>

            {selectedProject && isImageExpanded ? (
              <div
                className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(2,6,16,0.82)] px-4 py-6"
                onClick={() => setIsImageExpanded(false)}
                role="dialog"
                aria-modal="true"
                aria-label={`${selectedProject.title} expanded preview`}
              >
                <div
                  className="relative w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050914] shadow-[0_24px_80px_rgba(0,0,0,0.42)]"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setIsImageExpanded(false)}
                    className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-[rgba(5,8,18,0.8)] text-stone-100 transition-colors duration-200 hover:border-white/20 hover:bg-[rgba(5,8,18,0.92)]"
                    aria-label="Close expanded project preview"
                  >
                    <LuX className="text-lg" aria-hidden="true" />
                  </button>
                  <img
                    src={selectedProject.image}
                    alt={`${selectedProject.title} expanded preview`}
                    className="max-h-[85vh] w-full object-contain"
                  />
                </div>
              </div>
            ) : null}
          </>,
          document.body,
        )}
    </>
  )
}

export default SecondSection
