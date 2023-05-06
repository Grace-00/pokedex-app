import React, { FC } from 'react'
import './pokemonCard.css'
import { Sprites } from '../api/api'

export interface PokemonCardProps {
  pokemon: Pokemon
}

interface Pokemon {
  name: string
  url: string
  sprites: Sprites
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  const frontDefaultImage = pokemon.sprites?.front_default || 'img not found'
  return (
    <div className="pokemon-card">
      <h1>{pokemon.name}</h1>
      <img src={frontDefaultImage} alt={`image of: ${pokemon.name}`} />
    </div>
  )
}

export default PokemonCard
