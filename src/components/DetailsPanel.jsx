import { LuExpand, LuLink, LuX } from 'react-icons/lu'

function DetailsPanel({
  project,
  isOpen,
  onClose,
  onExpandImage,
}) {
  return (
    <aside
      className={`fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col border-l border-white/10 bg-[#050914] shadow-[0_24px_80px_rgba(0,0,0,0.42)] transition-transform duration-300 ease-out sm:w-[28rem] ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      aria-hidden={!isOpen}
    >
      {project && (
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="flex items-start justify-between gap-4 px-6 pt-6">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.24em] text-stone-500">
                Project Details
              </p>
              <h3 className="mt-3 text-3xl tracking-[-0.05em] text-stone-50">
                {project.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-stone-100 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.06]"
              aria-label="Close project details"
            >
              <LuX className="text-lg" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 px-6">
            <div className="relative overflow-hidden rounded-[1.35rem] border border-white/8 bg-[#060914]">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="h-48 w-full object-cover object-top"
              />
              <button
                type="button"
                onClick={onExpandImage}
                className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-[rgba(5,8,18,0.76)] text-stone-100 transition-colors duration-200 hover:border-white/20 hover:bg-[rgba(5,8,18,0.9)]"
                aria-label={`Expand ${project.title} preview`}
              >
                <LuExpand className="text-base" aria-hidden="true" />
              </button>
            </div>
          </div>

          <p className="mt-6 px-6 text-sm leading-7 text-stone-300">
            {project.summary}
          </p>

          <div className="mt-6 grid gap-3 px-6 sm:grid-cols-2">
            <div className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] px-4 py-4">
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-stone-500">
                Role
              </p>
              <p className="mt-2 text-sm leading-7 text-stone-200">
                {project.role}
              </p>
            </div>
            <div className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] px-4 py-4">
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-stone-500">
                Date
              </p>
              <p className="mt-2 text-sm leading-7 text-stone-200">
                {project.date}
              </p>
            </div>
          </div>

          <div className="mt-6 px-6">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-stone-500">
              Tech Stack
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={`${project.title}-panel-${item}`}
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
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-stone-200 transition-colors duration-200 hover:text-stone-50"
            >
              <LuLink className="text-base" aria-hidden="true" />
              {project.href.replace(/^https?:\/\//, '')}
            </a>
          </div>
        </div>
      )}
    </aside>
  )
}

export default DetailsPanel
