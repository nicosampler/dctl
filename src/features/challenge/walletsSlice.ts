import { createSlice, createEntityAdapter, createAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

import { FetchStatus } from '../../types'

const SLICE_NAME = 'wallets'

type Wallet = { address: string; balance?: number; status: FetchStatus }

const walletsAdapter = createEntityAdapter<Wallet>({
  selectId: (wallet) => wallet.address,
})

export const walletSlice = createSlice({
  name: SLICE_NAME,
  initialState: walletsAdapter.getInitialState(),
  reducers: {
    setWallet: walletsAdapter.setOne,
  },
})

// Actions
export const { setWallet } = walletSlice.actions
export const fetchWalletAction = createAction<{
  address: string
}>(`${SLICE_NAME}/fetch_by_address`)
export const transferAction = createAction<{
  from: string
  to: string
  amount: number
}>(`${SLICE_NAME}/transfer`)

// reducers
export default walletSlice.reducer

// selectors
export const { selectById: selectWalletByAddress } = walletsAdapter.getSelectors(
  (state: RootState) => state.wallets,
)
