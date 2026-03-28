import { useEffect, useState } from 'react'
import FirstSection from '../components/FirstSection.jsx'
import SecondSection from '../components/SecondSection.jsx'
import SectionNavigator from '../components/SectionNavigator.jsx'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
]

function HomePage() {
  const [activeSection, setActiveSection] = useState('home')

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

  function handleNavigate(sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <SectionNavigator
        activeSection={activeSection}
        onNavigate={handleNavigate}
        sections={sections}
      />
      <FirstSection />
      <SecondSection />
    </>
  )
}

export default HomePage
