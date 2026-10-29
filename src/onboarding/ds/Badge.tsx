import type { CSSProperties, ReactNode } from 'react'

type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info'

type BadgeProps = {
  children: ReactNode
  tone?: Tone
  icon?: ReactNode
  style?: CSSProperties
}

const tones: Record<Tone, { bg: string; fg: string }> = {
  neutral: { bg: 'var(--surface-sunken)', fg: 'var(--text-secondary)' },
  brand: { bg: 'var(--color-brand-subtle)', fg: 'var(--eleva-vermilion-700)' },
  success: { bg: 'var(--eleva-success-bg)', fg: 'var(--eleva-success)' },
  warning: { bg: 'var(--eleva-warning-bg)', fg: 'var(--eleva-warning)' },
  danger: { bg: 'var(--eleva-danger-bg)', fg: 'var(--eleva-danger)' },
  info: { bg: 'var(--eleva-info-bg)', fg: 'var(--eleva-info)' },
}

/** Eleva Badge — compact pill for status/labels. */
export function Badge({ children, tone = 'neutral', icon = null, style = {} }: BadgeProps) {
  const t = tones[tone]
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-1)',
        height: 24,
        padding: '0 10px',
        borderRadius: 'var(--radius-pill)',
        background: t.bg,
        color: t.fg,
        font: 'var(--fw-semibold) var(--fs-label)/1 var(--font-sans)',
        ...style,
      }}
    >
      {icon}
      {children}
    </span>
  )
}
