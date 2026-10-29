import { useId, useState } from 'react'
import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react'

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'style'> & {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  iconLeft?: ReactNode
  suffix?: ReactNode
  style?: CSSProperties
}

/** Eleva Input — labelled text field with focus ring and hint/error slot. */
export function Input({
  label,
  hint,
  error,
  id,
  value,
  placeholder,
  type = 'text',
  disabled = false,
  iconLeft = null,
  suffix = null,
  onChange,
  style = {},
  ...rest
}: InputProps) {
  const [focus, setFocus] = useState(false)
  const generatedId = useId()
  const inputId = id || generatedId
  const borderColor = error
    ? 'var(--eleva-danger)'
    : focus
      ? 'var(--border-brand)'
      : 'var(--border-default)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', ...style }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            font: 'var(--text-label)',
            textTransform: 'uppercase',
            letterSpacing: 'var(--ls-label)',
            color: 'var(--text-secondary)',
          }}
        >
          {label}
        </label>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          height: 48,
          padding: '0 14px',
          background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
          border: `1px solid ${borderColor}`,
          borderRadius: 'var(--radius-sm)',
          boxShadow: focus ? 'var(--shadow-focus)' : 'none',
          transition:
            'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {iconLeft && <span style={{ display: 'flex', color: 'var(--text-tertiary)' }}>{iconLeft}</span>}
        <input
          id={inputId}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1,
            minWidth: 0,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            font: 'var(--text-body)',
            color: 'var(--text-primary)',
          }}
          {...rest}
        />
        {suffix && (
          <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>
            {suffix}
          </span>
        )}
      </div>
      {(hint || error) && (
        <span style={{ font: 'var(--text-caption)', color: error ? 'var(--eleva-danger)' : 'var(--text-tertiary)' }}>
          {error || hint}
        </span>
      )}
    </div>
  )
}
