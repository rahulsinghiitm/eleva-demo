import { Badge } from '../../ds/Badge'
import { Button } from '../../ds/Button'
import { Input } from '../../ds/Input'
import { Icon, Glyph } from '../../ds/Icon'
import { body, eyebrow, heading, pad, screenFill, spacer } from './styles'

type Props = {
  pan: string
  onPan: (v: string) => void
  onNext: () => void
}

/** Screen 1 — PAN + verified mobile (SEBI identity check). */
export function KycPan({ pan, onPan, onNext }: Props) {
  return (
    <div style={{ ...screenFill, ...pad }}>
      <span style={eyebrow}>Identity</span>
      <h2 style={heading}>Let's verify it's you</h2>
      <p style={{ ...body, margin: '0 0 24px', maxWidth: '36ch' }}>
        SEBI requires this to open a securities-backed account. Your PAN links securely to your investments.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Input
          label="PAN number"
          value={pan}
          onChange={(e) => onPan(e.target.value)}
          placeholder="ABCDE1234F"
          autoCapitalize="characters"
          spellCheck={false}
        />
        <div>
          <span
            style={{
              display: 'block',
              font: '600 12px/1 var(--font-sans)',
              textTransform: 'uppercase',
              letterSpacing: '.06em',
              color: 'var(--text-secondary)',
              marginBottom: 8,
            }}
          >
            Mobile number
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 48,
              padding: '0 14px',
              background: 'var(--surface-card)',
              border: '1px solid var(--border-default)',
              borderRadius: 8,
            }}
          >
            <span style={{ font: '500 15px/1 var(--font-sans)', color: 'var(--text-primary)', letterSpacing: '.02em' }}>
              +91 98•••••210
            </span>
            <Badge tone="success">Verified</Badge>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-tertiary)' }}>
        <Icon size={15}>{Glyph.lock}</Icon>
        <span style={{ font: '400 12.5px/1.4 var(--font-sans)' }}>
          256-bit encrypted. We never store your login credentials.
        </span>
      </div>

      <div style={spacer} />
      <div style={{ flex: 'none', paddingTop: 20 }}>
        <Button fullWidth size="lg" variant="primary" onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  )
}
