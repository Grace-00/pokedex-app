import React, { FC } from 'react'
import { Pokemon } from '../types'
import { PokemonCard } from '../components/PokemonCard'

export interface FavouritesProps {
  readonly favourites: Pokemon[]
  readonly onFavourite: (pokemon: Pokemon) => void
}

const Favourites: FC<FavouritesProps> = (props: FavouritesProps) => {
  return (
    <div className="pokemon-container">
      <h1>Favourites</h1>
      {props.favourites.length === 0 ? (
        <p>You have no favourites yet.</p>
      ) : (
        <div className="pokemon-list">
          {props.favourites.map((pokemon) => {
            return (
              <PokemonCard
                key={pokemon.name}
                pokemon={pokemon}
                onFavourite={props.onFavourite}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Favourites
