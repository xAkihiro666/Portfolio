function SectionNavigator({ activeSection, onNavigate, sections }) {
  return (
    <aside className="fixed bottom-6 left-1/2 z-20 -translate-x-1/2 lg:bottom-auto lg:left-auto lg:right-4 lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2">
      <div className="flex items-center gap-3 rounded-full border border-white/8 bg-[rgba(5,9,20,0.72)] px-4 py-3 backdrop-blur-sm lg:gap-4 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
        <div className="h-px w-16 bg-white/12 lg:h-28 lg:w-px" aria-hidden="true" />
        <div className="flex items-center gap-4 lg:flex-col lg:gap-5">
          {sections.map((section) => {
            const isActive = activeSection === section.id

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onNavigate(section.id)}
                className="group flex h-8 w-8 items-center justify-center text-left lg:h-auto lg:w-auto"
                aria-pressed={isActive}
                aria-label={`Go to ${section.label}`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 lg:h-3 lg:w-3 ${
                    isActive
                      ? 'scale-110 border-stone-50 bg-stone-50 shadow-[0_0_12px_rgba(255,255,255,0.45)] lg:shadow-[0_0_18px_rgba(255,255,255,0.45)]'
                      : 'border-white/25 bg-transparent group-hover:border-stone-300'
                  }`}
                />
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}

export default SectionNavigator
