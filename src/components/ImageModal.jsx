import { LuX } from 'react-icons/lu'

function ImageModal({ project, isOpen, onClose }) {
  if (!project || !isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(2,6,16,0.82)] px-4 py-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} expanded preview`}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050914] shadow-[0_24px_80px_rgba(0,0,0,0.42)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-[rgba(5,8,18,0.8)] text-stone-100 transition-colors duration-200 hover:border-white/20 hover:bg-[rgba(5,8,18,0.92)]"
          aria-label="Close expanded project preview"
        >
          <LuX className="text-lg" aria-hidden="true" />
        </button>
        <img
          src={project.image}
          alt={`${project.title} expanded preview`}
          className="max-h-[85vh] w-full object-contain"
        />
      </div>
    </div>
  )
}

export default ImageModal
