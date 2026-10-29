import { Icon, Glyph } from '../../ds/Icon'
import { centered, screenFill } from './styles'

const checks = [
  { text: 'Volatility & concentration', delay: '.2s' },
  { text: 'Liquidity & lock-ins', delay: '1s' },
  { text: 'Lender eligibility rules', delay: '1.8s' },
]

/** Screen 5 — auto-advancing risk-engine analysis with animated ring. */
export function RiskEngine() {
  return (
    <div style={{ ...screenFill, ...centered }}>
      <div style={{ position: 'relative', width: 140, height: 140, marginBottom: 28 }}>
        <svg width="140" height="140" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="100" cy="100" r="86" fill="none" stroke="var(--eleva-slate-200)" strokeWidth="10" />
          <circle
            cx="100"
            cy="100"
            r="86"
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="540"
            style={{ animation: 'ringDraw 3s var(--ease-standard) infinite', transformOrigin: 'center' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={34} stroke="var(--color-brand)" strokeWidth={1.9}>{Glyph.chart}</Icon>
        </div>
      </div>

      <h2 style={{ margin: '0 0 10px', font: '700 24px/1.2 var(--font-sans)', letterSpacing: '-.01em' }}>
        Analysing your portfolio
      </h2>
      <p style={{ margin: '0 0 26px', font: '400 15px/1.55 var(--font-sans)', color: 'var(--text-secondary)', maxWidth: '32ch' }}>
        Our risk engine checks how stable your holdings are, so your limit stays reliable.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', width: '100%', maxWidth: 280 }}>
        {checks.map((c) => (
          <div
            key={c.text}
            style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: 0, animation: 'fadeUp .5s var(--ease-out) forwards', animationDelay: c.delay }}
          >
            <span style={{ color: 'var(--eleva-success)' }}>
              <Icon size={17} strokeWidth={2.6}>{Glyph.check}</Icon>
            </span>
            <span style={{ font: '500 14px/1.3 var(--font-sans)', color: 'var(--text-secondary)' }}>{c.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
