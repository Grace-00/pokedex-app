import React, { FC } from 'react'
import { Pokemon } from '../types'
import { PokemonCard } from '../components/PokemonCard'
import { useAppSelector } from '../redux/selectors'

// export interface FavouritesProps {
//   readonly favourites: Pokemon[]
//   readonly onFavourite: (pokemon: Pokemon) => void
// }

const Favourites: FC = () => {
  const favorites = useAppSelector((state) => state.favorites.favorites)
  return (
    <div className="pokemon-container">
      <h1>Favourites</h1>
      {favorites.length === 0 ? (
        <p>You have no favourites yet.</p>
      ) : (
        <div className="pokemon-list">
          {favorites.map((pokemon) => {
            return (
              <PokemonCard
                key={pokemon.name}
                pokemon={pokemon}
                // onFavourite={props.onFavourite}
                // favourites={props.favourites}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Favourites
