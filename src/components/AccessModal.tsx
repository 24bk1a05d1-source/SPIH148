import { useEffect, useState } from 'react'

export function AccessModal({
  open,
  onClose,
  mode,
}: {
  open: boolean
  onClose: () => void
  mode: 'sign-in' | 'create-account'
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const title = mode === 'sign-in' ? 'Sign in to ANVESH' : 'Create your ANVESH account'

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm anim-fade"
        onClick={onClose}
      />
      <div className="glass glow-border relative w-full max-w-md rounded-2xl p-8 anim-rise">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[var(--anv-mute)] transition hover:bg-white/5 hover:text-white"
        >
          ✕
        </button>
        <p className="mono text-xs uppercase tracking-[0.3em] text-[var(--anv-cyan-dim)]">
          Platform access
        </p>
        <h3 className="display mt-2 text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--anv-mute)]">
          The ANVESH evidence-intelligence workspace — Discover, Connect, and Verify — is being
          finalized and isn&apos;t open for account creation from this preview yet. Leave your
          email and we&apos;ll notify you the moment access opens.
        </p>
        <form
          className="mt-6 flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault()
            const form = e.currentTarget
            const email = (form.elements.namedItem('email') as HTMLInputElement)?.value
            if (email) {
              window.location.href = `mailto:hello@anvesh.ai?subject=${encodeURIComponent(
                'Early access request',
              )}&body=${encodeURIComponent(`Please notify me at ${email} when ANVESH opens.`)}`
            }
          }}
        >
          <label className="text-xs font-medium uppercase tracking-wide text-[var(--anv-mute)]">
            Work email
          </label>
          <input
            required
            name="email"
            type="email"
            placeholder="you@institution.edu"
            className="rounded-lg border border-[var(--anv-line)] bg-black/30 px-4 py-3 text-sm text-white placeholder:text-[var(--anv-mute)]/60 outline-none transition focus:border-[var(--anv-cyan)]/60 focus:ring-2 focus:ring-[var(--anv-cyan)]/20"
          />
          <button
            type="submit"
            className="mt-2 rounded-lg bg-gradient-to-r from-[var(--anv-teal)] to-[var(--anv-cyan)] px-4 py-3 text-sm font-semibold text-[#03141a] transition hover:brightness-110"
          >
            Notify me at launch
          </button>
        </form>
        <p className="mt-5 text-center text-xs text-[var(--anv-mute)]">
          Already invited?{' '}
          <a href="mailto:hello@anvesh.ai" className="text-[var(--anv-cyan-dim)] hover:underline">
            Contact the research team
          </a>
        </p>
      </div>
    </div>
  )
}

export function useAccessModal() {
  const [state, setState] = useState<{ open: boolean; mode: 'sign-in' | 'create-account' }>({
    open: false,
    mode: 'sign-in',
  })
  return {
    state,
    open: (mode: 'sign-in' | 'create-account') => setState({ open: true, mode }),
    close: () => setState((s) => ({ ...s, open: false })),
  }
}
