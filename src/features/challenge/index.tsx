import React, { useEffect, useState } from 'react'
import { useEthers } from '@usedapp/core'
import { Button, Segment, Header, Address, Blockie } from 'decentraland-ui'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import ConnectButton from '../../components/ConnectButton'
import { fetchWalletAction, selectWalletByAddress } from './walletsSlice'
import TransferModal from './TransferModal'

export default function Challenge() {
  const { account, library } = useEthers()
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const wallet = useAppSelector((state) => selectWalletByAddress(state, account || ''))

  useEffect(() => {
    if (account) {
      dispatch(fetchWalletAction({ address: account }))
    }
  }, [account, dispatch])

  if (!account || !library) {
    return <ConnectButton />
  }

  return (
    <Segment style={{ width: 400 }}>
      <Header>Wallet</Header>
      <p>
        <Blockie scale={3} seed={wallet?.address || ''}>
          <Address value={wallet?.address || ''} strong />
        </Blockie>
        .
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p>balance: {wallet?.balance?.toString()}</p>
        <Button basic onClick={() => setIsOpen(true)}>
          transfer
        </Button>
      </div>

      {isOpen && <TransferModal onClose={() => setIsOpen(false)} />}
    </Segment>
  )
}
