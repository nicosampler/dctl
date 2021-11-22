import { call, put, takeLatest, takeEvery, select, SagaReturnType } from 'redux-saga/effects'
import { getTokenBalance, transferToken } from '../../utils/contracts/token'
import { fetchWalletAction, selectWalletByAddress, setWallet, transferAction } from './walletsSlice'

function* fetchWallet(action: ReturnType<typeof fetchWalletAction>) {
  const address = action.payload.address

  yield put({ type: setWallet.toString(), payload: { address, status: 'pending' } })

  try {
    const balance: SagaReturnType<typeof getTokenBalance> = yield call(() =>
      getTokenBalance(address),
    )

    yield put({
      type: setWallet.toString(),
      payload: { address, status: 'idle', balance: balance.toNumber() },
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: setWallet.toString(),
      payload: { address, status: 'idle', balance: undefined },
    })
  }
}

function* transfer(action: ReturnType<typeof transferAction>) {
  const from = action.payload.from
  const to = action.payload.to
  const amount = action.payload.amount

  const walletState: SagaReturnType<typeof selectWalletByAddress> = yield select((state) =>
    selectWalletByAddress(state, from),
  )
  yield put({ type: setWallet.toString(), payload: { ...walletState, status: 'pending' } })

  try {
    const receipt: SagaReturnType<typeof transferToken> = yield call(() =>
      transferToken(to, amount),
    )
    yield call(() => receipt.wait())
    yield put({
      type: fetchWalletAction.toString(),
      payload: { address: from },
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: setWallet.toString(),
      payload: { ...walletState, status: 'idle' },
    })
  }
}

export default function* saga() {
  yield takeLatest(fetchWalletAction.toString(), fetchWallet)
  yield takeEvery(transferAction.toString(), transfer)
}
