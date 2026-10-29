import { Icon, Glyph } from '../ds/Icon'

/** iOS-style status bar. Text/glyph color flips on the dark hero screens. */
export function StatusBar({ color }: { color: string }) {
  return (
    <div
      style={{
        flex: 'none',
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 22px',
        position: 'relative',
        zIndex: 20,
        color,
      }}
    >
      <span style={{ font: "700 14px/1 var(--font-sans)", letterSpacing: '.02em' }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {/* cellular */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        {/* wifi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M1 3.5C4.5 .5 11.5 .5 15 3.5M3.2 6C5.6 4 10.4 4 12.8 6M5.4 8.4c1.4-1.1 3.8-1.1 5.2 0" strokeLinecap="round" />
        </svg>
        {/* battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="1" y="1" width="20" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.2" opacity=".5" />
          <rect x="3" y="3" width="15" height="6" rx="1" fill="currentColor" />
          <rect x="22.5" y="4" width="1.6" height="4" rx=".8" fill="currentColor" opacity=".5" />
        </svg>
      </div>
    </div>
  )
}

type ProgressHeaderProps = {
  pct: string
  stepLabel: string
  onBack: () => void
}

/** Back button + progress bar + "Step N / 10" label. Steps 1–9 only. */
export function ProgressHeader({ pct, stepLabel, onBack }: ProgressHeaderProps) {
  return (
    <div
      style={{
        flex: 'none',
        padding: '0 22px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        position: 'relative',
        zIndex: 20,
      }}
    >
      <button
        onClick={onBack}
        aria-label="Back"
        style={{
          flex: 'none',
          width: 34,
          height: 34,
          border: '1px solid var(--border-subtle)',
          background: 'var(--surface-card)',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--text-primary)',
        }}
      >
        <Icon size={18} strokeWidth={2.2}>{Glyph.chevronLeft}</Icon>
      </button>
      <div style={{ flex: 1, height: 5, borderRadius: 3, background: 'var(--eleva-slate-200)', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: pct,
            background: 'var(--color-brand)',
            borderRadius: 3,
            transition: 'width var(--dur-slow) var(--ease-out)',
          }}
        />
      </div>
      <span
        style={{
          flex: 'none',
          font: '600 11px/1 var(--font-sans)',
          color: 'var(--text-tertiary)',
          textTransform: 'uppercase',
          letterSpacing: '.06em',
        }}
      >
        {stepLabel}
      </span>
    </div>
  )
}

type ConsentRowProps = {
  checked: boolean
  onToggle: () => void
  children: React.ReactNode
}

/** The inline consent checkbox used on the link & pledge screens. */
export function ConsentRow({ checked, onToggle, children }: ConsentRowProps) {
  return (
    <div
      onClick={onToggle}
      style={{ marginTop: 16, display: 'flex', alignItems: 'flex-start', gap: 11, cursor: 'pointer' }}
    >
      <span
        style={{
          flex: 'none',
          width: 22,
          height: 22,
          borderRadius: 6,
          border: `1.5px solid ${checked ? 'var(--color-brand)' : 'var(--border-default)'}`,
          background: checked ? 'var(--color-brand)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          transition: 'all var(--dur-fast)',
        }}
      >
        <Icon size={14} strokeWidth={3} style={{ opacity: checked ? 1 : 0 }}>{Glyph.check}</Icon>
      </span>
      <span style={{ font: '400 12.5px/1.45 var(--font-sans)', color: 'var(--text-secondary)' }}>{children}</span>
    </div>
  )
}
