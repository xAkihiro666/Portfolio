import { useEffect, useState } from 'react'
import SectionNavigator from '../components/SectionNavigator.jsx'

const profile = [
  {
    label: 'Name',
    value: 'Jude Vincent S. Lutao',
  },
  {
    label: 'Program',
    value: 'Bachelor of Science in Computer Engineering',
  },
  {
    label: 'School',
    value: 'Cebu Technological University - Danao Campus',
  },
  {
    label: 'Email',
    value: 'judevincent74@yahoo.com',
    href: 'mailto:judevincent74@yahoo.com',
  },
  {
    label: 'Phone Number',
    value: '+63 977 345 7593',
  },
]

const technicalSkills = [
  'C',
  'C++',
  'Java',
  'JavaScript',
  'HTML/CSS',
  'React',
  'Tailwind CSS',
  'Responsive Design',
  'Node.js',
  'Express.js',
  'Arduino',
  'ESP32',
  'Git',
  'GitHub',
]

const tools = [
  { label: 'VS Code' },
  { label: 'Vercel' },
  { label: 'Netlify' },
  { label: 'Firebase' },
  { label: 'npm' },
  {
    label: 'AI Tools',
    items: ['ChatGPT', 'Codex', 'GitHub Copilot'],
  },
]

const certificates = [
  {
    title: 'Creative Web Design',
    meta: '102 hours',
  },
  {
    title: 'Java Programming',
    meta: 'NC III',
  },
  {
    title: 'Git Good at Version Control',
    meta: 'ICpEP.SE Seminar 2023',
  },
]

const recognitions = [
  {
    title: 'National Programming Challenge',
    tags: [
      { label: 'Participant', tone: 'status' },
      { label: '2024', tone: 'date' },
    ],
  },
  {
    title: 'Robomania',
    tags: [
      { label: 'Participant', tone: 'status' },
      { label: '2023', tone: 'date' },
    ],
  },
  {
    title: 'Robotek Interschool Competition',
    tags: [
      { label: 'Participant', tone: 'status' },
      { label: '2019', tone: 'date' },
    ],
  },
  {
    title: 'Clash of Codes, C++ Category',
    tags: [
      { label: 'Third Place', tone: 'highlight' },
      { label: '2023', tone: 'date' },
    ],
  },
  {
    title: 'ICpEP.SE Technical Committee',
    tags: [{ label: 'A.Y. 2024-2025', tone: 'date' }],
  },
]

const sections = [
  { id: 'about-overview', label: 'Overview' },
  { id: 'about-certificates', label: 'Certificates' },
]

