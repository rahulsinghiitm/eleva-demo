import { Button } from '../../ds/Button'
import { Icon, Glyph } from '../../ds/Icon'
import { ConsentRow } from '../Chrome'
import { body, eyebrow, heading, pad, screenFill, spacer } from './styles'

const grants = ['Your holdings & units', 'Current valuation', 'Scheme & folio details']

type Props = {
  consent: boolean
  onToggle: () => void
  onNext: () => void
}

/** Screen 3 — MF Central read-only consent. */
export function LinkConsent({ consent, onToggle, onNext }: Props) {
  return (
    <div style={{ ...screenFill, ...pad }}>
      <span style={eyebrow}>Connect</span>
      <h2 style={heading}>Link your investments</h2>
      <p style={{ ...body, margin: '0 0 20px', maxWidth: '37ch' }}>
        We use MF Central to securely fetch your mutual fund holdings across every broker — in a single consent.
      </p>

      <div
        style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 16,
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', borderBottom: '1px solid var(--border-subtle)' }}>
          <span
            style={{
              flex: 'none',
              width: 40,
              height: 40,
              borderRadius: 11,
              background: 'var(--eleva-ink)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              font: '700 16px/1 var(--font-sans)',
            }}
          >
            M
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ font: '700 15px/1.2 var(--font-sans)' }}>MF Central</div>
            <div style={{ font: '400 12px/1.2 var(--font-sans)', color: 'var(--text-tertiary)', marginTop: 3 }}>
              By CAMS &amp; KFintech · Read-only
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 18px' }}>
          <div
            style={{
              font: '600 12px/1 var(--font-sans)',
              textTransform: 'uppercase',
              letterSpacing: '.06em',
              color: 'var(--text-secondary)',
              marginBottom: 12,
            }}
          >
            Eleva is requesting access to
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {grants.map((g) => (
              <div key={g} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ flex: 'none', color: 'var(--eleva-success)' }}>
                  <Icon size={17} strokeWidth={2.4}>{Glyph.check}</Icon>
                </span>
                <span style={{ font: '500 14px/1.3 var(--font-sans)' }}>{g}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 14,
              padding: '12px 14px',
              background: 'var(--eleva-success-bg)',
              borderRadius: 10,
              display: 'flex',
              gap: 9,
              alignItems: 'flex-start',
            }}
          >
            <span style={{ flex: 'none', color: 'var(--eleva-success)', marginTop: 1 }}>
              <Icon size={16}>{Glyph.lock}</Icon>
            </span>
            <span style={{ font: '500 12.5px/1.45 var(--font-sans)', color: 'var(--eleva-teal)' }}>
              No transaction access. We can't buy, sell, or move anything.
            </span>
          </div>
        </div>
      </div>

      <ConsentRow checked={consent} onToggle={onToggle}>
        I consent to sharing my mutual fund data with Eleva for this credit assessment.
      </ConsentRow>

      <div style={spacer} />
      <div style={{ flex: 'none', paddingTop: 16 }}>
        <Button fullWidth size="lg" variant="primary" onClick={onNext} disabled={!consent}>
          Approve with MF Central
        </Button>
      </div>
    </div>
  )
}
