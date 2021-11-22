import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import walletReducer from './features/challenge/walletsSlice'
import sagaChallenge from './features/challenge/sagas'

export const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    wallets: walletReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
})

sagaMiddleware.run(sagaChallenge)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
