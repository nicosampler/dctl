import React, { useEffect } from 'react'
import { useEthers } from '@usedapp/core'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import ConnectButton from '../../components/ConnectButton'
import { fetchWalletAction, transferAction, selectWalletByAddress } from './walletsSlice'

export default function Challenge() {
  const { account, library } = useEthers()
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
    <div>
      <h1>Challenge</h1>
      <div>address: {wallet?.address}</div>
      <div>
        balance: {wallet?.status === 'pending' ? 'loading...' : wallet?.balance?.toString()}
      </div>

      <button
        aria-label="Increment value"
        onClick={() =>
          dispatch(
            transferAction({
              from: account,
              to: '0x76d88fb4fcb39B4b895Bfc4df0dCa252b9C7DC6B',
              amount: 1,
            }),
          )
        }
      >
        transfer
      </button>
    </div>
  )
}
