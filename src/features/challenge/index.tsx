import React from 'react'
import { useEthers } from '@usedapp/core'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'

import ConnectButton from '../../components/ConnectButton'

import { setWallet } from './walletsSlice'

export default function Challenge() {
  const { account } = useEthers()
  const dispatch = useAppDispatch()

  if (!account) {
    return <ConnectButton />
  }

  return (
    <div>
      <h1>Challenge</h1>
      {account}
      <button
        aria-label="Increment value"
        onClick={() => dispatch(setWallet({ address: account, balance: 0 }))}
      >
        +
      </button>
    </div>
  )
}
