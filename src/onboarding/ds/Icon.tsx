import type { CSSProperties, ReactNode } from 'react'

type IconProps = {
  size?: number
  stroke?: string
  strokeWidth?: number
  fill?: string
  viewBox?: string
  style?: CSSProperties
  children: ReactNode
}

/**
 * Thin wrapper around the outline SVGs used throughout the flow.
 * Defaults match the design's 24×24 stroked-icon convention.
 */
export function Icon({
  size = 20,
  stroke = 'currentColor',
  strokeWidth = 2,
  fill = 'none',
  viewBox = '0 0 24 24',
  style,
  children,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

/* Named glyph paths reused across screens (single source of truth). */
export const Glyph = {
  check: <path d="M20 6 9 17l-5-5" />,
  chevronLeft: <path d="m15 18-6-6 6-6" />,
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </>
  ),
  lock: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  trendingUp: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M17 7h4v4" />
    </>
  ),
  zap: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  spinner: <path d="M21 12a9 9 0 1 1-6.2-8.5" />,
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 14l3-4 3 3 4-6" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </>
  ),
  triangleAlert: (
    <>
      <path d="M12 9v4M12 17h.01" />
      <path d="M10.3 3.6 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z" />
    </>
  ),
}
