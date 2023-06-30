import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'

import favoritesReducer from './src/redux/slices/favouritesSlice'

export const store = configureStore({
  reducer: combineReducers({ favorites: favoritesReducer }),
  middleware: [thunk, logger],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
