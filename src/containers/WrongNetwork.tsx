import React from 'react'
import { useEthers } from '@usedapp/core'
import { DEFAULT_APP_CHAIN_ID } from '../constants'
import { Modal, Button } from 'decentraland-ui'

export default function WrongNetwork() {
  const { account, chainId } = useEthers()

  const pushNetwork = () => {
    window.ethereum?.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x' + DEFAULT_APP_CHAIN_ID.toString(16) }],
    })
  }

  if (account && chainId !== DEFAULT_APP_CHAIN_ID) {
    return (
      <Modal open={true}>
        <Modal.Header>Wrong Network</Modal.Header>

        <Modal.Actions>
          <Button primary onClick={pushNetwork}>
            Switch
          </Button>
        </Modal.Actions>
      </Modal>
    )
  } else {
    return null
  }
}
