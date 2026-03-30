import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import AboutPage from './pages/AboutPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import './App.css'

const ROUTE_PATHS = {
  home: '/',
  about: '/about',
}

function getRouteFromLocation() {
  if (typeof window === 'undefined') {
    return 'home'
  }

  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'

  if (pathname === '/') {
    return 'home'
  }

  if (pathname === '/about') {
    return 'about'
  }

  return 'not-found'
}

function App() {
  const [route, setRoute] = useState(getRouteFromLocation)
  const [isNavbarElevated, setIsNavbarElevated] = useState(false)

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(
        { route: getRouteFromLocation() },
        '',
        window.location.pathname + window.location.search,
      )
    }

    function syncRoute() {
      setRoute(getRouteFromLocation())
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
    const nextPath = ROUTE_PATHS[nextRoute]

    setRoute(nextRoute)
    window.history.pushState(
      { route: nextRoute },
      '',
      nextPath + window.location.search,
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
      {route !== 'not-found' && (
        <Navbar
          elevated={isNavbarElevated}
          activeItem={route}
          onNavigate={handleNavigate}
        />
      )}

      <main className="relative z-10 min-h-screen">
        {route === 'about' && <AboutPage />}
        {route === 'home' && <HomePage />}
        {route === 'not-found' && <NotFoundPage onNavigate={handleNavigate} />}
      </main>
    </div>
  )
}

export default App
