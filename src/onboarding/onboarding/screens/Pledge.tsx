import type { ReactNode } from 'react'
import { Button } from '../../ds/Button'
import { Icon, Glyph } from '../../ds/Icon'
import { ConsentRow } from '../Chrome'
import { body, eyebrow, heading, pad, screenFill, spacer } from './styles'

type PledgePoint = { icon: ReactNode; iconBg: string; iconColor: string; title: string; text: string }

const points: PledgePoint[] = [
  {
    icon: Glyph.trendingUp,
    iconBg: 'var(--eleva-success-bg)',
    iconColor: 'var(--eleva-success)',
    title: 'Your money stays invested',
    text: 'You keep every return, dividend, and bit of growth.',
  },
  {
    icon: Glyph.lock,
    iconBg: 'var(--eleva-info-bg)',
    iconColor: 'var(--eleva-info)',
    title: 'A lien is placed',
    text: "You can't sell these units yourself until the pledge is released.",
  },
  {
    icon: Glyph.triangleAlert,
    iconBg: 'var(--color-brand-subtle)',
    iconColor: 'var(--eleva-vermilion-700)',
    title: 'Only if you don’t repay',
    text: "We'd only ever sell pledged units if a bill goes unpaid.",
  },
]

type Props = {
  consent: boolean
  onToggle: () => void
  onNext: () => void
  selectedFmt: string
  fundCount: number
}

/** Screen 8 — explains the pledge/lien and takes depository authorisation. */
export function Pledge({ consent, onToggle, onNext, selectedFmt, fundCount }: Props) {
  return (
    <div style={{ ...screenFill, ...pad }}>
      <span style={eyebrow}>Pledge</span>
      <h2 style={heading}>Create your portfolio pledge</h2>
      <p style={{ ...body, margin: '0 0 16px', maxWidth: '37ch' }}>
        A pledge places a lien on the {fundCount} {fundCount === 1 ? 'fund' : 'funds'} you selected
        {' '}(<span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{selectedFmt}</span>). Here's exactly what
        that means:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {points.map((p) => (
          <div
            key={p.title}
            style={{
              display: 'flex',
              gap: 13,
              padding: '15px 16px',
              background: 'var(--surface-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 14,
            }}
          >
            <span
              style={{
                flex: 'none',
                width: 38,
                height: 38,
                borderRadius: 11,
                background: p.iconBg,
                color: p.iconColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon size={19}>{p.icon}</Icon>
            </span>
            <div>
              <div style={{ font: '600 15px/1.25 var(--font-sans)', marginBottom: 3 }}>{p.title}</div>
              <div style={{ font: '400 13px/1.45 var(--font-sans)', color: 'var(--text-secondary)' }}>{p.text}</div>
            </div>
          </div>
        ))}
      </div>

      <ConsentRow checked={consent} onToggle={onToggle}>
        I authorise Eleva to create this pledge with my depository (CDSL / NSDL).
      </ConsentRow>

      <div style={spacer} />
      <div style={{ flex: 'none', paddingTop: 16 }}>
        <Button fullWidth size="lg" variant="primary" onClick={onNext} disabled={!consent}>
          Create pledge
        </Button>
      </div>
    </div>
  )
}
