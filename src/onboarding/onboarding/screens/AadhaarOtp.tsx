import { Button } from '../../ds/Button'
import { Icon, Glyph } from '../../ds/Icon'
import { body, eyebrow, heading, pad, screenFill, spacer } from './styles'

const digits = ['4', '2', '8', '1', '9', '0']

/** Screen 2 — Aadhaar OTP entry (display-only 6-digit code). */
export function AadhaarOtp({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ ...screenFill, ...pad }}>
      <span style={eyebrow}>Aadhaar</span>
      <h2 style={heading}>Enter the OTP</h2>
      <p style={{ ...body, margin: '0 0 28px', maxWidth: '36ch' }}>
        We sent a 6-digit code to the mobile linked with your Aadhaar.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 10 }}>
        {digits.map((d, i) => {
          const active = i === digits.length - 1
          return (
            <div
              key={i}
              style={{
                height: 56,
                border: `1.5px solid ${active ? 'var(--border-brand)' : 'var(--border-default)'}`,
                borderRadius: 10,
                background: active ? 'var(--color-brand-subtle)' : 'var(--surface-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                font: '600 22px/1 var(--font-sans)',
                boxShadow: active ? 'var(--shadow-focus)' : 'none',
              }}
            >
              {d}
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-tertiary)' }}>
        <Icon size={15}>{Glyph.clock}</Icon>
        <span style={{ font: '400 13px/1 var(--font-sans)' }}>Resend code in 0:24</span>
      </div>

      <div style={spacer} />
      <div style={{ flex: 'none', paddingTop: 20 }}>
        <Button fullWidth size="lg" variant="primary" onClick={onNext}>
          Verify &amp; continue
        </Button>
      </div>
    </div>
  )
}