function AboutPage() {
  const [activeSection, setActiveSection] = useState('about-overview')

  useEffect(() => {
    const sectionIds = sections.map((section) => section.id)
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    const sectionRatios = new Map(sectionIds.map((id) => [id, 0]))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionRatios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          )
        })

        const nextActiveSection = [...sectionRatios.entries()]
          .sort((a, b) => b[1] - a[1])[0]?.[0]

        if (nextActiveSection) {
          setActiveSection(nextActiveSection)
        }
      },
      {
        threshold: [0.15, 0.3, 0.45, 0.6, 0.75, 0.9],
        rootMargin: '-12% 0px -18% 0px',
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const aboutEnterItems = document.querySelectorAll('[data-about-enter]')

    if (!aboutEnterItems.length) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            'is-visible',
            entry.intersectionRatio > 0.08,
          )
        })
      },
      {
        threshold: [0, 0.08, 0.18, 0.3],
        rootMargin: '0px 0px -6% 0px',
      },
    )

    aboutEnterItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-about-reveal]')

    if (!revealItems.length) {
      return undefined
    }

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

  function handleNavigate(sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  function getRecognitionTagClasses(tone) {
    switch (tone) {
      case 'date':
        return 'border-cyan-400/20 text-cyan-200'
      case 'highlight':
        return 'border-amber-400/20 text-amber-200'
      default:
        return 'border-white/12 text-stone-300'
    }
  }

  return (
    <>
      <SectionNavigator
        activeSection={activeSection}
        onNavigate={handleNavigate}
        sections={sections}
      />

      <section
        id="about-overview"
        className="section-shell flex min-h-[calc(100vh-7rem)] scroll-mt-28 items-center py-8 sm:py-10 md:scroll-mt-32 md:py-12"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:px-8">
          <div
            className="about-enter order-2 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:p-10 md:p-12 lg:order-1"
            data-about-enter
          >
            <p className="text-[0.82rem] uppercase tracking-[0.28em] text-stone-400">
              About
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl leading-tight tracking-[-0.05em] text-stone-50 sm:text-5xl md:text-6xl">
              Frontend Developer
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-stone-300 sm:text-lg">
              I am Jude Vincent S. Lutao. What draws me to frontend development
              is seeing ideas and planned designs turn into real, working
              interfaces. That process keeps me engaged because each decision in
              layout, styling, and interaction becomes something visible and
              tangible on screen.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-8 text-stone-400 sm:text-lg">
              Before focusing more on frontend work, I built Discord bots using
              Node.js and Express.js, which strengthened my interest in how
              software behaves in real use. I want to keep gaining hands-on
              experience in programming, web development, and technical support
              while applying my skills in software development, embedded
              systems, and problem solving in a real-world work environment.
            </p>
          </div>

          <div
            className="about-enter order-1 rounded-[1.75rem] border border-white/10 bg-[#050914]/85 p-7 shadow-[0_24px_60px_rgba(0,0,0,0.18)] lg:order-2"
            data-about-enter
            style={{ transitionDelay: '110ms' }}
          >
            <p className="text-[0.76rem] uppercase tracking-[0.24em] text-stone-500">
              Personal Information
            </p>
            <div className="mt-5 space-y-4">
              {profile.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] px-4 py-4"
                >
                  <p className="text-[0.7rem] uppercase tracking-[0.22em] text-stone-500">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-2 inline-block text-sm leading-7 text-stone-300 transition-colors duration-200 hover:text-stone-50"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-2 text-sm leading-7 text-stone-300">
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div
            className="about-enter order-3 lg:order-3 lg:col-span-2 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.14)] sm:p-8"
            data-about-enter
            style={{ transitionDelay: '190ms' }}
          >
            <p className="text-[0.76rem] uppercase tracking-[0.24em] text-stone-500">
              Technical Skills
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {technicalSkills.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-[#3f4558] bg-[#2b2f3a] px-4 py-2 text-sm tracking-[0.01em] text-stone-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 border-t border-white/8 pt-6">
              <p className="text-[0.76rem] uppercase tracking-[0.24em] text-stone-500">
                Tools
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {tools.map((item) => (
                  item.items ? (
                    <div key={item.label} className="group relative">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-full border border-cyan-400/30 bg-[linear-gradient(135deg,rgba(12,74,110,0.95),rgba(67,56,202,0.88))] px-4 py-2 text-sm tracking-[0.01em] text-cyan-50 shadow-[0_10px_26px_rgba(34,211,238,0.16),inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/45 hover:shadow-[0_14px_30px_rgba(34,211,238,0.24),inset_0_1px_0_rgba(255,255,255,0.18)] focus-visible:-translate-y-0.5 focus-visible:border-cyan-300/45 focus-visible:shadow-[0_14px_30px_rgba(34,211,238,0.24),inset_0_1px_0_rgba(255,255,255,0.18)] focus-visible:outline-none"
                        aria-label="AI Tools"
                      >
                        {item.label}
                      </button>

                      <div className="pointer-events-none absolute bottom-[calc(100%+0.85rem)] left-1/2 z-20 w-max min-w-[10rem] -translate-x-1/2 rounded-[1rem] border border-cyan-300/18 bg-[#09111f]/96 px-4 py-3 opacity-0 shadow-[0_18px_45px_rgba(2,12,27,0.48)] transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                        <p className="text-[0.66rem] uppercase tracking-[0.2em] text-cyan-300/80">
                          AI Tools I Use
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.items.map((tool) => (
                            <span
                              key={tool}
                              className="rounded-full border border-cyan-300/12 bg-cyan-400/8 px-3 py-1 text-[0.72rem] uppercase tracking-[0.14em] text-stone-100"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                        <span
                          className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-cyan-300/18 bg-[#09111f]/96"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  ) : (
                    <span
                      key={item.label}
                      className="inline-flex items-center rounded-full border border-[#3f4558] bg-[#2b2f3a] px-4 py-2 text-sm tracking-[0.01em] text-stone-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                    >
                      {item.label}
                    </span>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about-certificates"
        className="section-shell flex min-h-[calc(100vh-7rem)] scroll-mt-28 items-start py-8 sm:py-10 md:scroll-mt-32 md:py-12"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            className="about-enter rounded-[1.75rem] border border-white/10 p-7 sm:p-8"
            data-about-enter
            style={{ transitionDelay: '280ms' }}
          >
            <div
              className="reveal-item max-w-3xl"
              data-about-reveal
              style={{ transitionDelay: '80ms' }}
            >
              <p className="text-[0.76rem] uppercase tracking-[0.24em] text-stone-500">
                Certificates
              </p>
              <h2 className="mt-5 text-3xl leading-tight tracking-[-0.05em] text-stone-50 sm:text-4xl md:text-5xl">
                Credentials and Recognition
              </h2>
              <p className="mt-5 text-sm leading-7 text-stone-300 sm:text-base">
                This section highlights formal certificates, seminar-based
                learning, and competition or organization involvement that
                support my technical growth.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div
                className="reveal-item rounded-[1.1rem] border border-white/8 px-4 py-4"
                data-about-reveal
                style={{ transitionDelay: '150ms' }}
              >
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-stone-500">
                  Certificates
                </p>
                <p className="mt-2 text-2xl tracking-[-0.04em] text-stone-100">
                  {certificates.length}
                </p>
              </div>
              <div
                className="reveal-item rounded-[1.1rem] border border-white/8 px-4 py-4"
                data-about-reveal
                style={{ transitionDelay: '230ms' }}
              >
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-stone-500">
                  Activities
                </p>
                <p className="mt-2 text-2xl tracking-[-0.04em] text-stone-100">
                  {recognitions.length}
                </p>
              </div>
              <div
                className="reveal-item rounded-[1.1rem] border border-white/8 px-4 py-4"
                data-about-reveal
                style={{ transitionDelay: '310ms' }}
              >
                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-stone-500">
                  Focus
                </p>
                <p className="mt-2 text-sm leading-7 text-stone-200">
                  Web, programming, competitions, and technical involvement.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
              <div
                className="reveal-item rounded-[1.5rem] border border-white/10 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)] sm:p-7"
                data-about-reveal
                style={{ transitionDelay: '340ms' }}
              >
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-stone-500">
                  Certificates
                </p>
                <div className="mt-5 grid gap-4">
                  {certificates.map((certificate) => (
                    <div
                      key={certificate.title}
                      className="rounded-[1.1rem] border border-white/8 px-4 py-4"
                    >
                      <p className="text-[0.68rem] uppercase tracking-[0.2em] text-stone-500">
                        Credential
                      </p>
                      <h3 className="mt-2 text-lg tracking-[-0.03em] text-stone-100">
                        {certificate.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-stone-300">
                        {certificate.meta}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="reveal-item rounded-[1.5rem] border border-white/10 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)] sm:p-7"
                data-about-reveal
                style={{ transitionDelay: '400ms' }}
              >
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-stone-500">
                  Activities and Recognition
                </p>
                <div className="mt-5 grid gap-3">
                  {recognitions.map((item) => (
                    <div
                      key={`${item.title}-${item.tags.map((tag) => tag.label).join('-')}`}
                      className="rounded-[1rem] border border-white/8 px-4 py-4"
                    >
                      <div className="flex flex-col gap-3">
                        <p className="text-sm leading-7 text-stone-200">
                          {item.title}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.tags?.map((tag) => (
                            <span
                              key={`${item.title}-${tag.label}`}
                              className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.66rem] uppercase tracking-[0.16em] ${getRecognitionTagClasses(tag.tone)}`}
                            >
                              {tag.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutPage
