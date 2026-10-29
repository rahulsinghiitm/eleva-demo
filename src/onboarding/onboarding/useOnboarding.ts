import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { eligibleFunds, LAST_STEP, LTV } from './config'

/** Every eligible fund starts selected (the default "pledge everything"). */
const allEligibleIds = () => new Set(eligibleFunds.map((f) => f.id))

/**
 * The onboarding state machine — a port of the original design's DCLogic,
 * extended so the user chooses which eligible funds to pledge. Owns the
 * current step, the PAN field, the set of selected collateral funds, the
 * limit count-up value, and the two consent checkboxes; drives the
 * auto-advancing screens and the limit reveal.
 */
export function useOnboarding() {
  const [step, setStep] = useState(0)
  const [pan, setPanValue] = useState('')
  const [selected, setSelected] = useState<Set<string>>(allEligibleIds)
  const [limitDisplay, setLimitDisplay] = useState(0)
  const [consentLink, setConsentLink] = useState(true)
  const [consentPledge, setConsentPledge] = useState(true)

  const timerRef = useRef<number | undefined>(undefined)
  const rafRef = useRef<number | undefined>(undefined)

  // Selected collateral value and the resulting credit limit (50% of it).
  const selectedValue = useMemo(
    () => eligibleFunds.filter((f) => selected.has(f.id)).reduce((sum, f) => sum + f.value, 0),
    [selected],
  )
  const limit = selectedValue * LTV

  const next = useCallback(() => setStep((s) => Math.min(LAST_STEP, s + 1)), [])
  const back = useCallback(() => setStep((s) => Math.max(0, s - 1)), [])
  const goTo = useCallback((n: number) => setStep(Math.max(0, Math.min(LAST_STEP, n))), [])

  const reset = useCallback(() => {
    clearTimeout(timerRef.current)
    cancelAnimationFrame(rafRef.current!)
    setStep(0)
    setLimitDisplay(0)
    setPanValue('')
    setSelected(allEligibleIds())
  }, [])

  const setPan = useCallback((v: string) => setPanValue(v.toUpperCase().slice(0, 10)), [])
  const toggleFund = useCallback((id: string) => {
    setSelected((prev) => {
      const nextSet = new Set(prev)
      if (nextSet.has(id)) nextSet.delete(id)
      else nextSet.add(id)
      return nextSet
    })
  }, [])
  const toggleLink = useCallback(() => setConsentLink((c) => !c), [])
  const togglePledge = useCallback(() => setConsentPledge((c) => !c), [])

  const animateCount = useCallback((setter: (n: number) => void, target: number, dur: number) => {
    cancelAnimationFrame(rafRef.current!)
    const start = performance.now()
    setter(0)
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setter(target * eased)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  // onEnter: side-effects triggered whenever the step changes.
  useEffect(() => {
    if (step === 4) timerRef.current = window.setTimeout(next, 2900)
    else if (step === 5) timerRef.current = window.setTimeout(next, 3000)
    else if (step === 7) animateCount(setLimitDisplay, limit, 1600)
    else if (step === 9) timerRef.current = window.setTimeout(next, 2800)

    return () => {
      clearTimeout(timerRef.current)
      cancelAnimationFrame(rafRef.current!)
    }
    // `limit` is intentionally read on step-7 entry; selection is fixed by then.
  }, [step, next, animateCount, limit])

  return {
    step,
    pan,
    selected,
    selectedValue,
    limit,
    limitDisplay,
    consentLink,
    consentPledge,
    next,
    back,
    goTo,
    reset,
    setPan,
    toggleFund,
    toggleLink,
    togglePledge,
  }
}

export type OnboardingApi = ReturnType<typeof useOnboarding>
