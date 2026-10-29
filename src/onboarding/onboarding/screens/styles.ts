import type { CSSProperties } from 'react'

/** Every screen is absolutely positioned to fill the flow viewport. */
export const screenFill: CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  animation: 'screenIn var(--dur-slow) var(--ease-out)',
}

/** Standard scrollable content padding (below the chrome header). */
export const pad: CSSProperties = { padding: '8px 24px 24px', overflowY: 'auto' }

/** Centered content for the loading / reveal screens. */
export const centered: CSSProperties = {
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: 24,
}

export const eyebrow: CSSProperties = {
  font: '600 11px/1 var(--font-sans)',
  letterSpacing: '.12em',
  textTransform: 'uppercase',
  color: 'var(--text-brand)',
}

export const heading: CSSProperties = {
  margin: '10px 0 8px',
  font: '700 26px/1.18 var(--font-sans)',
  letterSpacing: '-.01em',
}

export const body: CSSProperties = {
  font: '400 15px/1.55 var(--font-sans)',
  color: 'var(--text-secondary)',
}

/** Pushes the footer CTA to the bottom of a scroll screen. */
export const spacer: CSSProperties = { flex: 1, minHeight: 16 }
