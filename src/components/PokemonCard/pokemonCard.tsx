import React, { FC } from 'react'
import './pokemonCard.css'
import { Link } from 'react-router-dom'
import { Pokemon } from '../../types'

export interface PokemonCardProps {
  readonly pokemon: Pokemon
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  const frontDefaultImage = pokemon.sprites?.front_default || 'img not found'
  return (
    <Link to={`/pokemon/${pokemon.name}`} className="pokemon-card-link">
      <div className="pokemon-card">
        <h1>{pokemon.name}</h1>
        <img src={frontDefaultImage} alt={`image of: ${pokemon.name}`} />
      </div>
    </Link>
  )
}

export default PokemonCard
