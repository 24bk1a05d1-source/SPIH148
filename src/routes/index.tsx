import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { SplashGate } from '@/components/Splash'
import { EvidenceCarousel } from '@/components/EvidenceCarousel'
import { NetworkVisual, DnaStrand } from '@/components/NetworkVisual'
import { AccessModal, useAccessModal } from '@/components/AccessModal'
import { LogoMark } from '@/components/Logo'
import { useReveal } from '@/hooks/useReveal'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const modal = useAccessModal()

  return (
    <SplashGate>
      <div className="relative min-h-screen bg-[var(--anv-black)]">
        <BackgroundLayers />
        <Navbar onSignIn={() => modal.open('sign-in')} onCreateAccount={() => modal.open('create-account')} />
        <main className="relative">
          <Hero onExplore={() => modal.open('create-account')} onSignIn={() => modal.open('sign-in')} />
          <TrustMarquee />
          <ProductSection />
          <ResearchSection />
          <ResourcesSection />
          <SearchSection onLocked={() => modal.open('create-account')} />
          <CtaSection onCreateAccount={() => modal.open('create-account')} />
        </main>
        <Footer />
      </div>
      <AccessModal open={modal.state.open} mode={modal.state.mode} onClose={modal.close} />
    </SplashGate>
  )
}

function BackgroundLayers() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-noise" />
      <div className="absolute left-1/2 top-[-10%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(16,179,163,0.16),transparent)]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(53,230,255,0.12),transparent)]" />
    </div>
  )
}

function Hero({ onExplore, onSignIn }: { onExplore: () => void; onSignIn: () => void }) {
  return (
    <section id="home" className="relative overflow-hidden px-5 pb-16 pt-36 sm:px-8 sm:pt-44 lg:pt-48">
      <DnaStrand className="pointer-events-none absolute -left-6 top-20 hidden h-[420px] w-32 opacity-40 md:block anim-float-slow" />
      <DnaStrand className="pointer-events-none absolute -right-6 bottom-0 hidden h-[420px] w-32 opacity-30 md:block anim-float-slow" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="anim-rise">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--anv-line)] bg-white/[0.03] px-4 py-1.5">
            <LogoMark className="h-4 w-4" />
            <span className="mono text-[11px] uppercase tracking-[0.2em] text-[var(--anv-cyan-dim)]">
              Biomedical Evidence Intelligence
            </span>
          </div>

          <h1 className="display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-[3.4rem] lg:text-[3.75rem]">
            <span className="shimmer-text">ANVESH</span>
            <br />
            AI-Powered Biomedical
            <br />
            Evidence Intelligence
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--anv-mute)] sm:text-xl">
            &ldquo;Don&rsquo;t just search the literature.&rdquo;{' '}
            <span className="text-white">Connect the evidence.</span> ANVESH links
            publications, drug targets, and clinical trials into one verified evidence graph.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={onExplore}
              className="glow-border group relative overflow-hidden rounded-full bg-gradient-to-r from-[var(--anv-teal)] to-[var(--anv-cyan)] px-7 py-3.5 text-sm font-semibold text-[#03141a] transition hover:brightness-110"
            >
              Explore ANVESH
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
            <button
              onClick={onSignIn}
              className="rounded-full border border-[var(--anv-line)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Sign In
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {[
              ['33M+', 'PubMed abstracts indexed'],
              ['2.4M', 'ChEMBL compound records'],
              ['470K', 'Trial registrations tracked'],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="display text-2xl font-semibold text-white">{n}</p>
                <p className="text-xs text-[var(--anv-mute)]">{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-10 -z-10 hidden opacity-60 lg:block">
            <NetworkVisual className="h-full w-full" />
          </div>
          <EvidenceCarousel />
        </div>
      </div>
    </section>
  )
}

function TrustMarquee() {
  const items = [
    'PubMed / NCBI',
    'ClinicalTrials.gov',
    'ChEMBL',
    'DrugBank references',
    'Evidence-graded synthesis',
    'Conflict detection',
  ]
  const doubled = [...items, ...items]
  return (
    <div className="relative border-y border-[var(--anv-line)] bg-white/[0.015] py-5">
      <div className="marquee-track flex w-max gap-14 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mono flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--anv-mute)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--anv-cyan)]" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string
  title: string
  desc?: string
}) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className="reveal mx-auto max-w-2xl text-center">
      <p className="mono text-xs uppercase tracking-[0.3em] text-[var(--anv-cyan-dim)]">
        {eyebrow}
      </p>
      <h2 className="display mt-3 text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      {desc && <p className="mt-4 text-base leading-relaxed text-[var(--anv-mute)]">{desc}</p>}
    </div>
  )
}

