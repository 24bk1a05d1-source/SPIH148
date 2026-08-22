import { useEffect, useMemo, useRef, useState } from 'react'

type CardKind = 'report' | 'target' | 'trial' | 'support' | 'conflict'

interface EvidenceCard {
  kind: CardKind
  tag: string
  title: string
  meta: string
  detail: string
  level: string
}

const CARDS: EvidenceCard[] = [
  {
    kind: 'report',
    tag: 'Evidence Report',
    title: 'GLP-1 agonism & cardiovascular outcomes',
    meta: 'Synthesized from 214 sources · updated weekly',
    detail: 'Meta-analysis across RCTs and observational cohorts',
    level: 'Strong',
  },
  {
    kind: 'target',
    tag: 'Drug–Target Research',
    title: 'PCSK9 inhibition — binding & pathway map',
    meta: 'ChEMBL compound activity · target validation',
    detail: 'Cross-referenced with 3 clinical compound families',
    level: 'Moderate',
  },
  {
    kind: 'trial',
    tag: 'Clinical Trial',
    title: 'Phase III · JAK inhibitor in atopic dermatitis',
    meta: 'ClinicalTrials.gov registry · Recruiting → Active',
    detail: 'Randomized, double-blind, placebo-controlled',
    level: 'Ongoing',
  },
  {
    kind: 'support',
    tag: 'Supporting Evidence',
    title: 'SGLT2 inhibitors reduce heart-failure hospitalization',
    meta: '18 concordant studies · high consistency',
    detail: 'Effect direction agrees across independent cohorts',
    level: 'Supporting',
  },
  {
    kind: 'conflict',
    tag: 'Conflicting Evidence',
    title: 'Vitamin D supplementation & fracture risk',
    meta: '9 studies diverge · population-dependent effect',
    detail: 'Conflict traced to dosage & baseline deficiency status',
    level: 'Conflicting',
  },
]

const KIND_STYLE: Record<CardKind, { ring: string; dot: string; badge: string }> = {
  report: { ring: 'from-cyan-400/40 to-teal-400/10', dot: 'bg-cyan-300', badge: 'text-cyan-200 bg-cyan-400/10 border-cyan-400/30' },
  target: { ring: 'from-teal-400/40 to-emerald-400/10', dot: 'bg-teal-300', badge: 'text-teal-200 bg-teal-400/10 border-teal-400/30' },
  trial: { ring: 'from-sky-400/40 to-cyan-400/10', dot: 'bg-sky-300', badge: 'text-sky-200 bg-sky-400/10 border-sky-400/30' },
  support: { ring: 'from-emerald-400/40 to-teal-400/10', dot: 'bg-emerald-300', badge: 'text-emerald-200 bg-emerald-400/10 border-emerald-400/30' },
  conflict: { ring: 'from-amber-400/40 to-orange-400/10', dot: 'bg-amber-300', badge: 'text-amber-200 bg-amber-400/10 border-amber-400/30' },
}

export function EvidenceCarousel() {
  const [index, setIndex] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const count = CARDS.length

  useEffect(() => {
    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), 4200)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [count])

  const restart = () => {
    if (timer.current) clearInterval(timer.current)
    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), 4200)
  }

  const visible = useMemo(() => {
    return [-1, 0, 1, 2].map((offset) => CARDS[(index + offset + count * 2) % count])
  }, [index, count])

  return (
    <div className="relative w-full">
      <div className="relative mx-auto flex h-[380px] max-w-xl items-center justify-center [perspective:1400px] sm:h-[420px]">
        {visible.map((card, slot) => {
          const pos = slot - 1
          const isActive = pos === 0
          const style = KIND_STYLE[card.kind]
          return (
            <div
              key={`${card.title}-${index}-${slot}`}
              className="carousel-track absolute w-[78%] max-w-sm rounded-2xl sm:w-[70%]"
              style={{
                transform: `translateX(${pos * 46}%) translateY(${Math.abs(pos) * 14}px) scale(${isActive ? 1 : 0.86}) rotateY(${pos * -8}deg)`,
                zIndex: isActive ? 30 : 20 - Math.abs(pos),
                opacity: Math.abs(pos) > 1 ? 0 : isActive ? 1 : 0.5,
                filter: isActive ? 'none' : 'blur(0.5px) saturate(0.8)',
              }}
            >
              <div
                className={`glass glow-border relative overflow-hidden rounded-2xl p-5 ${isActive ? 'anim-float' : ''}`}
              >
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${style.ring} blur-2xl`}
                />
                <div className="relative flex items-center justify-between">
                  <span
                    className={`mono rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${style.badge}`}
                  >
                    {card.tag}
                  </span>
                  <span className={`h-2 w-2 rounded-full ${style.dot} anim-pulse-glow`} />
                </div>
                <h4 className="display relative mt-4 text-lg font-semibold leading-snug text-white">
                  {card.title}
                </h4>
                <p className="relative mt-2 text-xs leading-relaxed text-[var(--anv-mute)]">
                  {card.detail}
                </p>
                <div className="relative mt-5 flex items-center justify-between border-t border-[var(--anv-line)] pt-3">
                  <span className="mono text-[10px] text-[var(--anv-mute)]">{card.meta}</span>
                  <span className="mono text-[10px] font-semibold text-[var(--anv-cyan-dim)]">
                    {card.level}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {CARDS.map((c, i) => (
          <button
            key={c.title}
            aria-label={`Show ${c.tag}`}
            onClick={() => {
              setIndex(i)
              restart()
            }}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-[var(--anv-cyan)]' : 'w-1.5 bg-white/15'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
