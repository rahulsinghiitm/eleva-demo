import { useState } from 'react'
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse' | 'danger'
type Size = 'sm' | 'md' | 'lg'

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> & {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  style?: CSSProperties
}

const sizes: Record<Size, CSSProperties> = {
  sm: { padding: '0 14px', height: 36, fontSize: 'var(--fs-body-sm)' },
  md: { padding: '0 20px', height: 44, fontSize: 'var(--fs-body)' },
  lg: { padding: '0 28px', height: 52, fontSize: 'var(--fs-body-lg)' },
}

const variants: Record<Variant, CSSProperties> = {
  primary: { background: 'var(--color-brand)', color: 'var(--color-on-brand)' },
  secondary: { background: 'var(--surface-card)', color: 'var(--text-primary)', borderColor: 'var(--border-default)' },
  ghost: { background: 'transparent', color: 'var(--text-brand)' },
  inverse: { background: 'var(--surface-inverse)', color: 'var(--text-inverse)' },
  danger: { background: 'var(--eleva-danger)', color: 'var(--color-on-brand)' },
}

const hoverBg: Record<Variant, string> = {
  primary: 'var(--color-brand-hover)',
  secondary: 'var(--surface-sunken)',
  ghost: 'var(--color-brand-subtle)',
  inverse: 'var(--eleva-slate-800)',
  danger: 'var(--eleva-vermilion-800)',
}

const activeBg: Partial<Record<Variant, string>> = {
  primary: 'var(--color-brand-active)',
  danger: 'var(--eleva-vermilion-900)',
}

/** Eleva Button — primary/secondary/ghost/inverse/danger · sm/md/lg. */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  type = 'button',
  style = {},
  ...rest
}: ButtonProps) {
  const [hover, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const s = sizes[size]

  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    height: s.height,
    padding: s.padding,
    width: fullWidth ? '100%' : 'auto',
    fontFamily: 'var(--font-sans)',
    fontSize: s.fontSize,
    fontWeight: 'var(--fw-semibold)' as unknown as number,
    lineHeight: 1,
    letterSpacing: 0,
    borderRadius: 'var(--radius-sm)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition:
      'background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
    whiteSpace: 'nowrap',
    WebkitTapHighlightColor: 'transparent',
  }

  const hoverStyle: CSSProperties = !disabled && hover ? { background: hoverBg[variant] } : {}
  const activeStyle: CSSProperties = !disabled && active && activeBg[variant] ? { background: activeBg[variant] } : {}

  return (
    <button
      type={type}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false)
        setActive(false)
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{ ...base, ...variants[variant], ...hoverStyle, ...activeStyle, ...style }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  )
}
