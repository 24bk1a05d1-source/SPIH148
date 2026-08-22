export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="anvGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#35e6ff" />
          <stop offset="100%" stopColor="#10b3a3" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" stroke="url(#anvGrad)" strokeWidth="1.4" opacity="0.5" />
      <path
        d="M24 6 C16 14 16 20 24 24 C32 28 32 34 24 42"
        stroke="url(#anvGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M24 6 C32 14 32 20 24 24 C16 28 16 34 24 42"
        stroke="url(#anvGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.55"
      />
      {[10, 16, 24, 32, 38].map((y, i) => (
        <line
          key={y}
          x1={24 - (i % 2 === 0 ? 6 : 4)}
          y1={y}
          x2={24 + (i % 2 === 0 ? 6 : 4)}
          y2={y}
          stroke="#9be9f2"
          strokeWidth="1.4"
          opacity="0.8"
        />
      ))}
      <circle cx="24" cy="24" r="3.2" fill="#35e6ff" className="anim-pulse-glow" />
    </svg>
  )
}

export function LogoWordmark({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-8 w-8 shrink-0" />
      <span className="display text-[1.35rem] font-semibold tracking-[0.14em] text-white">
        ANVESH
      </span>
    </div>
  )
}
