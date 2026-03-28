import { useEffect, useRef, useState } from 'react'
import { LuMoveRight } from 'react-icons/lu'
import Socials from './Socials.jsx'

const initialName = 'Jude Vincent Lutao'
const finalName = 'Jude Vincent S. Lutao'
const rewritePrefix = 'Jude Vincent '
const rewriteSuffix = 'S. Lutao'

function FirstSection() {
  const sectionRef = useRef(null)
  const [displayName, setDisplayName] = useState(initialName)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return undefined
    }

    const revealItems = section.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      setDisplayName(finalName)
      return undefined
    }

    let timeoutId
    let step = 0

    function eraseLastName() {
      if (step < initialName.length - rewritePrefix.length) {
        const nextLength = initialName.length - step - 1
        setDisplayName(initialName.slice(0, nextLength))
        step += 1
        timeoutId = window.setTimeout(eraseLastName, 85)
        return
      }

      step = 0
      timeoutId = window.setTimeout(typeFinalName, 140)
    }

    function typeFinalName() {
      if (step < rewriteSuffix.length) {
        setDisplayName(rewritePrefix + rewriteSuffix.slice(0, step + 1))
        step += 1
        timeoutId = window.setTimeout(typeFinalName, 95)
        return
      }

      setDisplayName(finalName)
    }

    timeoutId = window.setTimeout(eraseLastName, 2000)

    return () => window.clearTimeout(timeoutId)
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="section-shell first_section flex min-h-[calc(100vh-7rem)] scroll-mt-28 items-center md:scroll-mt-32"
    >
      <div className="mx-auto flex w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl py-14 sm:py-18 md:py-24">
          <div
            className="reveal-item group mb-5 inline-flex cursor-pointer items-center gap-3 text-stone-400"
            data-reveal
            style={{ transitionDelay: '120ms' }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-stone-300 transition-colors duration-300 group-hover:border-white/20 group-hover:text-stone-50 sm:h-8 sm:w-8">
              <LuMoveRight className="text-base sm:text-sm" aria-hidden="true" />
            </span>
            <span className="relative h-[1.5rem] overflow-hidden text-[0.92rem] uppercase tracking-[0.22em] sm:h-[1.35rem] sm:text-[0.82rem] sm:tracking-[0.28em]">
              <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
                <span className="h-[1.5rem] sm:h-[1.35rem]">Frontend Developer</span>
                <span className="h-[1.5rem] text-stone-200 sm:h-[1.35rem]">
                  Computer Engineering
                </span>
              </span>
            </span>
          </div>
          <h1
            className="reveal-item text-[3.6rem] leading-[0.92] tracking-[-0.07em] text-stone-50 sm:text-6xl md:text-7xl lg:text-[6.25rem]"
            data-reveal
            style={{ transitionDelay: '240ms' }}
          >
            {displayName}
            <span className="hero-caret" aria-hidden="true">
              |
            </span>
          </h1>
          <div
            className="reveal-item"
            data-reveal
            style={{ transitionDelay: '360ms' }}
          >
            <Socials />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FirstSection
