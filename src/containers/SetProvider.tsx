import React, { useEffect } from 'react'
import { useEthers } from '@usedapp/core'
import { setProvider } from '../utils/provider'

export default function SetProvider() {
  const { library } = useEthers()

  useEffect(() => {
    setProvider(library)
  }, [library])

  return null
}