const PILLARS = [
  {
    icon: '🔍',
    tag: 'DISCOVER',
    title: 'Evidence Query',
    desc: 'Ask a biomedical question in plain language. ANVESH surfaces graded evidence pulled from real literature, trials, and compound registries.',
  },
  {
    icon: '🕸',
    tag: 'CONNECT',
    title: 'Evidence Maps',
    desc: 'Explore an interactive graph linking diseases, compounds, targets, trials and publications — zoom, filter, and inspect every relationship.',
  },
  {
    icon: '⚖',
    tag: 'VERIFY',
    title: 'Conflict Detector',
    desc: 'Submit a claim and see where the literature agrees, disagrees, or falls short — every verdict backed by traceable sources.',
  },
]

function ProductSection() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section id="product" className="px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="Product"
        title="Three pillars, one evidence layer"
        desc="ANVESH doesn't return links — it returns verified, structured evidence you can act on."
      />
      <div
        ref={ref}
        className="reveal mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3"
      >
        {PILLARS.map((p, i) => (
          <div
            key={p.title}
            className="glass glow-border group relative overflow-hidden rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1.5"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[var(--anv-cyan)]/10 blur-2xl transition-opacity group-hover:opacity-100" />
            <span className="text-3xl">{p.icon}</span>
            <p className="mono mt-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--anv-teal)]">
              {p.tag}
            </p>
            <h3 className="display mt-2 text-xl font-semibold text-white">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--anv-mute)]">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ResearchSection() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section id="research" className="px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div ref={ref} className="reveal">
          <p className="mono text-xs uppercase tracking-[0.3em] text-[var(--anv-cyan-dim)]">
            Research
          </p>
          <h2 className="display mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Every verdict traces back to a real source
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--anv-mute)]">
            ANVESH cross-references PubMed/NCBI abstracts, ChEMBL bioactivity data, and
            ClinicalTrials.gov registrations. Nothing is generated without a citation —
            evidence levels are computed from source concordance, not guessed.
          </p>
          <ul className="mt-7 space-y-4">
            {[
              ['Supporting', 'Independent studies concur on direction and magnitude of effect.', 'bg-emerald-400'],
              ['Conflicting', 'Comparable studies diverge — surfaced with the source of disagreement.', 'bg-amber-400'],
              ['Insufficient', 'Too few or too weak studies to draw a conclusion yet.', 'bg-slate-400'],
            ].map(([label, desc, dot]) => (
              <li key={label} className="flex items-start gap-3">
                <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${dot}`} />
                <div>
                  <p className="text-sm font-semibold text-white">{label} evidence</p>
                  <p className="text-sm text-[var(--anv-mute)]">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass glow-border relative overflow-hidden rounded-2xl p-4">
          <NetworkVisual className="h-[340px] w-full" />
          <div className="absolute left-6 top-6 rounded-full border border-[var(--anv-line)] bg-black/40 px-3 py-1">
            <span className="mono text-[10px] uppercase tracking-widest text-[var(--anv-cyan-dim)]">
              Live evidence graph preview
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

const RESOURCES = [
  { cat: 'Drug Discovery', title: 'Target validation pipelines in modern pharmacology', src: 'ChEMBL / Nature Reviews' },
  { cat: 'Molecular Biology', title: 'CRISPR-based functional genomics screens', src: 'PubMed collection' },
  { cat: 'Clinical Research', title: 'Adaptive trial design for rare disease cohorts', src: 'ClinicalTrials.gov' },
  { cat: 'AI in Healthcare', title: 'Evidence synthesis with large language models', src: 'Peer-reviewed preprints' },
  { cat: 'Evidence-Based Medicine', title: 'Grading concordance across systematic reviews', src: 'Cochrane methodology' },
  { cat: 'Biomedical Science', title: 'Mapping compound-target-disease relationships', src: 'Open Targets' },
]

function ResourcesSection() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section id="resources" className="px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="Resources"
        title="A curated research library"
        desc="Bookmark, save and revisit resources spanning the full biomedical evidence stack."
      />
      <div ref={ref} className="reveal mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {RESOURCES.map((r) => (
          <div
            key={r.title}
            className="glass rounded-2xl border border-[var(--anv-line)] p-6 transition hover:border-[var(--anv-cyan)]/30"
          >
            <span className="mono rounded-full border border-[var(--anv-line)] px-2.5 py-1 text-[10px] uppercase tracking-wider text-[var(--anv-cyan-dim)]">
              {r.cat}
            </span>
            <h3 className="display mt-4 text-base font-semibold leading-snug text-white">
              {r.title}
            </h3>
            <p className="mt-3 text-xs text-[var(--anv-mute)]">Source · {r.src}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function SearchSection({ onLocked }: { onLocked: () => void }) {
  const [value, setValue] = useState('')
  const ref = useReveal<HTMLDivElement>()
  return (
    <section id="search" className="px-5 py-24 sm:px-8">
      <div ref={ref} className="reveal glass glow-border mx-auto max-w-4xl rounded-3xl p-8 sm:p-12">
        <p className="mono text-center text-xs uppercase tracking-[0.3em] text-[var(--anv-cyan-dim)]">
          Search
        </p>
        <h2 className="display mt-3 text-center text-2xl font-semibold text-white sm:text-3xl">
          Ask ANVESH a biomedical question
        </h2>
        <form
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault()
            onLocked()
          }}
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. Does metformin affect longevity biomarkers?"
            className="flex-1 rounded-xl border border-[var(--anv-line)] bg-black/30 px-5 py-4 text-sm text-white placeholder:text-[var(--anv-mute)]/60 outline-none transition focus:border-[var(--anv-cyan)]/60 focus:ring-2 focus:ring-[var(--anv-cyan)]/20"
          />
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-[var(--anv-teal)] to-[var(--anv-cyan)] px-7 py-4 text-sm font-semibold text-[#03141a] transition hover:brightness-110"
          >
            Run Evidence Query
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-[var(--anv-mute)]">
          Evidence Query runs inside your ANVESH workspace — create a free account to see
          graded results with live sources.
        </p>
      </div>
    </section>
  )
}

function CtaSection({ onCreateAccount }: { onCreateAccount: () => void }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section className="px-5 pb-28 pt-4 sm:px-8">
      <div
        ref={ref}
        className="reveal glass glow-border relative mx-auto max-w-5xl overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(53,230,255,0.14),transparent_60%)]" />
        <h2 className="display relative text-3xl font-semibold text-white sm:text-4xl">
          Stop searching. Start connecting evidence.
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-base text-[var(--anv-mute)]">
          Join researchers using ANVESH to move from scattered literature to verified,
          connected biomedical evidence.
        </p>
        <button
          onClick={onCreateAccount}
          className="relative mt-8 inline-flex rounded-full bg-gradient-to-r from-[var(--anv-teal)] to-[var(--anv-cyan)] px-8 py-3.5 text-sm font-semibold text-[#03141a] transition hover:brightness-110"
        >
          Create your ANVESH account
        </button>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[var(--anv-line)] px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="glass rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] px-6 py-4 text-center text-xs leading-relaxed text-amber-200/90 sm:text-sm">
          ⚠ ANVESH is an AI-assisted research tool for exploring biomedical literature. It is
          not medical advice, diagnosis, or treatment, and should not replace consultation
          with a qualified healthcare professional.
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-6 w-6" />
            <span className="display text-sm font-semibold tracking-[0.14em] text-white">
              ANVESH
            </span>
          </div>
          <p className="text-xs text-[var(--anv-mute)]">
            © {new Date().getFullYear() || 2026} ANVESH. Evidence intelligence for biomedical
            research.
          </p>
        </div>
      </div>
    </footer>
  )
}
