import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Pokemon } from '../../types'

interface FavoritesState {
  favorites: Pokemon[]
}

const initialState: FavoritesState = {
  favorites: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Pokemon>) => {
      state.favorites.push(action.payload)
    },
    removeFavorite: (state, action: PayloadAction<Pokemon>) => {
      const { name } = action.payload
      state.favorites = state.favorites.filter(
        (pokemon) => pokemon.name !== name
      )
    },
  },
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
