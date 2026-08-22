import { useEffect, useState } from 'react'
import { LogoMark } from './Logo'

const SPLASH_KEY = 'anvesh:splash-shown'

export function SplashGate({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<'checking' | 'showing' | 'exiting' | 'done'>('checking')

  useEffect(() => {
    let alreadyShown = false
    try {
      alreadyShown = sessionStorage.getItem(SPLASH_KEY) === '1'
    } catch {
      alreadyShown = false
    }

    if (alreadyShown) {
      setPhase('done')
      return
    }

    setPhase('showing')
    const exitTimer = setTimeout(() => setPhase('exiting'), 4000)
    const doneTimer = setTimeout(() => {
      try {
        sessionStorage.setItem(SPLASH_KEY, '1')
      } catch {
        /* private mode — no persistence, splash may replay */
      }
      setPhase('done')
    }, 4900)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  return (
    <>
      {(phase === 'showing' || phase === 'exiting') && (
        <Splash exiting={phase === 'exiting'} />
      )}
      {phase !== 'checking' && (
        <div style={{ visibility: phase === 'showing' ? 'hidden' : 'visible' }}>{children}</div>
      )}
    </>
  )
}

function Splash({ exiting }: { exiting: boolean }) {
  const particles = Array.from({ length: 34 })

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-[var(--anv-black)] ${exiting ? 'splash-exit' : ''}`}
    >
      <div className="absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((_, i) => {
          const dx = `${(Math.sin(i * 12.9) * 220).toFixed(0)}px`
          const dy = `${(Math.cos(i * 7.233) * 220 - 140).toFixed(0)}px`
          const left = `${(i * 37) % 100}%`
          const top = `${(i * 53) % 100}%`
          const delay = `${(i % 10) * 0.3}s`
          const size = 2 + (i % 4)
          return (
            <span
              key={i}
              className="absolute rounded-full bg-[var(--anv-cyan)]"
              style={
                {
                  left,
                  top,
                  width: size,
                  height: size,
                  opacity: 0,
                  boxShadow: '0 0 8px rgba(53,230,255,0.9)',
                  '--dx': dx,
                  '--dy': dy,
                  animation: `anv-particle ${4 + (i % 5)}s ease-in-out ${delay} infinite`,
                } as React.CSSProperties
              }
            />
          )
        })}
      </div>

      <div className="relative flex flex-col items-center gap-8 anim-fade">
        <div className="relative h-40 w-40">
          <svg viewBox="0 0 160 160" className="h-40 w-40 anim-spin-slow">
            <circle cx="80" cy="80" r="70" stroke="rgba(53,230,255,0.18)" strokeWidth="1" fill="none" />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="url(#splashGrad)"
              strokeWidth="1.6"
              fill="none"
              className="dash-line"
            />
            <defs>
              <linearGradient id="splashGrad" x1="0" y1="0" x2="160" y2="160">
                <stop offset="0%" stopColor="#35e6ff" />
                <stop offset="100%" stopColor="#10b3a3" />
              </linearGradient>
            </defs>
          </svg>
          <svg viewBox="0 0 160 160" className="absolute inset-0 h-40 w-40 anim-spin-rev">
            <circle cx="80" cy="80" r="54" stroke="rgba(16,179,163,0.3)" strokeWidth="1" fill="none" strokeDasharray="2 10" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <LogoMark className="h-16 w-16 anim-pulse-glow" />
          </div>
        </div>

        <div className="text-center">
          <p className="display text-3xl font-semibold tracking-[0.35em] text-white glow-text">
            ANVESH
          </p>
          <p className="mt-4 max-w-md px-6 text-sm leading-relaxed text-[var(--anv-mute)] sm:text-base">
            AI-Powered Biomedical Evidence Intelligence
            <br />
            <span className="mono text-[var(--anv-cyan-dim)]">
              Discover<span className="text-[var(--anv-mute)]"> · </span>Connect
              <span className="text-[var(--anv-mute)]"> · </span>Verify
            </span>
          </p>
        </div>

        <div className="h-1 w-48 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--anv-teal)] to-[var(--anv-cyan)]"
            style={{
              animation: 'anv-loadbar 4s linear forwards',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes anv-loadbar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  )
}
