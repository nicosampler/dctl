import React from 'react'
import { Button } from 'decentraland-ui'
import { useEthers } from '@usedapp/core'

export default function ConnectButton() {
  const { activateBrowserWallet } = useEthers()

  return (
    <>
      <p>Connect your wallet to see your balance</p>
      <Button primary onClick={() => activateBrowserWallet()}>
        Connect
      </Button>
    </>
  )
}
