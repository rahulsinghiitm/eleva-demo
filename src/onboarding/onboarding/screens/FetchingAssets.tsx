import { Icon, Glyph } from '../../ds/Icon'
import { brokers } from '../config'
import { screenFill } from './styles'

/** Screen 4 — auto-advancing "pulling holdings across brokers". */
export function FetchingAssets() {
  return (
    <div style={{ ...screenFill, padding: 24, overflowY: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <Icon size={22} stroke="var(--color-brand)" strokeWidth={2.2} style={{ animation: 'ringSpin 1.1s linear infinite' }}>
          {Glyph.spinner}
        </Icon>
        <h2 style={{ margin: 0, font: '700 24px/1.15 var(--font-sans)', letterSpacing: '-.01em' }}>Fetching your assets</h2>
      </div>
      <p style={{ margin: '0 0 24px', font: '400 15px/1.5 var(--font-sans)', color: 'var(--text-secondary)' }}>
        Securely pulling holdings across your brokers.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {brokers.map((b) => (
          <div
            key={b.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 13,
              padding: '15px 16px',
              background: 'var(--surface-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 14,
              boxShadow: 'var(--shadow-sm)',
              opacity: 0,
              animation: 'fadeUp .5s var(--ease-out) forwards',
              animationDelay: b.delay,
            }}
          >
            <span
              style={{
                flex: 'none',
                width: 38,
                height: 38,
                borderRadius: 10,
                background: b.color,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                font: '700 15px/1 var(--font-sans)',
              }}
            >
              {b.initial}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ font: '600 15px/1.2 var(--font-sans)' }}>{b.name}</div>
              <div style={{ font: '500 13px/1.2 var(--font-sans)', color: 'var(--text-tertiary)', marginTop: 3 }}>{b.amt}</div>
            </div>
            <span
              style={{
                flex: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                font: '600 12px/1 var(--font-sans)',
                color: 'var(--eleva-success)',
              }}
            >
              <Icon size={16} strokeWidth={2.6}>{Glyph.check}</Icon>
              Linked
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 20,
          textAlign: 'center',
          font: '500 13px/1.4 var(--font-sans)',
          color: 'var(--text-tertiary)',
          animation: 'softPulse 1.6s ease-in-out infinite',
        }}
      >
        Consolidating your portfolio…
      </div>
    </div>
  )
}
