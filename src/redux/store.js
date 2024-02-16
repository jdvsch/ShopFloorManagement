import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userStateReducer from './slices/userStateSlice'
import pageToRenderReducer from './slices/pageToRenderSlice'

const persistData1 = {
  key: 'US',
  storage,
  whitelist: ['userState']
}

const persistData2 = {
  key: 'PR',
  storage,
  whitelist: ['pageToRender']
}

export const store = configureStore({
  reducer: {
    reducerUserState: persistReducer(persistData1, userStateReducer),
    reducerPageToRender: persistReducer(persistData2, pageToRenderReducer)
  },
  middleware: (defaultMiddleware) => defaultMiddleware({
    serializableCheck: false
  })
})

export const persistor = persistStore(store)