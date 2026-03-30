import { useEffect, useRef, useState } from 'react'

const INITIAL_LINES = [
  'Microsoft Windows [Version 10.0.19045.6466]',
  '(c) Microsoft Corporation. All rights reserved.',
  '',
  "'404' is not recognized as an internal or external command.",
  'Type "npm run dev" to get the portfolio running again.',
  '',
]

function NotFoundPage({ onNavigate }) {
  const [input, setInput] = useState('')
  const [lines, setLines] = useState(INITIAL_LINES)
  const inputRef = useRef(null)
  const scrollRef = useRef(null)
  const redirectTimeoutRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()

    return () => {
      if (redirectTimeoutRef.current) {
        window.clearTimeout(redirectTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const scrollElement = scrollRef.current

    if (!scrollElement) {
      return
    }

    scrollElement.scrollTop = scrollElement.scrollHeight
  }, [lines])

  function focusInput() {
    inputRef.current?.focus()
  }

  function handleSubmit(event) {
    event.preventDefault()

    const normalizedInput = input.trim()
    const commandLine = `C:\\Users\\wrong>${normalizedInput || ''}`

    if (!normalizedInput) {
      setLines((currentLines) => [...currentLines, commandLine, ''])
      return
    }

    if (redirectTimeoutRef.current) {
      window.clearTimeout(redirectTimeoutRef.current)
      redirectTimeoutRef.current = null
    }

    if (normalizedInput === 'npm run dev') {
      setLines((currentLines) => [
        ...currentLines,
        commandLine,
        '',
        '> portfolio@0.0.0 dev',
        '> vite',
        '',
        'Local:   http://localhost:5173/',
        'Opening portfolio...',
        '',
      ])
      setInput('')
      redirectTimeoutRef.current = window.setTimeout(() => {
        onNavigate('home')
      }, 900)
      return
    }

    if (normalizedInput === 'help') {
      setLines((currentLines) => [
        ...currentLines,
        commandLine,
        'Hint: the correct command is "npm run dev".',
        '',
      ])
      setInput('')
      return
    }

    setLines((currentLines) => [
      ...currentLines,
      commandLine,
      `'${normalizedInput}' is not recognized as an internal or external command,`,
      'operable program or batch file.',
      'Hint: try "npm run dev".',
      '',
    ])
    setInput('')
  }

  return (
    <section className="section-shell flex min-h-screen items-center py-0 sm:py-5">
      <div className="mx-auto flex h-full w-full max-w-5xl px-0 sm:px-6 lg:px-8">
        <div
          className="terminal-shell mx-auto flex h-screen w-full flex-col overflow-hidden border-0 bg-[#05070d] shadow-none sm:h-[min(70vh,42rem)] sm:rounded-[1.4rem] sm:border sm:border-white/10 sm:bg-[#05070d]/96 sm:shadow-[0_24px_80px_rgba(0,0,0,0.42)]"
          onClick={focusInput}
          role="presentation"
        >
          <div className="flex items-center justify-between border-b border-white/8 bg-white/[0.04] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#fb7185]" />
              <span className="h-3 w-3 rounded-full bg-[#fbbf24]" />
              <span className="h-3 w-3 rounded-full bg-[#4ade80]" />
            </div>
            <p className="text-[0.72rem] uppercase tracking-[0.18em] text-stone-400">
              404 Terminal
            </p>
          </div>

          <div
            ref={scrollRef}
            className="h-0 min-h-0 flex-1 overflow-auto bg-[#05070d] px-4 py-5 font-mono text-[0.94rem] leading-7 text-stone-100 sm:px-6 sm:py-6"
          >
            {lines.map((line, index) => (
              <p
                key={`${line}-${index}`}
                className={line === '' ? 'h-4 sm:h-5' : 'whitespace-pre-wrap break-words'}
              >
                {line}
              </p>
            ))}

            <form onSubmit={handleSubmit} className="flex items-start gap-0">
              <label htmlFor="terminal-command" className="shrink-0 whitespace-pre text-stone-100">
                C:\Users\wrong&gt;
              </label>
              <div className="flex-1">
                <input
                  id="terminal-command"
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  className="w-full border-0 bg-transparent px-0 text-stone-100 outline-none"
                  aria-label='Terminal command input. Type "npm run dev" to go home.'
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
