import type { CardTier } from '../ds/PaymentCard'

/** Total number of steps after the welcome screen (used for the progress bar). */
export const TOTAL_STEPS = 10
export const LAST_STEP = 10

/** Loan-to-value: the card limit is 50% of the pledged collateral. */
export const LTV = 0.5

export type RevealStyle = 'bignumber' | 'gauge'
export type TierName = 'ASCENT' | 'SUMMIT' | 'APEX'

/** Editor-configurable options from the original design's data-props. */
export type FlowConfig = {
  limitRevealStyle: RevealStyle
  cardStyle: CardTier
}

export const DEFAULT_CONFIG: FlowConfig = {
  limitRevealStyle: 'bignumber',
  cardStyle: 'signature',
}

/** A mutual-fund holding surfaced from MF Central. */
export type MutualFund = {
  id: string
  name: string
  category: string
  value: number
  /** Present only on holdings that can't be pledged (reason shown to the user). */
  ineligibleReason?: string
}

/**
 * Eligible holdings the user may pledge as collateral. Selecting a subset
 * drives the credit limit (50% of the selected value).
 */
export const eligibleFunds: MutualFund[] = [
  { id: 'ppfc', name: 'Parag Parikh Flexi Cap', category: 'Flexi Cap', value: 1_240_000 },
  { id: 'hdfc-baf', name: 'HDFC Balanced Advantage', category: 'Hybrid', value: 860_000 },
  { id: 'mirae-lc', name: 'Mirae Asset Large Cap', category: 'Large Cap', value: 680_000 },
  { id: 'icici-n50', name: 'ICICI Pru Nifty 50 Index', category: 'Index', value: 520_000 },
  { id: 'nippon-liq', name: 'Nippon India Liquid', category: 'Liquid', value: 380_000 },
]

/** Holdings that can't back the card — shown so the total reconciles. */
export const ineligibleFunds: MutualFund[] = [
  { id: 'axis-elss', name: 'Axis ELSS Tax Saver', category: 'ELSS', value: 290_000, ineligibleReason: 'Locked-in (3-yr)' },
  { id: 'quant-sc', name: 'Quant Small Cap', category: 'Small Cap', value: 150_000, ineligibleReason: 'High volatility' },
]

/** Sum of every eligible holding — the most a user could pledge. */
export const MAX_ELIGIBLE_VALUE = eligibleFunds.reduce((sum, f) => sum + f.value, 0)

/** Total across every holding, eligible or not (for the "of ₹X" reference). */
export const TOTAL_HOLDINGS =
  MAX_ELIGIBLE_VALUE + ineligibleFunds.reduce((sum, f) => sum + f.value, 0)

export const tierRanges: Record<TierName, string> = {
  ASCENT: '₹5L – ₹25L',
  SUMMIT: '₹25L – ₹1 Cr',
  APEX: '₹1 Cr +',
}

export const tierColors: Record<TierName, { color: string; bg: string }> = {
  ASCENT: { color: 'var(--eleva-teal)', bg: 'var(--eleva-success-bg)' },
  SUMMIT: { color: 'var(--eleva-warning)', bg: 'var(--eleva-warning-bg)' },
  APEX: { color: 'var(--eleva-violet)', bg: 'var(--eleva-sky)' },
}

/** Tier follows the earned limit, matching the published tier bands. */
export function deriveTier(limit: number): TierName {
  if (limit >= 10_000_000) return 'APEX'
  if (limit >= 2_500_000) return 'SUMMIT'
  return 'ASCENT'
}

export type Broker = { name: string; initial: string; amt: string; color: string; delay: string }

export const brokers: Broker[] = [
  { name: 'Zerodha', initial: 'Z', amt: '₹22,40,000', color: 'var(--eleva-sapphire)', delay: '0s' },
  { name: 'Groww', initial: 'G', amt: '₹11,60,000', color: 'var(--eleva-meadow)', delay: '.35s' },
  { name: 'Kuvera', initial: 'K', amt: '₹7,20,000', color: 'var(--eleva-violet)', delay: '.7s' },
]

/** Indian-format currency, e.g. 1840000 -> "₹18,40,000". */
export function formatINR(n: number): string {
  return '₹' + Math.round(n).toLocaleString('en-IN')
}

/** Read variant overrides from the URL (?reveal=gauge&card=metal). */
export function readConfigFromUrl(): FlowConfig {
  const p = new URLSearchParams(window.location.search)
  const reveal = p.get('reveal')
  const card = p.get('card')
  return {
    limitRevealStyle: reveal === 'gauge' || reveal === 'bignumber' ? reveal : DEFAULT_CONFIG.limitRevealStyle,
    cardStyle: (['signature', 'everyday', 'metal', 'virtual'] as const).includes(card as CardTier)
      ? (card as CardTier)
      : DEFAULT_CONFIG.cardStyle,
  }
}
