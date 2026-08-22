import { useEffect, useState } from 'react'
import { LogoWordmark } from './Logo'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Product', href: '#product' },
  { label: 'Research', href: '#research' },
  { label: 'Resources', href: '#resources' },
  { label: 'Search', href: '#search' },
]

export function Navbar({
  onSignIn,
  onCreateAccount,
}: {
  onSignIn: () => void
  onCreateAccount: () => void
}) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 transition-all duration-300 sm:px-6 ${
          scrolled ? 'glass mx-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)] sm:mx-auto' : ''
        }`}
        style={{ paddingTop: scrolled ? '0.65rem' : '0', paddingBottom: scrolled ? '0.65rem' : '0' }}
      >
        <a href="#home" className="shrink-0">
          <LogoWordmark />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[var(--anv-mute)] transition hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={onSignIn}
            className="rounded-full px-4 py-2 text-sm font-medium text-[var(--anv-ink)] transition hover:bg-white/5"
          >
            Sign In
          </button>
          <button
            onClick={onCreateAccount}
            className="glow-border rounded-full bg-gradient-to-r from-[var(--anv-teal)] to-[var(--anv-cyan)] px-5 py-2 text-sm font-semibold text-[#03141a] transition hover:brightness-110"
          >
            Create Account
          </button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((m) => !m)}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all ${menuOpen ? 'top-[7px] rotate-45' : 'top-0'}`}
            />
            <span
              className={`absolute left-0 top-[7px] h-[1.5px] w-5 bg-current transition-opacity ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <span
              className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all ${menuOpen ? 'top-[7px] -rotate-45' : 'top-[14px]'}`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className="glass mx-4 mt-2 flex flex-col gap-1 rounded-2xl p-4 lg:hidden">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--anv-ink)] transition hover:bg-white/5"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-[var(--anv-line)] pt-3">
            <button
              onClick={() => {
                setMenuOpen(false)
                onSignIn()
              }}
              className="rounded-xl px-4 py-3 text-left text-sm font-medium text-[var(--anv-ink)] transition hover:bg-white/5"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMenuOpen(false)
                onCreateAccount()
              }}
              className="rounded-xl bg-gradient-to-r from-[var(--anv-teal)] to-[var(--anv-cyan)] px-4 py-3 text-center text-sm font-semibold text-[#03141a]"
            >
              Create Account
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
