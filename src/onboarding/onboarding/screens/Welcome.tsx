import { Button } from '../../ds/Button'
import { Icon, Glyph } from '../../ds/Icon'
import { screenFill } from './styles'

const benefits = [
  { glyph: Glyph.shield, text: 'Your funds stay invested the whole time' },
  { glyph: Glyph.trendingUp, text: 'A limit worth up to 50% of your holdings' },
  { glyph: Glyph.zap, text: 'Card issued instantly once approved' },
]

/** Screen 0 — dark hero introducing the securities-backed card. */
export function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div
      style={{
        ...screenFill,
        background: 'var(--gradient-ink)',
        color: '#fff',
        padding: '8px 24px 24px',
        overflow: 'hidden',
      }}
    >
      {/* Signature elevation motif, top-right */}
      <svg
        viewBox="0 0 160 160"
        width="220"
        height="220"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        style={{ position: 'absolute', top: -30, right: -40, opacity: 0.16 }}
      >
        <path d="M20 150 V70 Q20 30 60 30 H150" />
        <path d="M45 150 V84 Q45 55 74 55 H150" />
        <path d="M70 150 V98 Q70 78 90 78 H150" />
        <path d="M95 150 V112 Q95 100 108 100 H150" />
      </svg>

      <div style={{ flex: 'none', paddingTop: 8 }}>
        <span style={{ font: '700 24px/1 var(--font-sans)', letterSpacing: '-.01em' }}>Eleva</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20, position: 'relative' }}>
        <span
          style={{
            font: '600 11px/1 var(--font-sans)',
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--eleva-vermilion-300)',
          }}
        >
          Securities-backed credit
        </span>
        <h1 style={{ margin: 0, font: '700 34px/1.12 var(--font-sans)', letterSpacing: '-.02em', maxWidth: '15ch' }}>
          A credit card backed by your investments.
        </h1>
        <p style={{ margin: 0, font: '400 16px/1.55 var(--font-sans)', color: 'rgba(255,255,255,.74)', maxWidth: '34ch' }}>
          Pledge your mutual funds and unlock a limit of up to 50% of their value — while your money stays invested and
          keeps growing.
        </p>
      </div>

      <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 26 }}>
        {benefits.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <span
              style={{
                flex: 'none',
                width: 38,
                height: 38,
                borderRadius: 11,
                background: 'rgba(255,255,255,.09)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--eleva-vermilion-300)',
              }}
            >
              <Icon size={19}>{b.glyph}</Icon>
            </span>
            <span style={{ font: '500 14.5px/1.35 var(--font-sans)', color: 'rgba(255,255,255,.92)' }}>{b.text}</span>
          </div>
        ))}
      </div>

      <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
        <Button fullWidth size="lg" variant="primary" onClick={onNext}>
          Get started
        </Button>
        <span style={{ font: '400 12.5px/1 var(--font-sans)', color: 'rgba(255,255,255,.5)' }}>Takes about 3 minutes</span>
      </div>
    </div>
  )
}
