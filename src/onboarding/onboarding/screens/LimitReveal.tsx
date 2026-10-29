import type { CSSProperties } from 'react'
import { Button } from '../../ds/Button'
import { Icon, Glyph } from '../../ds/Icon'
import type { RevealStyle, TierName } from '../config'
import { eyebrow, screenFill } from './styles'

type Props = {
  revealStyle: RevealStyle
  limitFmt: string
  selectedFmt: string
  tierName: TierName
  tierRange: string
  tierColor: string
  tierBg: string
  onNext: () => void
}

function TierPill({ name, range, color, bg, style }: { name: string; range: string; color: string; bg: string; style?: CSSProperties }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px',
        borderRadius: 999,
        background: bg,
        color,
        font: '700 12px/1 var(--font-sans)',
        letterSpacing: '.06em',
        textTransform: 'uppercase',
        ...style,
      }}
    >
      {name} · {range}
    </span>
  )
}

/** Screen 7 — the credit-limit reveal (hero). Two treatments: big number or gauge. */
export function LimitReveal({ revealStyle, limitFmt, selectedFmt, tierName, tierRange, tierColor, tierBg, onNext }: Props) {
  return (
    <div style={{ ...screenFill, padding: '8px 24px 24px', overflowY: 'auto' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 8 }}>
        <span style={{ ...eyebrow, letterSpacing: '.14em' }}>Your credit limit</span>

        {revealStyle === 'bignumber' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginTop: 6 }}>
            <div style={{ font: '700 52px/1 var(--font-sans)', letterSpacing: '-.03em', color: 'var(--text-primary)' }}>
              {limitFmt}
            </div>
            <div style={{ font: '500 14.5px/1.45 var(--font-sans)', color: 'var(--text-secondary)', maxWidth: '30ch' }}>
              50% of your <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{selectedFmt}</span> pledged
              collateral
            </div>
            <TierPill name={tierName} range={tierRange} color={tierColor} bg={tierBg} style={{ marginTop: 6 }} />
          </div>
        ) : (
          <>
            <div style={{ position: 'relative', width: 230, height: 230, marginTop: 6 }}>
              <svg width="230" height="230" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="100" cy="100" r="86" fill="none" stroke="var(--eleva-slate-200)" strokeWidth="14" />
                <circle
                  cx="100"
                  cy="100"
                  r="86"
                  fill="none"
                  stroke="var(--color-brand)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray="540"
                  strokeDashoffset="270"
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <span style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                  Limit
                </span>
                <span style={{ font: '700 30px/1 var(--font-sans)', letterSpacing: '-.02em' }}>{limitFmt}</span>
                <span style={{ font: '500 12px/1 var(--font-sans)', color: 'var(--text-tertiary)' }}>50% of eligible</span>
              </div>
            </div>
            <TierPill name={tierName} range={tierRange} color={tierColor} bg={tierBg} style={{ marginTop: 16 }} />
          </>
        )}

        <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}>
          <Icon size={16}>{Glyph.trendingUp}</Icon>
          <span style={{ font: '500 13px/1.3 var(--font-sans)' }}>Your funds stay invested and keep earning.</span>
        </div>
      </div>

      <div style={{ flex: 'none', paddingTop: 16 }}>
        <Button fullWidth size="lg" variant="primary" onClick={onNext}>
          Continue to pledge
        </Button>
      </div>
    </div>
  )
}
