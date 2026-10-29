import { useMemo } from 'react'
import {
  DEFAULT_CONFIG,
  deriveTier,
  eligibleFunds,
  type FlowConfig,
  formatINR,
  TOTAL_STEPS,
  tierColors,
  tierRanges,
} from './config'
import { ProgressHeader, StatusBar } from './Chrome'
import { useOnboarding } from './useOnboarding'
import { Welcome } from './screens/Welcome'
import { KycPan } from './screens/KycPan'
import { AadhaarOtp } from './screens/AadhaarOtp'
import { LinkConsent } from './screens/LinkConsent'
import { FetchingAssets } from './screens/FetchingAssets'
import { RiskEngine } from './screens/RiskEngine'
import { CollateralSelect } from './screens/CollateralSelect'
import { LimitReveal } from './screens/LimitReveal'
import { Pledge } from './screens/Pledge'
import { Underwriting } from './screens/Underwriting'
import { CardIssued } from './screens/CardIssued'

/**
 * The Eleva Card onboarding flow — 11 screens driven by a single
 * step-based state machine. Chrome (status bar + progress header) is
 * shared; each step renders its own screen into the flow viewport.
 */
export function Onboarding({ config = DEFAULT_CONFIG, onStart }: { config?: FlowConfig; onStart: () => void }) {
  const flow = useOnboarding()
  const { step } = flow

  const showChrome = step >= 1 && step <= 9
  const statusColor = step === 0 || step === 10 ? '#ffffff' : 'var(--eleva-ink)'
  const pct = `${(Math.max(0, step) / TOTAL_STEPS) * 100}%`
  const stepLabel = `Step ${Math.max(1, step)} / ${TOTAL_STEPS}`

  // Tier follows the earned limit (based on the selected collateral).
  const tier = useMemo(() => {
    const name = deriveTier(flow.limit)
    const tc = tierColors[name]
    return { name, range: tierRanges[name], color: tc.color, bg: tc.bg }
  }, [flow.limit])

  const selectedFmt = formatINR(flow.selectedValue)
  const limitPreviewFmt = formatINR(flow.limit) // static (for the selection footer)
  const limitFmt = formatINR(flow.limitDisplay) // animated (for the reveal count-up)
  const fundCount = eligibleFunds.filter((f) => flow.selected.has(f.id)).length

  return (
    <div className="stage">
      <div className="device">
        <div className="screen">
          <StatusBar color={statusColor} />

          {showChrome && <ProgressHeader pct={pct} stepLabel={stepLabel} onBack={flow.back} />}

          <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
            {step === 0 && <Welcome onNext={flow.next} />}
            {step === 1 && <KycPan pan={flow.pan} onPan={flow.setPan} onNext={flow.next} />}
            {step === 2 && <AadhaarOtp onNext={flow.next} />}
            {step === 3 && <LinkConsent consent={flow.consentLink} onToggle={flow.toggleLink} onNext={flow.next} />}
            {step === 4 && <FetchingAssets />}
            {step === 5 && <RiskEngine />}
            {step === 6 && (
              <CollateralSelect
                selected={flow.selected}
                onToggle={flow.toggleFund}
                selectedFmt={selectedFmt}
                limitFmt={limitPreviewFmt}
                onNext={flow.next}
              />
            )}
            {step === 7 && (
              <LimitReveal
                revealStyle={config.limitRevealStyle}
                limitFmt={limitFmt}
                selectedFmt={selectedFmt}
                tierName={tier.name}
                tierRange={tier.range}
                tierColor={tier.color}
                tierBg={tier.bg}
                onNext={flow.next}
              />
            )}
            {step === 8 && (
              <Pledge
                consent={flow.consentPledge}
                onToggle={flow.togglePledge}
                onNext={flow.next}
                selectedFmt={selectedFmt}
                fundCount={fundCount}
              />
            )}
            {step === 9 && <Underwriting />}
            {step === 10 && (
              <CardIssued
                cardStyle={config.cardStyle}
                tierName={tier.name}
                limitFmt={limitPreviewFmt}
                onNext={flow.next}
                onStart={onStart}
                onReset={flow.reset}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
