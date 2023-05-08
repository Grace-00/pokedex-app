import React, { FC } from 'react'
import './pokemonCard.css'
import { Link } from 'react-router-dom'
import { Pokemon } from '../../types'
import { Button } from '../Button'

export interface PokemonCardProps {
  readonly pokemon: Pokemon
  readonly onFavourite: (pokemon: Pokemon) => void
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemon, onFavourite }) => {
  const frontDefaultImage = pokemon.sprites?.front_default || 'img not found'

  const handleFavourite = () => {
    onFavourite(pokemon)
  }

  return (
    <div className="pokemon-card-container">
      <Link to={`/pokemon/${pokemon.name}`} className="pokemon-card-link">
        <div className="pokemon-card">
          <h1>{pokemon.name}</h1>
          <img src={frontDefaultImage} alt={`image of: ${pokemon.name}`} />
        </div>
      </Link>
      <Button
        icon={`./favourite-heart.png`}
        className="pokemon-card-favourite"
        onClick={handleFavourite}
      />
    </div>
  )
}

export default PokemonCard
