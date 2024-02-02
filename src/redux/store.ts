import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userStateReducer from './slices/userStateSlice'

const persistData1 = {
  key: 'US',
  storage,
  blacklist: ['userState']
}

export const store = configureStore({
  reducer: {
    reducerUserState: persistReducer(persistData1, userStateReducer)
  },
  middleware: (defaultMiddleware) => defaultMiddleware({
    serializableCheck: false
  })
})

export const persistor = persistStore(store)