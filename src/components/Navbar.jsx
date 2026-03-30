import { useEffect, useState } from 'react'
import { LuX } from 'react-icons/lu'
import LogoMark from './LogoMark.jsx'

function Navbar({ activeItem, elevated, onNavigate }) {
  const items = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
  ]
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [activeItem])

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  function handleItemClick(itemId) {
    setIsMenuOpen(false)
    onNavigate(itemId)
  }

  return (
    <header className="navbar-wrap">
      <nav
        className={`navbar-shell text-stone-100 ${
          elevated ? 'is-elevated' : ''
        }`}
        aria-label="Primary"
      >
        <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-stone-100 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.06] lg:hidden"
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span className="h-px w-4 bg-current" />
              <span className="h-px w-4 bg-current" />
              <span className="h-px w-4 bg-current" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="absolute left-1/2 -translate-x-1/2 text-stone-50 transition-opacity duration-200 hover:opacity-80 lg:static lg:translate-x-0"
            aria-label="JVL"
          >
            <LogoMark className="h-[60px] w-[160px]" />
          </button>

          <div className="h-11 w-11 lg:hidden" aria-hidden="true" />

          <ul className="hidden items-center gap-8 text-[0.9rem] uppercase tracking-[0.12em] text-[#8b8b8b] sm:gap-10 lg:flex lg:gap-14">
            {items.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => handleItemClick(item.id)}
                  className={`py-2 hover:text-stone-50 ${
                    activeItem === item.id ? 'active text-stone-50' : ''
                  }`}
                  aria-current={activeItem === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-30 bg-[rgba(2,6,16,0.58)] transition-opacity duration-300 lg:hidden ${
          isMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-navigation"
        className={`fixed inset-y-0 left-0 z-40 flex w-[min(19rem,82vw)] flex-col border-r border-white/10 bg-[#050914] px-5 py-5 shadow-[0_24px_80px_rgba(0,0,0,0.42)] transition-transform duration-300 ease-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex items-center justify-between">
          <p className="text-[0.7rem] uppercase tracking-[0.24em] text-stone-500">
            Navigation
          </p>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-stone-100 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.06]"
            aria-label="Close navigation menu"
          >
            <LuX className="text-lg" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-2">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleItemClick(item.id)}
              className={`flex items-center justify-between px-1 py-4 text-left text-sm uppercase tracking-[0.16em] transition-colors duration-200 ${
                activeItem === item.id
                  ? 'text-stone-50'
                  : 'text-stone-300 hover:text-stone-50'
              }`}
              aria-current={activeItem === item.id ? 'page' : undefined}
            >
              <span>{item.label}</span>
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  activeItem === item.id ? 'bg-stone-50' : 'bg-white/18'
                }`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </aside>
    </header>
  )
}

export default Navbar
