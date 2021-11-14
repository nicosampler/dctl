import detectEthereumProvider from '@metamask/detect-provider'
import { useEffect, useState } from 'react'

export type DetectProviderStatus = 'loading' | 'detected' | 'not-detected'

export default function useDetectProvider() {
  const [status, setStatus] = useState<DetectProviderStatus>('loading')
  const [provider, setProvider] = useState<any>(null)

  useEffect(() => {
    const detectProvider = async () => {
      const res = await detectEthereumProvider()
      setProvider(res ?? null)
      setStatus(res ? 'detected' : 'not-detected')
    }
    detectProvider()
  }, [])

  return {
    status,
    provider,
  }
}
