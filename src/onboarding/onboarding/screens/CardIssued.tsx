import { Button } from '../../ds/Button'
import { Icon, Glyph } from '../../ds/Icon'
import { PaymentCard, type CardTier } from '../../ds/PaymentCard'
import type { TierName } from '../config'
import { screenFill } from './styles'

type Props = {
  cardStyle: CardTier
  tierName: TierName
  limitFmt: string
  onNext: () => void
  onStart: () => void
  onReset: () => void
}

/** Screen 10 — approved hero: the issued card, limit + tier, and CTAs. */
export function CardIssued({ cardStyle, tierName, limitFmt, onNext, onStart, onReset }: Props) {
  return (
    <div
      style={{
        ...screenFill,
        background: 'var(--gradient-ink)',
        color: '#fff',
        padding: '12px 24px 24px',
        overflow: 'hidden',
      }}
    >
      {/* Signature motif, bottom-left */}
      <svg
        viewBox="0 0 160 160"
        width="200"
        height="200"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        style={{ position: 'absolute', bottom: -40, left: -46, opacity: 0.12 }}
      >
        <path d="M20 150 V70 Q20 30 60 30 H150" />
        <path d="M45 150 V84 Q45 55 74 55 H150" />
        <path d="M70 150 V98 Q70 78 90 78 H150" />
      </svg>

      <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, paddingTop: 6 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            padding: '7px 15px',
            borderRadius: 999,
            background: 'rgba(255,255,255,.12)',
            font: '700 11px/1 var(--font-sans)',
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: '#fff',
          }}
        >
          <Icon size={14} strokeWidth={3}>{Glyph.check}</Icon>
          Approved
        </span>
        <h1 style={{ margin: '6px 0 0', font: '700 28px/1.15 var(--font-sans)', letterSpacing: '-.02em', textAlign: 'center' }}>
          Your Eleva card is ready.
        </h1>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ animation: 'cardIn .7s var(--ease-out) both', borderRadius: 20, animationDelay: '.15s' }}>
          <PaymentCard tier={cardStyle} holder="A. Sharma" last4="4821" expiry="08/29" network="VISA" />
        </div>
      </div>

      <div style={{ flex: 'none', display: 'flex', justifyContent: 'center', gap: 34, marginBottom: 22 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)', marginBottom: 6 }}>
            Credit limit
          </div>
          <div style={{ font: '700 20px/1 var(--font-sans)', letterSpacing: '-.01em' }}>{limitFmt}</div>
        </div>
        <div style={{ width: 1, background: 'rgba(255,255,255,.15)' }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)', marginBottom: 6 }}>
            Tier
          </div>
          <div style={{ font: '700 20px/1 var(--font-sans)', letterSpacing: '-.01em' }}>{tierName}</div>
        </div>
      </div>

      <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
        <Button fullWidth size="lg" variant="primary" onClick={onStart}>
          Start using Eleva
        </Button>
        <Button fullWidth size="md" variant="secondary" onClick={onNext}>
          Add to Apple Pay
        </Button>
        <button
          onClick={onReset}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,.6)',
            font: '500 13px/1 var(--font-sans)',
            cursor: 'pointer',
            padding: 8,
            marginTop: 2,
          }}
        >
          Start over
        </button>
      </div>
    </div>
  )
}
