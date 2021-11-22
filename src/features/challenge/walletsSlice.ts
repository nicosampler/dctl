import { BigNumber } from '@ethersproject/bignumber'
import { createSlice, createEntityAdapter, createAction } from '@reduxjs/toolkit'
import { call, put, takeLatest, takeEvery, SagaReturnType } from 'redux-saga/effects'
import { RootState } from '../../store'

import { FetchStatus } from '../../types'
import { getTokenBalance, transferToken } from '../../utils/contracts/token'

const SLICE_NAME = 'wallets'

type Wallet = { address: string; balance?: BigNumber; status: FetchStatus }

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

// sagas
function* fetchWallet(action: ReturnType<typeof fetchWalletAction>): any {
  const address = action.payload.address

  yield put({ type: setWallet.toString(), payload: { address, status: 'pending' } })

  try {
    const balance = yield call(() => getTokenBalance(address))
    yield put({
      type: setWallet.toString(),
      payload: { address, status: 'idle', balance: balance },
    })
  } catch (e) {
    // yield put({
    //   type: setWallet.toString(),
    //   payload: { address, status: 'idle', balance: undefined },
    // })
  }
}

function* transfer(action: ReturnType<typeof transferAction>): any {
  const from = action.payload.from
  const to = action.payload.to
  const amount = action.payload.amount

  try {
    const receipt = yield call(() => transferToken(to, amount))
    yield put({ type: setWallet.toString(), payload: { address: from, status: 'pending' } })
    yield call(() => receipt.wait())
    yield put({
      type: fetchWalletAction.toString(),
      payload: { address: from },
    })
  } catch (e) {
    // yield put({
    //   type: setWallet.toString(),
    //   payload: { address, status: 'error' },
    // })
  }
}

export function* saga() {
  yield takeLatest(fetchWalletAction.toString(), fetchWallet)
  yield takeEvery(transferAction.toString(), transfer)
}
