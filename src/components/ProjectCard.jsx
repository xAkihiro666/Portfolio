function ProjectCard({ project, transitionDelay, onSelect }) {
  return (
    <article
      className="project-card reveal-item rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
      data-reveal
      style={{ transitionDelay }}
    >
      <div className="group block">
        <div className="project-media relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-dashed border-white/12 bg-[#060914] transition-colors duration-300 group-hover:border-white/25">
          <div className="absolute inset-x-0 top-0 z-20 flex h-10 items-center gap-2 border-b border-white/10 bg-[rgba(5,8,18,0.82)] px-4">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#f87171]" />
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#fbbf24]" />
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#34d399]" />
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
            onClick={() => onSelect(project)}
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

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-5">
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
  )
}

export default ProjectCard
