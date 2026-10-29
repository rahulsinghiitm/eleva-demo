import type { CSSProperties } from 'react'

export type CardTier = 'signature' | 'everyday' | 'metal' | 'virtual'

type PaymentCardProps = {
  tier?: CardTier
  holder?: string
  last4?: string
  expiry?: string
  network?: string
  frozen?: boolean
  style?: CSSProperties
}

const tiers: Record<CardTier, { bg: string; fg: string; sub: string; name: string }> = {
  everyday: { bg: 'var(--gradient-ember)', fg: '#fff', sub: 'rgba(255,255,255,0.82)', name: 'Everyday' },
  signature: { bg: 'var(--gradient-ink)', fg: '#fff', sub: 'rgba(255,255,255,0.72)', name: 'Signature' },
  metal: { bg: 'linear-gradient(150deg,#4A4547 0%,#231F20 60%,#100E0F 100%)', fg: '#fff', sub: 'rgba(255,255,255,0.7)', name: 'Metal' },
  virtual: { bg: 'var(--gradient-teal)', fg: '#fff', sub: 'rgba(255,255,255,0.82)', name: 'Virtual' },
}

const labelStyle: CSSProperties = {
  font: '600 8px/1 var(--font-sans)',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginBottom: 4,
}

const valueStyle: CSSProperties = {
  font: 'var(--fw-medium) 13px/1 var(--font-sans)',
  letterSpacing: '0.02em',
}

/**
 * Eleva PaymentCard — the brand's hero object.
 * Tiers map to a background treatment; the parallel-line motif and
 * Eleva wordmark are always present. Numbers are display-only.
 */
export function PaymentCard({
  tier = 'signature',
  holder = 'A. Sharma',
  last4 = '4821',
  expiry = '08/29',
  network = 'VISA',
  frozen = false,
  style = {},
}: PaymentCardProps) {
  const t = tiers[tier] || tiers.signature
  return (
    <div
      style={{
        position: 'relative',
        width: 340,
        aspectRatio: '1.586 / 1',
        borderRadius: 20,
        background: t.bg,
        color: t.fg,
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
        padding: 22,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'var(--font-sans)',
        filter: frozen ? 'saturate(0.35) brightness(1.04)' : 'none',
        transition: 'filter var(--dur-slow) var(--ease-standard)',
        ...style,
      }}
    >
      {/* Signature parallel-line elevation motif */}
      <svg
        viewBox="0 0 120 120"
        width="130"
        height="130"
        fill="none"
        stroke={t.fg}
        strokeWidth="3"
        strokeLinecap="round"
        style={{ position: 'absolute', top: -18, right: -12, opacity: 0.28 }}
      >
        <path d="M20 110 V50 Q20 20 50 20 H110" />
        <path d="M38 110 V62 Q38 38 62 38 H110" />
        <path d="M56 110 V74 Q56 56 74 56 H110" />
        <path d="M74 110 V86 Q74 74 86 74 H110" />
      </svg>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        <span style={{ font: 'var(--fw-bold) 22px/1 var(--font-sans)', letterSpacing: '-0.01em' }}>Eleva</span>
        <span
          style={{
            font: 'var(--fw-semibold) var(--fs-label)/1 var(--font-sans)',
            textTransform: 'uppercase',
            letterSpacing: 'var(--ls-label)',
            color: t.sub,
          }}
        >
          {frozen ? 'Frozen' : t.name}
        </span>
      </div>

      {/* EMV chip */}
      <div
        style={{
          position: 'relative',
          width: 38,
          height: 28,
          borderRadius: 6,
          marginTop: 4,
          background: 'linear-gradient(135deg,#E9C96B,#B8912F)',
          opacity: 0.9,
        }}
      />

      <div style={{ position: 'relative' }}>
        <div style={{ font: 'var(--fw-medium) 19px/1 var(--font-mono)', letterSpacing: '0.14em', marginBottom: 12 }}>
          {'••••  ••••  ••••  '}
          {last4}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <div>
              <div style={{ ...labelStyle, color: t.sub }}>Card holder</div>
              <div style={valueStyle}>{holder}</div>
            </div>
            <div>
              <div style={{ ...labelStyle, color: t.sub }}>Expires</div>
              <div style={valueStyle}>{expiry}</div>
            </div>
          </div>
          <span style={{ font: 'var(--fw-bold) 16px/1 var(--font-sans)', fontStyle: 'italic', letterSpacing: '0.02em' }}>
            {network}
          </span>
        </div>
      </div>
    </div>
  )
}
