import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import walletReducer, { saga } from './features/challenge/walletsSlice'

export const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    wallets: walletReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
})

sagaMiddleware.run(saga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >
