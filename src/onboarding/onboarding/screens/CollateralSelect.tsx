import { Button } from '../../ds/Button'
import { Icon, Glyph } from '../../ds/Icon'
import { eligibleFunds, formatINR, ineligibleFunds, type MutualFund } from '../config'
import { body, eyebrow, heading, screenFill } from './styles'

type Props = {
  selected: Set<string>
  onToggle: (id: string) => void
  selectedFmt: string
  limitFmt: string
  onNext: () => void
}

/** A selectable eligible-fund row with a checkbox, category, and value. */
function FundRow({ fund, checked, onToggle }: { fund: MutualFund; checked: boolean; onToggle: () => void }) {
  return (
    <div
      onClick={onToggle}
      role="checkbox"
      aria-checked={checked}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 13,
        padding: '14px 15px',
        background: checked ? 'var(--color-brand-subtle)' : 'var(--surface-card)',
        border: `1.5px solid ${checked ? 'var(--border-brand)' : 'var(--border-subtle)'}`,
        borderRadius: 14,
        cursor: 'pointer',
        transition: 'background var(--dur-fast), border-color var(--dur-fast)',
      }}
    >
      <span
        style={{
          flex: 'none',
          width: 22,
          height: 22,
          borderRadius: 6,
          border: `1.5px solid ${checked ? 'var(--color-brand)' : 'var(--border-default)'}`,
          background: checked ? 'var(--color-brand)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          transition: 'all var(--dur-fast)',
        }}
      >
        <Icon size={14} strokeWidth={3} style={{ opacity: checked ? 1 : 0 }}>{Glyph.check}</Icon>
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: '600 14.5px/1.25 var(--font-sans)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {fund.name}
        </div>
        <div style={{ font: '500 12px/1.2 var(--font-sans)', color: 'var(--text-tertiary)', marginTop: 3 }}>{fund.category}</div>
      </div>
      <div style={{ flex: 'none', font: '600 14px/1 var(--font-sans)', color: 'var(--text-primary)' }}>
        {formatINR(fund.value)}
      </div>
    </div>
  )
}

/** A non-selectable holding, greyed with the reason it can't be pledged. */
function IneligibleRow({ fund }: { fund: MutualFund }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 13,
        padding: '14px 15px',
        background: 'var(--surface-sunken)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 14,
        opacity: 0.85,
      }}
    >
      <span style={{ flex: 'none', color: 'var(--text-tertiary)' }}>
        <Icon size={17}>{Glyph.lock}</Icon>
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: '600 14.5px/1.25 var(--font-sans)', color: 'var(--text-secondary)' }}>{fund.name}</div>
        <div style={{ font: '500 12px/1.2 var(--font-sans)', color: 'var(--eleva-warning)', marginTop: 3 }}>
          {fund.ineligibleReason}
        </div>
      </div>
      <div style={{ flex: 'none', font: '600 14px/1 var(--font-sans)', color: 'var(--text-tertiary)' }}>
        {formatINR(fund.value)}
      </div>
    </div>
  )
}

/** Screen 6 — pick the eligible funds to pledge; the limit is 50% of the pick. */
export function CollateralSelect({ selected, onToggle, selectedFmt, limitFmt, onNext }: Props) {
  const count = eligibleFunds.filter((f) => selected.has(f.id)).length
  const none = count === 0

  return (
    <div style={{ ...screenFill, padding: '8px 24px 0', overflow: 'hidden' }}>
      <span style={eyebrow}>Collateral</span>
      <h2 style={{ ...heading, margin: '10px 0 6px' }}>Choose your collateral</h2>
      <p style={{ ...body, margin: '0 0 16px', maxWidth: '37ch' }}>
        Pick the funds to back your card. Your limit is 50% of what you pledge — the rest stays fully liquid.
      </p>

      {/* Scrollable fund list */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 12 }}>
        {eligibleFunds.map((f) => (
          <FundRow key={f.id} fund={f} checked={selected.has(f.id)} onToggle={() => onToggle(f.id)} />
        ))}

        <div style={{ margin: '6px 0 2px', font: '600 11px/1 var(--font-sans)', textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text-tertiary)' }}>
          Not eligible to pledge
        </div>
        {ineligibleFunds.map((f) => (
          <IneligibleRow key={f.id} fund={f} />
        ))}
      </div>

      {/* Sticky summary + CTA */}
      <div style={{ flex: 'none', paddingTop: 12, paddingBottom: 24, background: 'var(--surface-page)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            marginBottom: 12,
            background: 'var(--surface-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 12,
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div>
            <div style={{ font: '600 10px/1 var(--font-sans)', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-tertiary)', marginBottom: 5 }}>
              Pledging · {count} {count === 1 ? 'fund' : 'funds'}
            </div>
            <div style={{ font: '700 18px/1 var(--font-sans)', letterSpacing: '-.01em' }}>{selectedFmt}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ font: '600 10px/1 var(--font-sans)', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-tertiary)', marginBottom: 5 }}>
              Your limit
            </div>
            <div style={{ font: '700 18px/1 var(--font-sans)', letterSpacing: '-.01em', color: 'var(--text-brand)' }}>{limitFmt}</div>
          </div>
        </div>
        <Button fullWidth size="lg" variant="primary" onClick={onNext} disabled={none}>
          {none ? 'Select at least one fund' : 'See my credit limit'}
        </Button>
      </div>
    </div>
  )
}
