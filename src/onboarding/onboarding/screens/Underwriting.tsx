import { Icon, Glyph } from '../../ds/Icon'
import { centered, screenFill } from './styles'

const steps = [
  { text: 'Pledge confirmed with depository', delay: '.2s' },
  { text: 'Credit limit verified', delay: '.9s' },
  { text: 'KYC cleared', delay: '1.6s' },
]

/** Screen 9 — auto-advancing underwriting/decision spinner. */
export function Underwriting() {
  return (
    <div style={{ ...screenFill, ...centered }}>
      <Icon
        size={52}
        stroke="var(--color-brand)"
        strokeWidth={2}
        style={{ animation: 'ringSpin 1.1s linear infinite', marginBottom: 24 }}
      >
        {Glyph.spinner}
      </Icon>
      <h2 style={{ margin: '0 0 10px', font: '700 24px/1.2 var(--font-sans)', letterSpacing: '-.01em' }}>
        Getting your final decision
      </h2>
      <p style={{ margin: '0 0 28px', font: '400 15px/1.55 var(--font-sans)', color: 'var(--text-secondary)', maxWidth: '32ch' }}>
        Your pledge is confirmed. The bank is issuing your credit line.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 13, alignItems: 'flex-start', width: '100%', maxWidth: 270 }}>
        {steps.map((s) => (
          <div
            key={s.text}
            style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: 0, animation: 'fadeUp .5s var(--ease-out) forwards', animationDelay: s.delay }}
          >
            <span style={{ color: 'var(--eleva-success)' }}>
              <Icon size={17} strokeWidth={2.6}>{Glyph.check}</Icon>
            </span>
            <span style={{ font: '500 14px/1.3 var(--font-sans)', color: 'var(--text-secondary)' }}>{s.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
