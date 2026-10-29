import { useMemo } from 'react'
import { Onboarding } from './onboarding/Onboarding'
import { readConfigFromUrl } from './onboarding/config'

export default function App() {
  // Variant overrides can be passed via URL, e.g.
  //   ?reveal=gauge&card=metal&tier=APEX
  const config = useMemo(() => readConfigFromUrl(), [])
  return <Onboarding config={config} onStart={() => { window.location.href = location.protocol === 'file:' ? './open.html#home' : './#home' }} />
}
