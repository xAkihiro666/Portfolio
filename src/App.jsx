import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import AboutPage from './pages/AboutPage.jsx'
import HomePage from './pages/HomePage.jsx'
import './App.css'

function getRouteFromHistory() {
  const route = window.history.state?.route

  return ['home', 'about'].includes(route) ? route : 'home'
}

function App() {
  const [route, setRoute] = useState(getRouteFromHistory)
  const [isNavbarElevated, setIsNavbarElevated] = useState(false)

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(
        { route: getRouteFromHistory() },
        '',
        window.location.pathname + window.location.search,
      )
    }

    function syncRoute() {
      setRoute(getRouteFromHistory())
    }

    window.addEventListener('popstate', syncRoute)

    return () => window.removeEventListener('popstate', syncRoute)
  }, [])

  useEffect(() => {
    let isElevated = false

    function syncNavbarState() {
      const nextIsElevated = window.scrollY > 24

      if (nextIsElevated !== isElevated) {
        isElevated = nextIsElevated
        setIsNavbarElevated(nextIsElevated)
      }
    }

    syncNavbarState()

    window.addEventListener('scroll', syncNavbarState, { passive: true })

    return () => {
      window.removeEventListener('scroll', syncNavbarState)
    }
  }, [])

  function handleNavigate(target) {
    const nextRoute = target === 'about' ? 'about' : 'home'

    setRoute(nextRoute)
    window.history.pushState(
      { route: nextRoute },
      '',
      window.location.pathname + window.location.search,
    )

    if (nextRoute === 'home') {
      window.requestAnimationFrame(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
      })
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="desk">
      <div className="desk_bg" aria-hidden="true" />
      <div className="desk_texture" aria-hidden="true" />
      <Navbar
        elevated={isNavbarElevated}
        activeItem={route}
        onNavigate={handleNavigate}
      />

      <main className="relative z-10 min-h-screen">
        {route === 'about' && <AboutPage />}
        {route === 'home' && <HomePage />}
      </main>
    </div>
  )
}

export default App
