import React from 'react'
import { Button } from 'decentraland-ui'
import { useEthers } from '@usedapp/core'

export default function Challenge() {
  const { account, activateBrowserWallet } = useEthers()

  if (!account) {
    return (
      <>
        <p>Connect your wallet to see your balance</p>
        <Button primary onClick={() => activateBrowserWallet()}>
          Connect
        </Button>
      </>
    )
  }

  return (
    <div>
      <h1>Challenge</h1>
      {account}
    </div>
  )
}
