export function NetworkVisual({ className = '' }: { className?: string }) {
  const nodes = [
    { x: 60, y: 80 }, { x: 220, y: 40 }, { x: 360, y: 110 }, { x: 480, y: 60 },
    { x: 140, y: 200 }, { x: 320, y: 230 }, { x: 460, y: 210 }, { x: 40, y: 300 },
    { x: 240, y: 340 }, { x: 400, y: 320 }, { x: 540, y: 260 }, { x: 180, y: 120 },
  ]
  const edges = [
    [0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [5, 6], [2, 6], [4, 7], [5, 8], [6, 9],
    [9, 10], [8, 9], [0, 4], [1, 11], [11, 4], [11, 2],
  ]

  return (
    <svg
      viewBox="0 0 580 380"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="edgeGrad" x1="0" y1="0" x2="580" y2="380">
          <stop offset="0%" stopColor="#35e6ff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#10b3a3" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="nodeGlow">
          <stop offset="0%" stopColor="#35e6ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#35e6ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="url(#edgeGrad)"
          strokeWidth="1"
        />
      ))}

      {nodes.map((n, i) => (
        <g key={i} style={{ animation: `anv-float ${6 + (i % 5)}s ease-in-out ${i * 0.2}s infinite` }}>
          <circle cx={n.x} cy={n.y} r="16" fill="url(#nodeGlow)" opacity="0.5" />
          <circle
            cx={n.x}
            cy={n.y}
            r={i % 3 === 0 ? 4.5 : 3}
            fill={i % 4 === 0 ? '#10b3a3' : '#9be9f2'}
            className="anim-pulse-glow"
          />
        </g>
      ))}
    </svg>
  )
}

export function DnaStrand({ className = '' }: { className?: string }) {
  const rungs = Array.from({ length: 14 })
  return (
    <svg viewBox="0 0 140 420" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="dnaGrad" x1="0" y1="0" x2="0" y2="420">
          <stop offset="0%" stopColor="#35e6ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#10b3a3" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path
        d="M20 0 C 60 40, 60 80, 20 120 S -20 200, 20 240 S 60 320, 20 360 S -20 420, 20 420"
        stroke="url(#dnaGrad)"
        strokeWidth="2"
        transform="translate(50,0)"
      />
      <path
        d="M120 0 C 80 40, 80 80, 120 120 S 160 200, 120 240 S 80 320, 120 360 S 160 420, 120 420"
        stroke="url(#dnaGrad)"
        strokeWidth="2"
        opacity="0.5"
        transform="translate(-50,0)"
      />
      {rungs.map((_, i) => {
        const y = 15 + i * 28
        const wobble = Math.sin(i * 0.9) * 18
        return (
          <line
            key={i}
            x1={70 - wobble}
            y1={y}
            x2={70 + wobble}
            y2={y}
            stroke="#9be9f2"
            strokeWidth="1.4"
            opacity="0.55"
          />
        )
      })}
    </svg>
  )
}
