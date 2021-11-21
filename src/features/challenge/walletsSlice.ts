import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

type Wallet = { address: string; balance: number }

const walletsAdapter = createEntityAdapter<Wallet>({
  selectId: (wallet) => wallet.address,
})

export const walletSlice = createSlice({
  name: 'wallets',
  initialState: walletsAdapter.getInitialState(),
  reducers: {
    setWallet: walletsAdapter.setOne,
  },
})

export const { setWallet } = walletSlice.actions

export default walletSlice.reducer
